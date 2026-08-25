import { NextResponse } from "next/server";

interface TokenResponse {
  access_token?: string;
}

interface SpotifyTrack {
  is_playing: boolean;
  item?: {
    name: string;
    artists?: { name: string }[];
    external_urls?: { spotify?: string };
  };
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });
  const data = (await res.json()) as TokenResponse;
  return data.access_token ?? null;
}

export async function GET() {
  const configured = Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN
  );

  if (!configured) {
    return NextResponse.json({ configured: false, isPlaying: false });
  }

  try {
    const token = await getAccessToken();
    if (!token) throw new Error("no token");

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (res.status === 204 || !res.ok) {
      return NextResponse.json({ configured: true, isPlaying: false });
    }

    const track = (await res.json()) as SpotifyTrack;
    return NextResponse.json({
      configured: true,
      isPlaying: Boolean(track.is_playing),
      title: track.item?.name,
      artist: track.item?.artists?.map((a) => a.name).join(", "),
      url: track.item?.external_urls?.spotify,
    });
  } catch {
    return NextResponse.json({ configured: true, isPlaying: false });
  }
}
