import type { Action } from './actions';
import type { Product } from './actions';
import type { ThemePayload } from './theme';

export type BlockType =
  | 'BANNER_HERO'
  | 'PRODUCT_GRID_2X2'
  | 'DYNAMIC_COLLECTION'
  | 'FULL_SCREEN_OVERLAY';

export interface BaseBlock {
  id: string;
  type: BlockType | string;
}

export interface BannerHeroBlock extends BaseBlock {
  type: 'BANNER_HERO';
  data: {
    title: string;
    subtitle?: string;
    imageUrl: string;
    ctaText?: string;
    action?: Action;
    badge?: string;
  };
}

export interface ProductGridBlock extends BaseBlock {
  type: 'PRODUCT_GRID_2X2';
  data: {
    title: string;
    subtitle?: string;
    products: Product[];
    seeAllAction?: Action;
  };
}

export interface DynamicCollectionBlock extends BaseBlock {
  type: 'DYNAMIC_COLLECTION';
  data: {
    title: string;
    subtitle?: string;
    products: Product[];
    seeAllAction?: Action;
  };
}

export interface OverlayBlock extends BaseBlock {
  type: 'FULL_SCREEN_OVERLAY';
  data: {
    lottieAsset: 'school' | 'splash' | 'confetti';
    opacity?: number;
  };
}

export type KnownBlock =
  | BannerHeroBlock
  | ProductGridBlock
  | DynamicCollectionBlock
  | OverlayBlock;

export type UnknownBlock = BaseBlock & {
  type: string;
  data?: Record<string, unknown>;
};

export type Block = KnownBlock | UnknownBlock;

export interface HomepagePayload {
  version: string;
  theme: ThemePayload;
  campaignId: string;
  blocks: Block[];
  metadata?: {
    lastUpdated: string;
    region: string;
  };
}

export function isBannerHeroBlock(block: Block): block is BannerHeroBlock {
  return block.type === 'BANNER_HERO';
}

export function isProductGridBlock(block: Block): block is ProductGridBlock {
  return block.type === 'PRODUCT_GRID_2X2';
}

export function isDynamicCollectionBlock(
  block: Block,
): block is DynamicCollectionBlock {
  return block.type === 'DYNAMIC_COLLECTION';
}

export function isOverlayBlock(block: Block): block is OverlayBlock {
  return block.type === 'FULL_SCREEN_OVERLAY';
}
