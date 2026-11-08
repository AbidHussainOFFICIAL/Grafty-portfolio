# Grafty guide

The full guide to the project: where to change things, how each page and effect works, and what to do before publishing. For an overview and quick start, see the [README](../README.md).

Stack: Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion and Lenis (smooth scrolling).

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
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/fonts.ts` |
| A section's layout | `src/components/sections/` |
| Shared pieces (buttons, accordion, ghost headings, badges, scroll effects) | `src/components/ui/` |
| Smooth scrolling, progress line, navbar, mobile menu, footer | `src/components/layout/` |
| Contact page: brief form, call booking, success screen, phone booking sheet | `src/components/contact/` (booking maths in `src/lib/booking.ts`) |
| Privacy and Terms text | `src/data/legal.ts` (pages in `src/components/legal/`) |
| 404, error and loading screens | `src/app/not-found.tsx`, `error.tsx`, `global-error.tsx`, `loading.tsx` (shared look in `src/components/status/`) |
| Analytics events | `src/lib/analytics.ts` (the one list of events; nothing personal is ever sent) |
| Printable CV page | `src/components/cv/`; its text is `cvPage` in `content.ts`, the rest comes from `experience`, `skillGroups` and `awards` |
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

1. **Contact forms.** Copy `.env.example` to `.env.local` and fill in a [Resend](https://resend.com) API key and a verified sender, then set `contactLive = true` in `content.ts`. Until then the Contact page only pretends to send (so you can try the whole flow), and the quick form on Home shows a polite "not set up yet" message.
2. **CV button.** Put your CV at `public/jessy-linda-cv.pdf` (or change `site.cvUrl`).
3. **Social links and project links** in `content.ts` currently point at generic sites and `/work`.
4. **Images.** The photos were cropped from design screenshots, so they are soft on large screens. Replace the files in `public/images/` with full-resolution exports, keeping the same names (or update `content.ts`).
5. **Site address.** The canonical link, sitemap, share image and structured data use `https://grafty-portfolio.vercel.app`. When you move to your own domain, set `NEXT_PUBLIC_SITE_URL` in Vercel (see `.env.example`).
6. **Share image and icons.** They were generated from the hero portrait and the Grafty mark. Replace `opengraph-image.png` (1200×630) and the icon files with final artwork when you have it.
7. **Social links.** The structured data lists your profiles (`sameAs`) only once the links in `content.ts` point at real profiles instead of site home pages.
8. **Analytics.** Run `npm install` (it adds `@vercel/analytics`), then switch on Web Analytics in your Vercel project (Analytics tab) and redeploy. It uses no cookies, so no banner is needed. Page views work on every plan; the custom events listed in `src/lib/analytics.ts` need a Vercel Pro plan. Vercel's Hobby plan is meant for personal, non-commercial use, so check its terms for a business portfolio.
9. **Privacy and Terms.** `src/data/legal.ts` describes what the site does today, in plain language. Have it reviewed, add your business name and address, and update it if you add a service that handles visitors' data. The governing law is set to California as a placeholder.
10. **Search Console.** Submit `/sitemap.xml` once the site is live, and run Lighthouse on the deployed site (targets: LCP under 2.5 s, CLS under 0.1, INP under 200 ms).
11. **Logos.** The signature, Grafty wordmark and client logos in `src/data/artwork.ts` are vector traces of the screenshots. Swap in the official SVGs when you have them. The client logos are third-party trademarks; make sure you have the right to show them.

## Responsive behaviour

- **1024px and up:** every size is measured against the page width (CSS `cqw` units), so the layout scales like the original design and stops growing at 1440px.
- **Tablet and mobile:** redesigned from the same system. The hero fills the first screen with the artwork and the greeting + headline (the card sits below), the portfolio cards are compact and stack over each other as you scroll, client feedback uses a small avatar beside the name, and client logos become a slow marquee. The nav collapses into a full-screen menu.
- **Below 768px:** the Contact page shows the project brief one step at a time (three steps with a progress bar), and "Pick a time" opens the calendar as a full-screen sheet; from 768px up the whole form and the calendar sit in the page.
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

The page has a title and description, a canonical link, Open Graph and Twitter card tags (with the share image), a sitemap, a robots file, a web manifest, a theme colour and structured data. Review markup is left out on purpose: Google does not show stars for reviews a business publishes about itself, and the testimonials are placeholders. FAQ markup is on the Services page only: markup must match questions visible on the same page, and Home does not show the FAQ.

