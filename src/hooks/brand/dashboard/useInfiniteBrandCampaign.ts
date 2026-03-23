import { fetchBrandCampaigns } from "../../../services/brand/dashboard/dashboard.service";
import { BrandCampaignApiResponse } from "../../../types/brand/dashboard";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteBrandCampaign = (
  pageSize: number,
  enabled: boolean = true
) => {
  return useInfiniteQuery<BrandCampaignApiResponse>({
    queryKey: ["brand-campaigns", pageSize],
    queryFn: ({ pageParam }) =>
      fetchBrandCampaigns(pageParam as number, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
