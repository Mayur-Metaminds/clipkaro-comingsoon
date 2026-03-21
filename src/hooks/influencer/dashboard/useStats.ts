import { fetchInfluencerStats } from "@/services/influencer/dashboard/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useStats = () => {
  return useQuery({
    queryKey: ["influencer-stats"],
    queryFn: fetchInfluencerStats,
  });
};
