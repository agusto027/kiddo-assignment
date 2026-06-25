import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCartCount } from '../state/cartStore';

/**
 * Cart badge subscribes ONLY to cartCount via Zustand selector.
 * When user taps Add To Cart, only this component re-renders — not the feed.
 */
function CartBadgeComponent() {
  const theme = useTheme();
  const cartCount = useCartCount();

  if (cartCount === 0) {
    return (
      <View style={[styles.badge, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.icon, { color: theme.text }]}>🛒</Text>
      </View>
    );
  }

  return (
    <View style={[styles.badge, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Text style={[styles.icon, { color: theme.text }]}>🛒</Text>
      <View style={[styles.countPill, { backgroundColor: theme.primary }]}>
        <Text style={[styles.countText, { color: theme.surface }]}>{cartCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  countPill: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  countText: {
    fontSize: 10,
    fontWeight: '800',
  },
});

export const CartBadge = memo(CartBadgeComponent);
