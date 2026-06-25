import { BannerHero } from '../../blocks/BannerHero';
import { ProductGrid } from '../../blocks/ProductGrid';
import { DynamicCollection } from '../../blocks/DynamicCollection';
import {
  registerBlockComponent,
  type RegisteredBlockComponent,
} from './ComponentRegistry';

/**
 * Bootstrap the component registry with all known block types.
 * Factory pattern — renderer resolves dynamically via lookup.
 */
export function initializeComponentRegistry(): void {
  registerBlockComponent('BANNER_HERO', BannerHero as RegisteredBlockComponent);
  registerBlockComponent('PRODUCT_GRID_2X2', ProductGrid as RegisteredBlockComponent);
  registerBlockComponent(
    'DYNAMIC_COLLECTION',
    DynamicCollection as RegisteredBlockComponent,
  );
}

export { componentRegistry, resolveBlockComponent } from './ComponentRegistry';
