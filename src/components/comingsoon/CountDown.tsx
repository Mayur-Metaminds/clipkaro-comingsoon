"use client";
import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown = () => {
  // Set target date to approx 64 days from now to match design
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 94,
    hours: 6,
    minutes: 23,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="mx-2 flex flex-col items-center md:mx-4">
      <span className="font-dm-sans-400 text-center text-[33px] leading-[36px] tracking-[-0.8px] text-[#D2DEF1] tabular-nums md:text-[40px]">
        {value.toString().padStart(2, "0")}
      </span>

      <span className="font-dm-sans-600 mt-1 text-center text-[16px] leading-[29px] tracking-[-0.4px] text-[#95A9CC]/70 md:text-[20px]">
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <span className="-mt-10 text-2xl font-light text-[#D2DEF1] md:text-4xl">
      :
    </span>
  );

  return (
    <div className="relative flex flex-col items-center">
      <p className="font-dm-sans-600 mb-4 mb-[19px] bg-[linear-gradient(128deg,#95A9CC_25.87%,#BBCFF0_74.13%)] bg-clip-text text-center text-[16px] leading-[29px] tracking-[-0.4px] text-transparent md:text-[20px]">
        Launching in
      </p>

      <div className="flex items-center justify-center gap-2">
        <TimeUnit value={timeLeft.days} label="Days" />
        <Separator />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label="Second" />
      </div>
    </div>
  );
};
