export interface LeaderboardItem {
  rank: number;
  creator: {
    name: string;
    username: string;
    avatar: string;
  };
  platform: "instagram" | "youtube";
  views: number;
  avgEngagement: number;
  earnings: number;
}

export interface LeaderboardApiResponse {
  data: LeaderboardItem[];
  total: number;
  page: number;
  totalPages: number;
}
