export interface Campaign {
  id: string;
  image: string;
  images?: string[];
  title: string;
  brand: string;
  tags: string[];
  platforms: string[]; // instagram | youtube etc
  views: string;
  rs: string;
  viewsCount?: number;
  slug: string;
}
