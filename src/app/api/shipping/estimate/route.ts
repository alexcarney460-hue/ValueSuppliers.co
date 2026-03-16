import { NextRequest, NextResponse } from 'next/server';
import { getRatesForZip } from '@/lib/shippo';
import { DEFAULT_WEIGHTS } from '@/lib/shipping';

/**
 * POST /api/shipping/estimate
 * Public endpoint — returns live Shippo rates for a zip + cart items.
 * Body: { zip, items: [{ id, quantity, price }] }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { zip, items } = body;

    if (!zip || typeof zip !== 'string' || zip.length < 5) {
      return NextResponse.json({ error: 'Valid zip code required' }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Calculate total weight from cart items
    const weightLbs = items.reduce((sum: number, item: { id: string; quantity: number }) => {
      const w = DEFAULT_WEIGHTS[item.id] ?? 5;
      return sum + w * (item.quantity || 1);
    }, 0);

    const rates = await getRatesForZip(zip.trim(), Math.max(1, weightLbs));

    return NextResponse.json({
      ok: true,
      weightLbs: Math.round(weightLbs * 10) / 10,
      rates: rates.map((r) => ({
        id: r.objectId,
        carrier: r.provider,
        service: r.servicelevel,
        price: parseFloat(r.amount),
        estimatedDays: r.estimatedDays,
        description: r.durationTerms,
      })),
    });
  } catch (err) {
    console.error('[Shipping] estimate error:', err instanceof Error ? err.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to get shipping rates' }, { status: 500 });
  }
}
