import type { ThemePayload } from './theme';
import type { Block } from './blocks';

export type CampaignId = 'back_to_school' | 'summer_playhouse' | 'mystery_carnival';

export interface CampaignConfig {
  id: CampaignId;
  name: string;
  description: string;
  theme: ThemePayload;
  overlayLottie: 'school' | 'splash' | 'confetti';
  overlayOpacity: number;
  specialAction?: 'APPLY_MYSTERY_GIFT_COUPON';
  highlightCollection?: string;
}

export interface CampaignState {
  activeCampaignId: CampaignId;
  appliedCoupon: string | null;
  couponDiscount: number;
}

export interface CampaignContextValue {
  activeCampaign: CampaignConfig;
  campaigns: CampaignConfig[];
  setCampaign: (id: CampaignId) => void;
  appliedCoupon: string | null;
  couponDiscount: number;
  getPayloadForCampaign: (id: CampaignId) => Block[];
}
