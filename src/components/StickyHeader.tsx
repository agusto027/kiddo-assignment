import React, { memo, useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { CampaignId } from '../types/campaigns';
import { useTheme } from '../context/ThemeContext';
import { useCampaign } from '../campaigns/CampaignProvider';
import { CartBadge } from './CartBadge';

interface StickyHeaderProps {
  onToggleDebug: () => void;
  debugVisible: boolean;
}

function StickyHeaderComponent({ onToggleDebug, debugVisible }: StickyHeaderProps) {
  const theme = useTheme();
  const { campaigns, activeCampaign, setCampaign } = useCampaign();

  const onSelectCampaign = useCallback(
    (id: CampaignId) => {
      setCampaign(id);
    },
    [setCampaign],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.brand, { color: theme.primary }]}>Kiddo</Text>
          <Text style={[styles.tagline, { color: theme.textSecondary }]}>
            Kids & Baby Essentials
          </Text>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={onToggleDebug} style={[styles.debugBtn, { borderColor: theme.border }]}>
            <Text style={[styles.debugText, { color: theme.textSecondary }]}>
              {debugVisible ? 'Hide' : 'Debug'}
            </Text>
          </Pressable>
          <CartBadge />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.campaignRow}
      >
        {campaigns.map((campaign) => {
          const isActive = campaign.id === activeCampaign.id;
          return (
            <Pressable
              key={campaign.id}
              onPress={() => onSelectCampaign(campaign.id)}
              style={[
                styles.campaignChip,
                {
                  backgroundColor: isActive ? theme.primary : theme.background,
                  borderColor: isActive ? theme.primary : theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.campaignText,
                  { color: isActive ? theme.surface : theme.text },
                ]}
              >
                {campaign.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  brand: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 12,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  debugBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  debugText: {
    fontSize: 11,
    fontWeight: '600',
  },
  campaignRow: {
    gap: 8,
    paddingRight: 16,
  },
  campaignChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  campaignText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export const StickyHeader = memo(StickyHeaderComponent);
