import React from "react";

const TextSection: React.FC = () => {
  return (
    <section className="bg-white px-6 py-15 md:py-32 dark:bg-[#0A0A0A] dark:text-white">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        {/* Main Heading with Gradient Accent */}
        <h2 className="typo-landing-section-heading text-black uppercase dark:text-white">
          We&apos;ve{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Cracked The Code,
          </span>{" "}
          And You&apos;re Invited
        </h2>

        {/* Description Text */}
        <div className="mx-auto max-w-3xl space-y-1">
          <p className="typo-landing-section-sub-heading text-[#000000B2] uppercase dark:text-[#FFFFFFB2]">
            ClipKaro is the easiest way for clippers and UGC creators to earn
            money. No excuses. No wasted hours. No doubts.
          </p>
        </div>

        {/* CTA Button */}
        <div className="lg:pt-6">
          <a
            href="#join-waitlist"
            className="typo-landing-cta cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-12 py-2 text-white uppercase shadow-xl shadow-purple-500/20 transition-transform md:px-14"
          >
            I&apos;m Ready
          </a>
        </div>
      </div>
    </section>
  );
};

export default TextSection;
