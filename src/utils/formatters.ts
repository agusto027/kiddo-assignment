export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function calculateDiscountPercent(
  price: number,
  originalPrice: number,
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function generateStableKey(prefix: string, id: string): string {
  return `${prefix}-${id}`;
}

export const PRODUCT_CARD_WIDTH = 140;
export const PRODUCT_CARD_HEIGHT = 220;
export const COLLECTION_ITEM_WIDTH = 150;
