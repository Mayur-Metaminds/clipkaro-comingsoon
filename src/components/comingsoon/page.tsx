import React from "react";
import { HeroSection } from "./HeroSection";
import { HowItWorks } from "./HowItWorks";
import { FeaturesSection } from "./FeaturesSection";
import { Footer } from "./Footer";

export default function ComingSoonPageLayout() {
  return (
    <div className="bg-black">
      <div className="fixed top-0 w-screen h-screen opacity-50 z-0 ">
        <img
          src="/images/comingsoon/herobgimg.png"
          className=" h-screen w-screen"
          alt=""
        />
      </div>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
