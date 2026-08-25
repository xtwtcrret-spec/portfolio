"use client";

import { motion } from "framer-motion";
import { Clock, ExternalLink, MapPin, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { TechLogo } from "@/components/ui/Logos";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { useCountUp } from "@/components/ui/useCountUp";
import { projects, site, skills, stats } from "@/lib/data";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="flex flex-col">
      <span ref={ref} className="font-mono text-3xl font-bold text-foreground tabular-nums">
        {current}
        <span className="text-accent">{suffix}</span>
      </span>
      <span className="mt-1 text-xs uppercase tracking-wider text-subtle">{label}</span>
    </div>
  );
}

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone,
        }).format(new Date())
      );
    format();
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

export function BentoGrid() {
  const featured = projects[0];
  const time = useLocalTime(site.timezone);
  const { t } = useLang();

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32" aria-label="About and highlights">
      <Reveal className="mb-12 max-w-xl">
        <p className="mb-2 font-mono text-sm text-accent">{t.bento.kicker}</p>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {t.bento.heading}
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[minmax(150px,auto)]">
        <Reveal className="sm:col-span-2 lg:col-span-4 lg:row-span-2" delay={0.05}>
          <TiltCard className="h-full">
            <article className="card-glow noise group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-elevated p-7 sm:p-8">
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${featured.gradient} opacity-[0.16] transition-opacity duration-500 group-hover:opacity-30`}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">
                  <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5">{t.bento.featured}</span>
                  <span className="text-subtle">{featured.year}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{featured.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{featured.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                  {featured.tech.slice(0, 4).map((tech) => (
                    <li key={tech} className="rounded-full bg-background/60 px-3 py-1 font-mono text-xs text-muted ring-1 ring-line">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mt-8 flex items-center justify-between">
                {featured.demoUrl ? (
                  <a
                    href={featured.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
                  >
                    {t.bento.liveDemo}
                    <ExternalLink className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                ) : (
                  <span />
                )}
                <span className="font-mono text-xs text-subtle">{featured.role}</span>
              </div>
            </article>
          </TiltCard>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.1}>
          <TiltCard className="h-full">
            <div className="card-glow flex h-full flex-col justify-between gap-4 rounded-3xl border border-line bg-elevated p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">{t.bento.numbers}</h3>
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-4">
                {stats.map((s, i) => (
                  <Stat key={i} value={s.value} suffix={s.suffix} label={t.bento.stats[i]} />
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.15}>
          <TiltCard className="h-full">
            <div className="card-glow relative h-full overflow-hidden rounded-3xl border border-line bg-elevated p-6">
              <motion.div
                aria-hidden
                className="absolute -right-10 -top-10 size-36 rounded-full bg-emerald-500/15 blur-2xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-subtle">
                <Radio className="size-4 text-emerald-500" aria-hidden />
                {t.bento.focus}
              </div>
              <p className="mt-4 text-lg font-semibold leading-snug">{site.currentFocus}</p>
              <p className="mt-2 inline-flex items-center gap-2 font-mono text-xs text-muted">
                <span className="relative flex size-1.5">
                  <span className="absolute h-full w-full animate-ping-slow rounded-full bg-emerald-500" />
                  <span className="relative size-1.5 animate-blink rounded-full bg-emerald-500" />
                </span>
                {t.bento.focusNote}
              </p>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal className="sm:col-span-2 lg:col-span-4" delay={0.1}>
          <TiltCard className="h-full">
            <div className="card-glow flex h-full flex-col rounded-3xl border border-line bg-elevated p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">{t.bento.stack}</h3>
              <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4" role="list">
                {skills.map((skill, i) => (
                  <motion.div
                    role="listitem"
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 18 }}
                    className="group/skill relative"
                    tabIndex={0}
                    aria-label={`${skill.name}: ${skill.blurb}`}
                  >
                    <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface ring-1 ring-line transition-all duration-300 group-hover/skill:ring-accent group-focus-visible/skill:ring-accent">
                      <TechLogo mark={skill.mark} className="size-8 p-1 opacity-80 transition-transform duration-300 group-hover/skill:scale-110 group-focus-visible/skill:scale-110 sm:size-9" />
                    </div>
                    <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 font-mono text-[11px] text-background opacity-0 shadow-lg transition-all duration-200 group-hover/skill:-top-10 group-hover/skill:opacity-100 group-focus-visible/skill:opacity-100">
                      {skill.blurb}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.2}>
          <TiltCard className="h-full">
            <div className="card-glow flex h-full flex-col justify-between gap-3 rounded-3xl border border-line bg-elevated p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-subtle">
                <MapPin className="size-4 text-accent" aria-hidden />
                {site.location}
              </h3>
              <div className="flex justify-center py-1" aria-hidden>
                <span className="overflow-hidden rounded-xl ring-1 ring-line-strong shadow-md">
                  <svg viewBox="0 0 24 16" className="block h-[64px] w-[96px]">
                    <rect width="24" height="8" fill="#E70011" />
                    <rect y="8" width="24" height="8" fill="#FFFFFF" />
                  </svg>
                </span>
              </div>
              <div>
                <p className="font-mono text-4xl font-bold tabular-nums tracking-tight" aria-live="off">
                  {time || "—:—:—"}
                </p>
                <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-subtle">
                  <Clock className="size-3.5" aria-hidden />
                  GMT+7 · {site.timezone}
                </p>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
