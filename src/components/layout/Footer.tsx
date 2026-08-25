"use client";

import { ArrowUp, Heart } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/components/providers/LangProvider";
import { scrollToId } from "@/lib/scroll";
import { site } from "@/lib/data";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. {t.footer.madeWith}
          <Heart className="mx-1 inline size-3.5 text-rose-500" aria-hidden />
          {t.footer.using}
        </p>
        <nav aria-label="Footer" className="flex items-center gap-4">
          <Link href="/blog" className="transition-colors hover:text-accent">
            Blog
          </Link>
          <Link href="/resume" className="transition-colors hover:text-accent">
            Resume
          </Link>
          <button
            onClick={() => scrollToId("home")}
            className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
          >
            {t.footer.backToTop}
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
          </button>
        </nav>
      </div>
    </footer>
  );
}
