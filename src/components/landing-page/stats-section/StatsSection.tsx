"use client";

import React, { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";
import lightStatsBg from "@/components/landing-page/data/lightStats.png";
import darkStatsBg from "@/components/landing-page/data/darkStats.png";
import lightStatsSM from "@/components/landing-page/data/lightStatsSM.png";
import darkStatsSM from "@/components/landing-page/data/darkStatsSM.png";

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart for a smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="h-6 w-6 md:h-8 md:w-8"
    fill="none"
  >
    <path
      d="M2.731 35.5767C2.24067 35.5767 1.8295 35.4109 1.4975 35.0792C1.16583 34.7472 1 34.3361 1 33.8457V33.1382C1 31.8076 1.69483 30.7146 3.0845 29.8592C4.4745 29.0042 6.28617 28.5767 8.5195 28.5767C8.8885 28.5767 9.26017 28.5882 9.6345 28.6112C10.0088 28.6342 10.3858 28.6791 10.7655 28.7457C10.3758 29.3691 10.0867 30.0159 9.898 30.6862C9.70967 31.3569 9.6155 32.0447 9.6155 32.7497V35.5767H2.731ZM14.8155 35.5767C14.2948 35.5767 13.8622 35.4034 13.5175 35.0567C13.1725 34.7104 13 34.2811 13 33.7687V32.8267C13 31.8904 13.2628 31.0346 13.7885 30.2592C14.3142 29.4836 15.0718 28.8074 16.0615 28.2307C17.0512 27.6537 18.2205 27.2211 19.5695 26.9327C20.9182 26.6441 22.3925 26.4997 23.9925 26.4997C25.6232 26.4997 27.1128 26.6441 28.4615 26.9327C29.8102 27.2211 30.9793 27.6537 31.969 28.2307C32.959 28.8074 33.7117 29.4836 34.227 30.2592C34.7423 31.0346 35 31.8904 35 32.8267V33.7687C35 34.2811 34.8267 34.7104 34.48 35.0567C34.1337 35.4034 33.7043 35.5767 33.192 35.5767H14.8155ZM38.3845 35.5767V32.7522C38.3845 31.9992 38.2955 31.2907 38.1175 30.6267C37.9392 29.9627 37.6718 29.3357 37.3155 28.7457C37.7078 28.6791 38.0828 28.6342 38.4405 28.6112C38.7982 28.5882 39.1513 28.5767 39.5 28.5767C41.7333 28.5767 43.5417 28.9992 44.925 29.8442C46.3083 30.6889 47 31.7869 47 33.1382V33.8457C47 34.3361 46.8342 34.7472 46.5025 35.0792C46.1705 35.4109 45.7593 35.5767 45.269 35.5767H38.3845ZM16.154 32.5767H31.877V32.3652C31.672 31.5576 30.8207 30.8781 29.323 30.3267C27.8257 29.7754 26.0513 29.4997 24 29.4997C21.9487 29.4997 20.1743 29.7754 18.677 30.3267C17.1793 30.8781 16.3383 31.5576 16.154 32.3652V32.5767ZM8.514 26.6342C7.57133 26.6342 6.766 26.2991 6.098 25.6287C5.43 24.9584 5.096 24.1526 5.096 23.2112C5.096 22.2576 5.43133 21.4519 6.102 20.7942C6.77233 20.1366 7.57817 19.8077 8.5195 19.8077C9.47317 19.8077 10.282 20.1366 10.946 20.7942C11.6103 21.4519 11.9425 22.2596 11.9425 23.2172C11.9425 24.1466 11.6138 24.9484 10.9565 25.6227C10.2995 26.2971 9.48533 26.6342 8.514 26.6342ZM39.5 26.6342C38.5667 26.6342 37.7628 26.2971 37.0885 25.6227C36.4142 24.9484 36.077 24.1466 36.077 23.2172C36.077 22.2596 36.4142 21.4519 37.0885 20.7942C37.7628 20.1366 38.5678 19.8077 39.5035 19.8077C40.4678 19.8077 41.2788 20.1366 41.9365 20.7942C42.5942 21.4519 42.923 22.2576 42.923 23.2112C42.923 24.1526 42.595 24.9584 41.939 25.6287C41.283 26.2991 40.47 26.6342 39.5 26.6342ZM24.007 24.9997C22.5663 24.9997 21.3397 24.4949 20.327 23.4852C19.3143 22.4759 18.808 21.2501 18.808 19.8077C18.808 18.3364 19.3127 17.1032 20.322 16.1082C21.3317 15.1129 22.5577 14.6152 24 14.6152C25.471 14.6152 26.7042 15.1122 27.6995 16.1062C28.6945 17.0999 29.192 18.3314 29.192 19.8007C29.192 21.2411 28.6952 22.4677 27.7015 23.4807C26.7075 24.4934 25.476 24.9997 24.007 24.9997ZM24.0095 21.9997C24.6212 21.9997 25.1378 21.7857 25.5595 21.3577C25.9815 20.9294 26.1925 20.4094 26.1925 19.7977C26.1925 19.1864 25.9823 18.6697 25.562 18.2477C25.1417 17.8261 24.621 17.6152 24 17.6152C23.395 17.6152 22.8783 17.8254 22.45 18.2457C22.0217 18.6657 21.8075 19.1864 21.8075 19.8077C21.8075 20.4127 22.0217 20.9294 22.45 21.3577C22.8783 21.7857 23.3982 21.9997 24.0095 21.9997Z"
      fill="url(#paint0_linear_3010_913)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3010_913"
        x1="24"
        y1="14.6152"
        x2="24"
        y2="35.5767"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6A3CFF" />
        <stop offset="0.288462" stopColor="#B000FF" />
        <stop offset="0.615385" stopColor="#FF1AAE" />
        <stop offset="1" stopColor="#FF4FA3" />
      </linearGradient>
    </defs>
  </svg>
);

const RupeeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="h-6 w-6 md:h-8 md:w-8"
    fill="none"
  >
    <path
      d="M28.4925 34.404C28.7822 34.1347 28.9405 33.8077 28.9675 33.423C28.9942 33.0383 28.8627 32.7012 28.573 32.4115L22.6385 26.1L22.6885 25.95H23.1885C25.0655 25.95 26.6085 25.4257 27.8175 24.377C29.0262 23.3283 29.7383 22.0193 29.954 20.45H30.9385C31.2215 20.45 31.4552 20.3518 31.6395 20.1555C31.8235 19.9592 31.9155 19.7207 31.9155 19.44C31.9155 19.1597 31.8235 18.9272 31.6395 18.7425C31.4552 18.5578 31.2215 18.4655 30.9385 18.4655H29.904C29.804 17.8628 29.6065 17.3045 29.3115 16.7905C29.0165 16.2762 28.6473 15.8023 28.204 15.369H30.9385C31.2215 15.369 31.4552 15.2708 31.6395 15.0745C31.8235 14.8782 31.9155 14.6398 31.9155 14.3595C31.9155 14.0788 31.8235 13.8462 31.6395 13.6615C31.4552 13.4768 31.2215 13.3845 30.9385 13.3845H17.246C16.9257 13.3845 16.652 13.4983 16.425 13.726C16.198 13.9533 16.0845 14.2277 16.0845 14.549C16.0845 14.8703 16.198 15.1387 16.425 15.354C16.652 15.5693 16.9257 15.677 17.246 15.677H23.173C24.2577 15.677 25.1487 15.9322 25.846 16.4425C26.5437 16.9525 26.9925 17.6268 27.1925 18.4655H17.0615C16.7785 18.4655 16.5448 18.5637 16.3605 18.76C16.1765 18.9563 16.0845 19.1948 16.0845 19.4755C16.0845 19.7558 16.1765 19.9883 16.3605 20.173C16.5448 20.3577 16.7785 20.45 17.0615 20.45H27.2425C27.0682 21.3603 26.6238 22.102 25.9095 22.675C25.1955 23.248 24.2525 23.5345 23.0805 23.5345H20.681C20.284 23.5345 19.9405 23.6282 19.6505 23.8155C19.3605 24.0025 19.145 24.2602 19.004 24.5885C18.863 24.9168 18.8193 25.2502 18.873 25.5885C18.927 25.9268 19.0912 26.2498 19.3655 26.5575L26.5195 34.354C26.7885 34.6437 27.1122 34.7917 27.4905 34.798C27.8685 34.8043 28.2025 34.673 28.4925 34.404ZM24.0035 43C21.3755 43 18.9053 42.5013 16.593 41.504C14.2807 40.5067 12.2693 39.1532 10.559 37.4435C8.84867 35.7338 7.4945 33.7233 6.4965 31.412C5.49883 29.1007 5 26.6312 5 24.0035C5 21.3755 5.49867 18.9053 6.496 16.593C7.49333 14.2807 8.84683 12.2693 10.5565 10.559C12.2662 8.84867 14.2767 7.4945 16.588 6.4965C18.8993 5.49883 21.3688 5 23.9965 5C26.6245 5 29.0947 5.49867 31.407 6.496C33.7193 7.49333 35.7307 8.84683 37.441 10.5565C39.1513 12.2662 40.5055 14.2767 41.5035 16.588C42.5012 18.8993 43 21.3688 43 23.9965C43 26.6245 42.5013 29.0947 41.504 31.407C40.5067 33.7193 39.1532 35.7307 37.4435 37.441C35.7338 39.1513 33.7233 40.5055 31.412 41.5035C29.1007 42.5012 26.6312 43 24.0035 43ZM24 40C28.4667 40 32.25 38.45 35.35 35.35C38.45 32.25 40 28.4667 40 24C40 19.5333 38.45 15.75 35.35 12.65C32.25 9.55 28.4667 8 24 8C19.5333 8 15.75 9.55 12.65 12.65C9.55 15.75 8 19.5333 8 24C8 28.4667 9.55 32.25 12.65 35.35C15.75 38.45 19.5333 40 24 40Z"
      fill="url(#paint0_linear_3010_928)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3010_928"
        x1="24"
        y1="5"
        x2="24"
        y2="43"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6A3CFF" />
        <stop offset="0.288462" stopColor="#B000FF" />
        <stop offset="0.615385" stopColor="#FF1AAE" />
        <stop offset="1" stopColor="#FF4FA3" />
      </linearGradient>
    </defs>
  </svg>
);

const MegaphoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="h-6 w-6 md:h-8 md:w-8"
    fill="none"
  >
    <path
      d="M37.3862 25.4991H33.1557C32.73 25.4991 32.3735 25.3554 32.0862 25.0681C31.7992 24.7811 31.6557 24.4248 31.6557 23.9991C31.6557 23.5734 31.7992 23.2171 32.0862 22.9301C32.3735 22.6428 32.73 22.4991 33.1557 22.4991H37.3862C37.8119 22.4991 38.1684 22.6428 38.4557 22.9301C38.7427 23.2171 38.8862 23.5734 38.8862 23.9991C38.8862 24.4248 38.7427 24.7811 38.4557 25.0681C38.1684 25.3554 37.8119 25.4991 37.3862 25.4991ZM29.0672 33.4261C29.3235 33.0748 29.651 32.8721 30.0497 32.8181C30.4484 32.7644 30.8234 32.8658 31.1747 33.1221L34.5477 35.6566C34.899 35.9133 35.1017 36.2409 35.1557 36.6396C35.2094 37.0383 35.108 37.4133 34.8517 37.7646C34.5954 38.1156 34.2679 38.3181 33.8692 38.3721C33.4702 38.4261 33.0952 38.3248 32.7442 38.0681L29.3707 35.5336C29.0197 35.2773 28.8172 34.9498 28.7632 34.5511C28.7095 34.1524 28.8109 33.7774 29.0672 33.4261ZM34.4707 12.2646L31.0977 14.7991C30.7464 15.0554 30.3714 15.1568 29.9727 15.1031C29.574 15.0491 29.2465 14.8464 28.9902 14.4951C28.7339 14.1441 28.6325 13.7691 28.6862 13.3701C28.7402 12.9714 28.9429 12.6439 29.2942 12.3876L32.6672 9.85309C33.0185 9.59676 33.3935 9.49543 33.7922 9.54909C34.1909 9.60309 34.5184 9.80559 34.7747 10.1566C35.031 10.5079 35.1324 10.8829 35.0787 11.2816C35.0247 11.6806 34.822 12.0083 34.4707 12.2646ZM14.5402 28.9991H8.92469C8.40935 28.9991 7.97935 28.8266 7.63469 28.4816C7.28969 28.1369 7.11719 27.7068 7.11719 27.1911V20.8071C7.11719 20.2914 7.28969 19.8613 7.63469 19.5166C7.97935 19.1716 8.40935 18.9991 8.92469 18.9991H14.5402L20.5247 13.0146C21.0044 12.5353 21.5564 12.4256 22.1807 12.6856C22.805 12.9459 23.1172 13.4171 23.1172 14.0991V33.8991C23.1172 34.5811 22.805 35.0523 22.1807 35.3126C21.5564 35.5726 21.0044 35.4629 20.5247 34.9836L14.5402 28.9991ZM20.1172 17.6991L15.8172 21.9991H10.1172V25.9991H15.8172L20.1172 30.2991V17.6991Z"
      fill="url(#paint0_linear_3010_942)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3010_942"
        x1="23.0017"
        y1="9.53516"
        x2="23.0017"
        y2="38.3862"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6A3CFF" />
        <stop offset="0.288462" stopColor="#B000FF" />
        <stop offset="0.615385" stopColor="#FF1AAE" />
        <stop offset="1" stopColor="#FF4FA3" />
      </linearGradient>
    </defs>
  </svg>
);

