import type { AccountType } from '@/lib/account';

// Same discount structure as BlueLabel Wholesale
export const DISCOUNTS: Record<AccountType, number> = {
  retail:       0,     // full price
  wholesale:    0.20,  // 20% off retail
  distribution: 0.30,  // 30% off retail
};

export function roundMoney(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function priceForAccount(baseRetailPrice: number, accountType: AccountType): number {
  const discount = DISCOUNTS[accountType] ?? 0;
  return roundMoney(baseRetailPrice * (1 - discount));
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

// Minimum order quantities per tier
export const MIN_ORDER: Record<AccountType, number> = {
  retail:       1,    // 1 case minimum
  wholesale:    5,    // 5 cases minimum
  distribution: 25,   // 25 cases minimum
};

// Qualification thresholds (monthly case volume to apply for each tier)
export const TIER_THRESHOLDS = {
  wholesale:    { min: 5,  label: '5+ cases / month' },
  distribution: { min: 25, label: '25+ cases / month' },
};
