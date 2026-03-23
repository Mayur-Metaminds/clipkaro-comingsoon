"use client"; // pending server component conversion
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import lightStatsBg from "../data/lightStats.png";
import darkStatsBg from "../data/darkStats.png";
import lightStatsSM from "../data/lightStatsSM.png";
import darkStatsSM from "../data/darkStatsSM.png";
import w1 from "../data/w1.png";
import w2 from "../data/w2.png";
import w3 from "../data/w3.png";

const WhyJoining: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "0.6 0"],
  });

  // Smooth out the progress bar movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const features = [
    {
      id: 1,
      image: w1.src,
      titleGradient: "WEEKLY TRANSPARENT",
      titleWhite: "PAYOUTS",
      desc: 'No chasing invoices. No vague "we\'ll pay you later." Weekly payouts, direct to your bank account.',
    },
    {
      id: 2,
      image: w2.src,
      titleGradient: "NO FOLLOWERS",
      titleWhite: "REQUIRED",
      desc: "Earn from day one. No followers? No problem. Get paid based on views, not your follower count.",
    },
    {
      id: 3,
      image: w3.src,
      titleGradient: "100+  REAL BRAND",
      titleWhite: "PARTNERSHIPS",
      desc: "Work with premium brands. Build your portfolio while earning. Get the recognition you deserve.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white px-6 py-25 text-white md:px-12 lg:px-24 lg:py-38 dark:bg-[#0A0A0A]"
    >
      {/* Background PNGs - Light */}
      <div
        className="pointer-events-none absolute inset-0 z-25 bg-size-[100%_100%] bg-center bg-no-repeat md:hidden dark:hidden"
        style={{ backgroundImage: `url(${lightStatsSM.src})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-25 hidden bg-size-[100%_100%] bg-center bg-no-repeat md:block dark:hidden"
        style={{ backgroundImage: `url(${lightStatsBg.src})` }}
      />
      {/* Background PNGs - Dark */}
      <div
        className="pointer-events-none absolute inset-0 z-25 hidden bg-size-[100%_100%] bg-center bg-no-repeat dark:block dark:md:hidden"
        style={{ backgroundImage: `url(${darkStatsSM.src})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-25 hidden bg-size-[100%_100%] bg-center bg-no-repeat dark:md:block"
        style={{ backgroundImage: `url(${darkStatsBg.src})` }}
      />

      <div className="relative z-30 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 space-y-4 text-center md:mb-20">
          <h2 className="font-white typo-landing-section-heading text-black dark:text-white">
            Why Everyone&apos;s Joining
          </h2>
          <p className="typo-landing-eyebrow text-[#000000B2] uppercase dark:text-[#FFFFFFB2]">
            The platform built for creators who are tired of waiting
          </p>
        </div>

        {/* Mobile Layout — stacked cards with vertical progress bar */}
        <div className="relative md:hidden">
          {/* Vertical progress bar track */}
          <div className="absolute top-0 bottom-0 left-0 w-1.5">
            <div className="h-[85%] rounded-full bg-black/10 dark:bg-white/2">
              <motion.div
                style={{ scaleY }}
                className="h-full origin-top rounded-full bg-gradient-to-b from-indigo-600 via-purple-500 to-pink-500"
              />
            </div>
          </div>

          {/* Cards with left padding */}
          <div className="flex flex-col gap-10 pl-8">
            {features.map((item) => (
              <div key={item.id} className="relative space-y-4">
                {/* Horizontal dotted connector */}
                <div className="absolute top-[33%] -left-8 z-10 w-8 border-t-2 border-dotted border-black dark:border-white" />
                <div className="w-[80%] overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={`${item.titleGradient} ${item.titleWhite}`}
                    className="aspect-square w-full object-cover grayscale-[0.2] transition-all duration-500 hover:grayscale-0"
                  />
                </div>
                <h3 className="typo-landing-signup">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    {item.titleGradient}
                  </span>
                  <br />
                  <span className="text-black dark:text-white">
                    {item.titleWhite}
                  </span>
                </h3>
                <p className="typo-landing-body3 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout — split rows */}
        <div className="hidden md:block">
          {/* Images Row */}
          <div className="grid grid-cols-3 gap-8 lg:gap-10">
            {features.map((item) => (
              <div
                key={item.id}
                className="h-[130px] w-[135px] overflow-hidden rounded-xl border border-black/10 lg:h-[202px] lg:w-[211px] dark:border-white/10"
              >
                <img
                  src={item.image}
                  alt={`${item.titleGradient} ${item.titleWhite}`}
                  className="aspect-[27/26] h-full w-full object-cover grayscale-[0.2] transition-all duration-500 hover:grayscale-0 lg:aspect-[164/157]"
                />
              </div>
            ))}
          </div>

          {/* Progress Bar with Dotted Lines */}
          <div className="relative my-14 lg:my-16">
            {/* Dotted vertical lines — above and below the bar */}
            <div className="pointer-events-none absolute inset-x-0 -top-8 -bottom-8 z-10 grid grid-cols-3 gap-8 lg:gap-10">
              {features.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute top-0 -left-px h-full border-l-2 border-dotted border-black dark:border-white" />
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="h-2 w-[85%] rounded-full bg-black/10 dark:bg-white/2">
              <motion.div
                style={{ scaleX }}
                className="h-full origin-left rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"
              />
            </div>
          </div>

          {/* Text Content Row */}
          <div className="grid grid-cols-3 gap-8 lg:gap-10">
            {features.map((item) => (
              <div key={item.id} className="space-y-3">
                <h3 className="typo-landing-signup">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    {item.titleGradient}
                  </span>
                  <br />
                  <span className="text-black dark:text-white">
                    {item.titleWhite}
                  </span>
                </h3>
                <p className="typo-landing-body3 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center md:mt-24">
          <a
            href="#join-waitlist"
            className="typo-landing-cta cursor-pointer bg-gradient-to-r from-[#7c3aed] to-[#db2777] px-12 py-2 uppercase shadow-lg shadow-purple-500/20 md:px-14"
          >
            Secure Your Spot
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyJoining;
