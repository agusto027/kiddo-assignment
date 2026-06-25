let mysteryCouponHandler: ((code: string, discount: number) => void) | null = null;

export function registerMysteryCouponHandler(
  handler: (code: string, discount: number) => void,
): void {
  mysteryCouponHandler = handler;
}

export function applyMysteryCouponRef(code: string, discount: number): void {
  mysteryCouponHandler?.(code, discount);
}
