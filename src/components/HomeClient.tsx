"use client";

import { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LangProvider } from "@/components/providers/LangProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Timeline } from "@/components/sections/Timeline";

export function HomeClient({ hasPhoto, hasCv }: { hasPhoto: boolean; hasCv: boolean }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <ThemeProvider>
      <LangProvider>
        <ToastProvider>
        <SmoothScroll />
        <CustomCursor />
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[150] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
        <main>
          <Hero hasPhoto={hasPhoto} hasCv={hasCv} />
          <BentoGrid />
          <Projects />
          <Timeline />
          <Testimonials />
          <Contact hasCv={hasCv} />
        </main>
        <Footer />
      </ToastProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
