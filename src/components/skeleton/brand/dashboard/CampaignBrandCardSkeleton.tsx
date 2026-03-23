import { cn } from "../../../../lib";

export default function CampaignBrandCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "gradient-border-final relative rounded-2xl p-[1px]",
        className
      )}
    >
      <div className="rounded-[8px] p-3">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex w-full justify-between">
          {/* Likes */}
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

            <div className="flex items-center gap-1">
              <div className="h-3.5 w-3.5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* CPV */}
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* ECPV */}
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Comments */}
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-14 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
