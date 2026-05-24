import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message, website } = (body ?? {}) as {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
  };

  // Honeypot: bots fill hidden fields. Pretend success so we don't tip them off.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (
    !trimmedName ||
    !trimmedMessage ||
    trimmedName.length > MAX_NAME ||
    trimmedEmail.length > MAX_EMAIL ||
    trimmedMessage.length > MAX_MESSAGE ||
    !EMAIL_RE.test(trimmedEmail)
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No Resend key configured — accept so the UX isn't broken, but send nothing.
    console.warn("Contact form: RESEND_API_KEY not set — submission not delivered.");
    return NextResponse.json({ ok: true });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "sagarp220376@gmail.com";
  const from =
    process.env.RESEND_FROM ?? "SAGAR_OS Contact <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: trimmedEmail,
      subject: `[SAGAR_OS] Message from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: email provider returned status", res.status);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
