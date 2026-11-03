# Grafty: Jessy Linda portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lenis (smooth scrolling).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
npm run lint       # ESLint 9 (flat config, eslint.config.mjs) with the Next.js core-web-vitals + TypeScript rules
```

Requires Node 20.9 or newer.

## Where things are

| To change | Edit |
| --- | --- |
| Any text, link, rating, FAQ, project | `src/data/content.ts` |
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| A section's layout | `src/components/sections/` |
| Shared pieces (buttons, accordion, ghost headings, badges, scroll effects) | `src/components/ui/` |
| Smooth scrolling, progress line, navbar, mobile menu, footer | `src/components/layout/` |
| Phone contact sheet (full-screen form) | `src/components/contact/` |
| Which links the desktop bar shows | `inBar` on each entry of `navLinks` in `content.ts` |
| Portfolio card colours | `tone` on each project in `src/data/content.ts` |
| Images | `public/images/` (WebP, referenced from `content.ts`). Each has a blurred preview in `src/data/blur.ts`. |
| Page title, description, site address, share text | `site` in `src/data/content.ts` |
| Share image (Open Graph and Twitter card) | `src/app/opengraph-image.png` (1200×630) and its alt text in `opengraph-image.alt.txt` |
| Favicon, Apple icon, app icons | `src/app/favicon.ico`, `src/app/icon.svg`, `src/app/apple-icon.png`, `public/icon-*.png` |
| Structured data (Person, ProfessionalService, WebSite) | `src/components/seo/JsonLd.tsx` (built from `content.ts`) |
| First-visit loader | `src/components/layout/Intro.tsx` and the `.intro-*` rules at the end of `globals.css` |
| Vertical spacing, corner radius, card shadow | `mt-section`, `mt-block`, `rounded-card` and `--shadow-card` in `globals.css` |

## Before you publish

1. **Contact form.** Copy `.env.example` to `.env.local` and fill in a [Resend](https://resend.com) API key and a verified sender. Until then the form shows a polite "not set up yet" message.
2. **CV button.** Put your CV at `public/jessy-linda-cv.pdf` (or change `site.cvUrl`).
3. **Social links and project links** in `content.ts` currently point at generic sites and `/work`.
4. **Images.** The photos were cropped from design screenshots, so they are soft on large screens. Replace the files in `public/images/` with full-resolution exports, keeping the same names (or update `content.ts`).
5. **Site address.** The canonical link, sitemap, share image and structured data use `https://grafty-portfolio.vercel.app`. When you move to your own domain, set `NEXT_PUBLIC_SITE_URL` in Vercel (see `.env.example`).
6. **Share image and icons.** They were generated from the hero portrait and the Grafty mark. Replace `opengraph-image.png` (1200×630) and the icon files with final artwork when you have it.
7. **Social links.** The structured data lists your profiles (`sameAs`) only once the links in `content.ts` point at real profiles instead of site home pages.
8. **Search Console.** Submit `/sitemap.xml` once the site is live, and run Lighthouse on the deployed site (targets: LCP under 2.5 s, CLS under 0.1, INP under 200 ms).
9. **Logos.** The signature, Grafty wordmark and client logos in `src/data/artwork.ts` are vector traces of the screenshots. Swap in the official SVGs when you have them. The client logos are third-party trademarks; make sure you have the right to show them.

## Responsive behaviour

- **1024px and up:** every size is measured against the page width (CSS `cqw` units), so the layout scales like the original design and stops growing at 1440px.
- **Tablet and mobile:** redesigned from the same system. The hero fills the first screen with the artwork and the greeting + headline (the card sits below), the portfolio cards are compact and stack over each other as you scroll, client feedback uses a small avatar beside the name, and client logos become a slow marquee. The nav collapses into a full-screen menu.
- **Below 768px:** every "Hire Me", "Start a project" and "Let's discuss" button opens the contact form as a full-screen sheet; the in-page form is used from 768px up.
- **Desktop first screen:** the artwork only. The introduction and the card start just below the fold.

## Scroll experience

