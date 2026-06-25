import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../../types/actions';
import { Image } from 'expo-image';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice, calculateDiscountPercent } from '../../utils/formatters';
import { handleAction, createAddToCartAction } from '../../engine/dispatcher/ActionDispatcher';

export interface ProductCardProps {
  product: Product;
  width?: number;
}

/**
 * Memoized ProductCard — isolated re-renders per card.
 * Add-to-cart dispatches action; cart badge updates via Zustand selector.
 */
function ProductCardComponent({ product, width = 160 }: ProductCardProps) {
  const theme = useTheme();

  const onAddToCart = useCallback(() => {
    handleAction(createAddToCartAction(product.id));
  }, [product.id]);

  const onOpenProduct = useCallback(() => {
    handleAction({ type: 'OPEN_PRODUCT', payload: { productId: product.id } });
  }, [product.id]);

  const discount = product.originalPrice
    ? calculateDiscountPercent(product.price, product.originalPrice)
    : 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          width,
          backgroundColor: theme.surface,
          borderRadius: 12,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: theme.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
        },
        imageContainer: {
          height: 110,
          backgroundColor: theme.background,
          position: 'relative',
        },
        image: {
          width: '100%',
          height: '100%',
        },
        tag: {
          position: 'absolute',
          top: 6,
          left: 6,
          backgroundColor: theme.accent,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
        },
        tagText: {
          fontSize: 9,
          fontWeight: '700',
          color: theme.surface,
        },
        discount: {
          position: 'absolute',
          top: 6,
          right: 6,
          backgroundColor: theme.success,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
        },
        discountText: {
          fontSize: 9,
          fontWeight: '700',
          color: theme.surface,
        },
        body: {
          padding: 10,
        },
        name: {
          fontSize: 12,
          fontWeight: '600',
          color: theme.text,
          marginBottom: 4,
          minHeight: 32,
        },
        unit: {
          fontSize: 10,
          color: theme.textSecondary,
          marginBottom: 6,
        },
        priceRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
        },
        price: {
          fontSize: 14,
          fontWeight: '800',
          color: theme.text,
        },
        originalPrice: {
          fontSize: 11,
          color: theme.textSecondary,
          textDecorationLine: 'line-through',
          marginLeft: 6,
        },
        addButton: {
          backgroundColor: theme.primary,
          paddingVertical: 8,
          borderRadius: 8,
          alignItems: 'center',
        },
        addButtonText: {
          fontSize: 12,
          fontWeight: '700',
          color: theme.surface,
        },
      }),
    [theme, width],
  );

  return (
    <Pressable onPress={onOpenProduct} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} contentFit="contain" />
        {product.tag ? (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        ) : null}
        {discount > 0 ? (
          <View style={styles.discount}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        {product.unit ? <Text style={styles.unit}>{product.unit}</Text> : null}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.originalPrice ? (
            <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
          ) : null}
        </View>
        <Pressable onPress={onAddToCart} style={styles.addButton}>
          <Text style={styles.addButtonText}>ADD</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export const ProductCard = memo(ProductCardComponent);
