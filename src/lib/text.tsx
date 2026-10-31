import type { ReactNode } from "react";

/**
 * The condensed display face draws an unusual ampersand. This swaps every "&"
 * for the body font's conventional one so headings read the way the design does.
 */
export function withAmpersands(text: string): ReactNode[] {
  return text.split("&").flatMap((part, index) =>
    index === 0
      ? [part]
      : [
          <span key={index} className="font-sans text-[0.94em] font-extrabold tracking-normal">
            &amp;
          </span>,
          part,
        ],
  );
}
