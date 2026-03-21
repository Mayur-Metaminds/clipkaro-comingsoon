"use client";

const shimmer = "animate-pulse bg-gray-300 dark:bg-gray-700";

const SubmitPageSkeleton = () => {
  return (
    <div className="gradient-border-bg flex w-full flex-col gap-3 rounded-xl p-4 lg:flex-1 lg:p-5">
      {/* Title */}
      <div className={`h-6 w-40 rounded lg:h-7 lg:w-48 ${shimmer}`} />

      {/* Subtitle */}
      <div className={`h-4 w-full rounded lg:h-5 ${shimmer}`} />

      {/* Connected Account 1 */}
      <div className="flex h-16.25 w-full items-center gap-3 rounded-xl border-[0.3px] border-[#6A3CFF] px-3 lg:h-19.5">
        <div
          className={`h-8 w-8 shrink-0 rounded-full lg:h-10 lg:w-10 ${shimmer}`}
        />
        <div className="flex flex-col gap-1.5">
          <div className={`h-4 w-48 rounded lg:h-5 lg:w-56 ${shimmer}`} />
          <div className={`h-3 w-28 rounded lg:h-4 lg:w-32 ${shimmer}`} />
        </div>
      </div>

      {/* Connected Account 2 */}
      <div className="flex h-16.25 w-full items-center gap-3 rounded-xl border-[0.3px] border-[#6A3CFF] px-3 lg:h-19.5">
        <div
          className={`h-8 w-8 shrink-0 rounded-full lg:h-10 lg:w-10 ${shimmer}`}
        />
        <div className="flex flex-col gap-1.5">
          <div className={`h-4 w-44 rounded lg:h-5 lg:w-52 ${shimmer}`} />
          <div className={`h-3 w-28 rounded lg:h-4 lg:w-32 ${shimmer}`} />
        </div>
      </div>

      {/* Reel or short URL label */}
      <div className={`h-4 w-32 rounded lg:h-5 lg:w-36 ${shimmer}`} />

      {/* Input field */}
      <div className={`h-10.5 w-full rounded-lg lg:h-11 ${shimmer}`} />

      {/* Info text */}
      <div className="flex items-center gap-1.5">
        <div
          className={`h-3.5 w-3.5 shrink-0 rounded-full lg:h-4.5 lg:w-4.5 ${shimmer}`}
        />
        <div className={`h-3.5 w-full rounded lg:h-4 lg:w-80 ${shimmer}`} />
      </div>

      {/* Submit button */}
      <div className="flex w-full justify-center pt-1">
        <div className={`h-11.5 w-49 rounded-xl lg:w-69 ${shimmer}`} />
      </div>
    </div>
  );
};

export default SubmitPageSkeleton;
