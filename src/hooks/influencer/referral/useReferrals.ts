import { fetchReferrals } from "../../../services/influencer/referral/referral.service";
import { ReferralResponse } from "../../../types/influencer/referral";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useReferrals = (
  page: number,
  limit: number,
  enabled: boolean = true
) => {
  return useQuery<ReferralResponse>({
    queryKey: ["referrals", page, limit],
    queryFn: () => fetchReferrals(page, limit),
    placeholderData: keepPreviousData,
    enabled,
  });
};
