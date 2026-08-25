"use client";

import { ExternalLink, Music2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";

interface NowPlaying {
  configured: boolean;
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
}

export function SpotifyWidget() {
  const { t } = useLang();
  const [state, setState] = useState<NowPlaying | null>(null);

  useEffect(() => {
    fetch("/api/spotify")
      .then((r) => r.json())
      .then(setState)
      .catch(() => setState({ configured: false, isPlaying: false }));
  }, []);

  if (!state?.configured) return null;

  return (
    <div className="card-glow relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-3xl border border-line bg-elevated p-6">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-subtle">
        <Music2 className="size-4 text-emerald-500" aria-hidden />
        {t.misc.listening}
      </h3>
      {state.isPlaying && state.title ? (
        <div>
          <p className="font-semibold leading-snug">{state.title}</p>
          <p className="mt-1 text-sm text-muted">{state.artist}</p>
          {state.url && (
            <a
              href={state.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-strong"
            >
              {t.misc.poweredBySpotify}
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          )}
        </div>
      ) : (
        <p className="text-sm text-subtle">{t.misc.notListening}</p>
      )}
    </div>
  );
}
