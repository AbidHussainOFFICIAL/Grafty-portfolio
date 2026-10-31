import { site } from "@/data/content";
import { cn } from "@/lib/cn";

/** "Available for new projects" with a softly pulsing dot. Edit or hide it in content.ts. */
export function Availability({ className }: { className?: string }) {
  if (!site.availability.open) return null;

  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      {site.availability.label}
    </span>
  );
}
