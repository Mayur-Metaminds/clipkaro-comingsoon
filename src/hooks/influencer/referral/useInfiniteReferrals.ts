import { fetchReferrals } from "../../../services/influencer/referral/referral.service";
import { ReferralResponse } from "../../../types/influencer/referral";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteReferrals = (
  pageSize: number,
  enabled: boolean = true
) => {
  return useInfiniteQuery<ReferralResponse>({
    queryKey: ["infinite-referrals", pageSize],

    queryFn: ({ pageParam = 1 }) =>
      fetchReferrals(pageParam as number, pageSize),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,

    enabled,
  });
};
