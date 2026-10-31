import { NextResponse } from "next/server";
import { validateContact, type ContactValues } from "@/lib/validation";

interface ContactPayload extends ContactValues {
  /** Honeypot: real visitors never see or fill this field. */
  company?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toPayload(body: unknown): ContactPayload | null {
  if (!isRecord(body)) return null;
  const read = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");
  return {
    name: read("name"),
    email: read("email"),
    subject: read("subject"),
    message: read("message"),
    company: read("company"),
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = toPayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success and send nothing.
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the form.", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Sending messages is not set up yet. Please email directly instead." },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email.trim(),
      subject: `Portfolio enquiry: ${payload.subject.trim()}`,
      text: `From: ${payload.name.trim()} <${payload.email.trim()}>\n\n${payload.message.trim()}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
