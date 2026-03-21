"use client";

const shimmer = "bg-[#E3DEE5] dark:bg-[#2A2A3F]";

export default function CampaignDetailSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 lg:gap-5">
      {/* CampaignInfo + PayRateCard row */}
      <div className="flex flex-col gap-4 xl:flex-row xl:gap-5">
        {/* CampaignInfo Skeleton */}
        <div className="flex-1 rounded-xl bg-[#FBF6FE] p-5 lg:rounded-[20px] lg:p-6 dark:bg-[#1C2230]">
          {/* Top Row: Brand + Share */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full lg:h-12 lg:w-12 ${shimmer}`}
              />
              <div className={`h-4 w-20 rounded ${shimmer}`} />
              <div className={`h-3 w-16 rounded ${shimmer}`} />
            </div>
            <div
              className={`hidden h-10 w-24 rounded-lg lg:block ${shimmer}`}
            />
          </div>

          {/* Campaign Title */}
          <div className={`mt-4 h-8 w-3/4 rounded lg:mt-3.5 ${shimmer}`} />

          {/* Tags + Status */}
          <div className="mt-2.5 flex items-center gap-3">
            <div className={`h-8 w-24 rounded-full ${shimmer}`} />
            <div className={`h-8 w-20 rounded-full ${shimmer}`} />
          </div>

          {/* Platform, Ends on, Creators */}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-20">
            <div className="flex items-start gap-10 lg:gap-20">
              {/* Platform */}
              <div className="flex flex-col gap-2">
                <div className={`h-4 w-16 rounded ${shimmer}`} />
                <div className="flex gap-3">
                  <div className={`h-5 w-5 rounded lg:h-6 lg:w-6 ${shimmer}`} />
                  <div className={`h-5 w-5 rounded lg:h-6 lg:w-6 ${shimmer}`} />
                </div>
              </div>

              {/* Ends on */}
              <div className="flex flex-col gap-2">
                <div className={`h-4 w-14 rounded ${shimmer}`} />
                <div className={`h-5 w-24 rounded ${shimmer}`} />
              </div>
            </div>

            {/* Creators + Share mobile */}
            <div className="flex items-end justify-between lg:items-start">
              <div className="flex flex-col gap-2">
                <div className={`h-4 w-16 rounded ${shimmer}`} />
                <div className="flex items-center gap-2">
                  <div className={`h-5 w-8 rounded ${shimmer}`} />
                  <div className="flex -space-x-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-6 w-6 rounded-full ${shimmer}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={`h-10 w-24 rounded-lg lg:hidden ${shimmer}`} />
            </div>
          </div>
        </div>

        {/* PayRateCard Skeleton */}
        <div className="flex flex-col gap-5 rounded-xl bg-[#FBF6FE] p-5 xl:w-95 xl:shrink-0 xl:rounded-[20px] xl:p-6 dark:bg-[#1C2230]">
          {/* Pay Rate */}
          <div className="flex items-baseline justify-between xl:flex-col xl:gap-2">
            <div className={`h-5 w-20 rounded ${shimmer}`} />
            <div className={`h-8 w-40 rounded ${shimmer}`} />
          </div>

          {/* Divider */}
          <div className={`h-[1px] w-full ${shimmer}`} />

          {/* Budget Used */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between xl:flex-col xl:gap-2">
              <div className={`h-5 w-24 rounded ${shimmer}`} />
              <div className={`h-8 w-44 rounded ${shimmer}`} />
            </div>
            {/* Progress Bar */}
            <div className={`h-2 w-full rounded-full ${shimmer}`} />
          </div>

          {/* Submit Button */}
          <div className={`h-11 w-full rounded-lg ${shimmer}`} />
        </div>
      </div>

      {/* TopPerformingVideos Skeleton */}
      <div className="rounded-lg bg-[#FBF6FE] p-6 pr-0 lg:rounded-[20px] dark:bg-[#1C2230]">
        {/* Heading */}
        <div className="mb-6">
          <div className={`h-6 w-52 rounded ${shimmer}`} />
          <div className={`mt-2 h-4 w-36 rounded ${shimmer}`} />
        </div>

        {/* Video Cards */}
        <div className="flex gap-4 overflow-hidden pb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[220px] flex-none sm:w-[260px]">
              <div className={`mb-3 aspect-[4/5] rounded-sm ${shimmer}`} />
              <div className="flex items-center justify-between px-1">
                <div className={`h-4 w-16 rounded ${shimmer}`} />
                <div className={`h-4 w-12 rounded ${shimmer}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
