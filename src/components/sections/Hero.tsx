"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";
import { scrollToId } from "@/lib/scroll";
import { site } from "@/lib/data";

interface HeroProps {
  hasPhoto?: boolean;
  hasCv?: boolean;
}

export function Hero({ hasPhoto = false, hasCv = false }: HeroProps) {
  const reduced = usePrefersReducedMotion();
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glowX = useTransform(sx, (v) => `${v * 100}%`);
  const glowY = useTransform(sy, (v) => `${v * 100}%`);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]: string[]) =>
      `radial-gradient(560px circle at ${x} ${y}, var(--accent-soft), transparent 65%)`
  );

  const words = t.hero.headline;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-24"
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
    >
      <div className="bg-grid absolute inset-0" aria-hidden />
      {!reduced && (
        <motion.div aria-hidden className="absolute inset-0" style={{ background: glowBg }} />
      )}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.6, 0.35, 1] }}
          className="mb-8 flex justify-center"
        >
          {hasPhoto ? (
            <span className="relative inline-block rounded-full bg-gradient-to-tr from-accent via-accent-strong to-accent/20 p-[3px] shadow-xl shadow-accent/25">
              <Image
                src="/profile.jpg"
                alt={`Photo of ${site.name}`}
                width={224}
                height={224}
                priority
                className="size-28 rounded-full object-cover sm:size-32"
              />
            </span>
          ) : (
            <span className="flex size-28 items-center justify-center rounded-full border border-line-strong bg-elevated font-mono text-3xl font-bold text-accent shadow-xl shadow-accent/10 sm:size-32">
              {site.initials}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-sm text-muted backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-emerald-500" />
            <span className="relative inline-flex size-2 animate-blink rounded-full bg-emerald-500" />
          </span>
          {t.hero.badge}
        </motion.div>

        <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {words.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={`inline-block ${i === words.length - 1 ? "text-gradient" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.25 + i * 0.12, ease: [0.21, 0.6, 0.35, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg"
        >
          {site.name} — {site.role}. {t.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <button
              onClick={() => scrollToId("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.hero.viewWork}
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => scrollToId("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.hero.contactMe}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </Magnetic>
          {hasCv && (
            <Magnetic>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t.hero.downloadCv}
                <Download className="size-4" aria-hidden />
              </a>
            </Magnetic>
          )}
          <a
            href={`mailto:${site.email}`}
            aria-label="Send email"
            className="flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Mail className="size-[18px]" aria-hidden />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-line-strong p-1.5"
        >
          <div className="size-1.5 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
