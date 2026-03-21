export interface FAQData {
  question: string;
  answer: string;
}

export interface VideoTutorialData {
  title: string;
  views: string;
  timeAgo: string;
  duration: string;
  imageUrl: string;
}

export interface TicketData {
  title: string;
  id: string;
  timeInfo: string;
  status: "Pending" | "In Progress" | "Closed";
  isLast?: boolean;
}

export const faqs: FAQData[] = [
  {
    question: "How do I verify influencer authenticity?",
    answer:
      "Our platform uses advanced AI to analyze engagement patterns, follower growth, and audience demographics. We provide a 'Trust Score' for every influencer based on historic data and real-time audits.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support all major credit cards, PayPal, and bank transfers for enterprise clients.",
  },
  {
    question: "Can I export campaign reports?",
    answer:
      "Yes, you can export detailed reports in PDF and CSV formats from your campaign dashboard.",
  },
  {
    question: "How long does content approval take?",
    answer:
      "Content approval typically takes 24-48 hours depending on the brand's specific review process.",
  },
  {
    question: "How long does content approval take?",
    answer:
      "Content approval typically takes 24-48 hours depending on the brand's specific review process.",
  },
  {
    question: "How long does content approval take?",
    answer:
      "Content approval typically takes 24-48 hours depending on the brand's specific review process.",
  },
];

export const videoTutorials: VideoTutorialData[] = [
  {
    title: "Setting up your first brand campaign",
    views: "12,403 views",
    timeAgo: "2 weeks ago",
    duration: "4:32",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Setting up your first brand campaign",
    views: "12,403 views",
    timeAgo: "2 weeks ago",
    duration: "4:32",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Setting up your first brand campaign",
    views: "12,403 views",
    timeAgo: "2 weeks ago",
    duration: "4:32",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Setting up your first brand campaign",
    views: "12,403 views",
    timeAgo: "2 weeks ago",
    duration: "4:32",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Setting up your first brand campaign",
    views: "12,403 views",
    timeAgo: "2 weeks ago",
    duration: "4:32",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Setting up your first brand campaign",
    views: "12,403 views",
    timeAgo: "2 weeks ago",
    duration: "4:32",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Setting up your first brand campaign",
    views: "12,403 views",
    timeAgo: "2 weeks ago",
    duration: "4:32",
    imageUrl:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
  },
];

export const recentTickets: TicketData[] = [
  {
    title: "Billing issue with Campaign #402",
    id: "#TK-8823",
    timeInfo: "Last updated: 2h ago",
    status: "Pending",
  },
  {
    title: "Influencer profile data sync error",
    id: "#TK-8790",
    timeInfo: "Last updated: 5h ago",
    status: "In Progress",
  },
  {
    title: "API access token renewal",
    id: "#TK-8712",
    timeInfo: "Resolved: 2 days ago",
    status: "Closed",
    isLast: true,
  },
];
