import React from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import JoinWaitlistForm from "./join-waitlist-form/JoinWaitlistForm";
import TestimonialsSection from "./testimonial-section/TestimonialsSection";
import StatsSection from "./stats-section/StatsSection";
import WhyJoining from "./why-joining/WhyJoining";
import ThreeStepProcess from "./three-step-process-section/ThreeStepProcess";
import TextSection from "./text-section/TextSection";
import ProblemSection from "./problem-section/ProblemSection";
import WhoIsThisFor from "./who-to-this-for/WhoToThisFor";
import CountDownSection from "./countdown-section/CountDownSection";
import HeroSection from "./hero-section/HeroSection";
import InfiniteReelWall from "./reels-scroll-section/ReelsScroll";
import BrandTicker from "./infinitelogoscroll/InfiniteLogoScroll";
import FAQSection from "./faq-section/FAQSection";

export default function LandingPageLayout() {
  return (
    <div className="h-full w-full bg-white dark:bg-[#0A0A0A]">
      <Navbar />
      <HeroSection />
      <InfiniteReelWall />
      <CountDownSection />
      <WhoIsThisFor />
      <ProblemSection />
      <TextSection />
      <ThreeStepProcess />
      <WhyJoining />
      <StatsSection />
      <BrandTicker />
      <TestimonialsSection />
      <FAQSection />
      <JoinWaitlistForm />
      <Footer />
    </div>
  );
}
