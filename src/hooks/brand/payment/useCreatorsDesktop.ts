import { fetchCreators } from "../../../services/brand/payment/payment.service";
import { CreatorApiResponse } from "../../../types/brand/payment";
import { useQuery } from "@tanstack/react-query";

export const useCreatorsDesktop = (
  page: number,
  limit: number,
  enabled: boolean = true
) => {
  return useQuery<CreatorApiResponse>({
    queryKey: ["brand-creators-paginated", page, limit],
    queryFn: () => fetchCreators(page, limit),
    enabled,
  });
};
