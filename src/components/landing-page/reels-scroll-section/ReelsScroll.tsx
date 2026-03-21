"use client";

import React from "react";
import { motion } from "framer-motion";
import { REELS } from "../data/reels";

const ScrollingColumn = ({
  reels,
  duration,
  delay = 0,
  offset = 0,
}: {
  reels: typeof REELS;
  duration: number;
  delay?: number;
  offset?: number;
}) => {
  const duplicated = [...reels, ...reels, ...reels];

  return (
    <div className="relative flex-1 overflow-y-clip sm:h-[50vh] md:h-[60vh] lg:h-screen">
      <motion.div
        className="flex flex-col gap-2 pt-4 sm:gap-3 sm:pt-8 md:gap-4 lg:gap-12 lg:pt-20"
        initial={{ y: offset }}
        animate={{ y: "-66.66%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
      >
        {duplicated.map((reel, index) => {
          const rotations = [-2, 1, -2, 1, -1, 2];
          const rotation = rotations[index % rotations.length];

          return (
            <div
              key={index}
              style={{ transform: `rotate(${rotation}deg)` }}
              className="relative aspect-[1080/1749] w-full overflow-y-hidden rounded-lg border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform sm:rounded-xl md:rounded-2xl lg:rounded-3xl"
            >
              <img
                src={reel.image}
                alt="reel"
                className="h-full w-full opacity-80"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default function InfiniteReelWall() {
  return (
    <div className="relative h-[40vh] overflow-hidden bg-white sm:h-[50vh] lg:min-h-screen dark:bg-[#0A0A0A]">
      {/* 1. Global Color Overlay (The Purple/Pink Gradient Wash) */}
      <div
        className="pointer-events-none absolute inset-0 z-25 opacity-25"
        style={{
          background:
            "linear-gradient(180deg, #0F1117, #8D1EFF, #B000FF, #FF1AAE, #FF35A9, #0F1117)",
        }}
      />

      {/* 2. Scrolling Grid with varying offsets and speeds */}
      <div className="mx-auto flex h-full w-full max-w-7xl gap-2 px-2 sm:gap-3 sm:px-4 md:gap-4 md:px-8 lg:scale-110 lg:gap-8 lg:px-12">
        <ScrollingColumn reels={REELS} duration={40} offset={-100} />
        <ScrollingColumn
          reels={REELS}
          duration={55}
          delay={-15}
          offset={-500}
        />
        <ScrollingColumn reels={REELS} duration={35} delay={-5} offset={-200} />
        <ScrollingColumn
          reels={REELS}
          duration={65}
          delay={-25}
          offset={-800}
        />
      </div>

      {/* 3. Vignette / Fade effect */}
      {/* <div className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_150px_rgba(255,255,255,1)] dark:shadow-[inset_0_0_150px_rgba(0,0,0,1)]" /> */}
      <div className="absolute top-0 z-40 h-12 w-full bg-gradient-to-b from-white to-transparent lg:h-25 dark:from-[#0A0A0A]" />
      <div className="absolute bottom-0 z-40 h-12 w-full bg-gradient-to-b from-transparent to-white lg:h-25 dark:to-[#0A0A0A]" />
    </div>
  );
}
