"use client";

import { useState } from "react";
import { ArrowRightLongIcon } from "@/components/ui/Icons";
import {
  firstOpenDay,
  formatDay,
  formatMonth,
  isDayOpen,
  lastOpenDay,
  monthOf,
  monthWeekdays,
  shiftMonth,
  type DayKey,
  type MonthRef,
} from "@/lib/booking";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr"];

const arrow =
  "grid h-11 w-11 place-items-center rounded-full bg-surface text-ink transition duration-300 enabled:hover:bg-ink enabled:hover:text-white enabled:active:scale-95 disabled:opacity-30";

interface DayPickerProps {
  today: DayKey;
  selected: DayKey | null;
  onSelect: (day: DayKey) => void;
}

/** A month of weekdays. Days that are free are filled; booked, past and out-of-range days are faded and cannot be chosen. */
export function DayPicker({ today, selected, onSelect }: DayPickerProps) {
  const [month, setMonth] = useState<MonthRef>(() => monthOf(selected ?? firstOpenDay(today)));

  const earliest = monthOf(firstOpenDay(today));
  const latest = monthOf(lastOpenDay(today));

  const canPrev = month.year > earliest.year || (month.year === earliest.year && month.month > earliest.month);
  const canNext = month.year < latest.year || (month.year === latest.year && month.month < latest.month);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h4
          aria-live="polite"
          className="font-cond text-2xl uppercase leading-none md:text-[1.75rem] lg:text-[2.4cqw]"
        >
          {formatMonth(month)}
        </h4>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous month"
            disabled={!canPrev}
            onClick={() => setMonth(shiftMonth(month, -1))}
            className={arrow}
          >
            <ArrowRightLongIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            disabled={!canNext}
            onClick={() => setMonth(shiftMonth(month, 1))}
            className={arrow}
          >
            <ArrowRightLongIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div aria-hidden="true" className="mt-4 grid grid-cols-5 text-center text-[11px] font-semibold uppercase tracking-wide opacity-60">
        {WEEKDAYS.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>

      <div role="group" aria-label={formatMonth(month)} className="mt-2 grid grid-cols-5 gap-y-1">
        {monthWeekdays(month).map((key, index) => {
          if (!key) return <span key={`empty-${index}`} aria-hidden="true" />;
          const open = isDayOpen(key, today);
          const chosen = key === selected;
          return (
            <button
              key={key}
              type="button"
              disabled={!open}
              aria-pressed={chosen}
              aria-label={`${formatDay(key, "long")}${open ? "" : ", not available"}`}
              onClick={() => onSelect(key)}
              className={cn(
                "mx-auto grid h-11 w-11 place-items-center rounded-full text-sm font-medium tabular-nums transition duration-300 ease-out",
                chosen
                  ? "bg-ink text-white hover:bg-violet"
                  : open
                    ? "bg-surface hover:bg-ink hover:text-white active:scale-95"
                    : "text-ink/30",
              )}
            >
              {Number(key.slice(8))}
            </button>
          );
        })}
      </div>
    </div>
  );
}
