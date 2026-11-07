import { daySlots, formatDay, formatTime, type DayKey } from "@/lib/booking";
import { cn } from "@/lib/cn";

interface SlotPickerProps {
  day: DayKey | null;
  time: string | null;
  timeZone: string;
  onSelect: (time: string) => void;
}

/** The free times on the chosen day, as pill buttons. Times that are already taken are left out. */
export function SlotPicker({ day, time, timeZone, onSelect }: SlotPickerProps) {
  if (!day) {
    return (
      <div className="grid min-h-28 place-items-center rounded-card bg-ink/[0.04] px-5 py-6 text-center text-sm text-ink/70 lg:min-h-[14cqw] lg:text-[max(13px,1.2cqw)]">
        Choose a day to see the times.
      </div>
    );
  }

  const free = daySlots(day).filter((slot) => !slot.taken);

  return (
    <div>
      <h4 aria-live="polite" className="font-cond text-2xl uppercase leading-none md:text-[1.75rem] lg:text-[2.4cqw]">
        {formatDay(day, "long")}
      </h4>
      <p className="mt-2 text-xs text-ink/70 lg:text-[max(11px,1cqw)]">
        {timeZone ? `Times shown in ${timeZone.replace(/_/g, " ")}` : "Times shown in your time zone"}
      </p>

      <ul role="group" aria-label={`Times on ${formatDay(day, "long")}`} className="mt-4 grid grid-cols-3 gap-2 lg:gap-[0.7cqw]">
        {free.map((slot) => {
          const chosen = slot.time === time;
          return (
            <li key={slot.time}>
              <button
                type="button"
                aria-pressed={chosen}
                onClick={() => onSelect(slot.time)}
                className={cn(
                  "min-h-11 w-full select-none rounded-full border px-2 text-sm tabular-nums transition duration-300 ease-out active:scale-[0.97] lg:text-[max(13px,1.15cqw)]",
                  chosen
                    ? "border-ink bg-ink text-white hover:border-violet hover:bg-violet"
                    : "border-ink/40 hover:border-ink",
                )}
              >
                {formatTime(slot.time)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
