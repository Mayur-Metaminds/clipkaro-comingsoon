"use client";

import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { MoonSvg, SunSvg } from "../../../../public/svg/SVG";

const Navbar = () => {
  const isOpen = false;

  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 px-4 backdrop-blur-md md:px-15 lg:bg-transparent lg:px-20 lg:backdrop-blur-none dark:bg-[#0A0A0A]/85 dark:lg:bg-transparent">
      <div className="w-full">
        <div className="flex items-center justify-between pt-5 pb-3">
          {/* 1. Logo */}
          <div className="flex-shrink-0">
            <span className="typo-landing-signup bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent uppercase">
              CLIPKARO
            </span>
          </div>

          {/* 2. Desktop Actions */}
          <div className="hidden items-center justify-center gap-6 md:flex">
            {/* Theme Toggle Button */}
            <div className="inline-flex w-full items-center justify-end">
              <button
                onClick={() => {
                  if (theme === "light") {
                    setTheme("dark");
                  } else {
                    setTheme("light");
                  }
                }}
                className="bgcolor-linear-1-17 gradient-border-ring group flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] outline-none lg:h-12 lg:w-12"
              >
                {theme === "light" ? (
                  <MoonSvg className="dark:textcolor-text-secondary group-hover:textcolor-text-inverse textcolor-text-secondary h-5 w-5 transition-colors dark:group-hover:text-white" />
                ) : (
                  <SunSvg className="dark:textcolor-text-secondary group-hover:textcolor-text-inverse textcolor-text-secondary h-5 w-5 transition-colors dark:group-hover:text-white" />
                )}
              </button>
            </div>

            {/* CTA Button */}
            <a
              href="#join-waitlist"
              className="typo-landing-cta cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-1 text-center whitespace-nowrap text-white transition-opacity"
            >
              Join Waitlist
            </a>
          </div>

          {/* 3. Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => {
                if (theme === "light") {
                  setTheme("dark");
                } else {
                  setTheme("light");
                }
              }}
              className="bgcolor-linear-1-17 gradient-border-ring group flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] outline-none"
            >
              {theme === "light" ? (
                <MoonSvg className="dark:textcolor-text-secondary group-hover:textcolor-text-inverse textcolor-text-secondary h-5 w-5 transition-colors dark:group-hover:text-white" />
              ) : (
                <SunSvg className="dark:textcolor-text-secondary group-hover:textcolor-text-inverse textcolor-text-secondary h-5 w-5 transition-colors dark:group-hover:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="animate-in slide-in-from-top space-y-4 border-b border-white/10 bg-[#0a0a0a] px-4 py-6 duration-300 md:hidden">
          <a
            href="#join-waitlist"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-500 py-1 text-center font-bold tracking-wider text-white uppercase"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
