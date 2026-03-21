import {
  sidebarItems,
  sidebarItemsBrand,
} from "@/data/influencer/sidebarItems";

export const sidebarConfig = {
  influencer: {
    title: "Influencer Panel",
    items: sidebarItems,
  },

  brand: {
    title: "Brand Panel",
    items: sidebarItemsBrand,
  },

  agency: {
    title: "Agency Panel",
    items: [
      { icon: "dashboard", label: "Dashboard", link: "/agency" },
      { icon: "users", label: "Creators", link: "/agency/creators" },
      { icon: "target", label: "Campaigns", link: "/agency/campaigns" },
    ],
  },
} as const;
