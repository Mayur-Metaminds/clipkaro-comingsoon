/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "./env";

// Google Analytics configuration and utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn("Google Analytics Measurement ID not found");
    return;
  }

  // Load gtag script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.gtag =
    window.gtag ||
    function () {
      (window as any).dataLayer = (window as any).dataLayer || [];
      // eslint-disable-next-line prefer-rest-params
      (window as any).dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track user interactions
export const trackUserInteraction = (
  action: string,
  details?: Record<string, any>
) => {
  trackEvent(action, "user_interaction", JSON.stringify(details));
};

// Track conversion events
export const trackConversion = (
  event: string,
  details?: Record<string, any>
) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag("event", event, {
    send_to: GA_MEASUREMENT_ID,
    ...details,
  });
};

// Predefined tracking functions for common events
export const analytics = {
  // Auth events
  login: (method: string) => trackEvent("login", "auth", method),
  register: (method: string) => trackEvent("sign_up", "auth", method),
  logout: () => trackEvent("logout", "auth"),

  // Navigation events
  pageView: (page: string) => trackPageView(page),
  clickCTA: (cta: string, location: string) =>
    trackEvent("click_cta", "navigation", `${cta}_${location}`),

  // Error events
  error: (error: string, location: string) =>
    trackEvent("error", "system", `${location}_${error}`),
};
