import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const honeypot = String(body.honeypot ?? "");

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

    const data = (await res.json()) as { success?: boolean };
    if (!res.ok || !data.success) {
      return NextResponse.json({ ok: false, error: "send-failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
