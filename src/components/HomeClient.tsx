"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { Timeline } from "@/components/sections/Timeline";

const CommandPalette = dynamic(
  () => import("@/components/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

export function HomeClient({ hasPhoto, hasCv }: { hasPhoto: boolean; hasCv: boolean }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
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
        <TechMarquee />
        <BentoGrid />
        <Projects />
        <Timeline />
        <Testimonials />
        <Services />
        <Contact hasCv={hasCv} />
      </main>
      <Footer />
    </>
  );
}
