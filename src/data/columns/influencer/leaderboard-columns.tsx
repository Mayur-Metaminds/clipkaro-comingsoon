import { LeaderboardItem } from "@/types/influencer/leaderboard";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { InstagramSvg, YoutubeSvg } from "../../../../public/svg/SVG";

export const leaderboardColumns: ColumnDef<LeaderboardItem>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    size: 70,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
      // noTruncate: true,  // this column won't truncate by default truncate is on on the table by default. Using this way can disable truncate for specific columns.
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-color-bt dark:textcolor-text-secondary">
        {row.original.rank}
      </span>
    ),
  },

  {
    accessorKey: "creator",
    header: "Creator",
    size: 180,
    meta: {
      headerClassName: "text-left",
      cellClassName: "text-left",
    },
    cell: ({ row }) => {
      const creator = row.original.creator;

      return (
        <div className="flex items-center gap-3">
          <img
            src={creator?.avatar}
            alt="Creator Avatar"
            className="h-9 w-9 shrink-0 rounded-full border border-[#F0F2F4] object-cover"
          />

          <div className="min-w-0">
            <p className="typo-body-two-m textcolor-text-inverse dark:textcolor-text-primary truncate">
              {creator?.name}
            </p>
            <p className="typo-hint-text textcolor-color-bt dark:textcolor-text-secondary truncate">
              {creator?.username}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "platform",
    header: "Platform",
    size: 100,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => {
      const platform = row.original.platform;

      return platform === "instagram" ? (
        <div className="inline-flex w-full items-center justify-center">
          <InstagramSvg />
        </div>
      ) : (
        <div className="inline-flex w-full items-center justify-center">
          <YoutubeSvg />
        </div>
      );
    },
  },

  {
    accessorKey: "views",
    header: "Views",
    size: 100,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-two-m textcolor-text-inverse dark:textcolor-text-primary">
        {row.original.views.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "avgEngagement",
    header: "Avg Engagement",
    size: 160,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => {
      const value = row.original.avgEngagement;

      const bgColor =
        value >= 7
          ? "bg-[#7B5CFF]"
          : value >= 5
            ? "bg-[#EAB308]"
            : value >= 4
              ? "bg-[#DC2626]"
              : "bg-red-500";

      const textColor =
        value >= 7
          ? "text-[#7B5CFF]"
          : value >= 5
            ? "text-[#EAB308]"
            : value >= 4
              ? "text-[#DC2626]"
              : "text-red-500";

      return (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-0.5">
            <div className="h-[5px] w-20 rounded bg-[#F0F2F40D] lg:w-[85px]">
              <div
                className={`h-full rounded ${bgColor}`}
                style={{ width: `${value * 10}%` }}
              />
            </div>

            <span className={`self-start ${textColor}`}>{value}%</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "earnings",
    header: "Earnings",
    size: 110,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-two-m textcolor-text-inverse dark:textcolor-text-primary">
        ₹{row.original.earnings.toLocaleString()}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    size: 70,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: () => (
      <button className="p-2">
        <MoreHorizontal size={18} />
      </button>
    ),
  },
];
