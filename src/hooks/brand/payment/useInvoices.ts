import { fetchInvoices } from "@/services/brand/payment/payment.service";
import { InvoiceApiResponse } from "@/types/brand/payment";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInvoices = (
  pageSize: number,
  search: string,
  enabled: boolean = true
) => {
  return useInfiniteQuery<InvoiceApiResponse>({
    queryKey: ["brand-invoices", pageSize, search],
    queryFn: ({ pageParam }) =>
      fetchInvoices(pageParam as number, pageSize, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
