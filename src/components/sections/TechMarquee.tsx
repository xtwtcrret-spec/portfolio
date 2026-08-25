"use client";

import { skills } from "@/lib/data";
import { TechLogo } from "@/components/ui/Logos";

export function TechMarquee() {
  const row = [...skills, ...skills];
  return (
    <section aria-label="Technologies" className="overflow-hidden border-y border-line bg-surface/40 py-4">
      <div className="group/marquee flex w-max animate-marquee items-center gap-10 px-5 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
        {row.map((skill, i) => (
          <span key={`${skill.name}-${i}`} className="flex items-center gap-2 text-sm text-muted" aria-hidden={i >= skills.length}>
            <TechLogo mark={skill.mark} className="size-5 opacity-70" />
            {skill.name}
          </span>
        ))}
      </div>
      <style>{`.group\\/marquee:hover .animate-marquee{animation-play-state:paused}`}</style>
    </section>
  );
}
