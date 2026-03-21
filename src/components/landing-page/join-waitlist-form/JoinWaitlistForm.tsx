"use client";
import React, { useState } from "react";
import { Scissors, Clapperboard } from "lucide-react";
import { WaitlistSchema } from "@/lib/validations/waitlist";
import WaitlistSuccessModal from "./WaitlistSuccessModal";
import { fa } from "zod/v4/locales";

const WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxyGRKTx4X96nm-QZLzMYSRtVeOujQOv9MqAGhBJI4af6tE7sTwCyQQWe44QhEWRbBO/exec";

const JoinWaitlistForm: React.FC = () => {
  const [role, setRole] = useState<"clipper" | "creator">("clipper");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError("");

    const result = WaitlistSchema.safeParse({
      userRole: role,
      name,
      email,
      phoneNo,
      instagramId,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(result.data),
      });

      setShowSuccessModal(true);
      setName("");
      setEmail("");
      setPhoneNo("");
      setInstagramId("");
    } catch {
      setSubmitError(
        "Failed to submit. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="join-waitlist"
      className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 text-white md:py-20 dark:bg-[#0A0A0A]"
    >
      {/* Headings */}
      <div className="mb-8 space-y-3 text-center md:mb-12 md:space-y-4">
        <h1 className="typo-landing-section-heading text-black uppercase dark:text-white">
          Don&apos;t get left behind
        </h1>
        <p className="typo-landing-section-sub-heading mx-auto max-w-6xl text-[#000000B2] uppercase dark:text-[#FFFFFFB2]">
          The waitlist is filling up. Get early access and start earning before
          everyone else.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-lg rounded-md border border-[rgba(176,0,255,0.27)] bg-[linear-gradient(92deg,rgba(106,71,255,0.13)_0%,rgba(255,255,255,0.13)_100%)] p-5 shadow-[5px_19px_40px_0_rgba(176,0,255,0.05),-12px_-34px_40px_0_rgba(176,0,255,0.06)] backdrop-blur-[27.1px] md:p-8 dark:border-[#B000FF] dark:bg-[linear-gradient(139.06deg,rgba(176,0,255,0)_0%,rgba(104,18,144,0.46)_50%,rgba(67,26,89,0.75)_75%,#1F2321_100%)] dark:shadow-[5px_11px_40px_0_rgba(176,0,255,0.17),-12px_-16px_40px_0_rgba(176,0,255,0.17)]">
        {/* Toggle Buttons */}
        <div className="mb-5 flex gap-2 rounded-[16px] p-1 backdrop-blur-[20px] md:mb-8 md:gap-4">
          <div
            className={`flex-1 rounded-[12px] ${
              role === "clipper"
                ? "p-0 dark:bg-[linear-gradient(90deg,#A855F7_0%,#EC4899_100%)] dark:p-[1.5px]"
                : "p-0 dark:p-[1.5px]"
            }`}
          >
            <button
              onClick={() => setRole("clipper")}
              className={`flex w-full items-center justify-center gap-2 rounded-[12px] py-2 md:py-3 ${
                role === "clipper"
                  ? "bg-[linear-gradient(90deg,#A855F7_0%,#EC4899_100%)] text-white dark:rounded-[10.5px] dark:bg-[#0F172A] dark:bg-none"
                  : "cursor-pointer bg-transparent text-[#00000066] dark:text-[#F8FAFCB2]"
              }`}
            >
              <Scissors
                size={16}
                style={{ color: role === "clipper" ? "#FF77B8" : "#9ca3af" }}
              />
              <span className="typo-landing-body4">I&apos;m a Clipper</span>
            </button>
          </div>

          <div
            className={`flex-1 rounded-[12px] ${
              role === "creator"
                ? "p-0 dark:bg-[linear-gradient(90deg,#A855F7_0%,#EC4899_100%)] dark:p-[1.5px]"
                : "p-0 dark:p-[1.5px]"
            }`}
          >
            <button
              onClick={() => setRole("creator")}
              className={`flex w-full items-center justify-center gap-2 rounded-[12px] py-2 md:py-3 ${
                role === "creator"
                  ? "bg-[linear-gradient(90deg,#A855F7_0%,#EC4899_100%)] text-white dark:rounded-[10.5px] dark:bg-[#0F172A] dark:bg-none"
                  : "cursor-pointer bg-transparent text-[#00000066] dark:text-[#F8FAFCB2]"
              }`}
            >
              <Clapperboard
                size={16}
                style={{ color: role === "creator" ? "#C7ADFF" : "#9ca3af" }}
              />
              <span className="typo-landing-body4">I&apos;m a Creator</span>
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="typo-landing-body4 text-black dark:text-white">
              Full Name <span className="text-blue-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="typo-landing-body3 w-full rounded-[4px] border border-black/10 bg-white p-2.5 text-gray-600 outline-none placeholder:text-gray-600 focus:border-purple-500 md:p-3 dark:border-white/10 dark:bg-black/50"
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="typo-landing-body4 text-black dark:text-white">
              Email <span className="text-blue-400">*</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="typo-landing-body3 w-full rounded-[4px] border border-black/10 bg-white p-2.5 text-gray-600 outline-none placeholder:text-gray-600 focus:border-purple-500 md:p-3 dark:border-white/10 dark:bg-black/50"
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="typo-landing-body4 text-black dark:text-white">
              Phone number <span className="text-blue-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="00000 00000"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="typo-landing-body3 w-full rounded-[4px] border border-black/10 bg-white p-2.5 text-gray-600 outline-none placeholder:text-gray-600 focus:border-purple-500 md:p-3 dark:border-white/10 dark:bg-black/50"
            />
            {errors.phoneNo && (
              <span className="text-xs text-red-500">{errors.phoneNo}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="typo-landing-body4 text-black dark:text-white">
              Instagram Handle{" "}
              <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="@yourusername"
              value={instagramId}
              onChange={(e) => setInstagramId(e.target.value)}
              className="typo-landing-body3 w-full rounded-[4px] border border-black/10 bg-white p-2.5 text-gray-600 outline-none placeholder:text-gray-600 focus:border-purple-500 md:p-3 dark:border-white/10 dark:bg-black/50"
            />
          </div>

          {submitError && (
            <p className="text-center text-sm text-red-500">{submitError}</p>
          )}

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="typo-landing-cta w-full cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-12 py-1 uppercase transition-transform disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:px-14"
            >
              {isSubmitting ? "Submitting..." : "Join the Waitlist"}
            </button>
            <p className="font-dm-sans-400 mt-4 text-[14px] tracking-wide capitalize dark:text-white">
              No spam. Just opportunity.
            </p>
          </div>
        </form>
      </div>
      <WaitlistSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </section>
  );
};

export default JoinWaitlistForm;
