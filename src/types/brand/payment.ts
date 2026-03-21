export interface BudgetOverview {
  budgetUsed: number;
  totalBudget: number;
  dateRange: string;
}

export interface Creator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  submissionId: string;
  platform: string;
  deliverable: string;
  views: string;
  amount: string;
  submittedDate: string;
  status: string;
  contentLink: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  submittedDate: string;
  contentLink: string;
  downloadUrl: string;
}

export interface InvoiceApiResponse {
  data: Invoice[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreatorApiResponse {
  data: Creator[];
  total: number;
  page: number;
  totalPages: number;
}
