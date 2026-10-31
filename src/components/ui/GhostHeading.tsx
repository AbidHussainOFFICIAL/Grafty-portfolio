import { cn } from "@/lib/cn";

/** Cap height of Archivo as a fraction of the font size. */
const CAP_HEIGHT = 0.686;
const WIDTH = 1000;

interface GhostHeadingProps {
  text: string;
  /** Width of the word divided by the height of its capitals, taken from the design. */
  ratio: number;
  /** Fraction of the capital height that stays visible (the rest is cropped). */
  visible?: number;
  className?: string;
}

/**
 * Giant decorative word that fades from white to transparent.
 * The SVG text is stretched to fill its box, so it always spans the full width
 * of the container whatever the screen size. It is hidden from assistive tech;
 * sections provide their own real heading.
 */
export function GhostHeading({ text, ratio, visible = 1, className }: GhostHeadingProps) {
  const capHeight = WIDTH / ratio;
  const fontSize = capHeight / CAP_HEIGHT;
  const height = capHeight * visible;
  const gradientId = `ghost-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none block select-none overflow-hidden", className)}
      style={{ aspectRatio: `${WIDTH} / ${height}` }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="block h-full w-full"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={capHeight}
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y={capHeight}
          textLength={WIDTH}
          lengthAdjust="spacingAndGlyphs"
          fill={`url(#${gradientId})`}
          className="font-ghost"
          style={{ fontSize }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