| Effect | Where | Notes |
| --- | --- | --- |
| Smooth wheel scrolling, eased anchor jumps | `layout/SmoothScroll.tsx` (Lenis) | Touch scrolling stays native. |
| Reading-progress line | `layout/ScrollProgress.tsx` | |
| Navbar hides on scroll down, returns on scroll up, highlights the current section | `layout/Navbar.tsx` | Stays visible for keyboard users and the open menu. |
| Hero layers drift apart as the hero scrolls away | `sections/Hero.tsx` | The intro animation is unchanged and plays first. |
| Ghost words slide in; footer and contact photo drift | `ui/ScrollShift.tsx` | |
| About statement lights up word by word; stats count up | `ui/ScrollWords.tsx`, `ui/CountUp.tsx` | |
| Portfolio: cards pin and stack, with 3D tilt on the image | `sections/ProjectStack.tsx`, `sections/ProjectCard.tsx` | The tilt is desktop with a mouse only; the stacking works at every size. The stack is shared by Home and Work. |
| Work page: filter pills (All, Branding, UI/UX, Marketing, Code) and the stacked list | `sections/WorkBrowser.tsx`, `CategoryFilter.tsx`, `WorkHeader.tsx`, `lib/useCategoryParam.ts` | The filter lives in the address (`/work?category=branding`). Categories and projects are in `content.ts`. |
| Testimonials fade in and out of focus | `sections/Testimonials.tsx` | |
| Client strip on phones speeds up while scrolling | `ui/VelocityMarquee.tsx` | |

Every effect animates only `transform` and `opacity`. With `prefers-reduced-motion` the site scrolls normally, nothing moves on scroll, cards do not pin, counters show their final values and the navbar stays put.

To change the stack, edit `--stack-top` and `--stack-step` (where the cards pin and how far each peeks out) in `ProjectStack.tsx`, and the shrink and dim amounts in `StackCard`.

## First-visit loader

A short loader plays on a visitor's first visit: the wordmark draws in, a counter runs to 100, and the panel lifts away like a curtain. The hero animation (portrait, signature, tags, headline, card) starts as the curtain clears. It never runs with reduced motion, and a browser remembers it has played (localStorage key `grafty-intro-seen`). Open the site with `?intro` in the address (for example `/?intro`) to see it again. It lasts about two seconds and never more than three, whatever the connection.

## Search and sharing

The page has a title and description, a canonical link, Open Graph and Twitter card tags (with the share image), a sitemap, a robots file, a web manifest, a theme colour and structured data. Review markup is left out on purpose: Google does not show stars for reviews a business publishes about itself, and the testimonials are placeholders. FAQ markup is left out for now: markup must match questions visible on the same page, and Home no longer shows the FAQ. It returns with the FAQ on the Services page.

## Spacing, images and accessibility

- Every section is separated by the same gap (`mt-section`) and every heading from its content by `mt-block`. Cards share one radius and one soft shadow.
- Photos load lazily with a blurred preview, apart from the hero portrait, which loads first.
- Every informative image has a descriptive alt text in `content.ts`; decorative artwork is hidden from screen readers.
- Text and background pairings pass WCAG AA (4.5:1 for normal text). Violet text uses `violet-deep`; white text is never placed on the orange panel.

## Home sections and pages

Home order: Hero, Services, About, Skills strip, Work (featured first card), Client feedback, Clients, Contact (ghost heading and the "Let's work together" band), Say hello (quick form, tablet and up), Footer.

- Demo content to replace: the featured card's Problem / Role / Result (`caseLine` in `projects`), `skills` and the legal pages.
- "Coming soon" pages exist so no link is dead: `/work/<project id>`, `/about`, `/services`, `/contact`, `/privacy`, `/terms`. They are `noindex` and not in the sitemap. `/work` is a finished page: it is indexed, in the sitemap, and carries its own collection and breadcrumb data. Replace a page by editing its `page.tsx`; the shell (`PageShell`) is shared.
- All internal links go through `SiteLink`: `#section` links scroll on Home and become `/#section` on other pages.
- The contact form has no Subject field; the email subject is "Portfolio enquiry from <name>". The FAQ answers stay in `content.ts` for the Services and Contact pages.

## Fast taps on phones

Double-tap zoom is off (`touch-action: manipulation`), tap highlights and text selection on controls are off on touch screens, pull-to-refresh is contained, repeated taps on the same in-page link add one history entry at most, accordion toggles and form submits cannot double-fire, and a closing menu or sheet no longer swallows taps meant for the page behind it. If a phone still seems to "reload" while you edit code, check that `next dev` is not Fast-Refreshing over your network; test with `npm run build && npm start`.

## Header and featured card

- The header hides as soon as you scroll down and returns only after about 140px of steady upward scrolling plus a 0.4s pause (tune `REVEAL_DISTANCE` and `REVEAL_DELAY` in `Navbar.tsx`). It always shows near the top.
- On phones the featured card is folded to the same height as the others; "See more" opens Problem / Role / Result and scrolling closes it again. From tablet up the rows are always shown.
