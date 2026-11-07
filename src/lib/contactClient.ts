import { contactLive } from "@/data/content";
import type { BriefValues, CallValues } from "./validation";

export type ContactRequest =
  | { kind: "brief"; values: BriefValues; files: readonly File[]; honeypot: string }
  | { kind: "call"; values: CallValues; timezone: string; today: string; honeypot: string };

export type SendResult = { ok: true } | { ok: false; message: string };

const pause = (milliseconds: number) => new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

/** A file's contents as base64 text, ready to travel inside the JSON request. */
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * The one place the Contact page sends anything. While `contactLive` is false (content.ts) it only
 * waits a moment and reports success, so the whole flow can be tried without a mail account.
 */
export async function sendContact(request: ContactRequest): Promise<SendResult> {
  if (!contactLive) {
    await pause(900);
    return { ok: true };
  }

  try {
    const body =
      request.kind === "brief"
        ? {
            kind: "brief",
            ...request.values,
            company: request.honeypot,
            attachments: await Promise.all(
              request.files.map(async (file) => ({ filename: file.name, content: await toBase64(file) })),
            ),
          }
        : {
            kind: "call",
            ...request.values,
            timezone: request.timezone,
            today: request.today,
            company: request.honeypot,
          };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) return { ok: true };

    const data: { error?: string } = await response.json().catch(() => ({}));
    return { ok: false, message: data.error ?? "Something went wrong. Please try again." };
  } catch {
    return { ok: false, message: "Could not reach the server. Please check your connection and try again." };
  }
}
