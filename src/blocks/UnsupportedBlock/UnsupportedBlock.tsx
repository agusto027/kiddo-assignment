import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Block } from '../../types/blocks';
import { useTheme } from '../../context/ThemeContext';

interface UnsupportedBlockProps {
  block: Block;
}

function UnsupportedBlockComponent({ block }: UnsupportedBlockProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.title, { color: theme.error }]}>Unsupported Block</Text>
      <Text style={[styles.type, { color: theme.textSecondary }]}>
        Type: {block.type}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  type: {
    fontSize: 12,
    marginTop: 4,
  },
});

export const UnsupportedBlock = memo(UnsupportedBlockComponent);
