import type { VectorArt as VectorArtData } from "@/data/artwork";

interface VectorArtProps {
  art: VectorArtData;
  className?: string;
  /** Accessible name. Omit for purely decorative artwork. */
  label?: string;
}

/** Renders a traced single-path vector (signature, wordmark, client logos). */
export function VectorArt({ art, className, label }: VectorArtProps) {
  return (
    <svg
      viewBox={`0 0 ${art.width} ${art.height}`}
      className={className}
      fill="currentColor"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path fillRule="evenodd" d={art.d} />
    </svg>
  );
}
