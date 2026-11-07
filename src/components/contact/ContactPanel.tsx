"use client";

import { useCallback, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { booking } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { formatDay, formatTime } from "@/lib/booking";
import { emptyPrefill, parsePrefill, type Prefill } from "@/lib/contactPrefill";
import { useContactMode, useContactSearch, type ContactMode } from "@/lib/useContactLocation";
import { BookingPicker } from "./BookingPicker";
import { BookingSheet } from "./BookingSheet";
import { DirectContact } from "./DirectContact";
import { newDraft, type Draft, type Outcome } from "./draft";
import { ModeSwitch } from "./ModeSwitch";
import { ProjectForm } from "./ProjectForm";
import { SuccessScreen } from "./SuccessScreen";

const EASE = [0.22, 1, 0.36, 1] as const;

function Workspace({ prefill }: { prefill: Prefill }) {
  const panelId = useId();
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useContactMode();
  const [draft, setDraft] = useState<Draft>(() => newDraft(prefill));
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const patch = useCallback((fields: Partial<Draft>) => setDraft((current) => ({ ...current, ...fields })), []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const scrollToTop = () =>
    window.requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" }),
    );

  const finish = (result: Outcome) => {
    setOutcome(result);
    setSheetOpen(false);
    scrollToTop();
  };

  /** An empty form again, keeping the name and email already given. */
  const startFresh = (keep: Pick<Draft, "name" | "email">) => {
    setDraft({ ...newDraft(emptyPrefill), ...keep });
    setOutcome(null);
  };

  const reset = () => {
    startFresh({ name: "", email: "" });
    scrollToTop();
  };

  const other = () => {
    if (!outcome) return;
    const next: ContactMode = outcome.kind === "brief" ? "call" : "brief";
    startFresh({ name: draft.name, email: draft.email });
    setMode(next);
    scrollToTop();
  };

  const chosen = draft.date && draft.time ? `${formatDay(draft.date, "long")}, ${formatTime(draft.time)}` : null;

  return (
    <section
      id="start"
      aria-label="Start a project"
      className="mt-8 px-5 md:mt-10 md:px-8 lg:mt-[3.4cqw] lg:px-[5.08%]"
    >
      <div className="lg:grid lg:grid-cols-[32%_1fr] lg:items-start lg:gap-x-[2.4cqw]">
        <div ref={topRef} className="min-w-0 scroll-mt-24 lg:col-start-2 lg:row-start-1">
          {!outcome && <ModeSwitch mode={mode} onChange={setMode} panelId={panelId} />}

          <div
            id={panelId}
            role={outcome ? undefined : "tabpanel"}
            className={cn("rounded-card bg-white p-5 shadow-card md:p-8 lg:p-[3cqw]", !outcome && "mt-4 lg:mt-[1.4cqw]")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={outcome ? "done" : mode}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
              >
                {outcome ? (
                  <SuccessScreen outcome={outcome} onReset={reset} onOther={other} />
                ) : mode === "brief" ? (
                  <ProjectForm draft={draft} patch={patch} onSent={finish} />
                ) : (
                  <div>
                    <h3 className="font-cond text-[clamp(1.75rem,8vw,2.25rem)] uppercase leading-none lg:text-[3cqw]">
                      {booking.title}
                    </h3>
                    <p className="mt-3 max-w-[34rem] text-base leading-snug lg:mt-[1.2cqw] lg:max-w-[44cqw] lg:text-[max(14px,1.5cqw)]">
                      {booking.intro}
                    </p>

                    {/* Tablet and desktop: the calendar sits right here. */}
                    <div className="mt-6 hidden md:block lg:mt-[2.2cqw]">
                      <BookingPicker draft={draft} patch={patch} onBooked={finish} />
                    </div>

                    {/* Phones: the calendar opens full screen. */}
                    <div className="mt-6 md:hidden">
                      {chosen && <p className="mb-3 text-sm font-medium">{chosen}</p>}
                      <Button type="button" onClick={() => setSheetOpen(true)} className="h-12 w-full px-8 text-base">
                        {chosen ? "Continue booking" : "Pick a time"}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <aside
          aria-label="Contact details"
          className="mt-10 min-w-0 md:mt-12 lg:col-start-1 lg:row-start-1 lg:mt-0"
        >
          <DirectContact />
        </aside>
      </div>

      <AnimatePresence>
        {sheetOpen && <BookingSheet key="sheet" draft={draft} patch={patch} onBooked={finish} onClose={closeSheet} />}
      </AnimatePresence>
    </section>
  );
}

/**
 * The heart of the Contact page: the project brief and the call booking in one panel, with the
 * direct contact details beside it. A link such as /contact?package=product-design arrives with the
 * brief filled in; the form is rebuilt when the address changes, which only happens before anything is typed.
 */
export function ContactPanel() {
  const search = useContactSearch();
  return <Workspace key={search} prefill={parsePrefill(search)} />;
}
