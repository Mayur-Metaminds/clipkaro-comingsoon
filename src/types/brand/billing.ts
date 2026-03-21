export interface BillingHistoryItem {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  amount: number;
  currency: "INR" | "USD";
  viewUrl: string;
  downloadUrl: string;
}

export interface BillingHistoryApiResponse {
  data: BillingHistoryItem[];
  total: number;
  page: number;
  totalPages: number;
}
