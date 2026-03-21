import {
  InvoiceApiResponse,
  CreatorApiResponse,
  Creator,
} from "@/types/brand/payment";
import { invoicesData } from "@/data/brand/payment/payment";

export const fetchInvoices = async (
  page: number,
  limit: number,
  search: string = ""
): Promise<InvoiceApiResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...invoicesData];

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.invoiceNumber.toLowerCase().includes(q) ||
        item.submittedDate.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { data, total, page, totalPages };
};

interface DummyUserResponse {
  users: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  }[];
  total: number;
  skip: number;
  limit: number;
}

const deliverables = ["Story", "Reel", "Video", "Post"];
const statuses = ["Paid", "Pending", "Paid", "Pending", "Paid"];

export const fetchCreators = async (
  page: number,
  limit: number,
  search: string = ""
): Promise<CreatorApiResponse> => {
  const skip = (page - 1) * limit;

  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (search.trim()) {
    params.set("q", search.trim());
  }

  const url = search.trim()
    ? `https://dummyjson.com/users/search?${params.toString()}`
    : `https://dummyjson.com/users?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch creators");

  const json: DummyUserResponse = await res.json();

  const totalPages = Math.ceil(json.total / limit);

  const mappedData: Creator[] = json.users.map((user, index) => ({
    id: String(user.id),
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    avatar: user.image,
    submissionId: `SUB${String(user.id).padStart(5, "0")}`,
    platform: user.id % 2 === 0 ? "instagram" : "youtube",
    deliverable: deliverables[index % deliverables.length],
    views: `${Math.floor(Math.random() * 50 + 1)}k`,
    amount: `₹${(Math.floor(Math.random() * 10 + 10) * 1000 + 200).toLocaleString("en-IN")}`,
    submittedDate: "30 Jan,2026",
    status: statuses[index % statuses.length],
    contentLink: "#",
  }));

  return {
    data: mappedData,
    total: json.total,
    page,
    totalPages,
  };
};
