"use client";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-24 md:py-32 lg:min-h-screen lg:py-0 dark:bg-[#0A0A0A]">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px] md:h-[300px] md:w-[600px]" />

      {/* Top Tagline */}
      <p className="typo-landing-eyebrow mb-3 text-center text-black/70 dark:text-white/70">
        For Clippers & UGC Creators
      </p>

      {/* Main Heading */}
      <div className="z-10 max-w-4xl text-center">
        <h1 className="typo-landing-heading uppercase dark:text-white">
          Earn From Your
          <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
            Reels & Shorts
          </span>
        </h1>
      </div>

      {/* Subtext */}
      <p className="typo-landing-section-sub-heading lg:typo-landing-subtext mt-4 max-w-xs text-center text-[#000000B2] sm:max-w-md md:mt-6 md:max-w-xl lg:max-w-2xl dark:text-white/70">
        Post videos for real brands. Get paid per view. No audience needed, no
        catch.
      </p>

      {/* CTA Button */}
      <div className="group relative mt-8 flex flex-col items-center justify-center md:mt-10">
        <a
          href="#join-waitlist"
          className="typo-landing-cta relative cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 px-12 py-1 text-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-transform md:px-14"
        >
          Join Our Waitlist
        </a>
        <p className="typo-landing-body mt-3 text-center text-black/70 md:mt-4 dark:text-white/70">
          Only{" "}
          <span className="font-bold text-black dark:text-white">2,847</span>{" "}
          spots left in early access
        </p>
      </div>

      {/* Floating 3D Icons */}
      {/* Left Icon (Shorts) */}
      <div className="animate-bounce-slow absolute bottom-[32%] left-[3%] w-12 sm:w-16 md:bottom-[15%] md:left-[5%] md:w-20 lg:bottom-[7%] lg:left-[10%] lg:w-auto">
        <img src="/images/landingPage/icon2.svg" alt="" />
      </div>

      {/* Right Icon (Clapper) */}
      <div className="animate-bounce-slow absolute right-[3%] bottom-[28%] w-12 delay-300 sm:w-16 md:right-[5%] md:bottom-[10%] md:w-20 lg:right-[10%] lg:bottom-[2%] lg:w-auto">
        <img src="/images/landingPage/icon1.svg" alt="" />
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(-50%) translateY(-10px);
          }
          50% {
            transform: translateY(-50%) translateY(10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
