import { getPosts } from "@/lib/posts";

export async function GET() {
  const posts = getPosts();
  const site = "https://raihanfarhani.vercel.app";

  const items = posts
    .map(
      (p) => `    <item>
      <title>${p.title}</title>
      <link>${site}/blog/${p.slug}</link>
      <guid isPermaLink="true">${site}/blog/${p.slug}</guid>
      <description>${p.description}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Raihan Farhani — Blog</title>
    <link>${site}/blog</link>
    <description>Notes on building the web</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
