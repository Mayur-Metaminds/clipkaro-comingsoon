import { fetchRanks } from "@/services/influencer/leaderboard/leaderboard.service";
import { LeaderboardApiResponse } from "@/types/influencer/leaderboard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useRanks = (
  page: number,
  limit: number,
  enabled: boolean = true
) => {
  return useQuery<LeaderboardApiResponse>({
    queryKey: ["ranks", page, limit],
    queryFn: () => fetchRanks(page, limit),
    placeholderData: keepPreviousData,
    enabled,
  });
};
