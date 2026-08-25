"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Copy,
  CornerDownLeft,
  ExternalLink,
  FileText,
  FolderGit2,
  GraduationCap,
  Home,
  Languages,
  Mail,
  MoonStar,
  Search,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/components/providers/LangProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { scrollToId } from "@/lib/scroll";
import { site, socials } from "@/lib/data";

interface Action {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  perform: () => void;
}

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const { toggle } = useTheme();
  const { lang, t, toggleLang } = useLang();
  const toast = useToast();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, [setOpen]);

  const actions: Action[] = useMemo(
    () => [
      ...[
        { id: "home", label: t.nav.home, icon: <Home className="size-4" aria-hidden /> },
        { id: "about", label: t.nav.about, icon: <UserRound className="size-4" aria-hidden /> },
        { id: "projects", label: t.nav.projects, icon: <FolderGit2 className="size-4" aria-hidden /> },
        { id: "experience", label: t.nav.experience, icon: <Briefcase className="size-4" aria-hidden /> },
      ].map((s) => ({
        id: s.id,
        label: `${t.palette.goto} ${s.label}`,
        hint: t.palette.navigation,
        icon: s.icon,
        perform: () => {
          close();
          setTimeout(() => scrollToId(s.id), 60);
        },
      })),
      {
        id: "education",
        label: `${t.palette.goto} ${t.palette.goto === "Go to" ? "Education" : "Pendidikan"}`,
        hint: t.palette.navigation,
        icon: <GraduationCap className="size-4" aria-hidden />,
        perform: () => {
          close();
          setTimeout(() => scrollToId("experience"), 60);
        },
      },
      {
        id: "contact",
        label: `${t.palette.goto} ${t.nav.contact}`,
        hint: t.palette.navigation,
        icon: <Mail className="size-4" aria-hidden />,
        perform: () => {
          close();
          setTimeout(() => scrollToId("contact"), 60);
        },
      },
      {
        id: "theme",
        label: t.palette.toggleTheme,
        hint: t.palette.theme,
        icon: <MoonStar className="size-4" aria-hidden />,
        perform: () => {
          toggle();
          close();
        },
      },
      {
        id: "lang",
        label: t.palette.switchLang,
        hint: lang.toUpperCase(),
        icon: <Languages className="size-4" aria-hidden />,
        perform: () => {
          toggleLang();
          close();
        },
      },
      {
        id: "email",
        label: `${t.palette.copyEmail} ${site.email}`,
        hint: t.palette.utility,
        icon: <Copy className="size-4" aria-hidden />,
        perform: () => {
          navigator.clipboard
            .writeText(site.email)
            .then(() => toast(t.contact.toastCopied))
            .catch(() => toast(t.contact.toastCopyFail, "error"));
          close();
        },
      },
      {
        id: "blog",
        label: `${t.palette.open} Blog`,
        hint: t.palette.links,
        icon: <BookOpen className="size-4" aria-hidden />,
        perform: () => {
          router.push("/blog");
          close();
        },
      },
      {
        id: "resume",
        label: `${t.palette.goto} Resume`,
        hint: t.palette.utility,
        icon: <FileText className="size-4" aria-hidden />,
        perform: () => {
          router.push("/resume");
          close();
        },
      },
      ...socials.map((social) => ({
        id: `social-${social.label}`,
        label: `${t.palette.open} ${social.label}`,
        hint: t.palette.links,
        icon: <ExternalLink className="size-4" aria-hidden />,
        perform: () => {
          window.open(social.url, "_blank", "noopener");
          close();
        },
      })),
    ],
    [toggle, toast, close, t, lang, toggleLang, router]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint?.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, setOpen]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    const lenisActive = document.documentElement.classList.contains("lenis-stopped");
    if (open) document.body.style.overflow = "hidden";
    else if (!lenisActive) document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[140] flex items-start justify-center px-4 pt-[14vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} aria-hidden />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.18, ease: [0.21, 0.6, 0.35, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-subtle" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setCursor((c) => Math.min(c + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setCursor((c) => Math.max(c - 1, 0));
                  } else if (e.key === "Enter" && filtered[cursor]) {
                    e.preventDefault();
                    filtered[cursor].perform();
                  }
                }}
                placeholder={t.palette.placeholder}
                aria-label="Search commands"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-subtle"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-subtle">
                  {t.palette.noResults} &ldquo;{query}&rdquo;
                </p>
              )}
              {filtered.map((action, i) => (
                <button
                  key={action.id}
                  data-index={i}
                  role="option"
                  aria-selected={i === cursor}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => action.perform()}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    i === cursor ? "bg-accent-soft text-accent" : "text-muted"
                  }`}
                >
                  <span className={i === cursor ? "text-accent" : "text-subtle"}>{action.icon}</span>
                  <span className="flex-1 truncate">{action.label}</span>
                  {action.hint && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                      {action.hint}
                    </span>
                  )}
                  <span className="text-subtle">
                    {i === cursor ? (
                      <CornerDownLeft className="size-3.5" aria-hidden />
                    ) : (
                      <ArrowRight className="size-3.5 opacity-0" aria-hidden />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle">
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-line px-1">↑↓</kbd> {t.palette.navigate}
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-line px-1">↵</kbd> {t.palette.select}
              </span>
              <span className="ml-auto inline-flex items-center gap-1">
                <kbd className="rounded border border-line px-1">Ctrl K</kbd> toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
