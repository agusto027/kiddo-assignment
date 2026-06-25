export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating?: number;
  tag?: string;
  unit?: string;
}

export type ActionType =
  | 'ADD_TO_CART'
  | 'DEEP_LINK'
  | 'OPEN_PRODUCT'
  | 'APPLY_MYSTERY_GIFT_COUPON'
  | 'NAVIGATE'
  | 'SHARE';

export interface BaseAction {
  type: ActionType;
}

export interface AddToCartAction extends BaseAction {
  type: 'ADD_TO_CART';
  payload: {
    productId: string;
    quantity?: number;
  };
}

export interface DeepLinkAction extends BaseAction {
  type: 'DEEP_LINK';
  payload: {
    url: string;
    title?: string;
  };
}

export interface OpenProductAction extends BaseAction {
  type: 'OPEN_PRODUCT';
  payload: {
    productId: string;
  };
}

export interface ApplyMysteryGiftCouponAction extends BaseAction {
  type: 'APPLY_MYSTERY_GIFT_COUPON';
  payload: {
    couponCode: string;
    discountPercent: number;
  };
}

export interface NavigateAction extends BaseAction {
  type: 'NAVIGATE';
  payload: {
    screen: string;
    params?: Record<string, string>;
  };
}

export interface ShareAction extends BaseAction {
  type: 'SHARE';
  payload: {
    message: string;
  };
}

export type Action =
  | AddToCartAction
  | DeepLinkAction
  | OpenProductAction
  | ApplyMysteryGiftCouponAction
  | NavigateAction
  | ShareAction;

export interface ActionResult {
  success: boolean;
  message?: string;
}
