import { fetchCampaigns } from "@/services/influencer/campaign/campaign.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteCampaigns = (pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ["campaigns", pageSize],
    queryFn: ({ pageParam }) => fetchCampaigns(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
};
