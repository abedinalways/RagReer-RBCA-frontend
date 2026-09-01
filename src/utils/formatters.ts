/**
 * utils/formatters.ts — cross-cutting formatting utilities.
 * Feature-specific formatters live inside their own `features/<name>/utils`.
 */

const CURRENCY_SYMBOLS: Record<string, string> = {
  BDT: "৳",
  USD: "$",
  EUR: "€",
};

export function formatCurrency(amount: number, currency: string = "BDT"): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? "";
  return `${symbol}${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}