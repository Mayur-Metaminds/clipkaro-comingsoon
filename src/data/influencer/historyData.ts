export type HistoryItem = {
  id: string;
  campaign: string;
  title?: string;
  contentUrl: string;
  images?: string[];
  date?: string;
  views: number;
  earnings: string;
  status: "Approved" | "Pending" | "Rejected";
  submitted: string;
};

export const historyData: HistoryItem[] = [
  {
    id: "1",
    campaign: "Horizon UI PRO",
    contentUrl: "instagram.com/reel/abc123",
    views: 45200,
    earnings: "₹15,200",
    status: "Approved",
    submitted: "30 Jan",
  },
  {
    id: "2",
    campaign: "Horizon UI Free",
    contentUrl: "instagram.com/reel/abc123",
    views: 100200,
    earnings: "₹30,500",
    status: "Approved",
    submitted: "28 Jan",
  },
  {
    id: "3",
    campaign: "Weekly Update",
    contentUrl: "instagram.com/reel/abc123",
    views: 521,
    earnings: "-",
    status: "Pending",
    submitted: "22 Jan",
  },
  {
    id: "4",
    campaign: "Venus 3D Asset",
    contentUrl: "instagram.com/reel/abc123",
    views: 1200,
    earnings: "-",
    status: "Pending",
    submitted: "19 Jan",
  },
  {
    id: "5",
    campaign: "Marketplace",
    contentUrl: "instagram.com/reel/abc123",
    views: 258,
    earnings: "-",
    status: "Rejected",
    submitted: "16 Jan",
  },
];
