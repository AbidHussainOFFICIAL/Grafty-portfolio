import type { Choice } from "@/data/content";
import { cn } from "@/lib/cn";

interface ChoiceChipsProps {
  /** Names the group for assistive tech; the visible label sits above it. */
  labelId: string;
  options: readonly Choice[];
  /** The chosen ids. */
  value: readonly string[];
  /** True lets several be chosen; false keeps exactly one. */
  multiple?: boolean;
  onChange: (next: string[]) => void;
}

/** Pill buttons to choose from. Chosen ones fill with ink, like the Services deliverable pills turned solid. */
export function ChoiceChips({ labelId, options, value, multiple = false, onChange }: ChoiceChipsProps) {
  const toggle = (id: string) => {
    if (!multiple) return onChange([id]);
    onChange(value.includes(id) ? value.filter((item) => item !== id) : [...value, id]);
  };

  return (
    <ul role="group" aria-labelledby={labelId} className="flex flex-wrap gap-2 lg:gap-[0.7cqw]">
      {options.map((option) => {
        const chosen = value.includes(option.id);
        return (
          <li key={option.id}>
            <button
              type="button"
              aria-pressed={chosen}
              onClick={() => toggle(option.id)}
              className={cn(
                "min-h-11 select-none rounded-full border px-4 text-sm transition duration-300 ease-out active:scale-[0.97] lg:min-h-[3.6cqw] lg:px-[1.8cqw] lg:text-[max(13px,1.2cqw)]",
                chosen
                  ? "border-ink bg-ink text-white hover:border-violet hover:bg-violet"
                  : "border-ink/40 hover:border-ink",
              )}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
