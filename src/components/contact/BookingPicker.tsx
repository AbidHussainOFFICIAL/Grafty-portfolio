"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { booking } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Field, controlClass } from "@/components/ui/Field";
import { buildIcs, formatDay, formatTime } from "@/lib/booking";
import { cn } from "@/lib/cn";
import { sendContact } from "@/lib/contactClient";
import { useTimeZone, useToday } from "@/lib/useBookingClock";
import { validateCall, type CallErrors, type CallValues } from "@/lib/validation";
import { DayPicker } from "./DayPicker";
import type { Draft, Outcome, PatchDraft } from "./draft";
import { SlotPicker } from "./SlotPicker";

const EASE = [0.22, 1, 0.36, 1] as const;

type Status = "idle" | "sending" | "error";
type TextField = "name" | "email" | "topic";

interface BookingPickerProps {
  draft: Draft;
  patch: PatchDraft;
  onBooked: (outcome: Outcome) => void;
}

/**
 * The call booking: a calendar, the free times of the chosen day and, once a time is chosen, the
 * details to confirm it. Side by side from tablet up, one under the other on phones. It is the same
 * component inline on the page and inside the phone sheet.
 */
export function BookingPicker({ draft, patch, onBooked }: BookingPickerProps) {
  const prefix = useId();
  const today = useToday();
  const timeZone = useTimeZone();
  const reduceMotion = useReducedMotion();
  const [errors, setErrors] = useState<CallErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const sendingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Before the browser has told us today's date (server render, hydration) there is nothing to show.
  if (!today) {
    return (
      <div aria-busy="true" className="h-80 rounded-card bg-ink/[0.04] motion-safe:animate-pulse lg:h-[28cqw]">
        <span className="sr-only">Loading the calendar</span>
      </div>
    );
  }

  const id = (key: string) => `${prefix}-${key}`;

  const selectDay = (date: string) => {
    if (date === draft.date) return;
    patch({ date, time: null });
    setFeedback("");
  };

  const selectTime = (time: string) => {
    const firstTime = draft.time === null;
    patch({ time });
    setFeedback("");
    // The details open below; once they have finished opening, bring them into view.
    if (firstTime) {
      window.setTimeout(
        () => formRef.current?.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" }),
        reduceMotion ? 0 : 450,
      );
    }
  };

  const edit = (key: TextField) => (event: ChangeEvent<HTMLInputElement>) => {
    patch({ [key]: event.target.value } as Pick<Draft, TextField>);
    if (errors[key]) {
      setErrors((current) => {
        const rest = { ...current };
        delete rest[key];
        return rest;
      });
    }
  };

  const fieldProps = (key: TextField) => ({
    id: id(key),
    name: key,
    value: draft[key],
    onChange: edit(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id(key)}-error` : undefined,
    className: controlClass,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current || !today || !draft.date || !draft.time) return;

    const values: CallValues = {
      date: draft.date,
      time: draft.time,
      name: draft.name,
      email: draft.email,
      topic: draft.topic,
    };
    const found = validateCall(values, today);
    setErrors(found);
    const firstInvalid = (["name", "email", "topic"] as const).find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }
    if (found.date || found.time) {
      setStatus("error");
      setFeedback(found.date ?? found.time ?? "");
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    setFeedback("");
    try {
      const result = await sendContact({ kind: "call", values, timezone: timeZone, today, honeypot });
      if (result.ok) {
        onBooked({
          kind: "call",
          name: draft.name.trim(),
          when: `${formatDay(values.date, "long")}, ${formatTime(values.time)}`,
          ics: buildIcs(values.date, values.time, new Date()),
        });
        return;
      }
      setStatus("error");
      setFeedback(result.message);
    } finally {
      sendingRef.current = false;
    }
  }

  const chosen = draft.date && draft.time ? `${formatDay(draft.date, "short")} at ${formatTime(draft.time)}` : null;

  return (
    <div className="md:grid md:grid-cols-2 md:gap-x-8 lg:gap-x-[3cqw]">
      <DayPicker today={today} selected={draft.date} onSelect={selectDay} />

      <div className="mt-6 md:mt-0">
        <SlotPicker day={draft.date} time={draft.time} timeZone={timeZone} onSelect={selectTime} />
      </div>

      <AnimatePresence initial={false}>
        {chosen && (
          <motion.div
            key="details"
            className="overflow-hidden md:col-span-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
          >
            {/* The padding sits inside, so the animated box above can shrink to zero. */}
            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              className="mt-8 border-t border-ink/15 pt-8 lg:mt-[3cqw] lg:pt-[3cqw]"
            >
              <p className="font-cond text-2xl uppercase leading-none md:text-[1.75rem] lg:text-[2.4cqw]">Your details</p>
              <p className="mt-2 text-sm lg:text-[max(13px,1.2cqw)]">
                {chosen} · {booking.durationMinutes} min on {booking.meeting}
              </p>

              <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:mt-[1.8cqw] lg:gap-x-[2.8cqw] lg:gap-y-[1.9cqw]">
                <Field id={id("name")} label="Full name" required error={errors.name}>
                  <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps("name")} />
                </Field>
                <Field id={id("email")} label="Email" required error={errors.email}>
                  <input type="email" autoComplete="email" placeholder="you@company.com" {...fieldProps("email")} />
                </Field>
                <Field id={id("topic")} label="What would you like to talk about? (optional)" error={errors.topic} className="sm:col-span-2">
                  <input type="text" autoComplete="off" placeholder="A new brand, a website, an idea…" {...fieldProps("topic")} />
                </Field>
              </div>

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

              <div className="mt-8 lg:mt-[3cqw]">
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="h-12 w-full px-8 text-base md:h-11 md:w-auto md:text-sm lg:h-[4.6cqw] lg:px-[3cqw] lg:text-[max(14px,1.5cqw)]"
                >
                  {status === "sending" ? "Booking…" : "Confirm booking"}
                </Button>
              </div>

              <p
                role="status"
                aria-live="polite"
                className={cn("mt-3 text-sm empty:hidden lg:text-[max(13px,1.2cqw)]", status === "error" && "text-red-700")}
              >
                {feedback}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
