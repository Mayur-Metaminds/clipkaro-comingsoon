import { ColumnDef } from "@tanstack/react-table";
import { HistoryItem } from "@/data/influencer/historyData";
import { StatusBadge } from "@/components/common/StatusBadge";

export const historyColumns: ColumnDef<HistoryItem>[] = [
  { accessorKey: "campaign", header: "Campaign" },
  { accessorKey: "url", header: "Content URL" },
  { accessorKey: "views", header: "Views" },
  { accessorKey: "earnings", header: "Earnings" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  { accessorKey: "date", header: "Submitted" },
];
