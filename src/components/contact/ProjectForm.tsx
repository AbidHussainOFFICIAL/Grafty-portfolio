"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { budgets, projectTypes, routes, timelines, type Choice } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Field, controlClass, labelClass } from "@/components/ui/Field";
import { SiteLink } from "@/components/ui/SiteLink";
import { cn } from "@/lib/cn";
import { sendContact } from "@/lib/contactClient";
import { contactLimits, validateBrief, type BriefErrors, type BriefValues } from "@/lib/validation";
import { ChoiceChips } from "./ChoiceChips";
import type { Draft, Outcome, PatchDraft } from "./draft";
import { FileDrop } from "./FileDrop";
import { PHONE_QUERY } from "./phone";

type Status = "idle" | "sending" | "error";
type TextField = "message" | "name" | "email" | "organisation";

/** The fields in the order they appear, and which phone step each belongs to. */
const FIELD_STEP: ReadonlyArray<readonly [keyof BriefValues, number]> = [
  ["types", 0],
  ["budget", 0],
  ["timeline", 0],
  ["message", 1],
  ["name", 2],
  ["email", 2],
  ["organisation", 2],
];

const STEP_COUNT = 3;

const hint = "text-xs text-ink/70 lg:text-[max(11px,1cqw)]";
const errorText = "mt-2 text-xs text-red-700 lg:mt-[0.7cqw] lg:text-[max(11px,1cqw)]";

function GroupTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 lg:gap-[1.2cqw]">
      <span aria-hidden="true" className="font-numeral text-sm opacity-60 md:text-base lg:text-[1.4cqw]">
        {number}
      </span>
      <h3 className="font-cond text-[clamp(1.75rem,8vw,2.25rem)] uppercase leading-none lg:text-[3cqw]">{title}</h3>
    </div>
  );
}

const labelsOf = (choices: readonly Choice[], ids: readonly string[]) =>
  ids.map((id) => choices.find((choice) => choice.id === id)?.label ?? id);

interface ProjectFormProps {
  draft: Draft;
  patch: PatchDraft;
  onSent: (outcome: Outcome) => void;
}

/**
 * The project brief. Tablets and desktops show its three groups at once (numbered 01 to 03); phones
 * show one group at a time with a progress bar, so the form never becomes a long scroll.
 */
