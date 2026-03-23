import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../../../components/common/StatusBadge";
import { ReferralItem } from "../../../types/influencer/referral";
import { formatValue } from "../../../utils/formatValue";
import { InstagramSvg, YoutubeSvg } from "../../../../public/svg/SVG";

export const referralColumns: ColumnDef<ReferralItem>[] = [
  {
    accessorKey: "campaign",
    header: "Campaign",
  },
  {
    accessorKey: "platform",
    header: "Source",
    // size: 70,
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
    cell: ({ row }) => (
      <span className="typo-body-two-m textcolor-text-inverse dark:textcolor-text-primary">
        {formatValue(row.getValue("views"), "compact")}
      </span>
    ),
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
    cell: ({ row }) => (
      <span className="typo-body-two-m textcolor-text-inverse dark:textcolor-text-primary">
        {formatValue(row.getValue("clicks"), "compact")}
      </span>
    ),
  },
  {
    accessorKey: "engagementRate",
    header: "Engagement rate",
    cell: ({ row }) => (
      <span className="typo-body-two-m textcolor-text-inverse dark:textcolor-text-primary inline-flex w-full items-center justify-center text-center">
        {row.getValue<number>("engagementRate")}%
      </span>
    ),
  },
  {
    accessorKey: "earnings",
    header: "Earnings",
    cell: ({ row }) => (
      <span className="typo-body-two-m textcolor-text-inverse dark:textcolor-text-primary">
        {formatValue(row.getValue("earnings"), "currency")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "submitted",
    header: "Submitted",
  },
];
