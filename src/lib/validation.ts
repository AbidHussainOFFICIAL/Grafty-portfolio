import { budgets, projectTypes, timelines, uploadRules } from "@/data/content";
import { daySlots, isDayOpen, isKey } from "@/lib/booking";

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const contactLimits = {
  name: 120,
  email: 254,
  message: 4000,
  organisation: 120,
  topic: 1000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkName(name: string): string | undefined {
  if (!name) return "Please enter your name.";
  if (name.length > contactLimits.name) return "That name is too long.";
  return undefined;
}

function checkEmail(email: string): string | undefined {
  if (!email) return "Please enter your email.";
  if (!EMAIL_PATTERN.test(email) || email.length > contactLimits.email) return "Please enter a valid email address.";
  return undefined;
}

/** Shared by the form (instant feedback) and the API route (the real check). */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  const nameError = checkName(name);
  if (nameError) errors.name = nameError;

  const emailError = checkEmail(email);
  if (emailError) errors.email = emailError;

  if (!message) errors.message = "Please write a message.";
  else if (message.length > contactLimits.message) errors.message = "That message is too long.";

  return errors;
}

/** The project brief on the Contact page. */
export interface BriefValues {
  types: readonly string[];
  budget: string;
  timeline: string;
  message: string;
  organisation: string;
  name: string;
  email: string;
}

export type BriefErrors = Partial<Record<keyof BriefValues, string>>;

const typeIds = new Set(projectTypes.map((type) => type.id));
const budgetIds = new Set(budgets.map((budget) => budget.id));
const timelineIds = new Set(timelines.map((timeline) => timeline.id));

export function validateBrief(values: BriefValues): BriefErrors {
  const errors: BriefErrors = {};

  if (values.types.length === 0 || !values.types.every((id) => typeIds.has(id)))
    errors.types = "Choose at least one type of project.";
  if (!budgetIds.has(values.budget)) errors.budget = "Choose a budget, or “Not sure yet”.";
  if (!timelineIds.has(values.timeline)) errors.timeline = "Choose a timeline, or “Flexible”.";

  const message = values.message.trim();
  if (!message) errors.message = "Tell me a little about the project.";
  else if (message.length > contactLimits.message) errors.message = "That is too long. Add a link for the rest.";

  if (values.organisation.trim().length > contactLimits.organisation) errors.organisation = "That is too long.";

  const nameError = checkName(values.name.trim());
  if (nameError) errors.name = nameError;
  const emailError = checkEmail(values.email.trim());
  if (emailError) errors.email = emailError;

  return errors;
}

/** A booked call: the day (YYYY-MM-DD), the start time (HH:MM) and who is booking. */
export interface CallValues {
  date: string;
  time: string;
  name: string;
  email: string;
  topic: string;
}

export type CallErrors = Partial<Record<keyof CallValues, string>>;

/** `today` is the visitor's own date, so the check agrees with what the calendar showed them. */
export function validateCall(values: CallValues, today: string): CallErrors {
  const errors: CallErrors = {};

  if (!isKey(values.date) || !isDayOpen(values.date, today)) errors.date = "Please choose one of the available days.";
  else if (!daySlots(values.date).some((slot) => slot.time === values.time && !slot.taken))
    errors.time = "Please choose one of the available times.";

  const nameError = checkName(values.name.trim());
  if (nameError) errors.name = nameError;
  const emailError = checkEmail(values.email.trim());
  if (emailError) errors.email = emailError;
  if (values.topic.trim().length > contactLimits.topic) errors.topic = "That is too long.";

  return errors;
}

/** Why a set of attachments is not acceptable, or null when it is fine. Shared by the form and the API route. */
export function checkFiles(files: readonly { name: string; size: number }[]): string | null {
  if (files.length > uploadRules.maxFiles) return `You can attach up to ${uploadRules.maxFiles} files.`;
  for (const file of files) {
    const dot = file.name.lastIndexOf(".");
    const extension = dot === -1 ? "" : file.name.slice(dot).toLowerCase();
    if (!(uploadRules.extensions as readonly string[]).includes(extension))
      return `${file.name} is not a supported file type.`;
    if (file.size === 0) return `${file.name} is empty.`;
  }
  const total = files.reduce((sum, file) => sum + file.size, 0);
  if (total > uploadRules.maxTotalBytes)
    return `Those files are too large together. The limit is ${Math.round(uploadRules.maxTotalBytes / 1024 / 1024)} MB in total.`;
  return null;
}
