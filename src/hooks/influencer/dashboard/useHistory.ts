import {
  fetchHistory,
  HistoryApiResponse,
} from "@/services/influencer/dashboard/dashboard.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useHistory = (
  page: number,
  limit: number,
  enabled: boolean = true
) => {
  return useQuery<HistoryApiResponse>({
    queryKey: ["history", page, limit],
    queryFn: () => fetchHistory(page, limit),
    placeholderData: keepPreviousData,
    enabled,
  });
};
