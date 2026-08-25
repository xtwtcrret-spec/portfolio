"use client";

import { ArrowLeft, Download, Mail, Printer } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/components/providers/LangProvider";
import { projects, resumeSummary, site, skills, timeline } from "@/lib/data";

export default function ResumePage() {
  const { t, lang } = useLang();
  const work = timeline.filter((item) => item.type === "work");
  const education = timeline.filter((item) => item.type === "education");

  return (
    <main className="mx-auto min-h-svh max-w-3xl px-6 pb-24 pt-28 print:max-w-none print:pb-0 print:pt-0">
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden />
          raihanfarhani.vercel.app
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
        >
          <Printer className="size-4" aria-hidden />
          {t.resume.print}
        </button>
      </div>

      <header className="mt-10 print:mt-0">
        <h1 className="text-4xl font-extrabold tracking-tight">{site.name}</h1>
        <p className="mt-1 text-lg font-medium text-accent">{site.role[lang]}</p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-accent">
            <Mail className="size-3.5" aria-hidden />
            {site.email}
          </a>
          <span>{site.location}</span>
          <a
            href="/raihan-farhani.vcf"
            download
            className="inline-flex items-center gap-1.5 hover:text-accent"
          >
            <Download className="size-3.5" aria-hidden />
            vCard
          </a>
        </p>
      </header>

      <section className="mt-8">
        <h2 className="border-b border-line pb-1.5 text-sm font-bold uppercase tracking-widest text-subtle">
          {t.resume.summaryHeading}
        </h2>
        <p className="mt-3 leading-relaxed text-muted">{resumeSummary[lang]}</p>
      </section>

      <section className="mt-8">
        <h2 className="border-b border-line pb-1.5 text-sm font-bold uppercase tracking-widest text-subtle">
          {t.resume.experienceHeading}
        </h2>
        {work.map((item) => (
          <article key={item.id} className="mt-5 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">{item.title[lang]}</h3>
              <span className="font-mono text-xs text-subtle">{item.period}</span>
            </div>
            <p className="text-sm font-medium text-accent">{item.org[lang]}</p>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted">
              {item.details.map((d) => (
                <li key={d.en} className="ml-4 list-disc">
                  {d[lang]}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="border-b border-line pb-1.5 text-sm font-bold uppercase tracking-widest text-subtle">
          {t.resume.projectsHeading}
        </h2>
        <ul className="mt-3 space-y-1.5 text-sm text-muted">
          {projects.slice(0, 4).map((project) => (
            <li key={project.id} className="break-inside-avoid">
              <Link href={`/projects/${project.id}`} className="font-semibold text-foreground hover:text-accent">
                {project.title}
              </Link>{" "}
              — {project.summary[lang]}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="border-b border-line pb-1.5 text-sm font-bold uppercase tracking-widest text-subtle">
          {t.resume.skillsHeading}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {skills.map((skill) => skill.name).join(" · ")}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="border-b border-line pb-1.5 text-sm font-bold uppercase tracking-widest text-subtle">
          {t.resume.educationHeading}
        </h2>
        {education.map((item) => (
          <article key={item.id} className="mt-4 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">{item.title[lang]}</h3>
              <span className="font-mono text-xs text-subtle">{item.period}</span>
            </div>
            <p className="text-sm font-medium text-accent">{item.org[lang]}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