## Spacing, images and accessibility

- Every section is separated by the same gap (`mt-section`) and every heading from its content by `mt-block`. Cards share one radius and one soft shadow.
- Photos load lazily with a blurred preview, apart from the hero portrait, which loads first.
- Every informative image has a descriptive alt text in `content.ts`; decorative artwork is hidden from screen readers.
- Text and background pairings were checked against WCAG AA (4.5:1 for normal text). Violet text uses `violet-deep`; white text is never placed on the orange panel.

## Home sections and pages

Home order: Hero, Services, About, Skills strip, Work (featured first card), Client feedback, Clients, Contact (ghost heading and the "Let's work together" band), Say hello (quick form, tablet and up), Footer.

- Demo content to replace: the featured card's Problem / Role / Result (`caseLine` in `projects`) and `skills`.
- Every page is finished: `/about`, `/services`, `/work`, `/contact`, `/privacy` and `/terms` are indexed, in the sitemap and carry their own structured data; `/work/<project id>` are case study pages (see below); `/cv` is a printable page kept out of search. The shell (`PageShell`) is shared.
- All internal links go through `SiteLink`: `#section` links scroll on Home and become `/#section` on other pages.
- The contact form has no Subject field; the email subject is "Portfolio enquiry from <name>".

## Fast taps on phones

Double-tap zoom is off (`touch-action: manipulation`), tap highlights and text selection on controls are off on touch screens, pull-to-refresh is contained, repeated taps on the same in-page link add one history entry at most, accordion toggles and form submits cannot double-fire, and a closing menu or sheet no longer swallows taps meant for the page behind it. If a phone still seems to "reload" while you edit code, check that `next dev` is not Fast-Refreshing over your network; test with `npm run build && npm start`.

## Header and featured card

- The header hides as soon as you scroll down and returns only after about 140px of steady upward scrolling plus a 0.4s pause (tune `REVEAL_DISTANCE` and `REVEAL_DELAY` in `Navbar.tsx`). It always shows near the top.
- On phones the featured card is folded to the same height as the others; "See more" opens Problem / Role / Result and scrolling closes it again. From tablet up the rows are always shown.

## Case study pages (`/work/<project id>`)

One template renders every project in `projects` in `src/data/content.ts` (`study` holds tagline, overview, client, role, duration, tools, challenge, 4 process steps, 5 gallery shots, 3 results and a quote). Components live in `src/components/case/`: `CaseHeader`, `CaseCover`, `CaseSummary`, `CaseChallenge`, `CaseProcess`, `CaseGallery` (with `ImageViewer`), `CaseOutcome`, `NextProject`. The route is `src/app/work/[slug]/page.tsx`.

- All case study text and images are demo content. Replace the `study` objects and the `galleryArt` images, keeping result values starting with a digit (the counters animate them).
- `caseStudiesPublished` in `content.ts` is `false`: the pages are `noindex` and not in the sitemap. Set it to `true` when the real content is in.
- The image viewer supports arrow keys, swipe, Esc, tapping the backdrop, and returns focus to the tile that opened it.

## Services page (`/services`)

Sections, top to bottom: header, the four services (open cards on tablets and desktops; on phones the Home accordion, with longer text, deliverables, timeline, price and a quote link in each panel), "How I work" (five steps that light up as you scroll, like the About statement), packages (a swipeable row below desktop width, with the middle package centred and dots underneath), questions, and the closing call-to-action band. Components are in `src/components/services/`; the route is `src/app/services/page.tsx`.

- All text, prices and questions are demo content in `src/data/content.ts`: `services` (detail, deliverables, timeline, from), `workflow`, `packages`, `hireGuide` and `faqs` (the `page: "services"` ones are shown here, the `page: "contact"` ones on the Contact page).
- `showPrices` in `content.ts`: `true` shows "from" prices and the packages; `false` hides every price, replaces the packages with "How to hire me", and the service panels show "On request" and "Get a quote". Prices are demo amounts in US dollars.
- The page is indexed and in the sitemap, and carries FAQPage, Service and breadcrumb data built from the same content as the visible text. Service data has no price markup while the prices are demo.
- The menu and footer "Services" links go to this page; the Home Services section is unchanged and its last row leads to `#process` here.

## About page (`/about`)

