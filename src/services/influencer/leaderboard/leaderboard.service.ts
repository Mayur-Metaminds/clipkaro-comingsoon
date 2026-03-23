import { Campaign } from "../dashboard/dashboard.service";
import {
  LeaderboardApiResponse,
  LeaderboardItem,
} from "../../../types/influencer/leaderboard";

interface DummyProductResponse {
  products: Campaign[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchRanks = async (
  page: number,
  limit: number
): Promise<LeaderboardApiResponse> => {
  const skip = (page - 1) * limit;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) throw new Error("Failed to fetch ranks data");

  const json: DummyProductResponse = await res.json();

  const totalPages = Math.ceil(json.total / limit);

  const mappedData: LeaderboardItem[] = json.products.map((item, index) => ({
    rank: skip + index + 1,

    creator: {
      name: item.title,
      username: `@${item.title?.toLowerCase() || "creator"}`,
      avatar: item.thumbnail,
    },

    platform: item.id % 2 === 0 ? "instagram" : "youtube",

    views: Math.floor(Math.random() * 5000000),

    avgEngagement: Number((Math.random() * 10).toFixed(1)),

    earnings: item.price * 1000,
  }));

  return {
    data: mappedData,
    total: json.total,
    page,
    totalPages,
  };
};
