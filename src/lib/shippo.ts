import { Shippo } from 'shippo';

const apiKey = process.env.SHIPPO_API_KEY;

export const shippoClient = apiKey
  ? new Shippo({ apiKeyHeader: apiKey })
  : null;

/** Value Suppliers warehouse address */
export const WAREHOUSE_ADDRESS = {
  name: 'Value Suppliers',
  company: 'Value Suppliers',
  street1: '1401 N Clovis Ave',
  street2: 'STE #103',
  city: 'Clovis',
  state: 'CA',
  zip: '93727',
  country: 'US',
  email: 'orders@valuesuppliers.co',
} as const;

/** Standard box dimensions for glove cases (inches) */
const PARCEL_TEMPLATES = {
  light: { length: '12', width: '10', height: '6', weight: '5' },
  standard: { length: '18', width: '14', height: '10', weight: '15' },
  heavy: { length: '24', width: '18', height: '14', weight: '30' },
  freight_sm: { length: '24', width: '20', height: '18', weight: '60' },
  freight_lg: { length: '30', width: '24', height: '24', weight: '100' },
} as const;

/** Pick parcel dimensions based on total weight */
export function getParcelDimensions(weightLbs: number) {
  if (weightLbs <= 5) return PARCEL_TEMPLATES.light;
  if (weightLbs <= 15) return PARCEL_TEMPLATES.standard;
  if (weightLbs <= 30) return PARCEL_TEMPLATES.heavy;
  if (weightLbs <= 60) return PARCEL_TEMPLATES.freight_sm;
  return PARCEL_TEMPLATES.freight_lg;
}

export type ShippoAddress = {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email?: string;
  phone?: string;
};

export type ShippoRate = {
  objectId: string;
  provider: string;
  servicelevel: string;
  amount: string;
  currency: string;
  estimatedDays: number | null;
  durationTerms: string;
};

/**
 * Create a Shippo shipment and return available rates.
 */
export async function createShipment(
  addressTo: ShippoAddress,
  weightLbs: number,
): Promise<{ shipmentId: string; rates: ShippoRate[] } | null> {
  if (!shippoClient) return null;

  const parcel = getParcelDimensions(weightLbs);

  const shipment = await shippoClient.shipments.create({
    addressFrom: { ...WAREHOUSE_ADDRESS },
    addressTo: {
      name: addressTo.name,
      street1: addressTo.street1,
      street2: addressTo.street2 || '',
      city: addressTo.city,
      state: addressTo.state,
      zip: addressTo.zip,
      country: addressTo.country || 'US',
      email: addressTo.email || '',
      phone: addressTo.phone || '',
    },
    parcels: [
      {
        length: parcel.length,
        width: parcel.width,
        height: parcel.height,
        distanceUnit: 'in',
        weight: String(weightLbs),
        massUnit: 'lb',
      },
    ],
  });

  const rates: ShippoRate[] = (shipment.rates ?? []).map((r) => ({
    objectId: r.objectId ?? '',
    provider: r.provider ?? '',
    servicelevel: r.servicelevel?.name ?? '',
    amount: r.amount ?? '0',
    currency: r.currency ?? 'USD',
    estimatedDays: r.estimatedDays ?? null,
    durationTerms: r.durationTerms ?? '',
  }));

  // Sort by price ascending
  rates.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));

  return { shipmentId: shipment.objectId ?? '', rates };
}

/**
 * Purchase a shipping label for a given rate ID.
 */
export async function purchaseLabel(rateId: string): Promise<{
  transactionId: string;
  trackingNumber: string;
  trackingUrl: string;
  labelUrl: string;
  eta: string | null;
} | null> {
  if (!shippoClient) return null;

  const transaction = await shippoClient.transactions.create({
    rate: rateId,
    labelFileType: 'PDF',
    async: false,
  });

  if (transaction.status !== 'SUCCESS') {
    const msgs = transaction.messages?.map((m) => m.text).join('; ') ?? 'Unknown error';
    throw new Error(`Label purchase failed: ${msgs}`);
  }

  return {
    transactionId: transaction.objectId ?? '',
    trackingNumber: transaction.trackingNumber ?? '',
    trackingUrl: transaction.trackingUrlProvider ?? '',
    labelUrl: transaction.labelUrl ?? '',
    eta: transaction.eta ?? null,
  };
}

/**
 * Get tracking status for a carrier + tracking number.
 */
export async function getTracking(carrier: string, trackingNumber: string) {
  if (!shippoClient) return null;

  const track = await shippoClient.trackingStatus.get(trackingNumber, carrier);
  return {
    status: track.trackingStatus?.status ?? 'UNKNOWN',
    statusDetails: track.trackingStatus?.statusDetails ?? '',
    location: track.trackingStatus?.location ?? null,
    eta: track.eta?.toISOString() ?? null,
    trackingHistory: (track.trackingHistory ?? []).map((h) => ({
      status: h.status ?? '',
      statusDetails: h.statusDetails ?? '',
      date: h.statusDate?.toISOString() ?? '',
      location: h.location ?? null,
    })),
  };
}
