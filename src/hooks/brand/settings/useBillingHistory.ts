import { fetchBillingHistory } from "@/services/brand/settings/billing.service";
import { BillingHistoryApiResponse } from "@/types/brand/billing";
import { useQuery } from "@tanstack/react-query";

export const useBillingHistory = (
  page: number,
  limit: number,
  enabled: boolean = true
) => {
  return useQuery<BillingHistoryApiResponse>({
    queryKey: ["brand-billing-history-paginated", page, limit],
    queryFn: () => fetchBillingHistory(page, limit),
    enabled,
  });
};
