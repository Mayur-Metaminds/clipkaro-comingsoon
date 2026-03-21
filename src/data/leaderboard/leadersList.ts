// Mock data for the Leaderboard page
// Keep this file lightweight — used for UI preview and local development

export type LeaderCard = {
  id: string;
  name: string;
  handle?: string;
  avatar?: string;
  views: number;
  changePercent?: number; // positive for growth, negative for decline
  rank: number;
  badge?: "gold" | "silver" | "bronze" | null;
};

export type LeaderRow = {
  rank: number;
  name: string;
  handle?: string;
  avatar?: string;
  platform?: "instagram" | "youtube" | "both" | string;
  views: number;
  avgEngagement?: string;
  earnings?: string;
};

export const topCreators: LeaderCard[] = [
  {
    id: "1",
    name: "Elena Sofia",
    handle: "@elenasofia",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    views: 4800000,
    changePercent: 8.4,
    rank: 1,
    badge: "gold",
  },
  {
    id: "2",
    name: "Marcus Chen",
    handle: "@marcuschen",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    views: 3600000,
    changePercent: 4.2,
    rank: 2,
    badge: "silver",
  },
  {
    id: "3",
    name: "Amara Oak",
    handle: "@amaraoak",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    views: 2850000,
    changePercent: -1.2,
    rank: 3,
    badge: "bronze",
  },
];

export const leadersTable: LeaderRow[] = [
  {
    rank: 1,
    name: "Marcus Chen",
    handle: "@marcuschen",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    platform: "both",
    views: 4821380,
    avgEngagement: "12.3%",
    earnings: "12,450.00",
  },
  {
    rank: 2,
    name: "Elena Sofia",
    handle: "@elenasofia",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    platform: "instagram",
    views: 2105380,
    avgEngagement: "9.8%",
    earnings: "9,000.00",
  },
  {
    rank: 3,
    name: "Amara Oak",
    handle: "@amaraoak",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    platform: "youtube",
    views: 1840012,
    avgEngagement: "7.5%",
    earnings: "15,200.00",
  },
  {
    rank: 4,
    name: "Leo Brooks",
    handle: "@leobrooks",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    platform: "instagram",
    views: 850200,
    avgEngagement: "6.1%",
    earnings: "3,600.00",
  },
  {
    rank: 5,
    name: "Sara Knight",
    handle: "@sarak",
    avatar: "/images/campaigns/avatar-5.jpg",
    platform: "both",
    views: 720000,
    avgEngagement: "5.0%",
    earnings: "2,850.00",
  },
];

const leaderboardData = {
  topCreators,
  leadersTable,
};

export default leaderboardData;

export const creators = [
  {
    rank: 4,
    name: "Marcus Gher",
    username: "@marcus01",
    price: "1,203333",
    platform: "instagram",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    rank: 5,
    name: "Elena Sofia",
    username: "@elenasofia",
    price: "1,203333",
    platform: "youtube",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    rank: 6,
    name: "Amana Dak",
    username: "@amanadak",
    price: "1,203333",
    platform: "youtube",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    rank: 6,
    name: "Amana Dak",
    username: "@amanadak",
    price: "1,203333",
    platform: "youtube",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    rank: 5,
    name: "Elena Sofia",
    username: "@elenasofia",
    price: "1,203333",
    platform: "youtube",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    rank: 6,
    name: "Amana Dak",
    username: "@amanadak",
    price: "1,203333",
    platform: "youtube",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    rank: 6,
    name: "Amana Dak",
    username: "@amanadak",
    price: "1,848,012",
    highlight: true,
    platform: "youtube",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    rank: 5,
    name: "Elena Sofia",
    username: "@elenasofia",
    price: "1,203333",
    platform: "youtube",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    rank: 6,
    name: "Amana Dak",
    username: "@amanadak",
    price: "1,203333",
    platform: "youtube",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
];
