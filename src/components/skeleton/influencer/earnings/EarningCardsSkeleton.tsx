export default function EarningCardsSkeleton() {
  return (
    <>
      {/* Current Earnings Card */}
      <div className="gradient-border-final relative overflow-hidden rounded-[12px] md:min-w-[260px] xl:h-[290px] xl:w-[300px]">
        <div className="group white-linear relative h-full min-h-[198px] overflow-hidden p-6 md:p-6">
          <div className="relative z-10 flex h-full animate-pulse flex-col justify-between md:min-h-[200px]">
            <div>
              <div className="h-5 w-40 rounded-md bg-[#E3DEE5] dark:bg-[#2A2A3F]" />
            </div>

            <div className="mt-2">
              <div className="h-8 w-32 rounded-md bg-[#E3DEE5] dark:bg-[#2A2A3F]" />

              <div className="mt-2 h-4 w-36 rounded-md bg-[#E3DEE5] dark:bg-[#2A2A3F]" />

              <div className="mt-3 h-[42px] w-full rounded-[12px] bg-[#E3DEE5] dark:bg-[#2A2A3F]" />
            </div>
          </div>
        </div>
      </div>

      {/* Lifetime Earnings Card */}
      <div className="gradient-border-final relative overflow-hidden rounded-[12px] md:min-w-[260px] xl:h-[290px]">
        <div className="group white-linear relative h-full min-h-[140px] overflow-hidden p-6 md:p-6">
          <div className="relative z-10 flex h-full animate-pulse flex-col justify-between md:min-h-[200px]">
            <div>
              <div className="h-5 w-40 rounded-md bg-[#E3DEE5] dark:bg-[#2A2A3F]" />
            </div>

            <div className="mt-2">
              <div className="h-8 w-24 rounded-md bg-[#E3DEE5] dark:bg-[#2A2A3F]" />

              <div className="mt-2 h-4 w-28 rounded-md bg-[#E3DEE5] dark:bg-[#2A2A3F]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
