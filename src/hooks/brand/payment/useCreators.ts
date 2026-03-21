import { fetchCreators } from "@/services/brand/payment/payment.service";
import { CreatorApiResponse } from "@/types/brand/payment";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useCreators = (
  pageSize: number,
  search: string,
  enabled: boolean = true
) => {
  return useInfiniteQuery<CreatorApiResponse>({
    queryKey: ["brand-creators", pageSize, search],
    queryFn: ({ pageParam }) =>
      fetchCreators(pageParam as number, pageSize, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
