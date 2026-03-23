import { fetchCampaignBySlug } from "../../../services/influencer/campaign/campaign.service";
import { useQuery } from "@tanstack/react-query";

export const useCampaignDetail = (slug: string) => {
  return useQuery({
    queryKey: ["campaign", slug],
    queryFn: () => fetchCampaignBySlug(slug),
    enabled: !!slug,
  });
};
