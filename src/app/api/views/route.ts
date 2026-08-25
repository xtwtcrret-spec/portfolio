import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function POST(req: Request) {
  if (!redis) return NextResponse.json({ views: null });
  try {
    const { slug } = (await req.json()) as { slug?: string };
    if (!slug || !/^[a-z0-9-]{1,64}$/i.test(slug)) {
      return NextResponse.json({ views: null });
    }
    const views = await redis.incr(`views:${slug}`);
    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: null });
  }
}

export async function GET(req: Request) {
  if (!redis) return NextResponse.json({ views: null });
  try {
    const slug = new URL(req.url).searchParams.get("slug");
    if (!slug || !/^[a-z0-9-]{1,64}$/i.test(slug)) {
      return NextResponse.json({ views: null });
    }
    const views = await redis.get<number>(`views:${slug}`);
    return NextResponse.json({ views: typeof views === "number" ? views : null });
  } catch {
    return NextResponse.json({ views: null });
  }
}
