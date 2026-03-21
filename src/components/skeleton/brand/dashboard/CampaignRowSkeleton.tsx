export default function CampaignRowSkeleton() {
  return (
    <div className="border-t border-[#0000001A] px-1 py-4 dark:border-[#FFFFFF1A]">
      {/* Top: name + status */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="h-3 w-28 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
          <div className="h-4 w-36 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
        </div>

        <div className="flex items-center gap-[10px]">
          {/* platform icon skeleton */}
          <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />

          {/* status badge skeleton */}
          <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
        </div>
      </div>

      {/* Bottom: Amount · Submission · End Date */}
      <div className="mt-3 flex items-start gap-0">
        {/* Amount */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="h-3 w-14 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
        </div>

        {/* Submission */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
        </div>

        {/* End Date */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 text-right">
          <div className="ml-auto h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
          <div className="ml-auto h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}
