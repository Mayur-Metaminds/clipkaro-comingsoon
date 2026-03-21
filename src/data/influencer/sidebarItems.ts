"use client";

import { SidebarItemType } from "@/types/influencer/sidebar";

// This is for an influencer dashboard.

export const sidebarItems: SidebarItemType = [
  {
    icon: "dashboard", // Used to map icon.
    label: "Dashboard",
    key: "dashboard", // Unique identifier used for active state of sidebar item.
    link: "/influencer",
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "target", // Used to map icon.
    label: "Campaign",
    link: "/influencer/campaign",
    key: "campaign", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "history", // Used to map icon.
    label: "History",
    link: "/influencer/history",
    key: "history", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "wallet", // Used to map icon.
    label: "Earnings",
    link: "/influencer/earnings",
    key: "earnings", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "users", // Used to map icon.
    label: "Referrals",
    link: "/influencer/referral-program",
    key: "referrals", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "user", // Used to map icon.
    label: "Profile",
    link: "/influencer/profile",
    key: "profile", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "trophy", // Used to map icon.
    label: "Leaderboard",
    link: "/influencer/leaderboard",
    key: "leaderboard", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },

  {
    icon: "support", // Used to map icon.
    label: "Support & Help",
    link: "/influencer/help",
    key: "support", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
    iconClassName: "w-[30px] h-[30px]",
  },
];

// This is for a brand dashboard.

export const sidebarItemsBrand: SidebarItemType = [
  {
    icon: "dashboard", // Used to map icon.
    label: "Dashboard",
    key: "dashboard", // Unique identifier used for active state of sidebar item.
    link: "/brand",
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "target", // Used to map icon.
    label: "Campaign",
    link: "/brand/campaign",
    key: "campaign", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "creators", // Used to map icon.
    label: "Creators",
    link: "/brand/creators",
    key: "creators", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "insights", // Used to map icon.
    label: "Insights",
    link: "/brand/insights",
    key: "insights", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "payments", // Used to map icon.
    label: "Payments",
    link: "/brand/payments",
    key: "payments", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
  },
  {
    icon: "settings", // Used to map icon.
    label: "Settings",
    link: "/brand/settings",
    key: "settings", // Unique identifier used for active state of sidebar item.
    iconFill: ({ isActive, theme }) => {
      if (theme === "dark") {
        return isActive ? "#ffffff" : "#9CA3AF";
      }
      return isActive ? "#404565" : "#6B7280";
    },
    iconClassName: "w-7 h-7",
  },
];
