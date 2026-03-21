import { BrandCampaign, BrandCampaignStatus } from "@/types/brand/dashboard";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { InstagramSvg, YoutubeSvg } from "../../../../public/svg/SVG";

const statusConfig: Record<
  BrandCampaignStatus,
  { label: string; wrapper: string }
> = {
  paused: {
    label: "Paused",
    wrapper:
      "text-[#F2CC5F] bg-[#F2CC5F1A] px-2 border rounded-full py-0.5 border-[#F2CC5F03]",
  },
  live: {
    label: "Live",
    wrapper:
      "rounded-full bg-[#34A8531A] border border-[#34A85303] px-2 py-0.5 text-[#34A853]",
  },
  draft: {
    label: "Draft",
    wrapper:
      "rounded-full bg-[#A7AEC175] border border-[#A7AEC103] px-2 py-0.5 textcolor-color-bt dark:textcolor-text-secondary",
  },
};

function StatusBadge({ status }: { status: BrandCampaignStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={cn("typo-body-three-sb inline-flex items-center", cfg.wrapper)}
    >
      {cfg.label}
    </span>
  );
}

export const activeCampaignsColumns: ColumnDef<BrandCampaign>[] = [
  {
    accessorKey: "name",
    header: "Campaign Name",
    size: 200,
    meta: {
      headerClassName: "text-left normal-case",
      cellClassName: "text-left",
    },
    cell: ({ row }) => (
      <span className="typo-body-two-m textcolor-text-inverse dark:textcolor-text-primary line-clamp-1">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "platform",
    header: "Platform",
    size: 100,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.platform === "instagram" ? (
          <InstagramSvg className="h-5 w-5" />
        ) : (
          <YoutubeSvg className="h-5 w-5" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "deliverable",
    header: "Deliverable",
    size: 120,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-color-bt dark:textcolor-text-secondary">
        {row.original.deliverable ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 120,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-color-bt dark:textcolor-text-secondary">
        ₹{row.original.amount.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "submission",
    header: "Submissions",
    size: 110,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-color-bt dark:textcolor-text-secondary">
        {row.original.submission}
      </span>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    size: 120,
    meta: {
      headerClassName: "text-center normal-case",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-color-bt dark:textcolor-text-secondary">
        {row.original.endDate}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    meta: {
      headerClassName: "text-right normal-case",
      cellClassName: "text-right",
    },
    cell: ({ row }) => (
      <div className="flex justify-end">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
];
