import { useMemo } from 'react';
import type { Product } from '../types/actions';
import type { Block } from '../types/blocks';
import homepagePayload from '../mocks/homepage.json';
import schoolCampaign from '../mocks/schoolCampaign.json';
import summerCampaign from '../mocks/summerCampaign.json';
import carnivalCampaign from '../mocks/carnivalCampaign.json';

const productMap = new Map<string, Product>();

function indexProductsFromBlocks(blocks: Block[]): void {
  for (const block of blocks) {
    if (block.type === 'PRODUCT_GRID_2X2' || block.type === 'DYNAMIC_COLLECTION') {
      const data = block.data as { products?: Product[] };
      data.products?.forEach((p) => productMap.set(p.id, p));
    }
  }
}

[homepagePayload, schoolCampaign, summerCampaign, carnivalCampaign].forEach(
  (payload) => {
    indexProductsFromBlocks(payload.blocks as Block[]);
  },
);

export function getProductById(productId: string): Product | undefined {
  return productMap.get(productId);
}

export function getAllProducts(): Product[] {
  return Array.from(productMap.values());
}

export function useProductCatalog(): Product[] {
  return useMemo(() => getAllProducts(), []);
}

export function registerProducts(products: Product[]): void {
  products.forEach((p) => productMap.set(p.id, p));
}
