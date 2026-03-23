import { fetchBrandCampaigns } from "../../../services/brand/dashboard/dashboard.service";
import { BrandCampaignApiResponse } from "../../../types/brand/dashboard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useBrandActiveCampaign = (
  page: number,
  limit: number,
  enabled: boolean = true
) => {
  return useQuery<BrandCampaignApiResponse>({
    queryKey: ["brand-active-campaign-desktop", page, limit],
    queryFn: () => fetchBrandCampaigns(page, limit),
    placeholderData: keepPreviousData,
    enabled,
  });
};
