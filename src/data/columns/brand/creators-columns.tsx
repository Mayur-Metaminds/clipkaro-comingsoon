import { Creator } from "../../../types/brand/payment";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { InstagramSvg, YoutubeSvg } from "../../../../public/svg/SVG";
import { StatusBadge } from "../../../components/common/StatusBadge";

export const creatorsColumns: ColumnDef<Creator>[] = [
  {
    accessorKey: "name",
    header: "Influencer Name",
    size: 200,
    meta: {
      headerClassName: "text-left",
      cellClassName: "text-left",
      noTruncate: true,
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={row.original.avatar}
          alt={row.original.name}
          className="h-9 w-9 shrink-0 rounded-full border border-[#F0F2F4] object-cover"
        />
        <div className="min-w-0">
          <p className="typo-body-two-m textcolor-text-inverse dark:textcolor-text-primary truncate">
            {row.original.name}
          </p>
          <p className="typo-hint-text textcolor-color-bt dark:textcolor-text-secondary truncate">
            {row.original.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "submissionId",
    header: "Submission ID",
    size: 120,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-color-bt dark:textcolor-text-secondary">
        {row.original.submissionId}
      </span>
    ),
  },
  {
    accessorKey: "platform",
    header: "Platform",
    size: 100,
    meta: {
      headerClassName: "text-center",
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
    size: 110,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-color-bt dark:textcolor-text-secondary">
        {row.original.deliverable}
      </span>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    size: 80,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary">
        {row.original.views}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 100,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary">
        {row.original.amount}
      </span>
    ),
  },
  {
    accessorKey: "submittedDate",
    header: "Submitted Date",
    size: 120,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => (
      <span className="typo-body-three-sb textcolor-color-bt dark:textcolor-text-secondary">
        {row.original.submittedDate}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
      noTruncate: true,
    },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "contentLink",
    header: "Content link",
    size: 100,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
      noTruncate: true,
    },
    cell: ({ row }) => (
      <Link
        href={row.original.contentLink}
        className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary underline"
      >
        View
      </Link>
    ),
  },
];
