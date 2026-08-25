"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { timeline, type TimelineItem } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const { lang } = useLang();
  const WorkIcon = item.type === "work" ? Briefcase : GraduationCap;

  return (
    <Reveal delay={index * 0.06}>
      <div className="relative pl-12 sm:pl-16">
        <span
          aria-hidden
          className="absolute left-[19px] top-7 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border border-line bg-elevated sm:left-[27px]"
        >
          <WorkIcon className={`size-3 ${item.type === "work" ? "text-accent" : "text-emerald-500"}`} aria-hidden />
        </span>
        <div
          className={`card-glow overflow-hidden rounded-2xl border bg-elevated ${
            open ? "border-line-strong" : "border-line"
          }`}
        >
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-subtle">{item.period}</p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{item.title[lang]}</h3>
              <p className="mt-0.5 text-sm font-medium text-accent">{item.org[lang]}</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{item.summary[lang]}</p>
            </div>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-muted"
            >
              <ChevronDown className="size-4" aria-hidden />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
              >
                <div className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
                  <ul className="space-y-2.5">
                    {item.details.map((d) => (
                      <li key={d.en} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                        {d[lang]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs text-accent">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}

export function Timeline() {
  const { t } = useLang();

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24 sm:py-32" aria-label="Experience and education">
      <Reveal className="mb-14 max-w-xl">
        <p className="mb-2 font-mono text-sm text-accent">{t.timeline.kicker}</p>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {t.timeline.heading}
        </h2>
      </Reveal>

      <div className="relative space-y-5">
        <span
          aria-hidden
          className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-accent via-line-strong to-transparent sm:left-[27px]"
        />
        {timeline.map((item, i) => (
          <TimelineCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
