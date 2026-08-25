import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="relative z-10">
        <p className="text-gradient font-mono text-8xl font-extrabold tracking-tight sm:text-9xl">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground sm:text-2xl">
          This page wandered off the grid.
        </h1>
        <p className="mt-2 text-sm text-muted">Halaman ini tersesat dari grid.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back home · Kembali
        </Link>
      </div>
    </main>
  );
}
