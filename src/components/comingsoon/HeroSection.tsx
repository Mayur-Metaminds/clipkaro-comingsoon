"use client";
import React from "react";
import { motion } from "framer-motion";
import { Countdown } from "./CountDown";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center  pt-5 md:pt-20 pb-16 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[80vh] bg-hero-glow opacity-60 pointer-events-none z-0" />

      {/* Particles/Stars (Simplified CSS representation) */}
      {/* <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "",
          backgroundSize: "50px 50px",
        }}
      ></div> */}

      <div className="absolute flex justify-center items-start inset-0 -mt-4 z-0 ">
        <img src="/images/comingsoon/starblink.svg" alt="" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center space-y-3">
        {/* Launching Soon Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center  w-full justify-center"
        >
          <div className="h-[1px] w-10 md:w-24 border-l-3 bg-gradient-to-r from-transparent to-white/50"></div>
          <span className=" border-x-2  px-3 md:px-5  text-center  font-dm-sans-500 text-[12px] md:text-[16px]   leading-[normal] whitespace-nowrap tracking-[3.04px]  text-white  uppercase">
            Launching Soon in India
          </span>

          <div className="h-[1px] w-10 md:w-24 bg-gradient-to-l from-transparent to-white/50"></div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-[70px] md:text-[134px] font-dm-sans-500  leading-[normal]  tracking-[-5.36px]  [text-wrap:balance]
  "
        >
          <span className=" bg-[linear-gradient(180deg,#92BEF5_0%,#C1DAF8_114.36%)]  bg-clip-text  text-transparent ">
            ClipKaro
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className=" text-center font-dm-sans-500 text-[18px] md:text-[24px] leading-[36px] tracking-[-0.48px] text-[#C9DCFB] max-w-2xl mx-auto"
        >
          India's first performance-based creator app that actually pays you for
          every 1k views.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-4 mt-4"
        >
          {/* <button className="group cursor-pointer relative px-8 py-3 rounded-full bg-black/40 border border-white text-white font-semibold overflow-hidden transition-all hover:border-white/50 hover:shadow-[0_0_20px_rgba(146,190,245,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <span className="
  relative  z-10  text-center font-dm-sans-600
  text-[20px]   leading-[29px]  tracking-[-0.2px]  bg-[linear-gradient(90deg,#FFFFFF_0%,rgba(255,255,255,0.7)_100%)]  bg-clip-text  text-transparent">
  Join The Waitlist
</span>

          </button> */}

          <Link
            href={"/waitlist-form"}
            className="group cursor-pointer relative px-8 py-3 rounded-full bg-black/40 text-white font-semibold overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(146,190,245,0.3)]"
          >
            {/* Rotating gradient border */}
            <span
              className="absolute inset-0 rounded-full p-[1.5px]"
              style={{
                background:
                  "conic-gradient(from var(--angle), transparent 20%, #fff 40%, #92BEF5 60%, transparent 80%)",
                animation: "rotate-border 3s linear infinite",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            {/* Text */}
            <span className="relative z-10 text-center font-dm-sans-600 text-[20px] leading-[29px] tracking-[-0.2px] bg-[linear-gradient(90deg,#FFFFFF_0%,rgba(255,255,255,0.7)_100%)] bg-clip-text text-transparent">
              Join The Waitlist
            </span>
          </Link>

          {/* Add this to your global CSS */}
          <style>{`
  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes rotate-border {
    from { --angle: 0deg; }
    to { --angle: 360deg; }
  }
`}</style>

          <p
            className=" text-center font-dm-sans-500 text-[16px] md:text-[20px]  leading-[29px]  tracking-[-0.4px]  text-[#B2C4E3]
"
          >
            Only <span className="text-white">2,847</span> spots left in early
            access
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12"
        >
          <Countdown />
        </motion.div>
      </div>
    </section>
  );
};
