import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clip Karo Comming Soon",
  description: "Clip Karo Comming Soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
