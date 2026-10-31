# Grafty: Jessy Linda portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lenis (smooth scrolling).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Requires Node 20.9 or newer.

## Where things are

| To change | Edit |
| --- | --- |
| Any text, link, rating, FAQ, project | `src/data/content.ts` |
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| A section's layout | `src/components/sections/` |
| Shared pieces (buttons, accordion, ghost headings, badges, scroll effects) | `src/components/ui/` |
| Smooth scrolling, progress line, navbar | `src/components/layout/` |
| Portfolio card colours | `tone` on each project in `src/data/content.ts` |
| Images | `public/images/` (WebP, referenced from `content.ts`) |

## Before you publish

1. **Contact form.** Copy `.env.example` to `.env.local` and fill in a [Resend](https://resend.com) API key and a verified sender. Until then the form shows a polite "not set up yet" message.
2. **CV button.** Put your CV at `public/jessy-linda-cv.pdf` (or change `site.cvUrl`).
3. **Social links and project links** in `content.ts` currently point at generic sites and `#work`.
4. **Images.** The photos were cropped from design screenshots, so they are soft on large screens. Replace the files in `public/images/` with full-resolution exports, keeping the same names (or update `content.ts`).
5. **Logos.** The signature, Grafty wordmark and client logos in `src/data/artwork.ts` are vector traces of the screenshots. Swap in the official SVGs when you have them. The client logos are third-party trademarks; make sure you have the right to show them.

## Responsive behaviour

- **1024px and up:** every size is measured against the page width (CSS `cqw` units), so the layout scales like the original design and stops growing at 1440px.
- **Tablet and mobile:** redesigned from the same system. The hero stacks, the stats move under the portrait, the portfolio cards become a plain list (one column on phones, two on tablets), and client logos become a slow marquee. The nav collapses into a full-screen menu.

## Scroll experience

| Effect | Where | Notes |
| --- | --- | --- |
| Smooth wheel scrolling, eased anchor jumps | `layout/SmoothScroll.tsx` (Lenis) | Touch scrolling stays native. |
| Reading-progress line | `layout/ScrollProgress.tsx` | |
| Navbar hides on scroll down, returns on scroll up, highlights the current section | `layout/Navbar.tsx` | Stays visible for keyboard users and the open menu. |
| Hero layers drift apart as the hero scrolls away | `sections/Hero.tsx` | The intro animation is unchanged and plays first. |
| Ghost words slide in; footer and contact photo drift | `ui/ScrollShift.tsx` | |
| About statement lights up word by word; stats count up | `ui/ScrollWords.tsx`, `ui/CountUp.tsx` | |
| Portfolio: cards pin and stack, with 3D tilt on the image | `sections/ProjectStack.tsx` | Desktop only. Phones and tablets get a plain list. |
| Testimonials fade in and out of focus | `sections/Testimonials.tsx` | |
| Client strip on phones speeds up while scrolling | `ui/VelocityMarquee.tsx` | |

Every effect animates only `transform` and `opacity`. With `prefers-reduced-motion` the site scrolls normally, nothing moves on scroll, cards do not pin, counters show their final values and the navbar stays put.

To change the stack, edit `--stack-top` and `--stack-step` (where the cards pin and how far each peeks out) in `ProjectStack.tsx`, and the shrink and dim amounts in `StackCard`.
