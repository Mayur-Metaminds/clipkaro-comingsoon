import React from "react";

const shimmer = "animate-pulse bg-gray-300 dark:bg-gray-700";

// ─────────────────────────────────────────────
// Featured card skeleton  (rank 1)
// ─────────────────────────────────────────────
function FeaturedLeaderCardSkeleton() {
  return (
    <div className="relative z-10 flex w-full max-w-[407px] flex-col items-center gap-3 overflow-hidden rounded-[24px] bg-gray-200 px-3 py-6 md:w-[407px] md:gap-0 md:rounded-[20px] md:px-0 md:py-5 md:pb-5 dark:bg-gray-900">
      {/* Rank badge — desktop only */}
      <div className="relative hidden justify-center md:flex">
        <div className={`h-[120px] w-[120px] rounded-full ${shimmer}`} />
      </div>

      {/* Avatar */}
      <div className="relative flex justify-center">
        {/* gradient-border-avatar wrapper */}
        <div className="flex h-[86px] w-[86px] items-center justify-center md:h-[65px] md:w-[65px]">
          <div
            className={`h-[80px] w-[80px] rounded-full md:h-[58px] md:w-[58px] ${shimmer}`}
          />
        </div>
      </div>

      {/* Name + Handle */}
      <div className="flex w-full max-w-full flex-col items-center overflow-hidden md:mt-1">
        {/* Mobile: inline rank badge + name */}
        <div className="relative flex w-full items-center justify-center gap-2 md:hidden">
          <div
            className={`h-[40px] w-[40px] shrink-0 rounded-full ${shimmer}`}
          />
          <div className={`h-6 w-32 rounded ${shimmer}`} />
        </div>

        {/* Desktop: name */}
        <div className="relative hidden items-center gap-1 px-3 md:flex">
          <div className={`h-6 w-36 rounded ${shimmer}`} />
        </div>

        {/* Handle */}
        <div className={`mt-1.5 ml-4 h-4 w-24 rounded md:ml-0 ${shimmer}`} />
      </div>

      {/* Views + Trend */}
      <div className="relative flex w-full items-center justify-center gap-6 md:mt-4 md:gap-12">
        {/* Views count + label */}
        <div className="flex flex-col items-center gap-1.5">
          {/* Mobile */}
          <div className={`h-7 w-16 rounded md:hidden ${shimmer}`} />
          {/* Desktop */}
          <div className={`hidden h-9 w-20 rounded md:block ${shimmer}`} />
          {/* "Total Views" label */}
          <div className={`h-4 w-20 rounded ${shimmer}`} />
        </div>

        {/* Trend percentage */}
        <div className="flex flex-col items-center gap-1.5">
          {/* Mobile */}
          <div className={`flex items-center gap-1 md:hidden`}>
            <div className={`h-4 w-4 rounded-full ${shimmer}`} />
            <div className={`h-5 w-12 rounded ${shimmer}`} />
          </div>
          {/* Desktop */}
          <div className={`hidden items-center gap-1 md:flex`}>
            <div className={`h-7 w-7 rounded-full ${shimmer}`} />
            <div className={`h-7 w-16 rounded ${shimmer}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Side card skeleton  (rank 2 & 3)
// ─────────────────────────────────────────────
function SideLeaderCardSkeleton() {
  return (
    <div className="relative flex w-full flex-col items-center gap-0 overflow-hidden rounded-[24px] bg-gray-200 px-2 py-8 md:w-[313px] md:rounded-[20px] md:px-0 md:py-5 md:pb-4 dark:bg-gray-900">
      {/* Rank badge — desktop only */}
      <div className="relative hidden justify-center md:flex">
        <div className={`h-[80px] w-[80px] rounded-full ${shimmer}`} />
      </div>

      {/* Avatar */}
      <div className="relative flex justify-center">
        <div className="flex h-[50px] w-[50px] items-center justify-center md:h-[46px] md:w-[46px]">
          <div
            className={`h-[44px] w-[44px] rounded-full md:h-[40px] md:w-[40px] ${shimmer}`}
          />
        </div>
      </div>

      {/* Name + Handle */}
      <div className="mt-2 flex w-full max-w-full flex-col items-center overflow-hidden md:mt-1.5 md:gap-0.5">
        {/* Mobile: inline rank badge + name */}
        <div className="relative flex w-full items-center justify-center gap-1.5 md:hidden">
          <div className={`h-8 w-8 shrink-0 rounded-full ${shimmer}`} />
          <div className={`h-5 w-28 rounded ${shimmer}`} />
        </div>

        {/* Desktop: name */}
        <div className="relative hidden items-center gap-1 px-3 md:flex">
          <div className={`h-5 w-28 rounded ${shimmer}`} />
        </div>

        {/* Handle */}
        <div className={`mt-1 ml-2 h-3.5 w-20 rounded md:ml-0 ${shimmer}`} />
      </div>

      {/* Views + Trend */}
      <div className="relative mt-3 flex w-full items-center justify-center gap-6 md:mt-4 md:gap-12">
        {/* Views count + label */}
        <div className="flex flex-col items-center gap-1.5">
          {/* Mobile */}
          <div className={`h-5 w-12 rounded md:hidden ${shimmer}`} />
          {/* Desktop */}
          <div className={`hidden h-7 w-16 rounded md:block ${shimmer}`} />
          {/* "Total Views" label */}
          <div className={`h-3.5 w-16 rounded ${shimmer}`} />
        </div>

        {/* Trend percentage */}
        <div className="flex flex-col items-center gap-1.5">
          {/* Mobile */}
          <div className="flex items-center gap-0.5 md:hidden">
            <div className={`h-4 w-4 rounded-full ${shimmer}`} />
            <div className={`h-4 w-10 rounded ${shimmer}`} />
          </div>
          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            <div className={`h-5 w-5 rounded-full ${shimmer}`} />
            <div className={`h-5 w-12 rounded ${shimmer}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main export — mirrors Leaders.tsx structure
// ─────────────────────────────────────────────
export default function LeadersCardSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-[25px]">
      {/* Rank 1 — featured, center on desktop (order-2) */}
      <div className="flex w-full justify-center md:order-2 md:w-auto">
        <FeaturedLeaderCardSkeleton />
      </div>

      {/* Rank 2 & 3 — 2-col grid on mobile, flanking on desktop */}
      <div className="grid w-full max-w-[407px] grid-cols-2 gap-4 md:contents">
        {/* Rank 2 — left on desktop (order-1) */}
        <div className="flex justify-center md:order-1">
          <SideLeaderCardSkeleton />
        </div>
        {/* Rank 3 — right on desktop (order-3) */}
        <div className="flex justify-center md:order-3">
          <SideLeaderCardSkeleton />
        </div>
      </div>
    </div>
  );
}
