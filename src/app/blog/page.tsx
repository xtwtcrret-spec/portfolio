import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Blog",
  description: "Notes on building the web — frontend engineering, performance, and design.",
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <main className="relative mx-auto min-h-svh max-w-4xl px-6 pb-24 pt-32">
      <Reveal className="mb-12">
        <p className="mb-2 font-mono text-sm text-accent">Blog</p>
        <h1 className="text-balance text-4xl font-bold tracking-tight">
          Notes on building the web
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Occasional writing about frontend engineering, performance, and design.
        </p>
      </Reveal>

      {posts.length === 0 && <p className="text-subtle">No posts yet.</p>}

      <div className="space-y-4">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06}>
            <Link
              href={`/blog/${post.slug}`}
              className="card-glow group block rounded-3xl border border-line bg-elevated p-7"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-subtle">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-subtle">
                <Clock className="size-3.5" aria-hidden />
                {post.readingTime} min read
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Link
        href="/"
        className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden />
        raihanfarhani.vercel.app
      </Link>
    </main>
  );
}
