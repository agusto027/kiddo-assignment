import type { CampaignConfig } from '../types/campaigns';

export const summerPlayhouseCampaign: CampaignConfig = {
  id: 'summer_playhouse',
  name: 'Summer Playhouse',
  description: 'Ocean blue theme with water splash overlay',
  theme: {
    primary: '#0EA5E9',
    background: '#E0F2FE',
    secondary: '#0284C7',
    accent: '#06B6D4',
    surface: '#FFFFFF',
    text: '#0C4A6E',
    textSecondary: '#64748B',
  },
  overlayLottie: 'splash',
  overlayOpacity: 0.3,
  highlightCollection: 'Petting Zoo Tickets',
};
