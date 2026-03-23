"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import lightStatsBg from "../data/lightStats.png";
import darkStatsBg from "../data/darkStats.png";
import lightStatsSM from "../data/lightStatsSM.png";
import darkStatsSM from "../data/darkStatsSM.png";

const steps = [
  {
    id: 1,
    number: "1",
    title: "SIGN UP & GET VERIFIED",
    description:
      "Join the waitlist and get early access to premium brand campaigns. Setup takes less than 5 minutes.",
  },
  {
    id: 2,
    number: "2",
    title: "CREATE & POST CONTENT",
    description:
      "Browse campaigns from top brands. Create clips or original content. Post on your account and watch views roll in.",
  },
  {
    id: 3,
    number: "3",
    title: "GET PAID EVERY WEEK",
    description:
      "Get paid for every view your content generates. Transparent earnings, weekly payouts straight to your account.",
  },
];

const desktopStops = [0, 0.15, 0.5, 0.85, 1];
const backgroundLift = "clamp(10rem, 20vw, 20rem)";

const SectionBackground = () => (
  <>
    {/* Light - SM */}
    <div
      className="pointer-events-none absolute right-0 left-0 z-[2] bg-[length:100%_100%] bg-no-repeat md:hidden dark:hidden"
      style={{
        backgroundImage: `url(${lightStatsSM.src})`,
        top: `calc(-1 * ${backgroundLift})`,
        height: `calc(100% + ${backgroundLift})`,
        backgroundPosition: "center top",
      }}
    />
    {/* Light - MD+ */}
    <div
      className="pointer-events-none absolute right-0 left-0 z-[2] hidden bg-[length:100%_100%] bg-no-repeat md:block dark:hidden"
      style={{
        backgroundImage: `url(${lightStatsBg.src})`,
        top: `calc(-1 * ${backgroundLift})`,
        height: `calc(100% + ${backgroundLift})`,
        backgroundPosition: "center top",
      }}
    />
    {/* Dark - SM */}
    <div
      className="pointer-events-none absolute right-0 left-0 z-[2] hidden bg-[length:100%_100%] bg-no-repeat dark:block dark:md:hidden"
      style={{
        backgroundImage: `url(${darkStatsSM.src})`,
        top: `calc(-1 * ${backgroundLift})`,
        height: `calc(100% + ${backgroundLift})`,
        backgroundPosition: "center top",
      }}
    />
    {/* Dark - MD+ */}
    <div
      className="pointer-events-none absolute right-0 left-0 z-[2] hidden bg-[length:100%_100%] bg-no-repeat dark:md:block"
      style={{
        backgroundImage: `url(${darkStatsBg.src})`,
        top: `calc(-1 * ${backgroundLift})`,
        height: `calc(100% + ${backgroundLift})`,
        backgroundPosition: "center top",
      }}
    />
  </>
);

