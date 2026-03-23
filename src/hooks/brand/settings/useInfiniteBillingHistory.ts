import { fetchBillingHistory } from "../../../services/brand/settings/billing.service";
import { BillingHistoryApiResponse } from "../../../types/brand/billing";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteBillingHistory = (
  pageSize: number,
  search: string,
  enabled: boolean = true
) => {
  return useInfiniteQuery<BillingHistoryApiResponse>({
    queryKey: ["brand-billing-history", pageSize, search],
    queryFn: ({ pageParam }) =>
      fetchBillingHistory(pageParam as number, pageSize, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
