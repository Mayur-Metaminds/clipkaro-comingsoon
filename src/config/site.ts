import type { Metadata } from "next";

/**
 * Site-wide configuration and metadata
 * Centralized place for all site information
 */
export const siteConfig = {
  name: "ClipKaro",
  description: "A modern Next.js template with best practices",
  url: "https://example.com",
  author: {
    name: "Your Name",
    url: "https://example.com",
  },
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername/repo",
  },
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Template",
  ] as string[],
} as const;

/**
 * Default metadata configuration
 * Can be imported and used in layout.tsx or overridden in specific pages
 */
export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@yourusername",
  },
  metadataBase: new URL(siteConfig.url),
};