const NeonConnector = ({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) => {
  const sizeClasses =
    orientation === "vertical" ? "h-20 w-[3px]" : "h-[3px] w-full";
  const gradientClasses =
    orientation === "vertical"
      ? "bg-gradient-to-b from-[#7c3aed] via-[#d946ef] to-[#ff4d9d]"
      : "bg-gradient-to-r from-[#7c3aed] via-[#d946ef] to-[#ff4d9d]";

  return (
    <div className={`relative ${sizeClasses}`}>
      <div
        className={`absolute inset-0 rounded-full ${gradientClasses} opacity-85 blur-[10px]`}
      />
      <div className={`absolute inset-0 rounded-full ${gradientClasses}`} />
    </div>
  );
};

const ThreeStepProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopViewportRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const connector12Ref = useRef<HTMLDivElement>(null);
  const connector23Ref = useRef<HTMLDivElement>(null);
  const [desktopTrackOffsets, setDesktopTrackOffsets] = useState({
    start: "55%",
    mid: "0%",
    end: "-55%",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
    restDelta: 0.001,
  });

  const measureDesktopTrackOffsets = useCallback(() => {
    if (window.innerWidth < 1024) {
      return;
    }

    const viewportEl = desktopViewportRef.current;
    const trackEl = desktopTrackRef.current;
    const connector12El = connector12Ref.current;
    const connector23El = connector23Ref.current;

    if (!viewportEl || !trackEl || !connector12El || !connector23El) {
      return;
    }

    if (viewportEl.clientWidth === 0 || trackEl.scrollWidth === 0) {
      return;
    }

    const viewportCenter = viewportEl.clientWidth / 2;
    const connector12Center =
      connector12El.offsetLeft + connector12El.offsetWidth / 2;
    const connector23Center =
      connector23El.offsetLeft + connector23El.offsetWidth / 2;

    const startX = viewportCenter - connector12Center;
    const endX = viewportCenter - connector23Center;
    const midX = (startX + endX) / 2;

    const nextOffsets = {
      start: `${startX}px`,
      mid: `${midX}px`,
      end: `${endX}px`,
    };

    setDesktopTrackOffsets((currentOffsets) => {
      if (
        currentOffsets.start === nextOffsets.start &&
        currentOffsets.mid === nextOffsets.mid &&
        currentOffsets.end === nextOffsets.end
      ) {
        return currentOffsets;
      }

      return nextOffsets;
    });
  }, []);

  useEffect(() => {
    let frameId: number | null = null;

    const scheduleMeasurement = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        measureDesktopTrackOffsets();
        frameId = null;
      });
    };

    scheduleMeasurement();

    const viewportEl = desktopViewportRef.current;
    const trackEl = desktopTrackRef.current;
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            scheduleMeasurement();
          })
        : null;

    if (observer && viewportEl) {
      observer.observe(viewportEl);
    }

    if (observer && trackEl) {
      observer.observe(trackEl);
    }

    window.addEventListener("resize", scheduleMeasurement);

    return () => {
      window.removeEventListener("resize", scheduleMeasurement);
      observer?.disconnect();

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [measureDesktopTrackOffsets]);

  const trackX = useTransform(smoothProgress, desktopStops, [
    desktopTrackOffsets.start,
    desktopTrackOffsets.start,
    desktopTrackOffsets.mid,
    desktopTrackOffsets.end,
    desktopTrackOffsets.end,
  ]);

  const desktopStepOpacities = [
    useTransform(smoothProgress, desktopStops, [1, 1, 0.86, 0.45, 0.45]),
    useTransform(smoothProgress, desktopStops, [0.94, 0.94, 1, 0.96, 0.96]),
    useTransform(smoothProgress, desktopStops, [0.45, 0.45, 0.9, 1, 1]),
  ];

  const desktopStepScales = [
    useTransform(smoothProgress, desktopStops, [1, 1, 0.97, 0.94, 0.94]),
    useTransform(smoothProgress, desktopStops, [0.97, 0.97, 1, 0.985, 0.985]),
    useTransform(smoothProgress, desktopStops, [0.94, 0.94, 0.98, 1, 1]),
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-transparent px-4 py-10 lg:hidden">
        <SectionBackground />

        <div className="relative z-10 mx-auto max-w-md px-2">
          <div className="mb-12 text-center">
            <h2 className="typo-landing-section-heading text-black dark:text-white">
              START EARNING IN <br /> 3 STEPS
            </h2>
          </div>

          <div className="space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-5">
                  <span className="block [font-family:var(--landing-heading-font)] text-[64px] leading-none font-light tracking-[-0.04em] text-transparent [-webkit-text-stroke:0.5px_rgba(0,0,0,0.72)] dark:[-webkit-text-stroke:0.5px_rgba(255,255,255,0.72)]">
                    {step.number}
                  </span>
                  <div className="absolute inset-0 -z-10 rounded-full bg-fuchsia-500/20 blur-2xl" />
                </div>

                <div className="space-y-3">
                  <h3 className="typo-landing-signup bg-[linear-gradient(90deg,#6A3CFF_0%,#B000FF_40%,#FF1AAE_75%,#FF4FA3_100%)] bg-clip-text text-transparent">
                    {step.title}
                  </h3>
                  <p className="typo-landing-body3 mx-auto max-w-[280px] text-[#000000B2] dark:text-[#FFFFFFB2]">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 ? (
                  <div className="my-8 flex justify-center">
                    <NeonConnector orientation="vertical" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#join-waitlist"
              className="typo-landing-cta cursor-pointer bg-gradient-to-r from-[#7c3aed] to-[#db2777] px-12 py-2 text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-transform md:px-14"
            >
              START EARNING
            </a>
          </div>
        </div>
      </section>

      <section
        ref={containerRef}
        className="relative hidden h-[220vh] bg-transparent lg:block"
      >
        <div className="sticky top-0">
          <div className="relative mx-auto h-screen w-full overflow-hidden">
            <SectionBackground />

            <div className="relative z-10 flex h-full flex-col">
              <div className="text-center">
                <h2 className="typo-landing-section-heading text-black dark:text-white">
                  START EARNING IN <br /> 3 STEPS
                </h2>
              </div>

              <div className="mt-[clamp(1.75rem,4vw,3.5rem)] flex flex-1 flex-col">
                <div
                  ref={desktopViewportRef}
                  className="relative flex-1 overflow-hidden px-[clamp(0.25rem,1vw,1rem)]"
                >
                  <motion.div
                    ref={desktopTrackRef}
                    style={{ x: trackX }}
                    className="mx-auto flex w-max items-start gap-[clamp(2rem,8vw,12.5rem)]"
                  >
                    {steps.map((step, index) => (
                      <React.Fragment key={step.id}>
                        <motion.div
                          style={{
                            opacity: desktopStepOpacities[index],
                            scale: desktopStepScales[index],
                          }}
                          className="flex w-[clamp(11rem,22vw,16rem)] shrink-0 flex-col items-center text-center"
                        >
                          <div className="relative mb-[clamp(0.9rem,1.6vw,1.5rem)]">
                            <span className="block [font-family:var(--landing-heading-font)] text-[clamp(3.5rem,5.6vw,5rem)] leading-none font-light tracking-[-0.04em] text-transparent [-webkit-text-stroke:0.5px_rgba(0,0,0,0.72)] dark:[-webkit-text-stroke:0.5px_rgba(255,255,255,0.72)]">
                              {step.number}
                            </span>
                            <div className="absolute inset-0 -z-10 rounded-full bg-fuchsia-500/18 blur-[34px]" />
                          </div>

                          <div className="space-y-[clamp(0.55rem,1vw,0.85rem)]">
                            <h3 className="typo-landing-signup bg-[linear-gradient(90deg,#6A3CFF_0%,#B000FF_40%,#FF1AAE_75%,#FF4FA3_100%)] bg-clip-text text-transparent">
                              {step.title}
                            </h3>
                            <p className="typo-landing-body3 mx-auto max-w-[280px] text-[#000000B2] dark:text-[#FFFFFFB2]">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>

                        {index < steps.length - 1 ? (
                          <div
                            ref={
                              index === 0
                                ? connector12Ref
                                : index === 1
                                  ? connector23Ref
                                  : undefined
                            }
                            className="flex w-[clamp(6rem,16vw,18rem)] shrink-0 justify-center pt-[clamp(1.5rem,3.2vw,2.625rem)]"
                          >
                            <NeonConnector />
                          </div>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </motion.div>
                </div>

                <div className="z-20 pt-[clamp(2rem,4vw,3.5rem)] pb-[clamp(1rem,2vw,2rem)] text-center">
                  <a
                    href="#join-waitlist"
                    className="typo-landing-cta cursor-pointer bg-gradient-to-r from-[#7c3aed] to-[#db2777] px-12 py-2 text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-transform md:px-14"
                  >
                    START EARNING
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThreeStepProcess;
