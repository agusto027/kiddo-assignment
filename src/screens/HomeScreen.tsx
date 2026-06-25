import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { StatusBar } from 'expo-status-bar';
import type { KnownBlock } from '../types/blocks';
import { isOverlayBlock } from '../types/blocks';
import { BlockRenderer } from '../engine/renderer/BlockRenderer';
import { filterRenderableBlocks } from '../engine/validation/blockValidation';
import { useTheme } from '../context/ThemeContext';
import { useCampaign } from '../campaigns/CampaignProvider';
import { CampaignOverlay } from '../campaigns/CampaignOverlay';
import { StickyHeader } from '../components/StickyHeader';
import { DebugPanel } from '../components/DebugPanel';
import { useDebugInfo } from '../hooks/useDebugInfo';
import homepagePayload from '../mocks/homepage.json';
import type { Block } from '../types/blocks';
import { registerProducts } from '../hooks/useProductCatalog';
import type { Product } from '../types/actions';

/** Stable keyExtractor for vertical feed — prevents unnecessary list diffing */
const feedKeyExtractor = (item: KnownBlock) => item.id;

interface FeedItemProps {
  block: KnownBlock;
  index: number;
}

const FeedItem = memo(function FeedItem({ block, index }: FeedItemProps) {
  return <BlockRenderer block={block} index={index} />;
});

function HomeScreenComponent() {
  const theme = useTheme();
  const { activeCampaign, getPayloadForCampaign } = useCampaign();
  const [debugVisible, setDebugVisible] = useState(false);

  const { blocks, rawBlocks } = useMemo(() => {
    const baseBlocks = homepagePayload.blocks as Block[];
    const campaignBlocks = getPayloadForCampaign(activeCampaign.id);

    const merged = [...campaignBlocks, ...baseBlocks].filter((block) => {
      if (isOverlayBlock(block)) return false;
      return true;
    });

    const renderable = filterRenderableBlocks(merged);

    const products: Product[] = [];
    for (const block of renderable) {
      if (block.type === 'PRODUCT_GRID_2X2' || block.type === 'DYNAMIC_COLLECTION') {
        products.push(...block.data.products);
      }
    }
    registerProducts(products);

    return { blocks: renderable, rawBlocks: merged };
  }, [activeCampaign.id, getPayloadForCampaign]);

  const debugInfo = useDebugInfo(rawBlocks);

  const renderItem = useCallback(
    ({ item, index }: { item: KnownBlock; index: number }) => (
      <FeedItem block={item} index={index} />
    ),
    [],
  );

  const toggleDebug = useCallback(() => {
    setDebugVisible((prev) => !prev);
  }, []);

  const ListHeader = useMemo(
    () => (debugVisible ? <DebugPanel debugInfo={debugInfo} /> : null),
    [debugVisible, debugInfo],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />
      <StickyHeader onToggleDebug={toggleDebug} debugVisible={debugVisible} />
      <FlashList
        data={blocks}
        renderItem={renderItem}
        keyExtractor={feedKeyExtractor}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <CampaignOverlay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
});

export const HomeScreen = memo(HomeScreenComponent);
