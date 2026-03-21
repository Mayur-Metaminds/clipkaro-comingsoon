"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, DollarSign, Zap, MapPin } from "lucide-react";

const ProblemSection = () => {
  const painPoints = [
    "Freelance gigs that don't see your value",
    "Countless backup accounts that don't hit the algorithm",
    "Posting content that adds no value to your user base",
  ];

  const questions = [
    {
      icon: <DollarSign className="text-purple-500" size={30} />,
      text: "Can I really make money doing this?",
    },
    {
      icon: <Zap className="text-pink-500" size={30} />,
      text: "Why do some people blow up instantly, while I'm still grinding?",
    },
    {
      icon: <MapPin className="text-purple-500" size={30} />,
      text: "Where are the big opportunities?",
    },
  ];

  return (
    <section className="bg-white px-6 text-white md:px-12 lg:px-24 lg:py-24 dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-6xl text-center">
        {/* Main Heading */}
        <h2 className="typo-landing-section-heading mb-6 px-8 text-black uppercase lg:px-0 dark:text-white">
          ALRIGHT CREATORS, LET&apos;S GET REAL.
        </h2>
        {/* Sub-paragraph */}
        <p className="typo-landing-eyebrow mx-auto mb-7.5 max-w-6xl text-[#000000B2] uppercase dark:text-[#FFFFFFB2]">
          WHETHER YOU&apos;RE A CLIPPER EDITING FIRE CONTENT OR A UGC CREATOR
          BUILDING YOUR BRAND, YOU&apos;RE SCROLLING REELS, YOUTUBE SHORTS,
          SEEING CREATORS RACKING UP VIEWS, MAKING BANK, AND THINKING:
        </p>

        {/* Highlighted Quote */}
        <h3 className="typo-landing-section-heading bg-[linear-gradient(90deg,#6A3CFF_0%,rgba(176,0,255,0.65)_40%,#FF1AAE_75%,#FF4FA3_100%)] bg-clip-text pb-10 text-transparent uppercase">
          &quot;WHY IS EVERYONE GETTING BRAND DEALS EXCEPT ME?!&quot;
        </h3>

        {/* Pain Point Pills */}
        <div className="mt-10 mb-15 space-y-4 lg:mt-20 lg:mb-30">
          <p className="typo-landing-section-heading2 mb-8 text-[#0F1117] uppercase lg:mb-10 dark:text-[#E6E8F2]">
            YOU&apos;VE PROBABLY TRIED A FEW THINGS, RIGHT?
          </p>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:justify-center">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="flex w-full items-center gap-3 rounded-md border border-transparent bg-[#FF00004D] px-6 py-1 lg:w-auto lg:py-4 dark:border-[#FF00004D] dark:bg-[#FF00004D]"
              >
                <XCircle size={20} className="text-[#FF0000]" />
                <span className="typo-landing-body4 text-black dark:text-[#D1D5DB]">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Question Cards Section */}
        <div className="text-left lg:mt-32">
          <p className="typo-landing-section-heading2 font-dm-sans-400 mb-10 text-[#0F1117] lg:-ml-20 dark:text-[#E6E8F2] dark:uppercase">
            You&apos;re tired of wondering:
          </p>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 perspective-midrange md:grid-cols-3">
            {questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  rotateY: i === 0 ? -45 : i === 2 ? 45 : 0,
                  rotateX: i === 1 ? 45 : 0,
                  scale: 0.8,
                }}
                whileInView={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex min-h-50 flex-col rounded-[6px] border border-[#B000FF75] bg-[linear-gradient(92deg,rgba(106,71,255,0.13)_0%,rgba(255,255,255,0.13)_100%)] px-6 py-5 shadow-[0_0_25px_-5px_rgba(176,0,255,0.3)] md:rounded-3xl lg:min-h-69 lg:px-10 lg:py-6 dark:bg-[#18181B]"
              >
                <div className="mb-auto flex h-[52px] w-[52px] items-center justify-center rounded-lg">
                  {q.icon}
                </div>
                <p className="typo-landing-questions mt-6 text-black dark:text-white">
                  {q.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
