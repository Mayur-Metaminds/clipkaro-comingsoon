"use client";

const shimmer = "animate-pulse bg-gray-300 dark:bg-gray-700";

const CampaignCardSkeleton = () => {
  return (
    <div className="w-full max-w-[390px] overflow-hidden rounded-[20px] bg-[#111827] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      {/* Top Image Section */}
      <div className="relative flex h-[212px] items-center justify-center overflow-hidden lg:h-[216px]">
        <div className={`h-full w-full ${shimmer}`} />

        {/* Fake Tags */}
        <div className="absolute top-4 right-4 z-10 flex gap-1.5">
          <div className={`h-6 w-14 rounded-full ${shimmer}`} />
          <div className={`h-6 w-10 rounded-full ${shimmer}`} />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="bg-[#FBF6FE] px-5 py-[30px] dark:bg-[#1C2230]">
        {/* Title */}
        <div className={`h-6 w-3/4 rounded ${shimmer}`} />

        {/* Brand */}
        <div className={`mt-2 h-4 w-1/2 rounded ${shimmer}`} />

        {/* Bottom Stats */}
        <div className="mt-4 flex items-end justify-between">
          {/* Platform */}
          <div className="flex flex-col items-start gap-1">
            <div className={`h-3 w-16 rounded ${shimmer}`} />
            <div className="flex gap-3">
              <div className={`h-5 w-5 rounded-full ${shimmer}`} />
              <div className={`h-5 w-5 rounded-full ${shimmer}`} />
            </div>
          </div>

          {/* Views */}
          <div className="flex flex-col items-start gap-1">
            <div className={`h-3 w-12 rounded ${shimmer}`} />
            <div className={`h-4 w-10 rounded ${shimmer}`} />
          </div>

          {/* CPM */}
          <div className="flex flex-col items-start gap-1">
            <div className={`h-3 w-10 rounded ${shimmer}`} />
            <div className="flex items-center gap-2">
              <div className={`h-4 w-8 rounded ${shimmer}`} />
              <div className={`h-4 w-12 rounded ${shimmer}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCardSkeleton;
