import type { DayKey } from "@/lib/booking";
import type { Prefill } from "@/lib/contactPrefill";

/**
 * Everything typed or chosen on the Contact page. It lives above the two halves (brief and call), so
 * switching between them never loses what was entered, and the name and email carry across.
 */
export interface Draft {
  types: string[];
  budget: string;
  timeline: string;
  message: string;
  organisation: string;
  files: File[];
  name: string;
  email: string;
  date: DayKey | null;
  time: string | null;
  topic: string;
}

export type PatchDraft = (patch: Partial<Draft>) => void;

export function newDraft(prefill: Prefill): Draft {
  return {
    types: [...prefill.types],
    budget: prefill.budget,
    timeline: prefill.timeline,
    message: "",
    organisation: "",
    files: [],
    name: "",
    email: "",
    date: null,
    time: null,
    topic: "",
  };
}

/** What the success screen needs to know about what was just sent or booked. */
export type Outcome =
  | { kind: "brief"; name: string; chips: string[] }
  | { kind: "call"; name: string; when: string; ics: string };
