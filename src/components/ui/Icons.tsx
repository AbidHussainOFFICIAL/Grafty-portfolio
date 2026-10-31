import type { IconType } from "react-icons";
import { FaBehance, FaDribbble, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import type { SocialId } from "@/data/content";

interface IconProps {
  className?: string;
}

/** Thin plus that morphs into a minus when `open`. */
export function PlusMinusIcon({ open, className }: IconProps & { open: boolean }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="2" y1="22" x2="42" y2="22" vectorEffect="non-scaling-stroke" />
      <line
        x1="22"
        y1="2"
        x2="22"
        y2="42"
        vectorEffect="non-scaling-stroke"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: open ? "scaleY(0)" : "scaleY(1)",
          transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 18 18 6" />
      <path d="M8 6h10v10" />
    </svg>
  );
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 20V4" />
      <path d="m5 11 7-7 7 7" />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="8" y="8" width="12" height="12" rx="2.5" />
      <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2v34" />
      <path d="m5 29 7 7 7-7" />
    </svg>
  );
}

/** Long thin arrow pointing right, used inside the "Let's discuss" badge. */
export function ArrowRightLongIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 6h43" />
      <path d="m40 1.5 5 4.5-5 4.5" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

const STAR_POINTS =
  "12 1.8 14.9 8.6 22.2 9.2 16.6 14 18.4 21.2 12 17.3 5.6 21.2 7.4 14 1.8 9.2 9.1 8.6";

/** Five solid stars. The label is announced; the glyphs themselves are decorative. */
export function Stars({ className, label }: IconProps & { label: string }) {
  return (
    <span role="img" aria-label={label} className="inline-flex gap-[0.12em]">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
          focusable="false"
        >
          <polygon points={STAR_POINTS} />
        </svg>
      ))}
    </span>
  );
}

const socialIcons: Record<SocialId, IconType> = {
  dribbble: FaDribbble,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  behance: FaBehance,
};

export function SocialIcon({ id, className }: IconProps & { id: SocialId }) {
  const Icon = socialIcons[id];
  return <Icon className={className} aria-hidden="true" focusable="false" />;
}
