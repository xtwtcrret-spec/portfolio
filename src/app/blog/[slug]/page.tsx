import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative mx-auto min-h-svh max-w-3xl px-6 pb-24 pt-32">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All posts
      </Link>

      <article className="mt-8">
        <header>
          <p className="font-mono text-xs uppercase tracking-widest text-subtle">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            {" · "}
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" aria-hidden />
              {post.readingTime} min read
            </span>
          </p>
          <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{post.description}</p>
        </header>

        <div
          className="blog-prose mt-10 space-y-5 text-[15px] leading-relaxed text-foreground/85 [&_blockquote]:border-l-2 [&_blockquote]:border-accent/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted [&_code]:rounded-md [&_code]:bg-elevated [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ol_li]:list-decimal"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </main>
  );
}
