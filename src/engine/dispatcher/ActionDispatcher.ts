import type { Action, ActionResult } from '../../types/actions';
import type { Product } from '../../types/actions';
import { useCartStore } from '../../state/cartStore';

type ProductLookup = (productId: string) => Product | undefined;

type MysteryCouponHandler = (code: string, discount: number) => void;

interface DispatcherContext {
  getProduct: ProductLookup;
  onDeepLink: (url: string, title?: string) => void;
  onOpenProduct: (productId: string) => void;
  onMysteryCoupon: MysteryCouponHandler;
  onNavigate: (screen: string, params?: Record<string, string>) => void;
  onShare: (message: string) => void;
}

let dispatcherContext: DispatcherContext = {
  getProduct: () => undefined,
  onDeepLink: (url) => console.log('[ActionDispatcher] DEEP_LINK:', url),
  onOpenProduct: (id) => console.log('[ActionDispatcher] OPEN_PRODUCT:', id),
  onMysteryCoupon: (code, discount) =>
    console.log('[ActionDispatcher] MYSTERY COUPON:', code, discount),
  onNavigate: (screen) => console.log('[ActionDispatcher] NAVIGATE:', screen),
  onShare: (message) => console.log('[ActionDispatcher] SHARE:', message),
};

export function configureActionDispatcher(context: Partial<DispatcherContext>): void {
  dispatcherContext = { ...dispatcherContext, ...context };
}

/**
 * Universal action dispatcher — all business logic lives here.
 * UI components remain dumb and only emit actions.
 */
export function handleAction(action: Action): ActionResult {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = dispatcherContext.getProduct(action.payload.productId);
      if (!product) {
        return { success: false, message: `Product ${action.payload.productId} not found` };
      }
      useCartStore
        .getState()
        .addToCart(product, action.payload.quantity ?? 1);
      return { success: true, message: `${product.name} added to cart` };
    }

    case 'DEEP_LINK': {
      dispatcherContext.onDeepLink(action.payload.url, action.payload.title);
      return { success: true, message: `Navigating to ${action.payload.url}` };
    }

    case 'OPEN_PRODUCT': {
      dispatcherContext.onOpenProduct(action.payload.productId);
      return { success: true, message: `Opening product ${action.payload.productId}` };
    }

    case 'APPLY_MYSTERY_GIFT_COUPON': {
      dispatcherContext.onMysteryCoupon(
        action.payload.couponCode,
        action.payload.discountPercent,
      );
      return {
        success: true,
        message: `Coupon ${action.payload.couponCode} applied (${action.payload.discountPercent}% off)`,
      };
    }

    case 'NAVIGATE': {
      dispatcherContext.onNavigate(action.payload.screen, action.payload.params);
      return { success: true, message: `Navigating to ${action.payload.screen}` };
    }

    case 'SHARE': {
      dispatcherContext.onShare(action.payload.message);
      return { success: true, message: 'Share action dispatched' };
    }

    default: {
      const exhaustiveCheck: never = action;
      return { success: false, message: `Unknown action: ${JSON.stringify(exhaustiveCheck)}` };
    }
  }
}

export function createAddToCartAction(productId: string, quantity = 1): Action {
  return { type: 'ADD_TO_CART', payload: { productId, quantity } };
}

export function createOpenProductAction(productId: string): Action {
  return { type: 'OPEN_PRODUCT', payload: { productId } };
}
