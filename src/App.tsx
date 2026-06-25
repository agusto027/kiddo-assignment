import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CampaignProvider } from './campaigns/CampaignProvider';
import { HomeScreen } from './screens/HomeScreen';
import { initializeComponentRegistry } from './engine/registry';
import { configureActionDispatcher } from './engine/dispatcher/ActionDispatcher';
import { getProductById } from './hooks/useProductCatalog';
import { applyMysteryCouponRef } from './campaigns/campaignHelpers';
import homepagePayload from './mocks/homepage.json';
import type { ThemePayload } from './types/theme';

initializeComponentRegistry();

configureActionDispatcher({
  getProduct: getProductById,
  onDeepLink: (url, title) => {
    console.log(`[Kiddo] Deep link: ${url}${title ? ` (${title})` : ''}`);
  },
  onOpenProduct: (productId) => {
    console.log(`[Kiddo] Open product: ${productId}`);
  },
  onMysteryCoupon: (code, discount) => {
    applyMysteryCouponRef(code, discount);
  },
  onNavigate: (screen, params) => {
    console.log(`[Kiddo] Navigate: ${screen}`, params);
  },
  onShare: (message) => {
    console.log(`[Kiddo] Share: ${message}`);
  },
});

export default function App() {
  useEffect(() => {
    console.log('[Kiddo SDUI] App initialized — registry ready');
  }, []);

  return (
    <ThemeProvider initialTheme={homepagePayload.theme as ThemePayload}>
      <CampaignProvider initialCampaignId="back_to_school">
        <HomeScreen />
      </CampaignProvider>
    </ThemeProvider>
  );
}
