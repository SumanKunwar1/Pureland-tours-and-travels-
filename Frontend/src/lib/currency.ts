// src/lib/currency.ts
//
// One rule governs every price on the site: amounts are stored in NPR, and a
// currency the admin filled in by hand always beats a converted one.

export type Currency = "NPR" | "USD" | "INR";

export const CURRENCIES: Currency[] = ["NPR", "USD", "INR"];

/** Everything in the database is NPR. */
export const BASE_CURRENCY: Currency = "NPR";

/** What a first-time visitor sees before they pick anything. */
export const DEFAULT_CURRENCY: Currency = "NPR";

export const CURRENCY_META: Record<
  Currency,
  { symbol: string; label: string; locale: string; decimals: number }
> = {
  // "Rs" rather than the ₹ glyph the site used to print for NPR — ₹ is the
  // Indian rupee sign and mislabelled every Nepali price.
  NPR: { symbol: "Rs", label: "Nepali Rupee", locale: "ne-NP", decimals: 0 },
  USD: { symbol: "$", label: "US Dollar", locale: "en-US", decimals: 0 },
  INR: { symbol: "₹", label: "Indian Rupee", locale: "en-IN", decimals: 0 },
};

/** How much one NPR is worth in each currency. */
export type RateTable = Record<Currency, number>;

export const FALLBACK_RATES: RateTable = {
  NPR: 1,
  USD: 0.0065,
  INR: 0.625,
};

/** The manual per-currency prices an admin may have entered on a record. */
export interface PriceOverrides {
  priceUSD?: number | null;
  priceINR?: number | null;
}

export interface ResolvedPrice {
  amount: number;
  currency: Currency;
  /** True when this came from the day's rate rather than a typed-in price. */
  isConverted: boolean;
}

function isUsableAmount(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

/**
 * Rounds to something a person would actually see on a price tag. Small USD
 * figures keep their precision; four-figure rupee amounts lose the noise so a
 * converted price does not read as a suspiciously exact 41,837.
 */
function roundForDisplay(amount: number, currency: Currency): number {
  if (currency === "USD") {
    return amount < 100 ? Math.round(amount) : Math.round(amount / 5) * 5;
  }
  if (amount >= 10000) return Math.round(amount / 100) * 100;
  if (amount >= 1000) return Math.round(amount / 10) * 10;
  return Math.round(amount);
}

export function convert(
  amountInBase: number,
  target: Currency,
  rates: RateTable
): number {
  const rate = rates[target];
  if (!isUsableAmount(rate)) return amountInBase;
  return amountInBase * rate;
}

/**
 * The price to show for `target`, given an NPR base and whatever manual prices
 * exist on the record. A manual price is returned verbatim and never rounded —
 * if an admin typed 1,499 they mean 1,499.
 */
export function resolvePrice(
  basePriceNPR: number,
  overrides: PriceOverrides | undefined,
  target: Currency,
  rates: RateTable
): ResolvedPrice {
  const manual =
    target === "USD"
      ? overrides?.priceUSD
      : target === "INR"
        ? overrides?.priceINR
        : undefined;

  if (isUsableAmount(manual)) {
    return { amount: manual, currency: target, isConverted: false };
  }

  if (target === BASE_CURRENCY) {
    return { amount: basePriceNPR, currency: target, isConverted: false };
  }

  return {
    amount: roundForDisplay(convert(basePriceNPR, target, rates), target),
    currency: target,
    isConverted: true,
  };
}

/**
 * A secondary amount (an original price, a per-date price, a booking total)
 * that has no manual override of its own. When the headline price for this
 * currency WAS set by hand, the same ratio is applied so the discount stays
 * consistent — otherwise a hand-set USD price against a converted USD
 * original would advertise a discount nobody intended.
 */
export function resolveRelatedPrice(
  relatedPriceNPR: number,
  basePriceNPR: number,
  overrides: PriceOverrides | undefined,
  target: Currency,
  rates: RateTable
): ResolvedPrice {
  const headline = resolvePrice(basePriceNPR, overrides, target, rates);

  if (!headline.isConverted && basePriceNPR > 0 && target !== BASE_CURRENCY) {
    const ratio = headline.amount / basePriceNPR;
    return {
      amount: roundForDisplay(relatedPriceNPR * ratio, target),
      currency: target,
      isConverted: false,
    };
  }

  if (target === BASE_CURRENCY) {
    return { amount: relatedPriceNPR, currency: target, isConverted: false };
  }

  return {
    amount: roundForDisplay(convert(relatedPriceNPR, target, rates), target),
    currency: target,
    isConverted: true,
  };
}

export function formatPrice(
  amount: number,
  currency: Currency,
  options: { withSymbol?: boolean } = {}
): string {
  const { symbol, locale, decimals } = CURRENCY_META[currency];
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Math.round(amount));

  return options.withSymbol === false ? formatted : `${symbol}${formatted}`;
}