const stats = [
  {
    id: 1,
    icon: <UsersIcon />,
    numericValue: 1200,
    prefix: "",
    suffix: "+",
    label: "Creators on the Waitlist",
    trend: "148 New Creators Joined Today",
  },
  {
    id: 2,
    icon: <RupeeIcon />,
    numericValue: 10,
    prefix: "₹",
    suffix: "L+",
    label: "In Campaigns Ready to Launch",
    trend: "₹85K Paid To Creators Today",
  },
  {
    id: 3,
    icon: <MegaphoneIcon />,
    numericValue: 50,
    prefix: "",
    suffix: "+",
    label: "Brand Partners Lined Up",
    trend: "18 New Campaigns Today",
  },
];

function StatCard({
  stat,
  isLast,
}: {
  stat: (typeof stats)[number];
  isLast: boolean;
}) {
  const { count, ref } = useCountUp(stat.numericValue);

  return (
    <div
      className={`group relative flex h-full flex-col items-center rounded-[10px] border-[1.5px] border-[#312A42] bg-[linear-gradient(92deg,rgba(106,71,255,0.13)_0%,rgba(255,255,255,0.13)_100%)] px-4.5 pt-12 pb-3.5 transition-all duration-500 hover:border-purple-500/40 md:pt-21.25 dark:bg-gradient-to-b dark:from-purple-900/20 dark:to-transparent ${isLast ? "col-span-2 mx-auto mt-4 w-full max-w-[calc(50%-8px)] md:col-span-1 md:mx-0 md:mt-0 md:max-w-full" : ""}`}
    >
      {/* Floating Icon Container */}
      <div className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-[#312A42] bg-white shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-shadow group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] md:-top-8 md:h-16 md:w-16 dark:bg-black">
        {stat.icon}
      </div>

      {/* Value */}
      <h3
        ref={ref}
        className="typo-landing-section-heading mb-4 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        {stat.prefix}
        {count}
        {stat.suffix}
      </h3>

      {/* Label */}
      <p className="typo-landing-body3 mb-10 text-center text-black dark:text-white">
        {stat.label}
      </p>

      {/* Trend Footer */}
      <div className="typo-landing-body3 flex items-center justify-end gap-2 text-[#FF4FA3] capitalize">
        <TrendingUp size={18} />
        <span>{stat.trend}</span>
      </div>
    </div>
  );
}

const StatsSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-10 text-white md:py-20 lg:px-6 lg:py-24 dark:bg-[#0A0A0A]">
      {/* Stats Background PNGs - Light */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[length:100%_100%] bg-center bg-no-repeat md:hidden dark:hidden"
        style={{ backgroundImage: `url(${lightStatsSM.src})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden bg-[length:100%_100%] bg-center bg-no-repeat md:block dark:hidden"
        style={{ backgroundImage: `url(${lightStatsBg.src})` }}
      />
      {/* Stats Background PNGs - Dark */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden bg-[length:100%_100%] bg-center bg-no-repeat dark:block dark:md:hidden"
        style={{ backgroundImage: `url(${darkStatsSM.src})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden bg-[length:100%_100%] bg-center bg-no-repeat dark:md:block"
        style={{ backgroundImage: `url(${darkStatsBg.src})` }}
      />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Header */}
        <div className="mb-20 space-y-4">
          <h2 className="typo-landing-section-heading text-black uppercase dark:text-white">
            THE NUMBERS SPEAK
          </h2>
          <p className="typo-landing-eyebrow text-[#000000B2] uppercase dark:text-[#FFFFFFB2]">
            Live Stats Updating in Real Time
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-[25px]">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              isLast={index === stats.length - 1}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-20">
          <a
            href="#join-waitlist"
            className="typo-landing-cta cursor-pointer bg-gradient-to-r from-[#7c3aed] to-[#db2777] px-12 py-2 uppercase shadow-lg shadow-purple-500/20 md:px-14"
          >
            Don&apos;t Miss Out
          </a>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
