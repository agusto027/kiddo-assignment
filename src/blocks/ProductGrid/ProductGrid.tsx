import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ProductGridBlock } from '../../types/blocks';
import type { BlockComponentProps } from '../../engine/registry/ComponentRegistry';
import { useTheme } from '../../context/ThemeContext';
import { ProductCard } from '../ProductCard';
import { handleAction } from '../../engine/dispatcher/ActionDispatcher';

function ProductGridComponent({ block }: BlockComponentProps<ProductGridBlock>) {
  const theme = useTheme();
  const { data } = block;

  const onSeeAll = useCallback(() => {
    if (data.seeAllAction) {
      handleAction(data.seeAllAction);
    }
  }, [data.seeAllAction]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: 8,
          paddingHorizontal: 16,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
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
        grid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
        },
        cell: {
          width: '47%',
        },
      }),
    [theme],
  );

  const displayProducts = data.products.slice(0, 4);

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
      <View style={styles.grid}>
        {displayProducts.map((product) => (
          <View key={product.id} style={styles.cell}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </View>
  );
}

export const ProductGrid = memo(ProductGridComponent);
