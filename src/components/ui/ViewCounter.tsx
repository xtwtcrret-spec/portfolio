"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";

export function ViewCounter({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((d: { views: number | null }) => {
        if (!cancelled && typeof d.views === "number") setViews(d.views);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (views === null) return null;

  const formatted = new Intl.NumberFormat(lang === "id" ? "id-ID" : "en-US").format(views);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle">
      <Eye className="size-3.5" aria-hidden />
      {formatted} {t.misc.views}
    </span>
  );
}
