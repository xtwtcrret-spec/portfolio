import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let payload: {
    name?: string;
    email?: string;
    message?: string;
    honeypot?: string;
  };

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const honeypot = String(payload.honeypot ?? "");

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const key = process.env.WEB3FORMS_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        name,
        email,
        message,
        subject: `Portfolio message from ${name}`,
        from_name: "Portfolio Contact Form",
      }),
    });

    const raw = await res.text();
    let data: { success?: boolean; message?: string } = {};
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("[contact] web3forms non-JSON response:", res.status, raw.slice(0, 300));
      return NextResponse.json({ ok: false, error: "send-failed" }, { status: 502 });
    }

    if (!res.ok || !data.success) {
      console.error("[contact] web3forms rejected:", res.status, raw.slice(0, 300));
      return NextResponse.json({ ok: false, error: "send-failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
