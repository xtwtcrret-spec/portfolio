import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  html: string;
}

const postsDir = path.join(process.cwd(), "content", "posts");

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data, content } = matter(raw);
      const words = content.split(/\s+/).length;
      return {
        slug: file.replace(/\.mdx?$/, ""),
        title: String(data.title ?? "Untitled"),
        description: String(data.description ?? ""),
        date: String(data.date ?? new Date().toISOString().slice(0, 10)),
        readingTime: Math.max(1, Math.round(words / 200)),
        html: marked.parse(content, { async: false }) as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
