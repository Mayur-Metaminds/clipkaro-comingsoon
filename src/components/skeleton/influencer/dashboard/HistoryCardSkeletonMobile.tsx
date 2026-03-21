"use client";

import { CardWrapper } from "@/components/influencer/common/CardWrapper";

export default function HistoryCardSkeletonMobile() {
  return (
    <CardWrapper
      variant="gradientBorder"
      innerClassName="p-4 gradient-border-final bgcolor-white-linear bg-[#111C44]"
      className="w-full"
    >
      <div className="animate-pulse">
        {/* Header: Campaign & Status */}
        <div className="mb-3 flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-gray-300 dark:bg-neutral-700" />
            <div className="h-4 w-32 rounded bg-gray-300 dark:bg-neutral-700" />
          </div>

          <div className="h-6 w-16 rounded-full bg-gray-300 dark:bg-neutral-700" />
        </div>

        {/* Link */}
        <div className="mb-3">
          <div className="h-3 w-40 rounded bg-gray-300 dark:bg-neutral-700" />
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-300 dark:bg-neutral-700" />
              <div className="h-3 w-10 rounded bg-gray-300 dark:bg-neutral-700" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-300 dark:bg-neutral-700" />
              <div className="h-3 w-12 rounded bg-gray-300 dark:bg-neutral-700" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-300 dark:bg-neutral-700" />
            <div className="h-3 w-16 rounded bg-gray-300 dark:bg-neutral-700" />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
