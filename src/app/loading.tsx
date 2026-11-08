import { PageShell } from "@/components/layout/PageShell";

/**
 * Shown while a page is on its way. The pages are prerendered, so this is rarely seen: it stays
 * invisible for the first 0.3 s (animate-wait) so quick page changes never flash it, then fades in
 * as a pale ghost word, a line of text and two cards that pulse gently.
 */
export default function Loading() {
  return (
    <PageShell>
      <div role="status" className="animate-wait px-5 pt-4 md:px-8 md:pt-14 lg:px-[5.08%] lg:pt-[5cqw]">
        <span className="sr-only">Loading</span>
        <div aria-hidden="true" className="motion-safe:animate-pulse">
          <div className="h-24 w-full rounded-card bg-white/45 md:h-36 md:w-[52%] lg:h-[14cqw]" />
          <div className="mt-block h-5 w-3/4 max-w-[34rem] rounded-full bg-white/60 lg:h-[1.9cqw]" />
          <div className="mt-8 h-56 rounded-card bg-white shadow-card md:h-72 lg:mt-[3.4cqw] lg:h-[30cqw]" />
          <div className="mt-4 h-56 rounded-card bg-white shadow-card md:h-72 lg:mt-[1.4cqw] lg:h-[30cqw]" />
        </div>
      </div>
    </PageShell>
  );
}
