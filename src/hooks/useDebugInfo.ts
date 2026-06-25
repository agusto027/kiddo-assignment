import { useMemo } from 'react';
import type { Block } from '../types/blocks';
import {
  filterRenderableBlocks,
  getUnsupportedBlockTypes,
} from '../engine/validation/blockValidation';
import { componentRegistry } from '../engine/registry';

export interface DebugInfo {
  registeredComponents: string[];
  unsupportedComponents: string[];
  renderableBlockCount: number;
  totalBlockCount: number;
}

export function useDebugInfo(blocks: Block[]): DebugInfo {
  return useMemo(() => {
    const unsupported = getUnsupportedBlockTypes(blocks);
    return {
      registeredComponents: componentRegistry.getRegisteredTypes(),
      unsupportedComponents: unsupported,
      renderableBlockCount: filterRenderableBlocks(blocks).length,
      totalBlockCount: blocks.length,
    };
  }, [blocks]);
}
