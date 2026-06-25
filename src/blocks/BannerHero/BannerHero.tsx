import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import type { BannerHeroBlock } from '../../types/blocks';
import type { BlockComponentProps } from '../../engine/registry/ComponentRegistry';
import { useTheme } from '../../context/ThemeContext';
import { handleAction } from '../../engine/dispatcher/ActionDispatcher';

function BannerHeroComponent({ block }: BlockComponentProps<BannerHeroBlock>) {
  const theme = useTheme();
  const { data } = block;

  const onPress = useCallback(() => {
    if (data.action) {
      handleAction(data.action);
    }
  }, [data.action]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: theme.surface,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 8,
          elevation: 4,
        },
        image: {
          width: '100%',
          height: 160,
        },
        content: {
          padding: 16,
          backgroundColor: theme.primary,
        },
        badge: {
          alignSelf: 'flex-start',
          backgroundColor: theme.surface,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 12,
          marginBottom: 8,
        },
        badgeText: {
          fontSize: 11,
          fontWeight: '700',
          color: theme.primary,
        },
        title: {
          fontSize: 22,
          fontWeight: '800',
          color: theme.surface,
          marginBottom: 4,
        },
        subtitle: {
          fontSize: 14,
          color: theme.surface,
          opacity: 0.9,
          marginBottom: 12,
        },
        cta: {
          alignSelf: 'flex-start',
          backgroundColor: theme.surface,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
        },
        ctaText: {
          fontSize: 13,
          fontWeight: '700',
          color: theme.primary,
        },
      }),
    [theme],
  );

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: data.imageUrl }} style={styles.image} contentFit="cover" />
      <View style={styles.content}>
        {data.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{data.badge}</Text>
          </View>
        ) : null}
        <Text style={styles.title}>{data.title}</Text>
        {data.subtitle ? <Text style={styles.subtitle}>{data.subtitle}</Text> : null}
        {data.ctaText ? (
          <View style={styles.cta}>
            <Text style={styles.ctaText}>{data.ctaText}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

export const BannerHero = memo(BannerHeroComponent);
