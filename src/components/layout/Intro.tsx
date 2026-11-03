"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { site, hero } from "@/data/content";
import { wordmark } from "@/data/artwork";
import { VectorArt } from "@/components/ui/VectorArt";

/** Remembers that the visitor has already seen the loader. Add ?intro to the URL to replay it. */
export const INTRO_STORAGE_KEY = "grafty-intro-seen";

/** The loader never keeps anyone waiting longer than this, however slow the page is. */
const MAX_WAIT = 3000;
/** The shortest the loader plays, so the wordmark can finish drawing. */
const MIN_DURATION = 1800;
/** How long the curtain takes to lift (keep in step with .intro-curtain in globals.css). */
const CURTAIN_MS = 1250;

type Phase = "idle" | "playing" | "leaving" | "gone";

const IntroContext = createContext(false);

/** True once the page may start its entrance animations (immediately, or when the loader lifts). */
export function useIntroReady(): boolean {
  return useContext(IntroContext);
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function waitForHeroImage(): Promise<void> {
  return new Promise((resolve) => {
    const image = document.querySelector<HTMLImageElement>("#home img");
    if (!image || (image.complete && image.naturalWidth > 0)) return resolve();
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

/**
 * Holds the page's entrance animations until the loader has gone. On a repeat visit, or with
 * reduced motion, there is no loader and `ready` becomes true on the first render.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <IntroContext.Provider value={ready}>
      {children}
      <IntroLoader onLeave={() => setReady(true)} />
    </IntroContext.Provider>
  );
}

/**
 * First-visit loader: the wordmark draws in, a counter runs to 100, then the panel lifts away
 * like a curtain and the hero animation plays. The head script in layout.tsx decides whether
 * it shows (data-intro="show" on <html>) before the first paint, so there is no flash.
 */
function IntroLoader({ onLeave }: { onLeave: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const onLeaveRef = useRef(onLeave);
  useEffect(() => {
    onLeaveRef.current = onLeave;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "show") {
      // No loader this time (repeat visit or reduced motion): the panel stays hidden by CSS.
      onLeaveRef.current();
      return;
    }

    try {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // Private mode: the loader will simply show again next time.
    }

    // Starts the wordmark animation on the next frame (not synchronously inside the effect).
    const begin = requestAnimationFrame(() => setPhase("playing"));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let assetsReady = false;
    const start = performance.now();
    let frame = 0;
    let beat = 0;
    let curtain = 0;

    const give = () => {
      assetsReady = true;
    };
    void Promise.all([document.fonts.ready, waitForHeroImage()]).then(give);
    const fallback = window.setTimeout(give, MAX_WAIT);

    const leave = () => {
      setPhase("leaving");
      window.dispatchEvent(new Event("intro:done"));
      onLeaveRef.current();
      curtain = window.setTimeout(() => {
        document.body.style.overflow = previousOverflow;
        root.dataset.intro = "done";
        setPhase("gone");
      }, CURTAIN_MS);
    };

    const tick = (now: number) => {
      const timeProgress = easeInOut(Math.min(1, (now - start) / MIN_DURATION));
      // The counter waits at 90% until the fonts and the hero image are ready.
      const shown = assetsReady ? timeProgress : Math.min(timeProgress, 0.9);
      if (counterRef.current) counterRef.current.textContent = String(Math.round(shown * 100)).padStart(2, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;
      if (shown >= 1) {
        // A beat on 100 before the curtain moves.
        beat = window.setTimeout(leave, 250);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(begin);
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      window.clearTimeout(beat);
      window.clearTimeout(curtain);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      data-phase={phase}
      role="status"
      aria-label="Loading"
      className="intro-curtain fixed inset-0 z-[100] hidden flex-col justify-between bg-surface px-5 py-5 intro:flex md:px-8 md:py-8"
    >
      <div className="intro-fade flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] md:text-xs">
        <span>{site.name}</span>
        <span>Portfolio</span>
      </div>

      <div className="intro-fade flex flex-col items-center gap-5 text-center">
        <span className="intro-mark block">
          <VectorArt art={wordmark} className="h-auto w-[min(64vw,22rem)] text-ink md:w-[min(36vw,32rem)]" />
        </span>
        <p className="intro-tagline text-xs md:text-sm">{hero.headline.join(" ")}</p>
      </div>

      <div className="intro-fade">
        <span
          ref={counterRef}
          aria-hidden="true"
          className="font-cond block text-[clamp(5rem,26vw,11rem)] leading-[0.8] tabular-nums"
        >
          00
        </span>
        <span className="mt-4 block h-0.5 w-full bg-ink/15 md:mt-6">
          <span ref={barRef} className="block h-full origin-left bg-violet" style={{ transform: "scaleX(0)" }} />
        </span>
      </div>
    </div>
  );
}
