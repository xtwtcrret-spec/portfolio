"use client";

import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="relative z-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <AlertTriangle className="size-6" aria-hidden />
        </span>
        <h1 className="mt-6 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          Something broke on my side.
        </h1>
        <p className="mt-2 text-sm text-muted">Ada yang rusak di sisi saya.</p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
