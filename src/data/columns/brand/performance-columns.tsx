import { CampaignPerformanceItem } from "@/types/brand/dashboard";
import { ColumnDef } from "@tanstack/react-table";

export const performanceColumns: ColumnDef<CampaignPerformanceItem>[] = [
  {
    accessorKey: "campaignName",
    header: "Campaign Name",
    size: 200,
    meta: {
      headerClassName: "text-left normal-case",
      cellClassName: "text-left",
    },
    cell: ({ row }) => (
      <div>
        <span className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary line-clamp-1">
          {row.original.campaignName}
        </span>
        {(row.original.platform || row.original.creators) && (
          <span className="typo-hint-text textcolor-text-secondary dark:textcolor-text-tertiary line-clamp-1">
            {[
              row.original.platform,
              row.original.creators
                ? `${row.original.creators} Creators`
                : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    size: 120,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary">
        ${row.original.budget.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "cpv",
    header: "CPV (Actual)",
    size: 120,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-live-green">
        ${row.original.cpv.toFixed(3)}
      </span>
    ),
  },
  {
    accessorKey: "ecpv",
    header: "E-CPM (Actual)",
    size: 130,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary">
        ${row.original.ecpv.toFixed(3)}
      </span>
    ),
  },
  {
    accessorKey: "likes",
    header: "Likes",
    size: 100,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary">
        {row.original.likes.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "comments",
    header: "Comments",
    size: 110,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary">
        {row.original.comments.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "shares",
    header: "Shares",
    size: 100,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary">
        {row.original.shares.toLocaleString()}
      </span>
    ),
  },
];
