import { cn } from "../../../../lib";

export function CreatorRowSkeleton({ isLast }: { isLast?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-[#FFFFFF0D] p-4",
        isLast && "pb-6"
      )}
    >
      {/* Rank */}
      <div className="h-4 w-4 animate-pulse rounded bg-black/10 dark:bg-white/10" />

      {/* Avatar */}
      <div className="h-11 w-11 flex-shrink-0 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />

      <div className="flex w-full justify-between">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-[120px] animate-pulse rounded bg-black/10 dark:bg-white/10" />
          <div className="h-3 w-[90px] animate-pulse rounded bg-black/10 dark:bg-white/10" />
        </div>

        <div className="flex flex-col gap-1">
          {/* Price */}
          <div className="h-4 w-[70px] animate-pulse self-end rounded bg-black/10 dark:bg-white/10" />

          {/* Platform */}
          <div className="ml-3 flex h-8 w-8 items-center justify-center self-end">
            <div className="h-5 w-5 animate-pulse rounded bg-black/10 dark:bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
