import type { Block, KnownBlock } from '../../types/blocks';
import {
  isBannerHeroBlock,
  isDynamicCollectionBlock,
  isOverlayBlock,
  isProductGridBlock,
} from '../../types/blocks';

export interface ValidationResult {
  valid: boolean;
  block: Block;
  reason?: string;
}

const KNOWN_TYPES = new Set([
  'BANNER_HERO',
  'PRODUCT_GRID_2X2',
  'DYNAMIC_COLLECTION',
  'FULL_SCREEN_OVERLAY',
]);

export function isKnownBlockType(type: string): boolean {
  return KNOWN_TYPES.has(type);
}

export function validateBlock(block: Block): ValidationResult {
  if (!block.id || typeof block.id !== 'string') {
    return { valid: false, block, reason: 'Block missing valid id' };
  }

  if (!block.type || typeof block.type !== 'string') {
    return { valid: false, block, reason: 'Block missing valid type' };
  }

  if (!isKnownBlockType(block.type)) {
    console.warn(
      `[SDUI] Unsupported block type "${block.type}" (id: ${block.id}). Skipping.`,
    );
    return {
      valid: false,
      block,
      reason: `Unsupported block type: ${block.type}`,
    };
  }

  if (isBannerHeroBlock(block)) {
    if (!block.data?.title || !block.data?.imageUrl) {
      return { valid: false, block, reason: 'BANNER_HERO missing required fields' };
    }
    return { valid: true, block };
  }

  if (isProductGridBlock(block)) {
    if (!block.data?.title || !Array.isArray(block.data?.products)) {
      return {
        valid: false,
        block,
        reason: 'PRODUCT_GRID_2X2 missing required fields',
      };
    }
    return { valid: true, block };
  }

  if (isDynamicCollectionBlock(block)) {
    if (!block.data?.title || !Array.isArray(block.data?.products)) {
      return {
        valid: false,
        block,
        reason: 'DYNAMIC_COLLECTION missing required fields',
      };
    }
    return { valid: true, block };
  }

  if (isOverlayBlock(block)) {
    if (!block.data?.lottieAsset) {
      return {
        valid: false,
        block,
        reason: 'FULL_SCREEN_OVERLAY missing lottieAsset',
      };
    }
    return { valid: true, block };
  }

  return { valid: false, block, reason: 'Unknown validation path' };
}

export function filterRenderableBlocks(blocks: Block[]): KnownBlock[] {
  const renderable: KnownBlock[] = [];

  for (const block of blocks) {
    const result = validateBlock(block);
    if (result.valid) {
      renderable.push(block as KnownBlock);
    }
  }

  return renderable;
}

export function getUnsupportedBlockTypes(blocks: Block[]): string[] {
  const unsupported = new Set<string>();

  for (const block of blocks) {
    const result = validateBlock(block);
    if (!result.valid && result.reason?.startsWith('Unsupported block type')) {
      unsupported.add(block.type);
    }
  }

  return Array.from(unsupported);
}
