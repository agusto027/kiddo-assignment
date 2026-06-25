import type { CampaignConfig } from '../types/campaigns';

export const backToSchoolCampaign: CampaignConfig = {
  id: 'back_to_school',
  name: 'Back To School',
  description: 'Yellow + Blue theme with flying paper airplanes',
  theme: {
    primary: '#FFB800',
    background: '#FFF9E6',
    secondary: '#2563EB',
    accent: '#F59E0B',
    surface: '#FFFFFF',
    text: '#1E3A5F',
    textSecondary: '#64748B',
  },
  overlayLottie: 'school',
  overlayOpacity: 0.35,
  highlightCollection: 'Lunchboxes & Bags',
};
