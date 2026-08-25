import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { JsonLd } from "@/components/providers/JsonLd";
import { ThemeInit } from "@/components/providers/ThemeInit";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LangProvider } from "@/components/providers/LangProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/lib/data";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raihanfarhani.vercel.app"),
  title: {
    default: `${site.name} — ${site.role.en}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline.en,
  keywords: ["portfolio", "full-stack developer", "frontend engineer", "react", "next.js", site.name],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role.en}`,
    description: site.tagline.en,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role.en}`,
    description: site.tagline.en,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${jetbrains.variable} bg-background font-sans text-foreground`}>
        <ThemeProvider>
          <LangProvider>
            <ToastProvider>
              <ThemeInit />
              <JsonLd />
              <SmoothScroll />
              <CustomCursor />
              {children}
              <Analytics />
              <SpeedInsights />
            </ToastProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
