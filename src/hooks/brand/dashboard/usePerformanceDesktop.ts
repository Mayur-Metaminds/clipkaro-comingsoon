import { fetchCampaignPerformance } from "@/services/brand/dashboard/dashboard.service";
import { CampaignPerformanceApiResponse } from "@/types/brand/dashboard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const usePerformanceDesktop = (
  page: number,
  limit: number,
  enabled: boolean = true
) => {
  return useQuery<CampaignPerformanceApiResponse>({
    queryKey: ["brand-performance-desktop", page, limit],
    queryFn: () => fetchCampaignPerformance(page, limit),
    placeholderData: keepPreviousData,
    enabled,
  });
};
