import type { ComponentType } from 'react';
import type { KnownBlock } from '../../types/blocks';

export type BlockComponentProps<T extends KnownBlock = KnownBlock> = {
  block: T;
  index: number;
};

export type RegisteredBlockComponent = ComponentType<BlockComponentProps>;

/**
 * Factory-pattern component registry.
 * Avoids giant switch statements — renderer resolves via lookup table.
 */
class ComponentRegistry {
  private registry = new Map<string, RegisteredBlockComponent>();

  register(type: string, component: RegisteredBlockComponent): void {
    this.registry.set(type, component);
  }

  resolve(type: string): RegisteredBlockComponent | undefined {
    return this.registry.get(type);
  }

  getRegisteredTypes(): string[] {
    return Array.from(this.registry.keys());
  }

  has(type: string): boolean {
    return this.registry.has(type);
  }
}

export const componentRegistry = new ComponentRegistry();

export function registerBlockComponent(
  type: string,
  component: RegisteredBlockComponent,
): void {
  componentRegistry.register(type, component);
}

export function resolveBlockComponent(
  type: string,
): RegisteredBlockComponent | undefined {
  return componentRegistry.resolve(type);
}
