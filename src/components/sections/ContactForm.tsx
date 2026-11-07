"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, controlClass } from "@/components/ui/Field";
import { validateContact, type ContactErrors, type ContactValues } from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "error";

const emptyValues: ContactValues = { name: "", email: "", message: "" };

/** The short note on the Home page (tablet and up). It sends through /api/contact like the Contact page does. */
export function ContactForm() {
  const prefix = useId();
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  // A ref, not state: two taps in the same frame both see the old state, but never the old ref.
  const sendingRef = useRef(false);

  const update =
    (field: keyof ContactValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = event.target.value;
      setValues((current) => ({ ...current, [field]: next }));
      if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const fieldProps = (field: keyof ContactValues) => ({
    id: `${prefix}-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    "aria-required": true as const,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${prefix}-${field}-error` : undefined,
    className: controlClass,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Array<keyof ContactValues>)[0];
    if (firstInvalid) {
      (formRef.current?.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      const data: { error?: string; errors?: ContactErrors } = await response
        .json()
        .catch(() => ({}));

      if (response.ok) {
        setValues(emptyValues);
        setStatus("success");
        setFeedback("Thank you. Your message is on its way and I will reply soon.");
        return;
      }
      if (response.status === 422 && data.errors) setErrors(data.errors);
      setStatus("error");
      setFeedback(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setFeedback("Could not reach the server. Please check your connection and try again.");
    } finally {
      sendingRef.current = false;
    }
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:gap-x-[2.8cqw] lg:gap-y-[1.9cqw]"
    >
      <Field id={`${prefix}-name`} label="Full Name" required error={errors.name}>
        <input type="text" autoComplete="name" placeholder="Your Name here" {...fieldProps("name")} />
      </Field>
      <Field id={`${prefix}-email`} label="Email" required error={errors.email}>
        <input type="email" autoComplete="email" placeholder="Email Address" {...fieldProps("email")} />
      </Field>
      <Field id={`${prefix}-message`} label="Message" required error={errors.message} className="sm:col-span-2">
        <textarea
          rows={4}
          placeholder="Tell me about your project"
          {...fieldProps("message")}
          className={`${controlClass} resize-none lg:min-h-[5.6cqw]`}
        />
      </Field>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button
          type="submit"
          disabled={status === "sending"}
          className="h-12 px-8 text-sm md:h-11 lg:h-[3.1cqw] lg:px-[2.4cqw] lg:text-[max(13px,1.2cqw)]"
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm lg:text-[max(13px,1.2cqw)] ${status === "error" ? "text-red-700" : ""}`}
        >
          {feedback}
        </p>
      </div>
    </form>
  );
}
