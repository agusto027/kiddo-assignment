import React, { memo, useCallback } from 'react';
import type { KnownBlock } from '../../types/blocks';
import { resolveBlockComponent } from '../registry/ComponentRegistry';
import { UnsupportedBlock } from '../../blocks/UnsupportedBlock/UnsupportedBlock';

export interface BlockRendererProps {
  block: KnownBlock;
  index: number;
}

/**
 * Memoized block renderer — resolves component from registry.
 * Re-renders only when its specific block reference changes.
 */
function BlockRendererComponent({ block, index }: BlockRendererProps) {
  const Component = resolveBlockComponent(block.type);

  const renderFallback = useCallback(
    () => <UnsupportedBlock block={block} />,
    [block],
  );

  if (!Component) {
    console.warn(`[BlockRenderer] No component registered for type: ${block.type}`);
    return renderFallback();
  }

  return <Component block={block} index={index} />;
}

export const BlockRenderer = memo(BlockRendererComponent);
