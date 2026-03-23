import { ReferralResponse } from "../../../types/influencer/referral";

export const fetchReferrals = async (
  page: number,
  limit: number
): Promise<ReferralResponse> => {
  const skip = (page - 1) * limit;

  const res = await fetch(`/api/referrals?limit=${limit}&skip=${skip}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch referrals");
  }

  const json = await res.json();

  const totalPages = Math.ceil(json.total / limit);

  return {
    data: json.products,
    total: json.total,
    page,
    totalPages,
  };
};
