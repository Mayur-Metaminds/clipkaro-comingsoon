"use client";

export default function DataTableSkeleton({
  rows = 10,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="gradient-border-final flex animate-pulse flex-col gap-3.5 rounded-[20px] md:px-4 md:pt-3 md:pb-4.5 lg:px-6 xl:px-7.5 xl:pt-[19px] xl:pb-7">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <div className="h-6 w-32 rounded bg-[#E3DEE5] dark:bg-[#2A2A3F]" />

        <div className="flex items-center gap-4.5">
          <div className="h-[44px] w-[255px] rounded-[12px] bg-[#E3DEE5] dark:bg-[#2A2A3F]" />
          <div className="h-[36px] w-[36px] rounded-lg bg-[#E3DEE5] dark:bg-[#2A2A3F]" />
        </div>
      </div>

      {/* Table */}
      <div>
        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          {/* Header row */}
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="p-3 pl-0">
                  <div className="h-4 w-20 rounded bg-[#E3DEE5] dark:bg-[#2A2A3F]" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {Array.from({ length: rows }).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: columns }).map((_, col) => (
                  <td key={col} className="p-3 pl-0">
                    <div className="h-4 w-full max-w-[140px] rounded bg-[#E3DEE5] dark:bg-[#2A2A3F]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex w-full items-center justify-between px-5 py-3.25">
        <div className="h-4 w-48 rounded bg-[#E3DEE5] dark:bg-[#2A2A3F]" />

        <div className="flex items-center gap-1.5">
          <div className="h-8 w-20 rounded bg-[#E3DEE5] dark:bg-[#2A2A3F]" />

          <div className="flex gap-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded bg-[#E3DEE5] dark:bg-[#2A2A3F]"
              />
            ))}
          </div>

          <div className="h-8 w-20 rounded bg-[#E3DEE5] dark:bg-[#2A2A3F]" />
        </div>
      </div>
    </div>
  );
}
