import { NextResponse } from "next/server";
import { budgets, projectTypes, timelines, type Choice } from "@/data/content";
import { addDays } from "@/lib/booking";
import {
  checkFiles,
  validateBrief,
  validateCall,
  validateContact,
  type BriefValues,
  type CallValues,
} from "@/lib/validation";

type Fields = Record<string, unknown>;

interface Attachment {
  filename: string;
  content: string;
}

function isRecord(value: unknown): value is Fields {
  return typeof value === "object" && value !== null;
}

const text = (body: Fields, key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");

const list = (body: Fields, key: string): string[] =>
  Array.isArray(body[key]) ? (body[key] as unknown[]).filter((item): item is string => typeof item === "string") : [];

const labelOf = (choices: readonly Choice[], id: string) => choices.find((choice) => choice.id === id)?.label ?? id;

const BASE64 = /^[A-Za-z0-9+/]*={0,2}$/;

/** The attachments of a brief, or null when the list is malformed. */
function readAttachments(body: Fields): Attachment[] | null {
  const raw = body.attachments;
  if (raw === undefined) return [];
  if (!Array.isArray(raw)) return null;

  const attachments: Attachment[] = [];
  for (const item of raw) {
    if (!isRecord(item) || typeof item.filename !== "string" || typeof item.content !== "string") return null;
    if (!BASE64.test(item.content)) return null;
    attachments.push({ filename: item.filename.replace(/[^\w.\- ]+/g, "_").slice(0, 120), content: item.content });
  }
  return attachments;
}

const invalid = () => NextResponse.json({ error: "Invalid request." }, { status: 400 });

const failed = (errors: object) => NextResponse.json({ error: "Please check the form.", errors }, { status: 422 });

/** Sends one email through Resend. Which messages arrive, and how they look, is decided by the callers. */
async function deliver(options: {
  subject: string;
  body: string;
  replyTo: string;
  attachments?: Attachment[];
}) {
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
      reply_to: options.replyTo,
      subject: options.subject,
      text: options.body,
      ...(options.attachments && options.attachments.length > 0 && { attachments: options.attachments }),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Your message could not be sent. Please try again shortly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

/** The short note from the form on the Home page. */
function handleMessage(body: Fields) {
  const values = { name: text(body, "name"), email: text(body, "email"), message: text(body, "message") };
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return failed(errors);

  return deliver({
    subject: `Portfolio enquiry from ${values.name.trim()}`,
    body: `From: ${values.name.trim()} <${values.email.trim()}>\n\n${values.message.trim()}`,
    replyTo: values.email.trim(),
  });
}

/** The project brief from the Contact page. */
function handleBrief(body: Fields) {
  const values: BriefValues = {
    types: list(body, "types"),
    budget: text(body, "budget"),
    timeline: text(body, "timeline"),
    message: text(body, "message"),
    organisation: text(body, "organisation"),
    name: text(body, "name"),
    email: text(body, "email"),
  };
  const errors = validateBrief(values);
  if (Object.keys(errors).length > 0) return failed(errors);

  const attachments = readAttachments(body);
  if (!attachments) return invalid();
  const fileError = checkFiles(
    attachments.map((file) => ({ name: file.filename, size: Buffer.from(file.content, "base64").length })),
  );
  if (fileError) return NextResponse.json({ error: fileError }, { status: 422 });

  const lines = [
    `From: ${values.name.trim()} <${values.email.trim()}>`,
    values.organisation.trim() && `Company or website: ${values.organisation.trim()}`,
    `Services: ${values.types.map((id) => labelOf(projectTypes, id)).join(", ")}`,
    `Budget: ${labelOf(budgets, values.budget)}`,
    `Timeline: ${labelOf(timelines, values.timeline)}`,
    attachments.length > 0 && `Attachments: ${attachments.map((file) => file.filename).join(", ")}`,
    "",
    values.message.trim(),
  ].filter((line): line is string => typeof line === "string");

  return deliver({
    subject: `Project brief from ${values.name.trim()}`,
    body: lines.join("\n"),
    replyTo: values.email.trim(),
    attachments,
  });
}

/** A call booked on the Contact page. */
function handleCall(body: Fields) {
  const values: CallValues = {
    date: text(body, "date"),
    time: text(body, "time"),
    name: text(body, "name"),
    email: text(body, "email"),
    topic: text(body, "topic"),
  };

  // The calendar works in the visitor's own date, which can differ from the server's by a day.
  const today = text(body, "today");
  const serverToday = new Date().toISOString().slice(0, 10);
  if (![addDays(serverToday, -1), serverToday, addDays(serverToday, 1)].includes(today)) return invalid();

  const errors = validateCall(values, today);
  if (Object.keys(errors).length > 0) return failed(errors);

  const timezone = text(body, "timezone").slice(0, 60) || "unknown time zone";
  const lines = [
    `From: ${values.name.trim()} <${values.email.trim()}>`,
    `Call requested for: ${values.date} at ${values.time} (${timezone})`,
    "",
    values.topic.trim() || "No topic given.",
  ];

  return deliver({
    subject: `Call booked by ${values.name.trim()}`,
    body: lines.join("\n"),
    replyTo: values.email.trim(),
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalid();
  }
  if (!isRecord(body)) return invalid();

  // Bots fill the hidden field; pretend success and send nothing.
  if (text(body, "company")) return NextResponse.json({ ok: true });

  const kind = text(body, "kind") || "message";
  if (kind === "message") return handleMessage(body);
  if (kind === "brief") return handleBrief(body);
  if (kind === "call") return handleCall(body);
  return invalid();
}
