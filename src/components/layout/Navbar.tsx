"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Command, Languages, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { scrollToId } from "@/lib/scroll";
import { site } from "@/lib/data";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { theme, toggle } = useTheme();
  const { lang, t, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const links = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "projects", label: t.nav.projects },
    { id: "experience", label: t.nav.experience },
    { id: "contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "projects", "experience", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.6, 0.35, 1] }}
      className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4"
    >
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-accent to-accent-strong motion-reduce:hidden"
        style={{ scaleX: progress }}
      />
      <nav
        aria-label="Main navigation"
        className={`glass flex w-full max-w-2xl items-center justify-between gap-2 rounded-2xl border border-line py-2 pl-5 pr-2 shadow-lg shadow-black/5 transition-all duration-300 ${
          scrolled ? "border-line-strong shadow-accent/5" : ""
        }`}
      >
        <button
          onClick={() => go("home")}
          className="font-mono text-sm font-bold tracking-tight text-foreground"
          aria-label="Back to top"
        >
          {site.initials}<span className="text-accent">.</span>dev
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                aria-current={activeSection === link.id ? "true" : undefined}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  activeSection === link.id
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenPalette}
            aria-label="Open command palette"
            title="Command palette (Ctrl+K)"
            className="hidden size-9 items-center justify-center rounded-xl border border-transparent text-muted transition-colors hover:border-line hover:text-foreground sm:flex"
          >
            <Command className="size-4" aria-hidden />
          </button>
          <button
            onClick={toggleLang}
            aria-label={`Switch language / Ganti bahasa (${lang === "en" ? "ID" : "EN"})`}
            title={lang === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-transparent px-2 font-mono text-xs font-semibold text-muted transition-colors hover:border-line hover:text-foreground"
          >
            <Languages className="size-4" aria-hidden />
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex size-9 items-center justify-center rounded-xl text-muted transition-colors hover:text-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                {theme === "dark" ? (
                  <Sun className="size-[18px]" aria-hidden />
                ) : (
                  <Moon className="size-[18px]" aria-hidden />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex size-9 items-center justify-center rounded-xl text-muted transition-colors hover:text-foreground lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.98 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-x-0 top-full mt-2 overflow-hidden md:hidden lg:hidden"
            >
              <ul className="glass flex flex-col gap-1 rounded-2xl border border-line p-3 shadow-xl">
                {links.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => go(link.id)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                        activeSection === link.id
                          ? "bg-accent-soft text-accent"
                          : "text-muted hover:bg-accent-soft/50 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
