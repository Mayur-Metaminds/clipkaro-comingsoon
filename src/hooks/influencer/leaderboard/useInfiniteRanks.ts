import { fetchRanks } from "../../../services/influencer/leaderboard/leaderboard.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteRanks = (pageSize: number, enabled: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ["infinite-ranks", pageSize],
    queryFn: ({ pageParam = 1 }) => fetchRanks(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
