"use client";
import React, { useState, useEffect } from "react";

// Interfaces for component props
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Function to calculate time remaining until a target date
const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = targetDate.getTime() - new Date().getTime();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

// Helper component for each countdown unit
interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label }) => {
  // Pad single-digit numbers with a leading zero
  const formattedValue = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-[70px] w-[72px] items-center justify-center rounded-xl border-[0.407px] border-white/60 shadow-[0_4px_20px_rgba(139,92,246,0.15)] sm:h-[105px] sm:w-[126px] sm:rounded-2xl dark:border-purple-500/10 dark:bg-[#231E2C] dark:shadow-none">
        <span className="typo-landing-timer bg-gradient-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent">
          {formattedValue}
        </span>
      </div>
      <span className="typo-landing-body3 lg:typo-landing-body2 mt-2 text-[#000000B2] uppercase dark:text-[#94A3B8]">
        {label}
      </span>
    </div>
  );
};

const CountDownSection = () => {
  // Target date: April 30, 2026 at midnight IST (UTC+5:30)
  const targetDate = new Date("2026-04-30T00:00:00+05:30");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white p-6 font-sans text-white dark:bg-[#0A0A0A]">
      {/* Background Gradient Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(139,92,246,0.10)] blur-[60px] sm:h-150 sm:w-200" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        {/* Top Headings */}
        <div className="mb-16 space-y-4">
          <h1 className="typo-landing-section-heading text-black uppercase dark:text-white">
            Launching In
          </h1>
          <p className="typo-landing-section-sub-heading text-[#000000B2] uppercase dark:text-[#FFFFFFB2]">
            Limited Access Phase
          </p>
        </div>

        {/* Countdown Timer Grid */}
        <div className="relative mb-7 lg:mb-8">
          {/* Glow behind timer */}
          <div className="absolute inset-0 -inset-x-4 -inset-y-6 rounded-full bg-[rgba(139,92,246,0.10)] blur-[60px] sm:-inset-x-8 sm:-inset-y-8" />
          <div className="relative grid grid-cols-4 gap-2 sm:gap-5">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* Waitlist Avatars Section */}
        <div className="mb-8 flex flex-col items-center gap-6 lg:mb-10">
          {/* Avatar Group */}
          <div className="flex items-center -space-x-4">
            {[...Array(3)].map((_, i) => (
              <div
                className="rounded-full border-[3px] border-purple-600/40 bg-white p-[3px] dark:border-purple-500/30 dark:bg-[#09090B]"
                key={i}
              >
                <img
                  key={i}
                  src={`https://api.dicebear.com/8.x/avataaars/svg?seed=creator${i + 1}`}
                  alt={`Creator ${i + 1} Avatar`}
                  className="h-10 w-10 rounded-full bg-white object-cover dark:bg-gray-900"
                />
              </div>
            ))}
            {/* Waitlist Count Bubble */}
            <div className="rounded-full border-[3px] border-purple-600/40 bg-white p-[3px] dark:border-purple-500/30 dark:bg-[#09090B]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-purple-600 to-pink-500 text-[10px] font-bold text-white">
                +1.2K
              </div>
            </div>
          </div>

          {/* Waitlist Text */}
          <p className="typo-landing-body4 text-[#000000B2] dark:text-[#94A3B8]">
            Join{" "}
            <span className="font-bold text-black dark:text-white">
              1,200+ creators
            </span>{" "}
            already on the waitlist
          </p>
        </div>

        {/* Action Button */}
        <div className="w-full max-w-sm">
          <a
            href="#join-waitlist"
            className="typo-landing-cta block w-full cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-1 uppercase shadow-lg shadow-purple-500/20"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </main>
  );
};

export default CountDownSection;
