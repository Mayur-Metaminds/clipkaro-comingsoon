import { Campaign } from "@/types/influencer/campaign";

interface DummyProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  category?: string;
}

interface DummyProductResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface CampaignResponse {
  data: Campaign[];
  nextPage: number | null;
}

export const fetchCampaigns = async (
  page: number,
  limit: number
): Promise<CampaignResponse> => {
  const skip = (page - 1) * limit;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  const json: DummyProductResponse = await res.json();

  const total = json.total;
  const hasMore = skip + limit < total;

  const data: Campaign[] = json.products.map((p) => ({
    id: String(p.id),
    image: p.thumbnail,
    images: [p.thumbnail],
    title: p.title,
    brand: p.category ?? "Brand",
    tags: [p.category ?? "general"],
    platforms: p.id % 2 === 0 ? ["instagram"] : ["youtube"],
    views: `${Math.floor(Math.random() * 500)}K`,
    rs: `₹${p.price * 100}`,
    slug: `/influencer/campaign/${p.id}`,
  }));

  return {
    data,
    nextPage: hasMore ? page + 1 : null,
  };
};

export interface CampaignDetail {
  id: string;
  brandName: string;
  brandLogo: string;
  campaignTitle: string;
  tags: string[];
  status: "Live" | "Ended" | "Upcoming";
  platforms: string[];
  endsOn: string;
  creatorsCount: number;
  creatorAvatars: string[];
  payRate: string;
  payRateUnit: string;
  budgetUsed: number;
  totalBudget: number;
}

export const fetchCampaignBySlug = async (
  slug: string
): Promise<CampaignDetail> => {
  const res = await fetch(`https://dummyjson.com/products/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch campaign");
  }

  const p: DummyProduct = await res.json();

  return {
    id: String(p.id),
    brandName: p.category ?? "Brand",
    brandLogo: p.thumbnail,
    campaignTitle: p.title,
    tags: [p.category ?? "general"],
    status: "Live",
    platforms: ["instagram", "youtube"],
    endsOn: "2 Feb 2026",
    creatorsCount: 123,
    creatorAvatars: [p.thumbnail, p.thumbnail, p.thumbnail],
    payRate: `₹${p.price}`,
    payRateUnit: "per 1k views",
    budgetUsed: 1250,
    totalBudget: 50000,
  };
};
