import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/features/CookieConsent";
import { cn } from "@/lib/utils";
import { defaultMetadata } from "@/config/site";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryProvider } from "@/components/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                  try {
                      const storageKey = 'app-theme';
                      const storedTheme = localStorage.getItem(storageKey);
                      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light';

                      const theme = storedTheme === 'light' || storedTheme === 'dark'
                        ? storedTheme
                        : systemTheme;

                      document.documentElement.classList.remove('light', 'dark');
                      document.documentElement.classList.add(theme);
                      } catch (e) {}
              })();
        `,
          }}
        />
        <GoogleAnalytics />
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </head>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          "dark:bgcolor-bgsecondary bg-white"
        )}
      >
        <QueryProvider>
          <ThemeProvider defaultTheme="system" storageKey="app-theme">
            <ToastProvider>
              <AuthProvider>
                <ErrorBoundary>
                  {children}
                  <CookieConsent />
                </ErrorBoundary>
              </AuthProvider>
            </ToastProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
