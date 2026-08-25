"use client";

import { useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { SocialLogo } from "@/components/ui/Logos";
import { githubProfileUrl, site } from "@/lib/data";

export function GitHubGraph() {
  const { t } = useLang();
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="card-glow flex h-full flex-col rounded-3xl border border-line bg-elevated p-6">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-subtle">
        <SocialLogo mark="github" className="size-4" />
        {t.misc.githubActivity}
      </h3>
      <a
        href={githubProfileUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block overflow-x-auto rounded-xl ring-1 ring-line transition-shadow hover:ring-accent"
        aria-label={`${site.name} on GitHub`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/3b82f6/${site.githubUser}`}
          alt={`GitHub contribution graph for ${site.name}`}
          loading="lazy"
          className="block h-auto w-full min-w-[560px]"
          onError={() => setFailed(true)}
        />
      </a>
    </div>
  );
}
