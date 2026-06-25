import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useCampaign } from './CampaignProvider';

const LOTTIE_SOURCES = {
  school: require('../assets/lottie/school.json'),
  splash: require('../assets/lottie/splash.json'),
  confetti: require('../assets/lottie/confetti.json'),
} as const;

/**
 * Full-screen overlay with pointerEvents="none".
 * Users can scroll, tap, and add to cart while animation plays.
 */
function CampaignOverlayComponent() {
  const { activeCampaign } = useCampaign();

  const source = LOTTIE_SOURCES[activeCampaign.overlayLottie];

  const containerStyle = useMemo(
    () => [styles.overlay, { opacity: activeCampaign.overlayOpacity }],
    [activeCampaign.overlayOpacity],
  );

  return (
    <View style={containerStyle} pointerEvents="none">
      <LottieView
        source={source}
        autoPlay
        loop
        style={styles.lottie}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export const CampaignOverlay = memo(CampaignOverlayComponent);
