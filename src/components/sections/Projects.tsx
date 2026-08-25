"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Code2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { categories, projects, type Project } from "@/lib/data";
import { getLenis } from "@/lib/scroll";
import { Reveal } from "@/components/ui/Reveal";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[130] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface shadow-2xl sm:rounded-3xl"
      >
        <div className={`sticky top-0 z-10 h-2 w-full bg-gradient-to-r ${project.gradient}`} aria-hidden />
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-5 z-20 flex size-9 items-center justify-center rounded-full bg-elevated/80 text-muted ring-1 ring-line backdrop-blur transition-colors hover:text-foreground"
        >
          <X className="size-4" aria-hidden />
        </button>

        <div className="p-7 sm:p-9">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2" aria-hidden>
            {["Dashboard", "Mobile view", "Components", "Analytics"].map((label, i) => (
              <div
                key={label}
                className={`relative flex h-36 items-end overflow-hidden rounded-2xl border border-line bg-gradient-to-br p-4 ${i % 2 ? project.gradient : "from-line-strong/40 to-transparent"} ${i % 2 ? "opacity-90" : ""}`}
              >
                <span className={`font-mono text-xs ${i % 2 ? "text-white/90" : "text-subtle"}`}>
                  {String(i + 1).padStart(2, "0")} — {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9 space-y-8 text-sm leading-relaxed">
            <section>
              <h4 className="mb-3 font-semibold uppercase tracking-wider text-subtle">Process</h4>
              <ol className="space-y-2">
                {project.workflow.map((step, i) => (
                  <li key={step} className="flex gap-3 text-muted">
                    <span className="pt-0.5 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h4 className="mb-3 font-semibold uppercase tracking-wider text-subtle">Challenges</h4>
              <ul className="space-y-2">
                {project.challenges.map((c) => (
                  <li key={c} className="flex gap-3 text-muted">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h4 className="mb-3 font-semibold uppercase tracking-wider text-subtle">Outcomes</h4>
              <ul className="space-y-2">
                {project.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
            </section>
            <p className="text-xs text-subtle">Role: {project.role}</p>
          </div>

          {(project.demoUrl || project.repoUrl) && (
            <div className="mt-9 flex flex-wrap gap-3 border-t border-line pt-6">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
                >
                  Visit live site
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  <Code2 className="size-4" aria-hidden />
                  Source code
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const { t } = useLang();

  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 sm:py-32" aria-label="Portfolio projects">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="mb-2 font-mono text-sm text-accent">{t.projects.kicker}</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t.projects.heading}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === cat
                  ? "text-accent-contrast"
                  : "text-muted ring-1 ring-line hover:text-foreground hover:ring-line-strong"
              }`}
            >
              {filter === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{cat}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.button
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
              onClick={() => setSelected(project)}
              aria-haspopup="dialog"
              className="card-glow group relative overflow-hidden rounded-3xl border border-line bg-elevated p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <div
                className={`relative mb-5 h-32 overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient}`}
                aria-hidden
              >
                <div className="noise absolute inset-0 opacity-70" />
                <span className="absolute bottom-3 left-4 font-mono text-xs text-white/85">
                  {project.year}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                <ArrowUpRight
                  className="group-hover:text-accent mt-1 size-4 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                  {project.category}
                </span>
                <span className="truncate pl-2 font-mono text-[11px] text-subtle">
                  {project.tech.slice(0, 3).join(" · ")}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
