import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/**
 * The frame every page shares: header, centred content column and footer.
 * The container-type makes `cqw` units in the section styles resolve against the page width
 * (capped at 1440px), which is how the desktop layout scales proportionally with the design.
 * overflow-x-clip stops slide-in animations that start off-screen from adding a sideways scrollbar.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1440px] overflow-x-clip [container-type:inline-size]">
        <main id="main">{children}</main>
        <Footer />
      </div>
    </>
  );
}
