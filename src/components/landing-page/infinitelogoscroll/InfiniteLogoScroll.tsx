"use client";

import React from "react";
import { motion } from "framer-motion";

const BrandTicker = () => {
  const brands = [
    "BRAND ZONE",
    "BRAND ZONE",
    "BRAND ZONE",
    "BRAND ZONE",
    "BRAND ZONE",
    "BRAND ZONE",
    "BRAND ZONE",
    "BRAND ZONE",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] py-4">
      {/* We use two sets of the same content. 
          The first set moves out of view, the second set follows right behind it.
      */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Render the list twice for seamless looping */}
        {[...brands, ...brands, ...brands, ...brands].map((item, index) => (
          <div
            key={index}
            className="font-dm-sans-700 mx-8 flex items-center text-[16px] text-black lg:text-[24px] dark:text-white"
          >
            <span>{item}</span>
            {/* The Dot Separator */}
            <span className="ml-16 h-3 w-3 rounded-full bg-black dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
        ))}
      </motion.div>

      {/* Optional: Edge Fading to make it smoother */}
      <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#6A3CFF] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#FF4FA3] to-transparent" />
    </div>
  );
};

export default BrandTicker;
