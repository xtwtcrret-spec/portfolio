import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { ViewCounter } from "@/components/ui/ViewCounter";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary.en,
    openGraph: { title: project.title, description: project.summary.en },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <main className="mx-auto min-h-svh max-w-3xl px-6 pb-24 pt-28">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to projects
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
            {project.category}
          </span>
          <span className="font-mono text-xs text-subtle">{project.year}</span>
          <ViewCounter slug={project.id} />
        </div>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <div
          className={`mt-6 h-44 overflow-hidden rounded-3xl bg-gradient-to-br ${project.gradient}`}
          aria-hidden
        >
          <div className="noise h-full w-full opacity-70" />
        </div>
        <p className="mt-6 text-lg leading-relaxed text-muted">{project.description.en}</p>
        <p className="mt-3 text-sm text-subtle">Role: {project.role.en}</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
            {tech}
          </span>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight">Process</h2>
        <ol className="mt-4 space-y-2.5">
          {project.workflow.map((step, i) => (
            <li key={step.en} className="flex gap-3 leading-relaxed text-muted">
              <span className="pt-0.5 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              {step.en}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">Challenges</h2>
        <ul className="mt-4 space-y-2.5">
          {project.challenges.map((challenge) => (
            <li key={challenge.en} className="flex gap-3 leading-relaxed text-muted">
              <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
              {challenge.en}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">Outcomes</h2>
        <ul className="mt-4 space-y-2.5">
          {project.outcomes.map((outcome) => (
            <li key={outcome.en} className="flex gap-3 leading-relaxed text-muted">
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
              {outcome.en}
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-12 border-t border-line pt-6 text-sm text-subtle">
        Case study from{" "}
        <Link href="/" className="font-medium text-accent hover:text-accent-strong">
          Raihan Farhani&apos;s portfolio
        </Link>{" "}
        — the interactive version lives there.
        <ArrowUpRight className="ml-1 inline size-3.5" aria-hidden />
      </footer>
    </main>
  );
}