Sections, top to bottom: header, a lead statement that lights up word by word, the longer story (portrait with the CV badge, three paragraphs, signature and two actions), four counting stats, the experience timeline, skills and tools in three groups, awards, a CV download panel and the closing call-to-action band. Components are in `src/components/about/`; the route is `src/app/about/page.tsx`. The stat figure (`ui/Stat.tsx`) and the CV badge (`ui/CvBadge.tsx`) are shared with the Home About section.

- All text is demo content in `src/data/content.ts`: `about.page` (intro, lead, story, CV panel text), `experience`, `skillGroups`, `awards` and `about.stats`. The Home tools strip reads the same `skillGroups` (as the flat list `skills`). Award issuers and employers are made up.
- The CV is a one-page placeholder at `public/jessy-linda-cv.pdf` (both the badge and the CV panel link to it through `site.cvUrl`). Replace the file with your own, keeping the name.
- The page is indexed and in the sitemap. Its structured data (AboutPage, the person's skills, breadcrumbs) leaves out awards and employers while they are placeholder text.
- The menu and footer "About" links go to this page; the Home About section is unchanged, and its "Awards" stat and "More about me" button lead here.

## Contact page (`/contact`)

Sections, top to bottom: header, the panel, and questions. The panel has two halves behind a tab switch, "Project brief" and "Book a call", with the email, social links and what to expect beside it (below it on phones). Components are in `src/components/contact/`; the route is `src/app/contact/page.tsx`.

- **Project brief:** type of project (several allowed), budget, timeline, details, up to three reference files, name and email. Tablets and desktops show it as three numbered groups; phones show one group at a time. Typed text, choices and files are kept when you switch to "Book a call" and back.
- **Book a call:** a month of weekdays, the free times of the chosen day, then name, email and an optional topic. Inline from tablet width; on phones "Pick a time" opens it as a full-screen sheet. The availability is a fixed demo pattern (`lib/booking.ts`): replace it with a real calendar when there is one. There is no third-party booking service.
- **Success screen:** "Message sent" (or "You're booked", with an "Add to my calendar" file) and a short "What happens next". It replaces the form; "Start over" brings the form back empty.
- **Links in:** `/contact#book` opens the booking. `/contact?package=product-design`, `?type=design,code`, `&budget=3500-7000` and `&timeline=asap` arrive with the brief already filled in (`contactHref()` in `lib/contactPrefill.ts` builds them; the "Get started" buttons and service quote links use it). Every "Start a project" and "Hire Me" button goes to this page on every screen size.
- **Sending:** `contactLive` in `content.ts` is `false`, so nothing leaves the browser. Set it to `true` (with the Resend variables) and both halves post to `/api/contact`. Files travel inside that request, so they are limited to three files and 3 MB in total (`uploadRules`); the form tells the visitor to share a link for anything larger.
- All text is demo content in `src/data/content.ts`: `contactPage`, `projectTypes`, `budgets`, `timelines`, `uploadRules`, `booking`, `contactSuccess` and the `page: "contact"` entries of `faqs`. The budget bands are demo amounts in US dollars; each package names the budget band and services it pre-selects.
- The page is indexed and in the sitemap, with ContactPage and breadcrumb data. It has no closing call-to-action band, since it is the destination.

## Privacy, Terms, error screens, analytics and the CV page

- **Privacy and Terms (`/privacy`, `/terms`).** One layout (`components/legal/`): the ghost word (the two pages alternate sides), "The short version", the full text in one panel with a contents list (sticky beside it on desktop, a bar that opens on phones and tablets), and a questions strip. Indexed and in the sitemap.
- **404, error and loading.** `not-found.tsx` (ghost "404", a way home, "Start a project" and quick links), `error.tsx` ("Try again" and a reference code) and `global-error.tsx` (the last resort when the whole layout fails: no header or footer). `loading.tsx` is a pale skeleton that stays invisible for 0.3 s so quick page changes never flash it; pages are prerendered, so it is rarely seen.
- **Analytics.** Vercel Web Analytics is mounted in `layout.tsx`. `lib/analytics.ts` lists every custom event: Contact click, Brief sent (only while `contactLive` is `true`), Call booked, CV downloaded, CV printed and Email copied. They carry no names, emails or messages, and nothing is sent while developing.
- **Printable CV (`/cv`).** A sheet built from the site's own content. "Print / Save as PDF" (desktop only) prints just the sheet: the header, footer and buttons are hidden and the paper size and margins follow the visitor's printer. Phones get the PDF download. It is `noindex` and not in the sitemap. The PDF in `public/` stays your separate real file.