export function ProjectForm({ draft, patch, onSent }: ProjectFormProps) {
  const prefix = useId();
  const reduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [step, setStep] = useState(0);
  // Steps slide in on phones, but not the first one when the page opens.
  const [moved, setMoved] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  // A ref, not state: two taps in the same frame both see the old state, but never the old ref.
  const sendingRef = useRef(false);

  const values: BriefValues = {
    types: draft.types,
    budget: draft.budget,
    timeline: draft.timeline,
    message: draft.message,
    organisation: draft.organisation,
    name: draft.name,
    email: draft.email,
  };

  /** Changes draft fields and clears their errors. */
  const change = (fields: Partial<Draft>) => {
    patch(fields);
    const touched = (Object.keys(fields) as Array<keyof BriefValues>).filter((key) => errors[key]);
    if (touched.length === 0) return;
    setErrors((current) => {
      const rest = { ...current };
      for (const key of touched) delete rest[key];
      return rest;
    });
  };

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });

  const focusField = (key: string) => document.getElementById(`${prefix}-${key}`)?.focus();

  /** Shows what is wrong with the fields of the steps up to `upToStep`, and moves to the first. True when all is well. */
  const check = (upToStep: number): boolean => {
    const found = validateBrief(values);
    const wrong = FIELD_STEP.filter(([key, fieldStep]) => fieldStep <= upToStep && found[key]);
    const shown: BriefErrors = {};
    for (const [key] of wrong) shown[key] = found[key];
    setErrors(shown);
    if (wrong.length === 0) return true;

    const [firstKey, firstStep] = wrong[0];
    setMoved(true);
    setStep(firstStep);
    // On a phone that group may only just have become visible; focus it once it is.
    window.requestAnimationFrame(() => focusField(firstKey));
    return false;
  };

  const next = () => {
    const found = validateBrief(values);
    const blocked = FIELD_STEP.filter(([key, fieldStep]) => fieldStep === step && found[key]);
    if (blocked.length > 0) {
      const shown: BriefErrors = {};
      for (const [key] of blocked) shown[key] = found[key];
      setErrors(shown);
      focusField(blocked[0][0]);
      return;
    }
    setErrors({});
    setMoved(true);
    setStep(step + 1);
    window.requestAnimationFrame(scrollToForm);
  };

  const back = () => {
    setMoved(true);
    setStep(step - 1);
    window.requestAnimationFrame(scrollToForm);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    // Phones show one step at a time: Enter on an earlier step moves on instead of sending.
    if (window.matchMedia(PHONE_QUERY).matches && step < STEP_COUNT - 1) {
      next();
      return;
    }
    if (!check(STEP_COUNT - 1)) return;

    sendingRef.current = true;
    setStatus("sending");
    setFeedback("");
    try {
      const result = await sendContact({ kind: "brief", values, files: draft.files, honeypot });
      if (result.ok) {
        onSent({
          kind: "brief",
          name: draft.name.trim(),
          chips: [
            ...labelsOf(projectTypes, draft.types),
            ...labelsOf(budgets, [draft.budget]),
            ...labelsOf(timelines, [draft.timeline]),
          ],
        });
        return;
      }
      setStatus("error");
      setFeedback(result.message);
    } finally {
      sendingRef.current = false;
    }
  }

  /** From tablet up the groups sit one under the other, divided by a line; on phones only the current one shows. */
  const group = (index: number) =>
    cn(
      step !== index && "max-md:hidden",
      moved && "max-md:animate-step",
      index > 0 && "md:mt-8 md:border-t md:border-ink/15 md:pt-8 lg:mt-[3cqw] lg:pt-[3cqw]",
    );

  const id = (key: string) => `${prefix}-${key}`;
  const textProps = (key: TextField) => ({
    id: id(key),
    name: key,
    value: draft[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      change({ [key]: event.target.value } as Pick<Draft, TextField>),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id(key)}-error` : undefined,
    className: controlClass,
  });

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="scroll-mt-24">
      {/* Phones: where you are in the three steps. */}
      <ol aria-label="Progress" className="mb-6 flex gap-2 md:hidden">
        {Array.from({ length: STEP_COUNT }, (_, index) => (
          <li
            key={index}
            aria-current={index === step ? "step" : undefined}
            className={cn("h-1 flex-1 rounded-full transition-colors duration-300", index <= step ? "bg-ink" : "bg-ink/15")}
          >
            <span className="sr-only">{`Step ${index + 1} of ${STEP_COUNT}`}</span>
          </li>
        ))}
      </ol>

      <div className={group(0)}>
        <GroupTitle number="01" title="Project" />

        <div className="mt-5 lg:mt-[1.8cqw]">
          <p id={id("types")} tabIndex={-1} className={labelClass}>
            What do you need?<span aria-hidden="true">*</span>
          </p>
          <div className="mt-2 lg:mt-[0.8cqw]">
            <ChoiceChips
              labelId={id("types")}
              options={projectTypes}
              value={draft.types}
              multiple
              onChange={(types) => change({ types })}
            />
          </div>
          {errors.types && (
            <p role="alert" className={errorText}>
              {errors.types}
            </p>
          )}
        </div>

        <div className="mt-6 lg:mt-[2cqw]">
          <p id={id("budget")} tabIndex={-1} className={labelClass}>
            Budget<span aria-hidden="true">*</span>
          </p>
          <div className="mt-2 lg:mt-[0.8cqw]">
            <ChoiceChips
              labelId={id("budget")}
              options={budgets}
              value={draft.budget ? [draft.budget] : []}
              onChange={([budget]) => change({ budget })}
            />
          </div>
          {errors.budget && (
            <p role="alert" className={errorText}>
              {errors.budget}
            </p>
          )}
        </div>

        <div className="mt-6 lg:mt-[2cqw]">
          <p id={id("timeline")} tabIndex={-1} className={labelClass}>
            Timeline<span aria-hidden="true">*</span>
          </p>
          <div className="mt-2 lg:mt-[0.8cqw]">
            <ChoiceChips
              labelId={id("timeline")}
              options={timelines}
              value={draft.timeline ? [draft.timeline] : []}
              onChange={([timeline]) => change({ timeline })}
            />
          </div>
          {errors.timeline && (
            <p role="alert" className={errorText}>
              {errors.timeline}
            </p>
          )}
        </div>
      </div>

      <div className={group(1)}>
        <GroupTitle number="02" title="Details" />

        <div className="mt-5 lg:mt-[1.8cqw]">
          <Field id={id("message")} label="About the project" required error={errors.message}>
            <textarea
              rows={5}
              autoComplete="off"
              placeholder="What are you making, who is it for and what should it achieve? Links are welcome."
              {...textProps("message")}
              className={cn(controlClass, "resize-none lg:min-h-[8cqw]")}
            />
          </Field>
          <p aria-hidden="true" className={cn(hint, "mt-1 text-right tabular-nums")}>
            {draft.message.length} / {contactLimits.message}
          </p>
        </div>

        <div className="mt-5 lg:mt-[1.6cqw]">
          <p className={labelClass}>Reference files (optional)</p>
          <div className="mt-2 lg:mt-[0.8cqw]">
            <FileDrop files={draft.files} onChange={(files) => change({ files })} />
          </div>
        </div>
      </div>

      <div className={group(2)}>
        <GroupTitle number="03" title="You" />

        <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:mt-[1.8cqw] lg:gap-x-[2.8cqw] lg:gap-y-[1.9cqw]">
          <Field id={id("name")} label="Full name" required error={errors.name}>
            <input type="text" autoComplete="name" placeholder="Your name" {...textProps("name")} />
          </Field>
          <Field id={id("email")} label="Email" required error={errors.email}>
            <input type="email" autoComplete="email" placeholder="you@company.com" {...textProps("email")} />
          </Field>
          <Field
            id={id("organisation")}
            label="Company or website (optional)"
            error={errors.organisation}
            className="sm:col-span-2"
          >
            <input
              type="text"
              autoComplete="organization"
              placeholder="Where I can see your work"
              {...textProps("organisation")}
            />
          </Field>
        </div>

        <p className={cn(hint, "mt-5 lg:mt-[1.6cqw]")}>
          By sending this you agree to the{" "}
          <SiteLink href={routes.privacy} className="underline underline-offset-2 hover:text-violet-deep">
            privacy policy
          </SiteLink>
          . I only use your details to reply to you.
        </p>
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

      <div className="mt-8 flex items-center gap-3 lg:mt-[3cqw] lg:gap-[1.4cqw]">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="h-12 select-none rounded-full border border-ink/40 px-6 text-base font-medium transition duration-300 hover:border-ink active:scale-[0.97] md:hidden"
          >
            Back
          </button>
        )}
        {step < STEP_COUNT - 1 && (
          <Button type="button" onClick={next} className="h-12 flex-1 px-8 text-base md:hidden">
            Next
          </Button>
        )}
        <Button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "h-12 px-8 text-base max-md:flex-1 md:h-11 md:text-sm lg:h-[4.6cqw] lg:px-[3cqw] lg:text-[max(14px,1.5cqw)]",
            step < STEP_COUNT - 1 && "max-md:hidden",
          )}
        >
          {status === "sending" ? "Sending…" : "Send brief"}
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
  );
}
