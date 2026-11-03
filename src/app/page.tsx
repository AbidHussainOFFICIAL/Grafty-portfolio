import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { QuickNote } from "@/components/sections/QuickNote";
import { Services } from "@/components/sections/Services";
import { SkillsStrip } from "@/components/sections/SkillsStrip";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Services />
      <About />
      <SkillsStrip />
      <Portfolio />
      <Testimonials />
      <Clients />
      <Contact />
      <QuickNote />
    </PageShell>
  );
}
