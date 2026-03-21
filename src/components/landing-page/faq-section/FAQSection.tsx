"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import lightFaqBg from "@/components/landing-page/data/lightFaq.png";
import darkFaqBg from "@/components/landing-page/data/darkFaq.png";
import lightFaqSM from "@/components/landing-page/data/lightFaqSM.png";
import darkFaqSM from "@/components/landing-page/data/darkFaqSM.png";
import smGridleft from "@/components/landing-page/data/smGridleft.svg";
import smGridright from "@/components/landing-page/data/smGridright.svg";

const faqData = [
  {
    question: "What is ClipKaro?",
    answer:
      "ClipKaro is a platform for clippers and UGC creators to earn from their content.",
  },
  {
    question: "It is free to Join?",
    answer: "Yes, joining the waitlist and the platform is completely free.",
  },
  {
    question: "When does clipkaro launch?",
    answer:
      "We are launching in early access very soon. Join the waitlist for updates!",
  },
  {
    question: "How do I get paid?",
    answer: "Payments are processed per view directly to your linked account.",
  },
  {
    question: "Do I need experience or followers?",
    answer: "No audience or prior experience is needed to start earning.",
  },
];

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className="border-b"
      style={{
        borderImage:
          "linear-gradient(90deg, #6A3CFF 0%, #B000FF 40%, #FF1AAE 75%, #FF4FA3 100%) 1",
      }}
    >
      <button
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-6 text-left"
      >
        <span className="typo-landing-body text-black dark:text-[#E6E8F2]">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-black dark:text-white"
        >
          <Plus size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden px-4"
          >
            <p className="pb-6 leading-relaxed text-gray-600 dark:text-gray-400">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 py-20 dark:bg-[#0A0A0A]">
      {/* FAQ Background PNGs - Light */}
      <div
        className="pointer-events-none absolute inset-0 z-25 bg-[length:100%_100%] bg-center bg-no-repeat md:hidden dark:hidden"
        style={{ backgroundImage: `url(${lightFaqSM.src})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-25 hidden bg-[length:100%_100%] bg-center bg-no-repeat md:block dark:hidden"
        style={{ backgroundImage: `url(${lightFaqBg.src})` }}
      />
      {/* FAQ Background PNGs - Dark */}
      <div
        className="pointer-events-none absolute inset-0 z-25 hidden bg-[length:100%_100%] bg-center bg-no-repeat dark:block dark:md:hidden"
        style={{ backgroundImage: `url(${darkFaqSM.src})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-25 hidden bg-[length:100%_100%] bg-center bg-no-repeat dark:md:block"
        style={{ backgroundImage: `url(${darkFaqBg.src})` }}
      />

      {/* Grid backgrounds - SM (below md) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden">
        <div className="absolute top-0 right-0 opacity-15 dark:opacity-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={smGridleft.src} alt="" />
        </div>
        <div className="absolute top-0 left-0 opacity-15 dark:opacity-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={smGridright.src} alt="" />
        </div>
      </div>
      {/* Grid backgrounds - MD+ */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block">
        {}
        <div className="absolute top-0 -left-51 opacity-15 dark:opacity-10">
          <img src="/images/landingPage/leftgrid.svg" alt="" />
        </div>
        {}
        <div className="absolute top-0 -right-51 opacity-15 dark:opacity-10">
          <img src="/images/landingPage/rightgrid.svg" alt="" />
        </div>
      </div>

      {/* Center blur overlay */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center">
        <div className="h-[160%] w-[55%] rounded-full bg-white blur-2xl dark:bg-[#0A0A0A]" />
      </div>

      {/* 2. Content */}
      <div className="relative z-100 w-full max-w-4xl text-center">
        <h2 className="typo-landing-section-heading mb-2 text-black uppercase dark:text-white">
          Questions? Answers.
        </h2>
        <p className="typo-landing-section-sub-heading mb-16 text-[#000000B2] uppercase dark:text-[#FFFFFFB2]">
          We Spill The Tea
        </p>

        {/* 3. Accordion List */}
        <div className="text-left">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
