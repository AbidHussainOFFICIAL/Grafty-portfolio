import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/*
        The container-type makes `cqw` units in the section styles resolve against
        the page width (capped at 1440px), which is how the desktop layout scales
        proportionally with the original design. overflow-x-clip stops slide-in
        animations that start off-screen from adding a sideways scrollbar.
      */}
      <div className="mx-auto max-w-[1440px] overflow-x-clip [container-type:inline-size]">
        <main id="main">
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <Testimonials />
          <Clients />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
