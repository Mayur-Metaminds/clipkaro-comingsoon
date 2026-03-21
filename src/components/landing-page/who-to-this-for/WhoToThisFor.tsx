import React from "react";
import { Scissors, Clapperboard } from "lucide-react";

const WhoIsThisFor: React.FC = () => {
  return (
    <section className="bg-white px-6 pb-13 text-white md:px-12 lg:px-24 dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl text-center">
        {/* Heading */}
        <div className="mb-16 space-y-4">
          <h2 className="typo-landing-section-heading bg-[linear-gradient(90deg,#6A3CFF_0%,#B000FF_40%,#FF1AAE_75%,#FF4FA3_100%)] bg-clip-text text-transparent">
            WHO IS THIS FOR?
          </h2>
          <p className="typo-landing-section-sub-heading text-[#000000B2] uppercase dark:text-[#FFFFFFB2]">
            TWO PATHS TO MAKE MONEY. PICK YOURS
          </p>
        </div>

        {/* Dual Cards Container */}
        <div className="grid grid-cols-1 gap-8 text-left lg:grid-cols-2">
          {/* Clipper Card */}
          <div className="group relative flex flex-col overflow-hidden rounded-[10px] border-[1.5px] border-[#6C3851] bg-[linear-gradient(130deg,#3A021D_1.38%,#130A0E_98.62%)] p-6 shadow-2xl shadow-red-950/10 transition-all duration-300 hover:border-pink-500/60 hover:shadow-[0_0_30px_rgba(255,26,174,0.15)] md:p-8">
            <div className="typo-landing-body mb-8 inline-flex w-fit items-center gap-2 rounded-[5px] bg-[#FFFFFF1A] px-5 py-3 font-bold tracking-widest uppercase dark:text-[#FF77B8]">
              <Scissors size={14} />
              Clipper
            </div>

            <h3 className="typo-landing-card-heading mb-5 uppercase lg:mb-12 dark:text-white">
              &quot;I WANT TO EARN MONEY POSTING CLIPS&quot;
            </h3>

            <p className="typo-landing-body3 mb-5 lg:mb-15 dark:text-[#FFFFFFB2]">
              Turn your editing skills into income. No audience needed. Just
              clip viral content, post on your account, and get paid for every
              view.
            </p>

            <div className="mt-auto mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                "No followers required",
                "Work with top brands",
                "Earn per view instantly",
                "Weekly transparent payouts",
              ].map((item) => (
                <div
                  key={item}
                  className="typo-landing-body3 flex items-center gap-3 dark:text-white"
                >
                  <Scissors size={16} className="text-[#FF77B8]" />
                  {item}
                </div>
              ))}
            </div>

            <a
              href="#join-waitlist"
              className="typo-landing-cta block w-full cursor-pointer rounded-[4px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-1 text-center uppercase transition-transform"
            >
              Start Clipping
            </a>
          </div>

          {/* UGC Creator Card */}
          <div className="group relative flex flex-col overflow-hidden rounded-[10px] border-[1.5px] border-[#312A42] bg-[linear-gradient(137deg,#12042B_2.66%,#170E27_97.34%)] p-6 shadow-2xl shadow-blue-950/10 transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] md:p-8">
            <div className="typo-landing-body mb-8 inline-flex w-fit items-center gap-2 rounded-[5px] bg-[#2A154E] px-5 py-3 font-bold tracking-widest uppercase dark:text-[#C7ADFF]">
              <Clapperboard size={14} />
              UGC Creator
            </div>

            <h3 className="typo-landing-card-heading mb-6 uppercase lg:mb-0 dark:text-white">
              &quot;I AM A NEW UGC CREATOR, READY TO MAKE MONEY&quot;
            </h3>

            <p className="typo-landing-body3 mb-5 lg:mb-10 dark:text-[#FFFFFFB2]">
              Finally get paid for your content. Create authentic videos for
              real brands and earn based on views. Grow your audience while
              making money.
            </p>

            <div className="mt-auto mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                "Work with premium brands",
                "Grow your following",
                "Get paid per view",
                "Real recognition",
              ].map((item) => (
                <div
                  key={item}
                  className="typo-landing-body3 flex items-center gap-3 dark:text-white"
                >
                  <Clapperboard size={16} className="text-[#C7ADFF]" />
                  {item}
                </div>
              ))}
            </div>

            <a
              href="#join-waitlist"
              className="typo-landing-cta block w-full cursor-pointer rounded-[4px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-1 text-center uppercase transition-transform"
            >
              Book A Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsThisFor;
