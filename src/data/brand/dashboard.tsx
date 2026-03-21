export type ChartDataPoint = {
  name: string;
  likes: number;
  shares: number;
  saves: number;
  comments: number;
};
import { Megaphone, Eye, Man } from "../../../public/svg/SVG";

// --- MOCK DATA ---
export const chartData: ChartDataPoint[] = [
  { name: "Mon", likes: 5, shares: 16, saves: 22, comments: 95 },
  { name: "Tue", likes: 10, shares: 10, saves: 10, comments: 5 },
  { name: "Wed", likes: 35, shares: 25, saves: 15, comments: 12 },
  { name: "Thu", likes: 45, shares: 30, saves: 20, comments: 18 },
  { name: "Fri", likes: 60, shares: 45, saves: 35, comments: 25 },
  { name: "Sat", likes: 80, shares: 60, saves: 45, comments: 35 },
  { name: "Sun", likes: 123.2, shares: 125.2, saves: 90.6, comments: 115.3 },
];

export const statCards = [
  {
    title: "Total Campaigns",
    value: "65",
    icon: <Megaphone className="h-6 w-6" />,
    description: (
      <span className="textcolor-color-bt dark:textcolor-text-secondary">
        created until today
      </span>
    ),
  },
  {
    title: "Active Campaign",
    value: "20",
    icon: <Megaphone className="h-6 w-6" />,
    description: (
      <span className="textcolor-color-bt dark:textcolor-text-secondary">
        active until today
      </span>
    ),
  },
  {
    title: "Total Views Generated",
    value: "1.3 M",
    icon: <Eye className="h-8 w-8" />,
    description: <span className="textcolor-live-green">+12.5%</span>,
  },
  {
    title: "Total Reach",
    value: "850.4K",
    icon: <Man className="h-10 w-10" />,
    description: (
      <span className="textcolor-live-green">+8.5% unique users</span>
    ),
  },
  {
    title: "Engagement Rate",
    value: "60%",
    icon: <Man className="h-10 w-10" />,
    description: <span className="text-[#F04438]">-0.4%</span>,
  },
  {
    title: "ECPM achieved",
    value: "₹102",
    icon: <Man className="h-10 w-10" />,
    description: <span className="text-amber-400">High CPM</span>,
  },
];

export const videos = [
  {
    id: 1,
    views: "82.4k",
    engagement: "4.2 %",
    img: "https://picsum.photos/seed/vid1/400/500",
  },
  {
    id: 2,
    views: "82.4k",
    engagement: "4.2 %",
    img: "https://picsum.photos/seed/vid2/400/500",
  },
  {
    id: 3,
    views: "82.4k",
    engagement: "4.2 %",
    img: "https://picsum.photos/seed/vid3/400/500",
  },
  {
    id: 4,
    views: "82.4k",
    engagement: "4.2 %",
    img: "https://picsum.photos/seed/vid4/400/500",
  },
  {
    id: 5,
    views: "82.4k",
    engagement: "4.2 %",
    img: "https://picsum.photos/seed/vid5/400/500",
  },
  {
    id: 6,
    views: "82.4k",
    engagement: "4.2 %",
    img: "https://picsum.photos/seed/vid6/400/500",
  },
  {
    id: 7,
    views: "82.4k",
    engagement: "4.2 %",
    img: "https://picsum.photos/seed/vid7/400/500",
  },
];

export const performanceData = Array(4).fill({
  name: "Horizon UI PRO",
  desc: "Instagram • 24 Creators",
  budget: "$12,400",
  cpv: "$0.024",
  ecpm: "$12.10",
  likes: "55k",
  comments: "20k",
  shares: "10k",
});

export const activeCampaignsData = [
  {
    name: "Horizon UI PRO",
    platform: "Instagram",
    deliverable: "Story",
    amount: "₹15,200",
    submissions: 50,
    endDate: "30 Jan, 2026",
    status: "Live",
  },
  {
    name: "Horizon UI PRO",
    platform: "Instagram",
    deliverable: "Reel",
    amount: "₹15,200",
    submissions: 100,
    endDate: "30 Jan, 2026",
    status: "Live",
  },
  {
    name: "Horizon UI PRO",
    platform: "Youtube",
    deliverable: "Video",
    amount: "₹15,200",
    submissions: 50,
    endDate: "30 Jan, 2026",
    status: "Paused",
  },
  {
    name: "Horizon UI PRO",
    platform: "Instagram",
    deliverable: "Post",
    amount: "₹15,200",
    submissions: 50,
    endDate: "30 Jan, 2026",
    status: "Draft",
  },
  {
    name: "Horizon UI PRO",
    platform: "Facebook",
    deliverable: "Post",
    amount: "₹15,200",
    submissions: 50,
    endDate: "30 Jan, 2026",
    status: "Paused",
  },
];
