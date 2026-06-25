import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Block } from '../types/blocks';
import type { CampaignConfig, CampaignContextValue, CampaignId } from '../types/campaigns';
import { backToSchoolCampaign } from './backToSchool';
import { summerPlayhouseCampaign } from './summerPlayhouse';
import { mysteryCarnivalCampaign } from './mysteryCarnival';
import { useThemeActions } from '../context/ThemeContext';
import { registerMysteryCouponHandler } from './campaignHelpers';
import schoolCampaign from '../mocks/schoolCampaign.json';
import summerCampaign from '../mocks/summerCampaign.json';
import carnivalCampaign from '../mocks/carnivalCampaign.json';

const ALL_CAMPAIGNS: CampaignConfig[] = [
  backToSchoolCampaign,
  summerPlayhouseCampaign,
  mysteryCarnivalCampaign,
];

const CAMPAIGN_BLOCKS: Record<CampaignId, Block[]> = {
  back_to_school: schoolCampaign.blocks as Block[],
  summer_playhouse: summerCampaign.blocks as Block[],
  mystery_carnival: carnivalCampaign.blocks as Block[],
};

const CampaignContext = createContext<CampaignContextValue | undefined>(undefined);

interface CampaignProviderProps {
  children: ReactNode;
  initialCampaignId?: CampaignId;
}

export function CampaignProvider({
  children,
  initialCampaignId = 'back_to_school',
}: CampaignProviderProps) {
  const { setThemeFromPayload } = useThemeActions();
  const [activeCampaignId, setActiveCampaignId] =
    useState<CampaignId>(initialCampaignId);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const activeCampaign = useMemo(
    () => ALL_CAMPAIGNS.find((c) => c.id === activeCampaignId) ?? ALL_CAMPAIGNS[0],
    [activeCampaignId],
  );

  const setCampaign = useCallback(
    (id: CampaignId) => {
      const campaign = ALL_CAMPAIGNS.find((c) => c.id === id);
      if (!campaign) return;
      setActiveCampaignId(id);
      setThemeFromPayload(campaign.theme);
      if (id !== 'mystery_carnival') {
        setAppliedCoupon(null);
        setCouponDiscount(0);
      }
    },
    [setThemeFromPayload],
  );

  const getPayloadForCampaign = useCallback((id: CampaignId): Block[] => {
    return CAMPAIGN_BLOCKS[id] ?? [];
  }, []);

  const applyMysteryCoupon = useCallback((code: string, discount: number) => {
    setAppliedCoupon(code);
    setCouponDiscount(discount);
  }, []);

  const value = useMemo<CampaignContextValue>(
    () => ({
      activeCampaign,
      campaigns: ALL_CAMPAIGNS,
      setCampaign,
      appliedCoupon,
      couponDiscount,
      getPayloadForCampaign,
    }),
    [
      activeCampaign,
      setCampaign,
      appliedCoupon,
      couponDiscount,
      getPayloadForCampaign,
    ],
  );

  React.useEffect(() => {
    registerMysteryCouponHandler(applyMysteryCoupon);
  }, [applyMysteryCoupon]);

  useEffect(() => {
    setThemeFromPayload(activeCampaign.theme);
  }, [activeCampaign.theme, setThemeFromPayload]);

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign(): CampaignContextValue {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within CampaignProvider');
  }
  return context;
}
