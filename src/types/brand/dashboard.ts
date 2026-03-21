export interface CardProps {
  cardData: CampaignPerformanceItem;
  className?: string;
}

export type BrandCampaignStatus = "paused" | "live" | "draft";

export interface BrandCampaign {
  id: string | number;
  name: string;
  status: BrandCampaignStatus;
  platform: "youtube" | "instagram";
  deliverable?: string;
  amount: number;
  submission: number;
  endDate: string;
}

export interface BrandCampaignApiResponse {
  data: BrandCampaign[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CampaignPerformanceApiResponse {
  data: CampaignPerformanceItem[];
  total: number;
  page: number;
  totalPages: number;
}

export type CampaignPerformanceItem = {
  id: string;

  campaignName: string;
  platform?: string;
  creators?: number;

  budget: number;

  cpv: number;
  ecpv: number;

  likes: number;
  comments: number;
  shares: number;
};
