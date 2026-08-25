"use client";

import { motion } from "framer-motion";
import { Copy, Download, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialLogo } from "@/components/ui/Logos";
import { site, socials } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

function CopyEmail() {
  const toast = useToast();
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      toast(t.contact.toastCopied);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast(t.contact.toastCopyFail, "error");
    }
  };

  return (
    <button
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-2xl border border-line bg-elevated px-5 py-4 font-mono text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={`Copy email address ${site.email}`}
    >
      <span className="text-muted group-hover:text-accent">{site.email}</span>
      <motion.span animate={{ scale: copied ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.3 }}>
        <Copy className="size-4 text-subtle group-hover:text-accent" aria-hidden />
      </motion.span>
      {copied && <span className="sr-only">{t.contact.toastCopied}</span>}
    </button>
  );
}

export function Contact({ hasCv = false }: { hasCv?: boolean }) {
  const toast = useToast();
  const { t } = useLang();
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = t.contact.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t.contact.errEmail;
    if (message.length < 10) next.message = t.contact.errMsg;
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setState("error");
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, honeypot: String(data.get("honeypot") ?? "") }),
      });
      if (!res.ok) throw new Error("send failed");
      setState("success");
      toast(t.contact.toastSent);
      form.reset();
      setTimeout(() => setState("idle"), 3000);
    } catch {
      setState("error");
      toast(t.contact.toastFail, "error");
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-subtle focus:border-accent focus:ring-2 focus:ring-accent/25 ${
      hasError ? "border-rose-500" : "border-line"
    }`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 sm:py-32" aria-label="Contact">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-2 font-mono text-sm text-accent">{t.contact.kicker}</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t.contact.heading}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">{t.contact.desc}</p>
          <div className="mt-8">
            <CopyEmail />
            {hasCv && (
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                <Download className="size-4" aria-hidden />
                {t.contact.cvLink}
              </a>
            )}
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-3" aria-label="Social links">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${social.label} profile`}
                  title={social.label}
                  className="flex h-11 items-center gap-2.5 rounded-full border border-line bg-elevated px-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <SocialLogo mark={social.icon} className="size-[18px] shrink-0" />
                  <span className="text-sm font-medium text-muted">{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="card-glow rounded-3xl border border-line bg-elevated p-6 sm:p-8"
          >
            <div className="hidden">
              <label htmlFor="contact-honeypot">Leave this field empty</label>
              <input id="contact-honeypot" name="honeypot" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-subtle">
                  {t.contact.nameLabel}
                </label>
                <input id="contact-name" name="name" type="text" autoComplete="name" placeholder={t.contact.namePlaceholder} className={inputClass(!!errors.name)} aria-invalid={!!errors.name} />
                {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-subtle">
                  {t.contact.emailLabel}
                </label>
                <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={t.contact.emailPlaceholder} className={inputClass(!!errors.email)} aria-invalid={!!errors.email} />
                {errors.email && <p className="mt-1.5 text-xs text-rose-500">{errors.email}</p>}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-subtle">
                {t.contact.messageLabel}
              </label>
              <textarea id="contact-message" name="message" rows={5} placeholder={t.contact.messagePlaceholder} className={`${inputClass(!!errors.message)} resize-none`} aria-invalid={!!errors.message} />
              {errors.message && <p className="mt-1.5 text-xs text-rose-500">{errors.message}</p>}
            </div>
            <Magnetic strength={0.15} className="mt-6 w-full">
              <button
                type="submit"
                disabled={state === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-contrast shadow-lg shadow-accent/25 transition-all hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    {t.contact.sending}
                  </>
                ) : state === "success" ? (
                  t.contact.sent
                ) : (
                  <>
                    {t.contact.send}
                    <Send className="size-4" aria-hidden />
                  </>
                )}
              </button>
            </Magnetic>
            <p aria-live="polite" className="sr-only">
              {state === "success" ? t.contact.sent : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
