"use client";

import { Quote } from "lucide-react";
import { useLang } from "@/components/providers/LangProvider";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function Testimonials() {
  const { t } = useLang();

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-24 sm:py-32" aria-label="Testimonials">
      <Reveal className="mb-12 max-w-xl">
        <p className="mb-2 font-mono text-sm text-accent">{t.testimonials.kicker}</p>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {t.testimonials.heading}
        </h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.08} className="h-full">
            <TiltCard className="h-full" max={4}>
              <figure className="card-glow flex h-full flex-col justify-between gap-6 rounded-3xl border border-line bg-elevated p-7">
                <div>
                  <Quote className="size-6 text-accent/60" aria-hidden />
                  <blockquote className="mt-4 text-pretty leading-relaxed text-muted">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-10 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-bold text-accent"
                  >
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{item.name}</span>
                    <span className="block text-xs text-subtle">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
