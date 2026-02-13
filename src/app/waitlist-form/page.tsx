"use client";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  instagramId: string;
};

export default function WaitlistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxbWkCUL9ENUWyugPEvJsTF90dcEdiGCYD2f8DJLaNvImDZ_XD5ubMVARX4xcZuiJY/exec",
        {
          method: "POST",
          mode: "no-cors",
          // headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      reset();
      return true;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <section className="bg-black px-4 lg:px-0 relative w-full h-screen flex flex-col gap-10 items-center justify-center">
      <div className="fixed top-0 w-screen h-screen opacity-50 z-0 ">
        <img
          src="/images/comingsoon/herobgimg.png"
          className="h-screen w-screen"
          alt=""
        />
      </div>

      <div className="relative ">
        <h2 className="text-center font-dm-sans-500 font-medium text-3xl leading-[48px]  bg-clip-text text-transparent bg-[linear-gradient(136deg,#96B8EB_31.57%,#C1DAF8_66.56%)]">
          Join the Waitlist
        </h2>

        <p className="text-[#8599AD] text-center font-dm-sans-400 font-normal text-base leading-6">
          Be among the first to experience the future of influencer marketing.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-[16px] bg-gradient-to-br from-[rgba(52,62,77,0.8)] to-[rgba(4,23,54,0.9)] backdrop-blur-lg max-w-md mx-auto flex flex-col max-w-[462px] px-5 md:px-8 py-7 md:py-8  gap-6"
      >
        <label className="text-[#F8FAFC] font-dm-sans font-medium text-sm leading-[14px]">
          Email <span className="text-[#00BFFF]">*</span>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format",
              },
            })}
            className="w-full mt-3 p-3 rounded-[10px] outline-none bg-black bg-opacity-40 text-white"
            placeholder="your@email.com"
          />
          {errors?.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.email?.message}
            </p>
          )}
        </label>

        <label className="text-[#F8FAFC] font-dm-sans font-medium text-sm leading-[14px]">
          Name <span className="text-[#00BFFF]">*</span>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            })}
            className="w-full mt-3 p-3 rounded-[10px] outline-none bg-black bg-opacity-40 text-white"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors?.name?.message}</p>
          )}
        </label>

        <label className="text-[#F8FAFC] font-dm-sans font-medium text-sm leading-[14px]">
          Instagram ID <span className="text-[#8599AD]">(optional)</span>
          <input
            type="text"
            {...register("instagramId")}
            className="w-full mt-3 p-3 rounded-[10px] outline-none bg-black bg-opacity-40 text-white"
            placeholder="@yourusername"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-[12px] bg-gradient-to-l from-[#18547A] to-[#005A91] disabled:bg-blue-400 cursor-pointer text-white font-semibold py-3  transition"
        >
          {isSubmitting ? "Submitting..." : "Get Early Access"}
        </button>

        <p className="text-[#8599AD] text-center font-dm-sans-400 font-normal text-[12px] leading-[16px] ">
          We respect your privacy. Your email will only be used for ClipKaro
          updates.
        </p>

        {isSubmitSuccessful && (
          <p className="text-green-400 text-center mt-4">
            Thanks for signing up!
          </p>
        )}
      </form>
    </section>
  );
}
