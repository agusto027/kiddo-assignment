import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { Product } from '../../types/actions';
import type { DynamicCollectionBlock } from '../../types/blocks';
import type { BlockComponentProps } from '../../engine/registry/ComponentRegistry';
import { useTheme } from '../../context/ThemeContext';
import { ProductCard } from '../ProductCard';
import { handleAction } from '../../engine/dispatcher/ActionDispatcher';
import { COLLECTION_ITEM_WIDTH } from '../../utils/formatters';

/** Stable keyExtractor — prevents FlashList item recycling issues */
const collectionKeyExtractor = (item: Product) => item.id;

interface CollectionItemProps {
  product: Product;
}

const CollectionItem = memo(function CollectionItem({ product }: CollectionItemProps) {
  return (
    <View style={{ width: COLLECTION_ITEM_WIDTH, marginRight: 12 }}>
      <ProductCard product={product} width={COLLECTION_ITEM_WIDTH} />
    </View>
  );
});

function DynamicCollectionComponent({
  block,
}: BlockComponentProps<DynamicCollectionBlock>) {
  const theme = useTheme();
  const { data } = block;

  const onSeeAll = useCallback(() => {
    if (data.seeAllAction) {
      handleAction(data.seeAllAction);
    }
  }, [data.seeAllAction]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <CollectionItem product={item} />,
    [],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: 8,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          paddingHorizontal: 16,
        },
        title: {
          fontSize: 18,
          fontWeight: '800',
          color: theme.text,
        },
        subtitle: {
          fontSize: 12,
          color: theme.textSecondary,
          marginTop: 2,
        },
        seeAll: {
          fontSize: 13,
          fontWeight: '600',
          color: theme.primary,
        },
        listContainer: {
          paddingLeft: 16,
          minHeight: 240,
        },
      }),
    [theme],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{data.title}</Text>
          {data.subtitle ? <Text style={styles.subtitle}>{data.subtitle}</Text> : null}
        </View>
        {data.seeAllAction ? (
          <Pressable onPress={onSeeAll}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.listContainer}>
        <FlashList
          data={data.products}
          renderItem={renderItem}
          keyExtractor={collectionKeyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
        />
      </View>
    </View>
  );
}

export const DynamicCollection = memo(DynamicCollectionComponent);
