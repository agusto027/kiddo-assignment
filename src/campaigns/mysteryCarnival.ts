import type { CampaignConfig } from '../types/campaigns';

export const mysteryCarnivalCampaign: CampaignConfig = {
  id: 'mystery_carnival',
  name: 'Mystery Gift Carnival',
  description: 'Carnival red theme with confetti overlay',
  theme: {
    primary: '#DC2626',
    background: '#FEF2F2',
    secondary: '#991B1B',
    accent: '#F97316',
    surface: '#FFFFFF',
    text: '#450A0A',
    textSecondary: '#78716C',
  },
  overlayLottie: 'confetti',
  overlayOpacity: 0.4,
  specialAction: 'APPLY_MYSTERY_GIFT_COUPON',
  highlightCollection: 'Mystery Gift Box',
};
