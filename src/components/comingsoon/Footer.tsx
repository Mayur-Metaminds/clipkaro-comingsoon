import React from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full -pt-8  pb-8 md:py-8 px-4 z-20 relative ">
      <div className="max-w-4xl relative mx-auto flex flex-col items-center text-center space-y-1">
        <h3
          className=" relative text-center  font-dm-sans-600 text-[16px] md:text-[20px]  leading-[29px]  tracking-[-0.4px]  bg-[linear-gradient(128deg,#95A9CC_25.87%,#BBCFF0_74.13%)]  bg-clip-text
  text-transparent"
        >
          FOLLOW OUR JOURNEY
        </h3>

        <p
          className="  text-center  font-dm-sans-600
  text-[13px] md:text-[20px]    leading-[29px]  tracking-[-0.4px]  text-[rgba(149,169,204,0.70)]
"
        >
          Get exclusive updates, tips, and early access
        </p>

        <div className="flex items-center  mt-10 gap-6 md:gap-24">
          <a
            href="#"
            className="flex items-center gap-2 text-white text-center font-dm-sans-600 text-[16px] md:text-[20px]  leading-[29px] tracking-[-0.4px] hover:text-white/80  transition-colors"
          >
            {/* <Instagram /> */}
            <img src="/images/comingsoon/instagram.svg" alt="" />
            <span className="font-dm-sans-600 tracking-[-0.4px] ">
              Instagram
            </span>
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-white text-center font-dm-sans-600 text-[16px] md:text-[20px]  leading-[29px] tracking-[-0.4px] hover:text-white/80 transition-colors"
          >
            <img src="/images/comingsoon/x.svg" alt="" />
            <span className="font-dm-sans-600">Twitter</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-white text-center font-dm-sans-600 text-[16px] md:text-[20px] leading-[29px] tracking-[-0.4px] hover:text-white/80  transition-colors"
          >
            <img src="/images/comingsoon/linkedin.svg" alt="" />
            <span className="font-dm-sans-600">Linkedin</span>
          </a>
        </div>

        <p className="  text-center  font-dm-sans-600 text-[12px] md:text-[20px]    leading-[29px]  tracking-[-0.4px]  text-[#95A9CC]/70  mt-8">
          Tag us in your clips with #ClipKaroCreator
        </p>
      </div>
    </footer>
  );
};
