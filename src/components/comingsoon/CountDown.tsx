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
    days: 64,
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
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <span className=" text-center  font-dm-sans-400  text-[40px]    leading-[36px]  tracking-[-0.8px]  text-[#D2DEF1]  tabular-nums">
        {value.toString().padStart(2, "0")}
      </span>

      <span className=" text-center font-dm-sans-600  text-[20px]  leading-[29px]  tracking-[-0.4px] text-[#95A9CC]/70 mt-1">
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <span className="text-2xl md:text-4xl text-[#D2DEF1] font-light -mt-10">
      :
    </span>
  );

  return (
    <div className="flex flex-col items-center relative">
      <p className="mb-[19px]  text-center  font-dm-sans-600 text-[20px] leading-[29px]  tracking-[-0.4px]  mb-4  bg-[linear-gradient(128deg,#95A9CC_25.87%,#BBCFF0_74.13%)]  bg-clip-text text-transparent">
        Launching in
      </p>

      <div className="flex items-center gap-2 justify-center">
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
