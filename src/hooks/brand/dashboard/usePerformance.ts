import { fetchCampaignPerformance } from "@/services/brand/dashboard/dashboard.service";
import { CampaignPerformanceApiResponse } from "@/types/brand/dashboard";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePerformance = (limit: number, enabled: boolean = true) => {
  return useInfiniteQuery<CampaignPerformanceApiResponse>({
    queryKey: ["brand-performance", limit],
    queryFn: ({ pageParam }) =>
      fetchCampaignPerformance(pageParam as number, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
