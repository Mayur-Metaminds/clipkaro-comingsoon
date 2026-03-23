import { fetchInvoices } from "../../../services/brand/payment/payment.service";
import { InvoiceApiResponse } from "../../../types/brand/payment";
import { useQuery } from "@tanstack/react-query";

export const useInvoicesDesktop = (
  page: number,
  limit: number,
  enabled: boolean = true
) => {
  return useQuery<InvoiceApiResponse>({
    queryKey: ["brand-invoices-paginated", page, limit],
    queryFn: () => fetchInvoices(page, limit),
    enabled,
  });
};
