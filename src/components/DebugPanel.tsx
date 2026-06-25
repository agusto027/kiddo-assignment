import React, { memo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { DebugInfo } from '../hooks/useDebugInfo';
import { useTheme } from '../context/ThemeContext';
import { useCampaign } from '../campaigns/CampaignProvider';
import { useCartCount } from '../state/cartStore';

interface DebugPanelProps {
  debugInfo: DebugInfo;
}

function DebugPanelComponent({ debugInfo }: DebugPanelProps) {
  const theme = useTheme();
  const { activeCampaign, appliedCoupon, couponDiscount } = useCampaign();
  const cartCount = useCartCount();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>Developer Debug Panel</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Campaign</Text>
        <Text style={[styles.value, { color: theme.text }]}>{activeCampaign.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Cart Count</Text>
        <Text style={[styles.value, { color: theme.primary }]}>{cartCount}</Text>
      </View>

      {appliedCoupon ? (
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Coupon</Text>
          <Text style={[styles.value, { color: theme.success }]}>
            {appliedCoupon} ({couponDiscount}% off)
          </Text>
        </View>
      ) : null}

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Theme Values</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.entries(theme).map(([key, value]) => (
          <View
            key={key}
            style={[styles.themeChip, { backgroundColor: theme.background, borderColor: theme.border }]}
          >
            <View style={[styles.colorSwatch, { backgroundColor: value }]} />
            <Text style={[styles.chipLabel, { color: theme.textSecondary }]}>{key}</Text>
            <Text style={[styles.chipValue, { color: theme.text }]}>{value}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Loaded Components</Text>
      <Text style={[styles.listText, { color: theme.text }]}>
        {debugInfo.registeredComponents.join(', ') || 'None'}
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Unsupported Components</Text>
      <Text style={[styles.listText, { color: debugInfo.unsupportedComponents.length ? theme.error : theme.success }]}>
        {debugInfo.unsupportedComponents.length
          ? debugInfo.unsupportedComponents.join(', ')
          : 'None (all blocks valid)'}
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Blocks</Text>
        <Text style={[styles.value, { color: theme.text }]}>
          {debugInfo.renderableBlockCount} / {debugInfo.totalBlockCount} renderable
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
  },
  listText: {
    fontSize: 11,
    lineHeight: 16,
  },
  themeChip: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    minWidth: 90,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginBottom: 4,
  },
  chipLabel: {
    fontSize: 9,
    textTransform: 'uppercase',
  },
  chipValue: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export const DebugPanel = memo(DebugPanelComponent);
