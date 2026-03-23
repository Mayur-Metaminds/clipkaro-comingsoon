import { BillingHistoryApiResponse } from "../../../types/brand/billing";

export const fetchBillingHistory = async (
  page: number,
  limit: number,
  search: string = ""
): Promise<BillingHistoryApiResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const res = await fetch(`/api/brand/billing/history?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch billing history");
  }

  return res.json();
};
