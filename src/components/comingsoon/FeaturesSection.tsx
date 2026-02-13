import React from "react";
import {
  Wallet,
  TrendingUp,
  Smartphone,
  Users,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: "/images/comingsoon/Wallet.svg",
    title: "Fast & Clear Payments",
    description:
      "Track your earnings in real time. Approved payouts sent via UPI instantly.",
  },
  {
    icon: "/images/comingsoon/TrendUp.svg",
    title: "Real Views, Real Earnings",
    description:
      "Earn based on real performance. No hidden rules. No fake numbers",
  },
  {
    icon: "/images/comingsoon/DeviceMobile.svg",
    title: "Work From Anywhere",
    description:
      "Post from your own Instagram or YouTube. Just your phone and your effort.",
  },
  {
    icon: "/images/comingsoon/TrendUp.svg", // Using TrendingUp again for "Grow Your Skills" as per design implication or similar
    title: "Grow Your Skills",
    description:
      "Improve editing and content skills while working on real campaigns.",
  },
  {
    icon: "/images/comingsoon/Network.svg",
    title: "Supportive Creator Network",
    description:
      "Connect with creators and agencies building together in our community.",
  },
  {
    icon: "/images/comingsoon/SealCheck.svg",
    title: "Real Brands, Real Campaigns",
    description:
      "Work on verified campaigns with a transparent and clear payment structure.",
  },
];

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="relative p-6 md:h-[262px] flex items-start justify-end flex-col h-[210px] w-[327px]  md:w-[360px] xl:w-[383px] rounded-[10px] border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] ">
    <div className="w-15 h-15 rounded-[10px] bg-[#60A5FA33] flex items-center justify-center mb-[28px] group-hover:scale-105 transition-transform">
      {/* <Icon className="w-7 h-7 text-[#2E5BBA] fill-[#2E5BBA]/20" /> */}
      <img src={icon} alt="" />
    </div>

    <h3 className="text-[20px] md:text-[24px] leading-[110%] tracking-[-0.48px] font-dm-sans-600 text-white mb-[9px]">
      {title}
    </h3>
    <p className="text-[#D9E7FFB2] text-[13px] md:text-[16px] font-dm-sans-500  leading-[150%] tracking-[-0.32px]">
      {description}
    </p>
  </div>
);

export const FeaturesSection = () => {
  return (
    <section className="w-full py-14 md:py-24 px-4 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-[10px]">
          <span className="text-[#2E5BBA] font-medium tracking-widest text-[16px] tracking-[2.4px] leading-[150%] font-dm-sans-500 uppercase ">
            WHY CHOOSE CLIPKARO
          </span>
          <h2
            className=" mt-3 md:mt-0 text-center font-dm-sans-600 text-[28px] md:text-[40px] leading-[110%] tracking-[-0.8px]
  bg-[linear-gradient(128deg,#D9E7FF_25.87%,#95A9CC_74.13%)] bg-clip-text text-transparent
"
          >
            Built for transparent creator earnings.
          </h2>
          <p
            className="text-center font-dm-sans-500 text-[16px]   leading-[160%]  tracking-[-0.32px]  text-[#D9E7FF]/70  max-w-[556px]  mx-auto
"
          >
            We've removed the complexity from influencer marketing. Focus on
            creating great content while we handle the tracking, verification,
            and payouts.
          </p>
        </div>

        <div className="grid grid-cols-1 place-items-center xl:px-5 md:grid-cols-2 w-full xl:grid-cols-3 gap-x-[24px] gap-y-[34px]">
          {features?.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
