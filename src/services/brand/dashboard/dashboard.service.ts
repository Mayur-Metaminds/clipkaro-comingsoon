import { apiClient } from "../../../lib/api";
import {
  BrandCampaignApiResponse,
  CampaignPerformanceApiResponse,
} from "../../../types/brand/dashboard";
import { InfluencerStats } from "../../../types/influencer/dashboard";

export async function fetchInfluencerStats(): Promise<InfluencerStats | null> {
  const { data } = await apiClient.get("/influencer/stats");
  return data ?? null;
}

export const fetchCampaignPerformance = async (
  page: number,
  limit: number
): Promise<CampaignPerformanceApiResponse> => {
  const res = await fetch(
    `/api/brand/dashboard/performance?page=${page}&limit=${limit}`
  );

  if (!res.ok) throw new Error("Failed to fetch campaign performance");

  return res.json();
};

export const fetchBrandCampaigns = async (
  page: number,
  limit: number
): Promise<BrandCampaignApiResponse> => {
  const res = await fetch(`/api/brand/campaigns?page=${page}&limit=${limit}`);

  if (!res.ok) throw new Error("Failed to fetch brand campaigns");

  return res.json();
};
