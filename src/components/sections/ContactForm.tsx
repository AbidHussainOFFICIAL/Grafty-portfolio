"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { validateContact, type ContactErrors, type ContactValues } from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "error";

const emptyValues: ContactValues = { name: "", email: "", subject: "", message: "" };

const labelClass = "block text-[13px] font-semibold lg:text-[1.15cqw]";
const controlClass =
  "block w-full border-b-[1.5px] border-ink bg-transparent pb-1.5 pt-1.5 text-sm outline-none placeholder:text-ink/45 lg:pt-[0.3cqw] lg:text-[1.05cqw]";

interface FieldProps {
  label: string;
  name: keyof ContactValues;
  error?: string;
  className?: string;
  children: ReactNode;
}

function Field({ label, name, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={`contact-${name}`} className={labelClass}>
        {label}
        <span aria-hidden="true">*</span>
      </label>
      <div className="relative after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-violet after:transition-transform after:duration-300 focus-within:after:scale-x-100">
        {children}
      </div>
      {error && (
        <p id={`contact-${name}-error`} className="mt-1 text-xs text-red-700 lg:text-[1cqw]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const update =
    (field: keyof ContactValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = event.target.value;
      setValues((current) => ({ ...current, [field]: next }));
      if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const fieldProps = (field: keyof ContactValues) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    "aria-required": true as const,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: controlClass,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Array<keyof ContactValues>)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      return;
    }

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
    }
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:gap-x-[2.8cqw] lg:gap-y-[1.9cqw]"
    >
      <Field label="Full Name" name="name" error={errors.name}>
        <input type="text" autoComplete="name" placeholder="Your Name here" {...fieldProps("name")} />
      </Field>
      <Field label="Email" name="email" error={errors.email}>
        <input
          type="email"
          autoComplete="email"
          placeholder="Email Address"
          {...fieldProps("email")}
        />
      </Field>
      <Field label="Subject" name="subject" error={errors.subject} className="sm:col-span-2">
        <input type="text" placeholder="Write Subject line" {...fieldProps("subject")} />
      </Field>
      <Field label="Message" name="message" error={errors.message} className="sm:col-span-2">
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
          className="h-11 px-8 text-sm lg:h-[3.1cqw] lg:px-[2.4cqw] lg:text-[1.2cqw]"
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm lg:text-[1.2cqw] ${status === "error" ? "text-red-700" : ""}`}
        >
          {feedback}
        </p>
      </div>
    </form>
  );
}
