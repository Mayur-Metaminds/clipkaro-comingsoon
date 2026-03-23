import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Download } from "lucide-react";
import { GradientButton } from "../../../components/common/GradientButton";
import { Invoice } from "../../../types/brand/payment";

export const invoicesColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => <span>Invoice {row.original.invoiceNumber}</span>,
  },
  {
    accessorKey: "submittedDate",
    header: "Submitted Date",
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
  },
  {
    accessorKey: "contentLink",
    header: "Content link",
    cell: ({ row }) => (
      <Link
        href={row.original.contentLink}
        className="typo-body-three-sb textcolor-text-inverse dark:textcolor-text-primary underline"
      >
        View
      </Link>
    ),
    meta: {
      noTruncate: true,
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Download",
    cell: ({ row }) => (
      <Link href={row.original.downloadUrl}>
        <GradientButton
          type="button"
          className="typo-cta-text textcolor-text-inverse dark:textcolor-text-primary inline-flex w-auto items-center gap-1.25 rounded-[6px] px-2 py-[7px]"
        >
          <Download size={16} />
          Download
        </GradientButton>
      </Link>
    ),
    meta: {
      noTruncate: true,
      headerClassName: "text-right",
      cellClassName: "text-right",
    },
  },
];
