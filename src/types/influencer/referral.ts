export interface ReferralHistoryCardProps {
  heading: string;
  title: string;
  status: string;
  url?: string;
  views: string | number;
  earnings: string | number;
  date: string;
  platform?: "instagram" | "youtube";
  images?: string[];
  className?: string;
}

export type ReferralItem = {
  id: string;
  campaign: string;
  contentUrl: string;
  views: number;
  clicks: number;
  engagementRate: number;
  earnings: number;
  status: "Approved" | "Pending" | "Rejected" | "Under Review";
  submitted: string;
  platform: "instagram" | "youtube";
};

export interface ReferralResponse {
  data: ReferralItem[];
  total: number;
  page: number;
  totalPages: number;
}
