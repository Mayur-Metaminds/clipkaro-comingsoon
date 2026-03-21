import Script from "next/script";
import { env } from "@/lib/env";

/**
 * Google Analytics component
 * Add this to your root layout to enable GA tracking
 */
export function GoogleAnalytics() {
  const measurementId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't load GA in development or if no measurement ID is provided
  if (!measurementId || env.isDevelopment) {
    return null;
  }
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
