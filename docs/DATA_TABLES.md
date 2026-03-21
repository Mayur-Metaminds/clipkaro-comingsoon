# Data Tables (TanStack Table v8)

This project uses **@tanstack/react-table v8** with **@tanstack/react-query v5** for all tabular data across influencer pages (Dashboard, Earnings, Leaderboard, Referral).

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [File Structure](#file-structure)
- [Step-by-Step: Add a New Table](#step-by-step-add-a-new-table)
- [Column Definitions](#column-definitions)
- [DataTable Props Reference](#datatable-props-reference)
- [Hooks (React Query)](#hooks-react-query)
- [API Service Layer](#api-service-layer)
- [Features](#features)
- [Existing Tables](#existing-tables)
- [Patterns & Conventions](#patterns--conventions)
- [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
Page Component
  └── Desktop/Mobile wrapper (responsive split)
        └── <DataTable>           (src/components/data-table/DataTable.tsx)
              ├── DataTableHeader  (search + dropdown/filter actions)
              ├── <table>          (TanStack useReactTable)
              └── DataTableFooter  (server-side pagination)

Data flow:
  Service (fetch) → React Query hook → Page state → DataTable props
  Column defs    → DataTable columns prop
  Types          → Column generics + service return types
```

### Key Decisions

| Concern    | Approach                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| Pagination | **Server-side** — page state lives in the parent component, passed down via `desktopPage` / `setDesktopPage` |
| Filtering  | **Client-side** — global search via `includesString`, column filters via multi-value checkboxes              |
| Mobile     | Separate card-based component with **infinite scroll** (useInfiniteQuery)                                    |
| Skeleton   | `<DataTableSkeleton />` shown via `isLoading` prop                                                           |

---

## File Structure

```
src/
├── components/
│   └── data-table/
│       ├── DataTable.tsx          # Core table component
│       ├── DataTableHeader.tsx    # Search + header actions
│       ├── DataTableFooter.tsx    # Pagination controls
│       └── DataTableFilter.tsx    # Multi-checkbox column filter dropdown
│
├── data/
│   └── columns/
│       └── influencer/
│           ├── history-columns.tsx
│           ├── referral-columns.tsx
│           └── leaderboard-columns.tsx
│
├── hooks/
│   └── influencer/
│       ├── dashboard/
│       │   ├── useHistory.ts          # useQuery (paginated)
│       │   └── useInfiniteHistory.ts  # useInfiniteQuery (mobile)
│       ├── leaderboard/
│       │   ├── useRanks.ts
│       │   └── useInfiniteRanks.ts
│       └── referral/
│           ├── useReferrals.ts
│           └── useInfiniteReferrals.ts
│
├── services/
│   └── influencer/
│       ├── dashboard/dashboard.service.ts
│       ├── leaderboard/leaderboard.service.ts
│       └── referral/referral.service.ts
│
└── types/
    └── influencer/
        ├── dashboard.ts
        ├── leaderboard.ts
        └── referral.ts
```

---

## Step-by-Step: Add a New Table

Follow this checklist every time you add a new table. Example: **Campaign** table.

### 1. Define the Type

```ts
// src/types/influencer/campaign.ts

export interface CampaignItem {
  id: string;
  name: string;
  platform: "instagram" | "youtube";
  budget: number;
  status: "Active" | "Paused" | "Completed";
  startDate: string;
}

export interface CampaignApiResponse {
  data: CampaignItem[];
  total: number;
  page: number;
  totalPages: number;
}
```

> **Convention**: Every API response type MUST have `{ data, total, page, totalPages }` for pagination to work with DataTableFooter.

### 2. Create the Service

```ts
// src/services/influencer/campaign/campaign.service.ts

import { CampaignApiResponse } from "@/types/influencer/campaign";

export async function fetchCampaigns(
  page: number,
  limit: number
): Promise<CampaignApiResponse> {
  const res = await fetch(`/api/campaigns?page=${page}&limit=${limit}`, {
    cache: "no-store",
  });
  return res.json();
}
```

### 3. Create the Hook

```ts
// src/hooks/influencer/campaign/useCampaigns.ts

import { fetchCampaigns } from "@/services/influencer/campaign/campaign.service";
import { CampaignApiResponse } from "@/types/influencer/campaign";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCampaigns = (
  page: number,
  limit: number,
  enabled: boolean = true
) => {
  return useQuery<CampaignApiResponse>({
    queryKey: ["campaigns", page, limit],
    queryFn: () => fetchCampaigns(page, limit),
    placeholderData: keepPreviousData,
    enabled,
  });
};
```

> **Why `keepPreviousData`?** Prevents the table from flickering blank while fetching the next page.

For **mobile infinite scroll**, add:

```ts
// src/hooks/influencer/campaign/useInfiniteCampaigns.ts

import { fetchCampaigns } from "@/services/influencer/campaign/campaign.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteCampaigns = (
  pageSize: number,
  enabled: boolean = true
) => {
  return useInfiniteQuery({
    queryKey: ["infinite-campaigns", pageSize],
    queryFn: ({ pageParam = 1 }) => fetchCampaigns(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
```

### 4. Define Columns

```tsx
// src/data/columns/influencer/campaign-columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { CampaignItem } from "@/types/influencer/campaign";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatValue } from "@/utils/formatValue";

export const campaignColumns: ColumnDef<CampaignItem>[] = [
  {
    accessorKey: "name",
    header: "Campaign",
  },
  {
    accessorKey: "platform",
    header: "Platform",
    size: 100,
    meta: {
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    cell: ({ row }) => <span>{row.original.platform}</span>,
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <span>{formatValue(row.getValue("budget"), "currency")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
];
```

### 5. Register the Response Type (IMPORTANT)

Add your new response type to the union in **two** files:

**DataTable.tsx** — the `desktopData` prop:

```ts
// src/components/data-table/DataTable.tsx (line ~43)
desktopData?: HistoryApiResponse | LeaderboardApiResponse | ReferralResponse | CampaignApiResponse;
```

**DataTableFooter.tsx** — the `desktopData` prop:

```ts
// src/components/data-table/DataTableFooter.tsx (line ~16)
desktopData?: HistoryApiResponse | LeaderboardApiResponse | ReferralResponse | CampaignApiResponse;
```

> **Why?** The footer reads `desktopData.totalPages` for pagination. Without your type in the union, TypeScript will error.

### 6. Create the Page Component

```tsx
// src/components/influencer/campaign/CampaignTableDesktop.tsx

import { DataTable } from "@/components/data-table/DataTable";
import { campaignColumns } from "@/data/columns/influencer/campaign-columns";
import { CampaignApiResponse } from "@/types/influencer/campaign";

export default function CampaignTableDesktop({
  desktopData,
  desktopPage,
  isLoading,
  setDesktopPage,
}: {
  desktopData?: CampaignApiResponse;
  desktopPage: number;
  isLoading: boolean;
  setDesktopPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="hidden md:block">
      <DataTable
        columns={campaignColumns}
        data={desktopData?.data ?? []}
        desktopPage={desktopPage}
        setDesktopPage={setDesktopPage}
        desktopData={desktopData}
        tableHeaderCellClassName="text-left"
        isLoading={isLoading}
      />
    </div>
  );
}
```

### 7. Wire it Up in the Page

```tsx
// src/app/influencer/campaign/page.tsx

"use client";

import { useState } from "react";
import { useCampaigns } from "@/hooks/influencer/campaign/useCampaigns";
import CampaignTableDesktop from "@/components/influencer/campaign/CampaignTableDesktop";

export default function CampaignPage() {
  const [desktopPage, setDesktopPage] = useState(1);
  const { data, isLoading } = useCampaigns(desktopPage, 10);

  return (
    <CampaignTableDesktop
      desktopData={data}
      desktopPage={desktopPage}
      isLoading={isLoading}
      setDesktopPage={setDesktopPage}
    />
  );
}
```

---

## Column Definitions

### Basic Column

```tsx
{ accessorKey: "fieldName", header: "Display Name" }
```

### Custom Cell Renderer

```tsx
{
  accessorKey: "earnings",
  header: "Earnings",
  cell: ({ row }) => (
    <span>{formatValue(row.getValue("earnings"), "currency")}</span>
  ),
}
```

### Column Sizing

```tsx
{
  accessorKey: "rank",
  header: "Rank",
  size: 70,  // fixed width in px
}
```

### Column Meta (Styling & Truncation)

The project extends TanStack's `ColumnMeta` with custom fields:

```tsx
{
  accessorKey: "platform",
  header: "Platform",
  meta: {
    headerClassName: "text-center",  // class for <th>
    cellClassName: "text-center",    // class for <td>
    noTruncate: true,                // disable cell truncation (default: truncated)
  },
}
```

### Status Column (with StatusBadge)

```tsx
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
}
```

### Platform Icon Column

```tsx
import { InstagramSvg, YoutubeSvg } from "../../../../public/svg/SVG";

{
  accessorKey: "platform",
  header: "Source",
  meta: { headerClassName: "text-center", cellClassName: "text-center" },
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
}
```

### Actions Column

```tsx
import { MoreHorizontal } from "lucide-react";

{
  id: "actions",       // use `id` instead of `accessorKey` for non-data columns
  header: "Actions",
  size: 70,
  cell: () => (
    <button className="p-2">
      <MoreHorizontal size={18} />
    </button>
  ),
}
```

---

## DataTable Props Reference

| Prop                       | Type                                                               | Default              | Description                                   |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | --------------------------------------------- |
| `columns`                  | `ColumnDef<TData, TValue>[]`                                       | **required**         | TanStack column definitions                   |
| `data`                     | `TData[]`                                                          | **required**         | Row data array                                |
| `isLoading`                | `boolean`                                                          | **required**         | Shows skeleton loader when `true`             |
| `searchPlaceholder`        | `string`                                                           | `"Search"`           | Placeholder for the global search input       |
| `leftSideTitle`            | `string`                                                           | `"History"`          | Title shown top-left of the table             |
| `tableContentTopGradient`  | `string`                                                           | Purple-pink gradient | CSS gradient for the header border            |
| `desktopData`              | `HistoryApiResponse \| LeaderboardApiResponse \| ReferralResponse` | —                    | Full API response (needed for pagination)     |
| `desktopPage`              | `number`                                                           | —                    | Current page number                           |
| `setDesktopPage`           | `Dispatch<SetStateAction<number>>`                                 | —                    | Page setter function                          |
| `haveToShowFooter`         | `boolean`                                                          | `true`               | Show/hide pagination footer                   |
| `showDropdownMenu`         | `boolean`                                                          | `true`               | Show/hide default 3-dot dropdown              |
| `tableHeaderCellClassName` | `string`                                                           | —                    | Extra classes for all `<th>` cells            |
| `tableRowClassName`        | `string`                                                           | —                    | Extra classes for all `<tr>` rows             |
| `tableBodyCellClassName`   | `string`                                                           | —                    | Extra classes for all `<td>` cells            |
| `truncateCells`            | `boolean`                                                          | `true`               | Enable text truncation on cells               |
| `headerActions`            | `ReactNode`                                                        | —                    | Custom element replacing the default dropdown |
| `filterOptions`            | `ColumnFilter[]`                                                   | —                    | Multi-checkbox filter dropdown config         |
| `enableRowSelection`       | `boolean`                                                          | `false`              | Enable checkbox row selection                 |
| `onRowSelectionChange`     | `(selectedRows: TData[]) => void`                                  | —                    | Callback when selection changes               |

---

## Hooks (React Query)

### Pattern: Paginated Query (Desktop)

```ts
const { data, isLoading, isFetching } = useHistory(page, limit, enabled);
```

- `queryKey`: `["history", page, limit]` — auto-refetches on page change
- `placeholderData: keepPreviousData` — prevents flicker between pages
- `enabled` — conditionally fetch (e.g., only when desktop breakpoint is active)

### Pattern: Infinite Query (Mobile)

```ts
const {
  data, // { pages: ApiResponse[] }
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  status,
} = useInfiniteHistory(pageSize, enabled);

// Flatten pages into a single array:
const items = data?.pages?.flatMap((page) => page.data) ?? [];
```

- `getNextPageParam`: returns `page + 1` or `undefined` to stop

### Naming Convention

| Hook                    | File                       | Purpose                      |
| ----------------------- | -------------------------- | ---------------------------- |
| `use{Resource}`         | `use{Resource}.ts`         | Paginated desktop query      |
| `useInfinite{Resource}` | `useInfinite{Resource}.ts` | Infinite scroll mobile query |

---

## API Service Layer

### Standard Response Shape

Every table API must return:

```ts
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
```

### Service Function Pattern

```ts
export async function fetchResource(
  page: number,
  limit: number
): Promise<ResourceApiResponse> {
  const res = await fetch(`/api/resource?page=${page}&limit=${limit}`);
  return res.json();
}
```

### Service Location

```
src/services/influencer/{domain}/{domain}.service.ts
```

---

## Features

### Global Search

Enabled by default. Uses TanStack's `includesString` filter function. The search input is rendered in `DataTableHeader`.

### Column Filters (Multi-Checkbox)

Pass `filterOptions` to enable filter dropdowns:

```tsx
<DataTable
  filterOptions={[
    {
      columnId: "status",
      label: "Status",
      options: [
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
        { label: "Pending", value: "pending" },
      ],
    },
  ]}
/>
```

The filter uses a custom `multiValue` filter function — it matches if the cell value equals ANY of the selected values (case-insensitive).

### Row Selection

```tsx
<DataTable
  enableRowSelection={true}
  onRowSelectionChange={(selectedRows) => {
    console.log("Selected:", selectedRows);
  }}
/>
```

A checkbox column is automatically prepended when enabled.

### Custom Header Actions

Replace the default dropdown with any ReactNode:

```tsx
<DataTable headerActions={<MyCustomFilterButton />} />
```

### Responsive Design

- **Desktop** (`md:` and up): `<DataTable>` with pagination, wrapped in `hidden md:block`
- **Mobile** (below `md`): Custom card-based layout with infinite scroll, wrapped in `md:hidden`
- Use `useBreakpoint()` hook to conditionally enable the correct React Query hook

---

## Existing Tables

| Page              | Desktop Component       | Mobile Component        | Columns              | Hook                                    |
| ----------------- | ----------------------- | ----------------------- | -------------------- | --------------------------------------- |
| Dashboard History | `HistoryTableDesktop`   | `HistoryMobile`         | `historyColumns`     | `useHistory` / `useInfiniteHistory`     |
| Earnings          | `EarningDesktopTable`   | _(shared with history)_ | `historyColumns`     | `useHistory`                            |
| Leaderboard       | `AnalyticsTableDesktop` | _(card layout)_         | `leaderboardColumns` | `useRanks` / `useInfiniteRanks`         |
| Referral          | `ReferralTableDesktop`  | _(card layout)_         | `referralColumns`    | `useReferrals` / `useInfiniteReferrals` |

---

## Patterns & Conventions

### Do's

- **Always** use `accessorKey` matching the exact property name from the type
- **Always** add `isLoading` prop — the skeleton is handled internally
- **Always** use `keepPreviousData` in paginated hooks
- **Always** add your response type to the union in `DataTable.tsx` and `DataTableFooter.tsx`
- Use `formatValue()` utility for numbers/currency instead of raw formatting
- Use `StatusBadge` component for status columns
- Use `meta.noTruncate` on columns where content must not be cut off (e.g., action buttons, avatars)

### Don'ts

- **Don't** use client-side pagination (`getPaginationRowModel`) — all tables use server-side
- **Don't** duplicate the DataTable component for different tables — customize via props
- **Don't** mix paginated and infinite hooks for the same breakpoint
- **Don't** forget `enabled` parameter in hooks — use `useBreakpoint()` to avoid wasted API calls

### File Naming

```
Column defs:    src/data/columns/influencer/{name}-columns.tsx
Types:          src/types/influencer/{name}.ts
Services:       src/services/influencer/{name}/{name}.service.ts
Hooks:          src/hooks/influencer/{name}/use{Name}.ts
Desktop table:  src/components/influencer/{name}/{Name}TableDesktop.tsx
Mobile view:    src/components/influencer/{name}/{Name}Mobile.tsx
```

---

## Troubleshooting

| Problem                                | Solution                                                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| TypeScript error on `desktopData` prop | Add your response type to the union in `DataTable.tsx` and `DataTableFooter.tsx`                                |
| Pagination not showing                 | Ensure your API response has `totalPages > 0` and you're passing `desktopData`, `desktopPage`, `setDesktopPage` |
| Table flickers on page change          | Use `keepPreviousData` in your `useQuery` hook                                                                  |
| Column content gets cut off            | Add `meta: { noTruncate: true }` to that column definition                                                      |
| Filters not working                    | Ensure `accessorKey` in column matches `columnId` in `filterOptions` and values are lowercase                   |
| Search not matching                    | The global filter uses `includesString` — ensure data contains the search text as a substring                   |
| Skeleton not showing                   | Pass `isLoading={true}` from your hook's loading state                                                          |
| Mobile data not loading                | Check that `useBreakpoint()` returns `true` and the infinite hook's `enabled` param is set                      |
