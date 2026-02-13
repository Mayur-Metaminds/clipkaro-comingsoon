import React from "react";

const steps = [
  {
    id: 1,
    icon: "/images/comingsoon/step3.svg",
    title: "1. Join a campaign",
    description:
      "Brands create campaigns on ClipKaro. Browse active campaigns and see how much you earn per 1,000 views.",
  },
  {
    id: 2,
    icon: "/images/comingsoon/step2.svg",
    title: "2. Post Your Reel or Short",
    description:
      "Post your video with the right hashtags and mentions. Submit the link on ClipKaro. Views are tracked automatically.",
  },
  {
    id: 3,
    icon: "/images/comingsoon/step1.svg",
    title: "3. Get Paid After Approval",
    description:
      "Once your video is reviewed and approved, you earn money based on real views.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="w-full pb-6 lg:py-20 px-4 z-10 relative">
      {/* Title section  */}
      <div className="mx-auto max-w-[989px] mb-[150px] z-20 w-full">
        <h2 className="  text-center  font-dm-sans-600 text-[28px] md:text-[64px]  leading-[110%]  tracking-[-1.28px]  max-w-5xl  mx-auto">
          <span
            className="
    bg-[linear-gradient(128deg,#D9E7FF_25.87%,#95A9CC_74.13%)]
    bg-clip-text
    text-transparent
  "
          >
            The secret to earning ₹50,000+ monthly from your phone
            <br className="hidden md:block" />
            (no followers needed!)
          </span>
        </h2>
      </div>
      <div className="max-w-6xl -mt-10 md:mt-0 mx-auto">
        <h2
          className=" text-center  font-dm-sans-600 text-[28px] md:text-[40px]    leading-[110%]  tracking-[-0.8px]  mb-16  bg-[linear-gradient(128deg,#D9E7FF_25.87%,#95A9CC_74.13%)] bg-clip-text text-transparent
"
        >
          How it works
        </h2>

        <div className="relative overflow-hidden flex flex-col md:flex-row justify-between items-center lg:items-start gap-12 md:gap-4">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[13%] right-[13%] h-[2px]  z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="833"
              height="4"
              viewBox="0 0 833 4"
              fill="none"
              className="w-[90%]"
            >
              <path
                d="M0.00195312 1L833.002 2.4614"
                stroke="white"
                stroke-opacity="0.5"
                stroke-width="2"
                stroke-dasharray="15 7"
              />
            </svg>
          </div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="relative z-10 flex-1 flex flex-col items-center justify-between text-center group"
            >
              <div className=" w-24 h-24  rounded-full  bg-[rgba(40,67,100,0.5)]  backdrop-blur-[10px]  flex items-center justify-center mb-6">
                <div className="w-12 h-12 text-white">
                  <img src={step.icon} className="w-full h-full stroke-[1.5]" />
                </div>
              </div>

              <h3 className=" text-center font-dm-sans-600 text-[24px]    leading-[110%]  tracking-[-0.48px]  mb-3  bg-[linear-gradient(180deg,#D9E7FF_21.44%,#95A9CC_79.99%)]  bg-clip-text  text-transparent">
                {step?.title}
              </h3>

              <p className="  text-center  font-dm-sans-500  text-[14px]   leading-[150%] tracking-[-0.28px]  text-[#D9E7FF]/70  max-w-[312px] w-full  mx-auto">
                {step?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
