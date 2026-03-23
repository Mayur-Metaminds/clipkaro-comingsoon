import { HistoryItem } from "../../../data/influencer/historyData";
import { apiClient } from "../../../lib/api";
import { InfluencerStats } from "../../../types/influencer/dashboard";

export interface Campaign {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

interface DummyProductResponse {
  products: Campaign[];
  total: number;
  skip: number;
  limit: number;
}

export interface HistoryApiResponse {
  data: HistoryItem[];
  total: number;
  page: number;
  totalPages: number;
}

export async function fetchInfluencerStats(): Promise<InfluencerStats | null> {
  const { data } = await apiClient.get("/influencer/stats");
  return data ?? null;
}

export const fetchHistory = async (
  page: number,
  limit: number
): Promise<HistoryApiResponse> => {
  const skip = (page - 1) * limit;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) throw new Error("Failed to fetch history");

  const json: DummyProductResponse = await res.json();

  const totalPages = Math.ceil(json.total / limit);

  const mappedData: HistoryItem[] = json.products.map((item) => ({
    id: String(item.id),
    campaign: item.title,
    contentUrl: item.thumbnail,
    views: Math.floor(Math.random() * 50000),
    earnings: `₹${item.price * 10}`,
    status:
      item.id % 3 === 0
        ? "Approved"
        : item.id % 2 === 0
          ? "Pending"
          : "Rejected",
    submitted: "30 Jan",
  }));

  return {
    data: mappedData,
    total: json.total,
    page,
    totalPages,
  };
};
