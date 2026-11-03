import { cn } from "@/lib/cn";

/** Cap height of Archivo as a fraction of the font size. */
const CAP_HEIGHT = 0.686;
const WIDTH = 1000;
/** Round letters (C, G, O, S) overshoot the cap line by a little; this much room stops them being cut. */
const OVERSHOOT = 0.05;

interface GhostHeadingProps {
  text: string;
  /** Width of the word divided by the height of its capitals, taken from the design. */
  ratio: number;
  /** Fraction of the capital height that stays visible (the rest is cropped). */
  visible?: number;
  className?: string;
}

/**
 * Giant decorative word that fades from white to transparent. When only part of the
 * word is visible, the fade is spread over that part so it still softens away.
 * The SVG text is stretched to fill its box, so it always spans the full width
 * of the container whatever the screen size. It is hidden from assistive tech;
 * sections provide their own real heading.
 *
 * The box keeps the size the design calls for, while the drawing is a little taller than the
 * box (room above, and below unless the word is cropped on purpose) so round letters are never clipped.
 */
export function GhostHeading({ text, ratio, visible = 1, className }: GhostHeadingProps) {
  const capHeight = WIDTH / ratio;
  const fontSize = capHeight / CAP_HEIGHT;
  const height = capHeight * visible;
  const room = capHeight * OVERSHOOT;
  const roomBelow = visible < 1 ? 0 : room;
  const drawingHeight = room + height + roomBelow;
  const gradientId = `ghost-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative block select-none", className)}
      style={{ aspectRatio: `${WIDTH} / ${height}` }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${drawingHeight}`}
        className="absolute left-0 block w-full"
        style={{ top: `${(-room / height) * 100}%`, height: `${(drawingHeight / height) * 100}%` }}
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={room}
            x2="0"
            y2={room + height}
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y={room + capHeight}
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
