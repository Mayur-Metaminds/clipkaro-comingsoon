import { fetchHistory } from "../../../services/influencer/dashboard/dashboard.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteHistory = (
  pageSize: number,
  enabled: boolean = true
) => {
  return useInfiniteQuery({
    queryKey: ["infinite-history", pageSize],
    queryFn: ({ pageParam = 1 }) => fetchHistory(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
