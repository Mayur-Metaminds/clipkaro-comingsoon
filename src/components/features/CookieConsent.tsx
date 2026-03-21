"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const COOKIE_CONSENT_KEY = "cookie-consent";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setTimeout(() => setShowConsent(true), 1000);
    }
  }, []);

  const handleClose = (value: string) => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
      setShowConsent(false);
    }, 200);
  };

  if (!showConsent) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed right-4 bottom-4 z-50 w-80">
        <div
          className={`transform transition-all duration-200 ${
            isClosing
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="rounded-lg border border-stone-200 bg-white shadow-lg dark:border-stone-800 dark:bg-stone-900">
            <div className="p-3">
              <h3 className="mb-2 text-xs font-semibold text-stone-900 dark:text-stone-50">
                🍪 Cookie Consent
              </h3>

              <p className="mb-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                We use cookies to enhance your experience.{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-stone-900 underline-offset-2 hover:underline dark:text-stone-100"
                >
                  Learn more
                </Link>
              </p>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleClose("accepted")}
                  className="flex-1"
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClose("declined")}
                  className="flex-1"
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
