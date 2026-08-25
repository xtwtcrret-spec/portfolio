"use client";

import { ArrowRight, Globe, LayoutDashboard, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/components/providers/LangProvider";
import { services } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { scrollToId } from "@/lib/scroll";

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  layout: LayoutDashboard,
  zap: Zap,
};

export function Services() {
  const { t, lang } = useLang();

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24 sm:py-32" aria-label="Services">
      <Reveal className="mb-12 max-w-xl">
        <p className="mb-2 font-mono text-sm text-accent">{t.services.kicker}</p>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {t.services.heading}
        </h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[service.icon] ?? Globe;
          return (
            <Reveal key={service.title.en} delay={i * 0.08} className="h-full">
              <div className="card-glow flex h-full flex-col rounded-3xl border border-line bg-elevated p-7">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{service.title[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.desc[lang]}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {service.points.map((point) => (
                    <li key={point.en} className="flex gap-2">
                      <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                      {point[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2} className="mt-8 flex justify-center">
        <button
          onClick={() => scrollToId("contact")}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong"
        >
          {t.services.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </button>
      </Reveal>
    </section>
  );
}
