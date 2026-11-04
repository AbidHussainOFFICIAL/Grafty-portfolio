/**
 * All copy, links and image references for the site live here.
 * Edit this file to change text; no component needs to be touched.
 */
import type { ClientLogoKey } from "./artwork";

export const site = {
  name: "Jessy Linda",
  brand: "Grafty",
  email: "hello@linda.com",
  /** Place your CV at public/jessy-linda-cv.pdf (or change this path). */
  cvUrl: "/jessy-linda-cv.pdf",
  /**
   * The public address, used for the canonical link, sitemap, share image and structured data.
   * Set NEXT_PUBLIC_SITE_URL when you move to your own domain (no trailing slash).
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://grafty-portfolio.vercel.app",
  jobTitle: "Creative designer",
  title: "Jessy Linda | Branding, Product UI/UX & Design",
  description:
    "Jessy Linda is an award-winning creative designer in California, USA, crafting intuitive, user-friendly experiences through branding, wireframing, prototyping and visual design.",
  /** Shown when the page is shared (Open Graph and Twitter cards). */
  shareDescription:
    "Award-winning creative designer specialising in branding, product UI/UX and visual design.",
} as const;

export interface NavLink {
  readonly label: string;
  /** "#id" scrolls on the Home page; "/path" is a page of its own. */
  readonly href: string;
  /** For a page link: the Home section it stands for, so it is highlighted there too. */
  readonly section?: string;
  /** Shown in the desktop bar. Every link appears in the mobile menu and footer. */
  readonly inBar: boolean;
}

export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "#home", inBar: true },
  { label: "Services", href: "/services", section: "services", inBar: true },
  { label: "About", href: "#about", inBar: true },
  { label: "Work", href: "/work", section: "work", inBar: true },
  { label: "Reviews", href: "#feedback", inBar: false },
  { label: "Contact", href: "#contact", inBar: true },
];

/** Pages that exist as "coming soon" placeholders until each one is designed. */
export const routes = {
  work: "/work",
  about: "/about",
  aboutAwards: "/about#awards",
  services: "/services",
  servicesProcess: "/services#process",
  contact: "/contact",
  contactBook: "/contact#book",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type SocialId = "dribbble" | "linkedin" | "x" | "behance";

export interface Social {
  readonly id: SocialId;
  readonly label: string;
  readonly href: string;
  /** Shown in the header (the footer shows all four). */
  readonly inHeader: boolean;
}

/** Replace the hrefs with your own profile URLs. */
export const socials: readonly Social[] = [
  { id: "dribbble", label: "Dribbble", href: "https://dribbble.com", inHeader: true },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com", inHeader: true },
  { id: "x", label: "X", href: "https://x.com", inHeader: true },
  { id: "behance", label: "Behance", href: "https://www.behance.net", inHeader: false },
];

export const hero = {
  greeting: "Hi",
  name: "Jessy Linda",
  headline: ["Branding,", "Product UI/UX", "& Design."],
  intro:
    "7+ Years of Expertise, Award-Winning Creative Designer in California, USA.",
  tags: ["Branding", "Designer"],
  ghost: "DESIGNER",
  portrait: {
    src: "/images/hero-portrait.webp",
    width: 796,
    height: 746,
    alt: "Silhouette portrait of Jessy Linda wearing glasses, backlit by an orange glow",
  },
} as const;

export interface Service {
  readonly id: string;
  readonly title: string;
  /** The short text on Home. */
  readonly body: string;
  /** The longer text on the Services page. */
  readonly detail: string;
  /** What the client gets, as short items. */
  readonly deliverables: readonly string[];
  readonly timeline: string;
  /** The lowest price for this service alone, shown as "From ...". */
  readonly from: string;
}

/** True shows "from" prices and the packages; false shows "Get a quote" and "How to hire me" instead. Demo prices, in US dollars. */
export const showPrices = true;

export const services: readonly Service[] = [
  {
    id: "branding",
    title: "Branding",
    body: "Logos, identity systems and brand guidelines that make your business instantly recognisable and consistent everywhere it appears.",
    detail:
      "Every brand starts with a clear idea of who you are and who you are talking to. I turn that into a logo, a colour and type system, and guidelines your whole team can follow, so the brand looks the same on a website, a shopfront and a business card.",
    deliverables: ["Logo suite", "Colour and type system", "Brand guidelines", "Stationery", "Social media kit"],
    timeline: "3–5 weeks",
    from: "$1,200",
  },
  {
    id: "design",
    title: "Design",
    body: "Efficient, knowledgeable, & smooth experience. Highly recommended",
    detail:
      "Research, wireframes, prototypes and polished interfaces for websites and apps. I design the whole journey, test it with real people where I can, and hand it over with a design system your developers can build from.",
    deliverables: ["Research summary", "Wireframes", "Interactive prototype", "UI design system", "Developer handoff"],
    timeline: "4–8 weeks",
    from: "$2,400",
  },
  {
    id: "marketing",
    title: "Marketing",
    body: "Campaign visuals, social content and landing pages designed to attract the right audience and turn attention into enquiries.",
    detail:
      "Visuals that earn attention and lead somewhere. Campaign artwork, social templates, ad creatives and landing pages, all built to match your brand and to turn a click into an enquiry.",
    deliverables: ["Campaign visuals", "Social templates", "Landing page design", "Ad creatives"],
    timeline: "2–3 weeks",
    from: "$900",
  },
  {
    id: "code",
    title: "Code",
    body: "Pixel-accurate, responsive front-end builds, so what gets designed is exactly what ships.",
    detail:
      "Designs built exactly as drawn. I build responsive, accessible front ends with clean, reusable components, so what you approved in the design is what your visitors see on every screen.",
    deliverables: ["Responsive front-end build", "Reusable components", "Animation and polish", "Handover notes"],
    timeline: "2–6 weeks",
    from: "$1,800",
  },
];

export const about = {
  statement:
    "UI/UX designer crafting intuitive, user-friendly experiences through wireframing, prototyping, & visual design.",
  portrait: {
    src: "/images/about-portrait.webp",
    width: 760,
    height: 760,
    alt: "Portrait of a smiling designer with curly hair against an orange backdrop",
  },
  stats: {
    experience: { value: "07", label: "Years of Experience" },
    projects: { value: "120+", label: "Total Projects" },
    rating: { value: "5.00", label: "70 ratings" },
    awards: { value: "03", label: "Awards" },
  },
} as const;

/** The three short lines shown on the featured card. Demo text. */
export interface CaseLine {
  readonly problem: string;
  readonly role: string;
  readonly result: string;
}

/** The filter categories on the Work page. Same four disciplines as the Services section. */
export const categories = [
  { id: "branding", label: "Branding" },
  { id: "ui-ux", label: "UI/UX" },
  { id: "marketing", label: "Marketing" },
  { id: "code", label: "Code" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type CategoryFilterId = "all" | CategoryId;

/** The demo pictures the case study galleries are cut from (replace with each project's own shots). */
export const galleryArt = {
  mockup: "/images/work-mockup.webp",
  book: "/images/work-book.webp",
  font: "/images/work-font.webp",
  app: "/images/work-app.webp",
} as const;

export type GalleryArtId = keyof typeof galleryArt;

export interface GalleryShot {
  readonly art: GalleryArtId;
  /** Shown in the image viewer; also becomes the picture's alt text, after the project's title. */
  readonly caption: string;
  /** CSS object-position, to vary the crop of a reused picture. */
  readonly focus?: string;
}

export interface ProcessStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface CaseResult {
  /** Starts with a digit so it can count up: "42%", "3x", "1.8s". */
  readonly value: string;
  readonly label: string;
}

/** Everything on a project's own page, beyond what the cards need. Demo text. */
export interface CaseStudy {
  readonly tagline: string;
  readonly overview: string;
  readonly client: string;
  readonly role: string;
  readonly duration: string;
  readonly tools: readonly string[];
  readonly challenge: string;
  /** Four steps, shown as an accordion. */
  readonly process: readonly ProcessStep[];
  /** Five pictures: the first is shown large. */
  readonly gallery: readonly GalleryShot[];
  /** Three figures. */
  readonly results: readonly CaseResult[];
  readonly quote: { readonly text: string; readonly name: string; readonly role: string };
}

export interface Project {
  /** Also the project's address: /work/<id>. */
  readonly id: string;
  readonly title: string;
  readonly tone: "light" | "dark" | "violet" | "accent";
  /** One or two of the categories above. */
  readonly categories: readonly CategoryId[];
  readonly year: string;
  /** Only the featured project carries one. */
  readonly caseLine?: CaseLine;
  readonly image: { readonly src: string; readonly alt: string };
  readonly study: CaseStudy;
}

/**
 * Case study pages are kept out of search results (and the sitemap) while they hold demo text.
 * Set this to true once the real content is in.
 */
export const caseStudiesPublished = false;

/**
 * Demo projects. The first is the featured one and carries a `caseLine`. The first four are the
 * "Latest portfolio" cards on Home; the rest only appear on the Work page.
 */
export const projects: readonly Project[] = [
  {
    id: "mockup",
    title: "Mockup Design",
    tone: "light",
    categories: ["branding", "marketing"],
    year: "2025",
    caseLine: {
      problem: "A growing studio needed a brand that felt as polished as its work.",
      role: "Brand identity, visual system",
      result: "+42% enquiries in the first quarter",
    },
    image: {
      src: "/images/work-mockup.webp",
      alt: "Mockup Design project: a laptop showing an orange wallpaper on a concrete surface",
    },
    study: {
      tagline: "A complete brand identity and visual system for a growing design studio.",
      overview:
        "Northfield Studio had outgrown its first logo. I rebuilt the identity from the ground up: a flexible mark, a colour and type system, and a set of mockups that show the brand working across screens, print and packaging.",
      client: "Northfield Studio",
      role: "Brand identity, visual system",
      duration: "10 weeks",
      tools: ["Figma", "Illustrator", "Photoshop"],
      challenge:
        "A growing studio needed a brand that felt as polished as its work, without losing the warmth that first won its clients.",
      process: [
        { id: "research", title: "Research", body: "Interviews with the team and their clients, plus an audit of how the old brand appeared in the wild. Three themes came out of it: craft, warmth and clarity." },
        { id: "concept", title: "Concept", body: "Three routes were sketched and tested on real touchpoints. The chosen one pairs a simple geometric mark with a bold, confident colour palette." },
        { id: "design", title: "Design", body: "The mark, colours, type and grid were refined into a system, then applied to the website, stationery, social templates and signage." },
        { id: "delivery", title: "Delivery", body: "A guidelines document and a full asset library were handed over, with a short workshop so the team could use the system with confidence." },
      ],
      gallery: [
        { art: "mockup", caption: "The brand on a laptop wallpaper", focus: "50% 40%" },
        { art: "mockup", caption: "Detail of the colour palette in use", focus: "10% 80%" },
        { art: "font", caption: "Pattern system on packaging tape", focus: "50% 50%" },
        { art: "book", caption: "Printed guidelines on the studio shelf", focus: "20% 30%" },
        { art: "app", caption: "The identity on a phone screen", focus: "50% 25%" },
      ],
      results: [
        { value: "42%", label: "More enquiries in the first quarter" },
        { value: "3x", label: "Faster to produce new marketing pieces" },
        { value: "100%", label: "Of the team now using the new templates" },
      ],
      quote: {
        text: "Jessy gave us a brand that finally looks like the studio we are. Clients notice it straight away.",
        name: "Anna Brooks",
        role: "Founder, Northfield Studio",
      },
    },
  },
  {
    id: "book",
    title: "Book Cover",
    tone: "dark",
    categories: ["branding"],
    year: "2025",
    image: {
      src: "/images/work-book.webp",
      alt: "Book Cover project: a stack of white hardcover books against a blue wall",
    },
    study: {
      tagline: "Cover artwork and typography for a hardcover series.",
      overview:
        "Harbor Press was relaunching a literary series and wanted covers that worked as a set but let each title stand out. I designed the grid, the typography and the first six covers.",
      client: "Harbor Press",
      role: "Cover design, typography",
      duration: "6 weeks",
      tools: ["Illustrator", "Photoshop", "InDesign"],
      challenge:
        "Six very different books had to look like one series on a shelf, and still be told apart at thumbnail size online.",
      process: [
        { id: "research", title: "Research", body: "I read each manuscript and studied how competing series look on shelves and in online stores, at every size." },
        { id: "concept", title: "Concept", body: "One strong grid with a single bold shape per title: the same structure every time, with a different colour and form." },
        { id: "design", title: "Design", body: "Custom lettering for the series name and a restrained typographic system for titles, authors and quotes." },
        { id: "delivery", title: "Delivery", body: "Print-ready files, a spine and back-cover template, and a short guide for the covers still to come." },
      ],
      gallery: [
        { art: "book", caption: "The full series on a shelf", focus: "50% 50%" },
        { art: "book", caption: "Spines side by side", focus: "80% 60%" },
        { art: "mockup", caption: "Cover artwork in digital mockups", focus: "30% 60%" },
        { art: "font", caption: "Lettering study for the series name", focus: "60% 40%" },
        { art: "app", caption: "How the covers look as store thumbnails", focus: "50% 70%" },
      ],
      results: [
        { value: "6", label: "Covers delivered for the launch" },
        { value: "28%", label: "Higher pre-orders than the previous series" },
        { value: "2", label: "Design awards shortlists" },
      ],
      quote: {
        text: "The covers sold the books before anyone had read a page. A calm, confident piece of work.",
        name: "Daniel Reed",
        role: "Art Director, Harbor Press",
      },
    },
  },
  {
    id: "font",
    title: "Font Design",
    tone: "violet",
    categories: ["branding", "marketing"],
    year: "2024",
    image: {
      src: "/images/work-font.webp",
      alt: "Font Design project: a roll of patterned tape on a red and orange background",
    },
    study: {
      tagline: "A custom display typeface drawn for a packaging brand.",
      overview:
        "Tape & Co. wanted its packaging to be recognisable from across a room. I drew a custom display typeface with playful details and used it to build a pattern system for tape, boxes and labels.",
      client: "Tape & Co.",
      role: "Type design, pattern system",
      duration: "8 weeks",
      tools: ["Glyphs", "Illustrator", "Figma"],
      challenge:
        "Off-the-shelf fonts made the brand look like everyone else's, and the packaging needed a voice that was friendly but still professional.",
      process: [
        { id: "research", title: "Research", body: "A review of the packaging category and of how lettering behaves when it is wrapped, folded and printed on tape." },
        { id: "concept", title: "Concept", body: "Sketches of letterforms with one signature detail, a looping stroke, that could repeat as a pattern." },
        { id: "design", title: "Design", body: "A full uppercase set with numerals and punctuation, spaced and kerned, then used to compose the pattern." },
        { id: "delivery", title: "Delivery", body: "Font files for print and web, usage rules, and ready-made pattern tiles for the packaging team." },
      ],
      gallery: [
        { art: "font", caption: "Patterned tape in the new typeface", focus: "50% 50%" },
        { art: "font", caption: "Close-up of the looping stroke", focus: "70% 70%" },
        { art: "mockup", caption: "The pattern on a branded surface", focus: "60% 30%" },
        { art: "book", caption: "Specimen sheet for the typeface", focus: "40% 70%" },
        { art: "app", caption: "The type used in a mobile screen", focus: "50% 30%" },
      ],
      results: [
        { value: "26", label: "Letters, numerals and symbols drawn" },
        { value: "35%", label: "Lift in social engagement on packaging posts" },
        { value: "4", label: "Product lines now using the pattern" },
      ],
      quote: {
        text: "People recognise our tape from the other side of the warehouse. That was exactly the point.",
        name: "Maya Collins",
        role: "Founder, Tape & Co.",
      },
    },
  },
  {
    id: "application",
    title: "Application",
    tone: "accent",
    categories: ["ui-ux", "code"],
    year: "2024",
    image: {
      src: "/images/work-app.webp",
      alt: "Application project: a smartphone showing a purple app screen on dark woven fabric",
    },
    study: {
      tagline: "A mobile app designed in Figma and built front to back.",
      overview:
        "Loop Labs had a working idea and a rough prototype. I designed the full experience, from onboarding to settings, and built the front end so that what shipped matched the design pixel for pixel.",
      client: "Loop Labs",
      role: "Product design, front-end build",
      duration: "14 weeks",
      tools: ["Figma", "React", "TypeScript", "Tailwind CSS"],
      challenge:
        "New users abandoned the app within the first minute. The product was powerful, but nothing told people where to begin.",
      process: [
        { id: "research", title: "Research", body: "User interviews and a review of session recordings showed exactly where people got lost during the first minute." },
        { id: "concept", title: "Concept", body: "A shorter onboarding built around a single first action, with everything else introduced only when it was needed." },
        { id: "design", title: "Design", body: "A component library and a set of high-fidelity screens, tested with prototypes before any code was written." },
        { id: "delivery", title: "Delivery", body: "A responsive front end in React with the design system built in, handed over with documentation and tests." },
      ],
      gallery: [
        { art: "app", caption: "The home screen on a phone", focus: "50% 40%" },
        { art: "app", caption: "Onboarding flow, step one", focus: "30% 60%" },
        { art: "mockup", caption: "The desktop companion view", focus: "50% 50%" },
        { art: "font", caption: "Colour and illustration language", focus: "40% 40%" },
        { art: "book", caption: "Settings and account screens", focus: "70% 40%" },
      ],
      results: [
        { value: "58%", label: "Fewer users leaving in the first minute" },
        { value: "4.8", label: "Average store rating after launch" },
        { value: "1.2s", label: "Time to first screen" },
      ],
      quote: {
        text: "Design and code came from one person, so nothing got lost in translation. We shipped weeks early.",
        name: "Sam Patel",
        role: "CEO, Loop Labs",
      },
    },
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    tone: "dark",
    categories: ["ui-ux", "code"],
    year: "2024",
    image: {
      src: "/images/work-app.webp",
      alt: "Analytics Dashboard project: a smartphone showing a purple app screen on dark woven fabric",
    },
    study: {
      tagline: "A clear, fast dashboard for a data product.",
      overview:
        "Pulse Metrics had hundreds of charts and no hierarchy. I redesigned the dashboard around the three questions customers actually ask, and built it to stay fast with large amounts of data.",
      client: "Pulse Metrics",
      role: "Product design, front-end build",
      duration: "12 weeks",
      tools: ["Figma", "Next.js", "TypeScript"],
      challenge:
        "Customers could see everything and understand nothing. The dashboard needed a hierarchy that put the answers first.",
      process: [
        { id: "research", title: "Research", body: "Support tickets and customer calls were sorted into the questions people asked most often." },
        { id: "concept", title: "Concept", body: "A layout with one headline figure per question, with the detail one click behind it." },
        { id: "design", title: "Design", body: "A chart kit with consistent colours, labels and empty states, tested with real customer data." },
        { id: "delivery", title: "Delivery", body: "A fast, accessible front end with loading states, keyboard support and a short design-system handbook." },
      ],
      gallery: [
        { art: "app", caption: "The overview screen", focus: "50% 50%" },
        { art: "app", caption: "A report in detail", focus: "50% 80%" },
        { art: "mockup", caption: "The dashboard on desktop", focus: "40% 40%" },
        { art: "font", caption: "Chart colour palette", focus: "50% 60%" },
        { art: "book", caption: "Printable report layout", focus: "30% 50%" },
      ],
      results: [
        { value: "45%", label: "Less time to find a key figure" },
        { value: "70%", label: "Drop in dashboard support tickets" },
        { value: "0.8s", label: "Load time on large accounts" },
      ],
      quote: {
        text: "Our customers stopped asking where things are. The dashboard just answers the question now.",
        name: "Elena Novak",
        role: "Head of Product, Pulse Metrics",
      },
    },
  },
  {
    id: "campaign",
    title: "Launch Campaign",
    tone: "accent",
    categories: ["marketing"],
    year: "2023",
    image: {
      src: "/images/work-font.webp",
      alt: "Launch Campaign project: a roll of patterned tape on a red and orange background",
    },
    study: {
      tagline: "Social and landing page visuals for a product launch.",
      overview:
        "Bright Goods was launching a new product line with a small budget and a short deadline. I created a campaign look that worked across social posts, ads and a landing page.",
      client: "Bright Goods",
      role: "Campaign design, landing page",
      duration: "5 weeks",
      tools: ["Figma", "Photoshop", "Webflow"],
      challenge:
        "The launch had one chance to get noticed, a small budget, and a feed full of louder competitors.",
      process: [
        { id: "research", title: "Research", body: "A look at what the audience already saved and shared, and which visuals the competitors were not using." },
        { id: "concept", title: "Concept", body: "One bold colour, one big idea per post, and a consistent frame so the campaign was recognisable in a second." },
        { id: "design", title: "Design", body: "A set of social templates, ad sizes and a landing page, all built from the same few elements." },
        { id: "delivery", title: "Delivery", body: "Editable templates for the in-house team, so the campaign could keep going after launch week." },
      ],
      gallery: [
        { art: "font", caption: "The hero visual for the launch", focus: "50% 50%" },
        { art: "font", caption: "Social post series", focus: "20% 60%" },
        { art: "app", caption: "The landing page on mobile", focus: "50% 20%" },
        { art: "mockup", caption: "Display ad variations", focus: "70% 50%" },
        { art: "book", caption: "Printed in-store material", focus: "50% 80%" },
      ],
      results: [
        { value: "2.4x", label: "Return on ad spend" },
        { value: "18k", label: "Visits to the landing page in week one" },
        { value: "9%", label: "Landing page conversion rate" },
      ],
      quote: {
        text: "A small budget, a big result. The campaign looked far more expensive than it was.",
        name: "Chloe Martin",
        role: "Marketing Lead, Bright Goods",
      },
    },
  },
  {
    id: "packaging",
    title: "Packaging Identity",
    tone: "light",
    categories: ["branding"],
    year: "2023",
    image: {
      src: "/images/work-mockup.webp",
      alt: "Packaging Identity project: a laptop showing an orange wallpaper on a concrete surface",
    },
    study: {
      tagline: "Logo, labels and packaging for a small-batch brand.",
      overview:
        "Oak & Ember makes small-batch goods by hand. I designed a mark, a label system and packaging that feel crafted and honest, and still look good on a shelf next to bigger brands.",
      client: "Oak & Ember",
      role: "Identity, packaging design",
      duration: "9 weeks",
      tools: ["Illustrator", "Photoshop", "Figma"],
      challenge:
        "The products were handmade and beautiful, but the packaging looked generic and made the brand feel bigger and colder than it is.",
      process: [
        { id: "research", title: "Research", body: "A visit to the workshop, and a study of shelf displays in the shops that stock the products." },
        { id: "concept", title: "Concept", body: "A simple stamp-like mark and a warm palette that echo the materials and the way the goods are made." },
        { id: "design", title: "Design", body: "A label system flexible enough for twenty products, with tested print finishes and materials." },
        { id: "delivery", title: "Delivery", body: "Print-ready artwork, a supplier brief and a guide for adding new products without a designer." },
      ],
      gallery: [
        { art: "mockup", caption: "Packaging family together", focus: "50% 50%" },
        { art: "mockup", caption: "Label detail", focus: "20% 70%" },
        { art: "book", caption: "Printed card and inserts", focus: "60% 40%" },
        { art: "font", caption: "Pattern for tissue and tape", focus: "40% 60%" },
        { art: "app", caption: "The brand on the online shop", focus: "50% 30%" },
      ],
      results: [
        { value: "20", label: "Products launched in the new packaging" },
        { value: "31%", label: "Increase in sales from stockists" },
        { value: "5", label: "New shops now carrying the range" },
      ],
      quote: {
        text: "It finally looks like what we make: careful, warm and honest. Our stockists noticed immediately.",
        name: "Tom Ellis",
        role: "Co-founder, Oak & Ember",
      },
    },
  },
  {
    id: "marketing-site",
    title: "Marketing Site",
    tone: "violet",
    categories: ["ui-ux", "marketing"],
    year: "2023",
    image: {
      src: "/images/work-book.webp",
      alt: "Marketing Site project: a stack of white hardcover books against a blue wall",
    },
    study: {
      tagline: "A responsive marketing site, designed and built in Next.js.",
      overview:
        "Atlas Cloud needed a site that explained a complicated product in plain language. I designed the pages, wrote the structure with the team, and built a fast, accessible site in Next.js.",
      client: "Atlas Cloud",
      role: "Web design, front-end build",
      duration: "11 weeks",
      tools: ["Figma", "Next.js", "TypeScript", "Tailwind CSS"],
      challenge:
        "The product was hard to explain, and the old site buried the one thing every visitor wanted to know.",
      process: [
        { id: "research", title: "Research", body: "Sales calls and search data showed the five questions visitors asked before they signed up." },
        { id: "concept", title: "Concept", body: "A page structure that answers those questions in order, with one clear next step on every screen." },
        { id: "design", title: "Design", body: "A light, confident visual language, a component library and responsive layouts for every page." },
        { id: "delivery", title: "Delivery", body: "A static, fast and accessible build in Next.js, with analytics events and a clear content guide." },
      ],
      gallery: [
        { art: "book", caption: "The home page", focus: "50% 50%" },
        { art: "book", caption: "Product page detail", focus: "70% 30%" },
        { art: "app", caption: "The site on mobile", focus: "50% 40%" },
        { art: "mockup", caption: "Pricing page on desktop", focus: "40% 60%" },
        { art: "font", caption: "Illustration and icon style", focus: "50% 50%" },
      ],
      results: [
        { value: "64%", label: "More sign-ups from the home page" },
        { value: "98", label: "Lighthouse performance score" },
        { value: "2x", label: "Time visitors spend on product pages" },
      ],
      quote: {
        text: "The site explains in ten seconds what used to take a sales call. Exactly what we needed.",
        name: "Priya Shah",
        role: "VP Marketing, Atlas Cloud",
      },
    },
  },
];

/** The four projects shown as "Latest portfolio" on Home. */
export const latestProjects: readonly Project[] = projects.slice(0, 4);

/** Demo tools for the "Tools I work with" strip. */
export const skills: readonly string[] = [
  "Figma",
  "Framer",
  "Webflow",
  "Illustrator",
  "Photoshop",
  "After Effects",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Spline",
  "Notion",
];

export interface Testimonial {
  readonly id: string;
  readonly rating: string;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly image: { readonly src: string; readonly alt: string };
}

export const testimonials: readonly Testimonial[] = [
  {
    id: "hugo",
    rating: "4.9",
    quote: "Extraordinary performance! Quick solutions. Highly recommended.",
    name: "Hugo Messy",
    role: "CEO & Head of Sky Tech Inc.",
    image: { src: "/images/client-1.webp", alt: "Black and white portrait of Hugo Messy, a bearded man in a cap and hooded sweatshirt" },
  },
  {
    id: "rashed",
    rating: "5.00",
    quote:
      "Get quick solutions with great quality—a recommendation that’s unequivocal.",
    name: "Rashed Kabir",
    role: "CEO & Head of Sky Tech Inc.",
    image: { src: "/images/client-2.webp", alt: "Black and white portrait of Rashed Kabir, a smiling man with glasses and a grey beard" },
  },
  {
    id: "james",
    rating: "4.9",
    quote: "Professional, creative, & truly results-driven!",
    name: "James Bond",
    role: "CEO & Head of Sky Tech Inc.",
    image: { src: "/images/client-3.webp", alt: "Black and white portrait of James Bond, a woman with short curly hair" },
  },
];

export interface Client {
  readonly id: ClientLogoKey;
  readonly name: string;
}

export const clients: readonly Client[] = [
  { id: "pwa", name: "PWA" },
  { id: "vine", name: "Vine" },
  { id: "tagged", name: "Tagged" },
  { id: "ebay", name: "eBay" },
  { id: "sass", name: "Sass" },
];

/** Which page a question is shown on. Home no longer shows any. */
export type FaqPage = "services" | "contact" | "about";

export interface Faq {
  readonly id: string;
  readonly page: FaqPage;
  readonly question: string;
  readonly answer: string;
}

export const faqs: readonly Faq[] = [
  {
    id: "cost",
    page: "services",
    question: "How much does it cost?",
    answer:
      "It depends on the scope. Every project is quoted individually, so you know the full cost before we begin. Send a short brief and I will come back with a fixed quote.",
  },
  {
    id: "included",
    page: "services",
    question: "What is included in each service?",
    answer:
      "Each service lists its deliverables above. Everything is delivered as editable source files plus ready-to-use exports, and you own the final work once it is paid for.",
  },
  {
    id: "timeline",
    page: "services",
    question: "How long does a project take?",
    answer:
      "Most projects take between two and eight weeks, depending on the scope. I confirm the timeline in the quote and share a simple schedule before work starts.",
  },
  {
    id: "revisions",
    page: "services",
    question: "How many rounds of revisions are included?",
    answer:
      "Two rounds of changes are included at each main stage. If a project needs more, we agree on that together before any extra work begins.",
  },
  {
    id: "payment",
    page: "services",
    question: "How does payment work?",
    answer:
      "A deposit secures your place in my schedule and the balance is due when the work is delivered. Larger projects can be split into stages.",
  },
  {
    id: "start",
    page: "services",
    question: "What do you need from me to get started?",
    answer:
      "A short brief covering what you do, what you need, your timeline and any examples you like. If you are not sure yet, we can work it out together on a quick call.",
  },
  {
    id: "contact",
    page: "contact",
    question: "How can I contact you?",
    answer: `The quickest way is email at ${site.email}, or send a message through the contact form.`,
  },
  {
    id: "about",
    page: "about",
    question: "More about me?",
    answer:
      "Creative and award-winning designer with 7+ years of experience crafting innovative digital experiences. Expert in branding, UI/UX and interactive design. Passionate about pushing creative and technical boundaries.",
  },
];

/** How I work: five steps, shown on the Services page. Demo text. */
export interface WorkflowStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  /** How long the step usually takes. */
  readonly time: string;
}

export const workflow: readonly WorkflowStep[] = [
  {
    id: "discover",
    title: "Discover",
    body: "We talk through your business, your audience and what success looks like. I review what you already have and what your competitors are doing.",
    time: "2–3 days",
  },
  {
    id: "define",
    title: "Define",
    body: "I turn what we learned into a clear plan: the scope, the schedule and the direction, agreed in writing before any design begins.",
    time: "2–3 days",
  },
  {
    id: "design",
    title: "Design",
    body: "Sketches become polished work. You see progress at each stage and give feedback while it is still easy to change.",
    time: "1–4 weeks",
  },
  {
    id: "build",
    title: "Build",
    body: "The approved design is refined, tested and, where needed, built in code, so it works as well as it looks on every screen.",
    time: "1–3 weeks",
  },
  {
    id: "deliver",
    title: "Deliver",
    body: "You receive organised files, guidelines and a short handover. I stay available afterwards to answer questions and help with the first steps.",
    time: "2–3 days",
  },
];

/** A package: a bundle of services at a "from" price. Demo prices, in US dollars. */
export interface Package {
  readonly id: string;
  readonly name: string;
  readonly audience: string;
  readonly from: string;
  readonly timeline: string;
  readonly includes: readonly string[];
  /** Shown as the dark card with a "Most chosen" tag. Only one. */
  readonly featured?: boolean;
}

export const packages: readonly Package[] = [
  {
    id: "brand-kit",
    name: "Brand Kit",
    audience: "For new businesses that need a confident start.",
    from: "$1,200",
    timeline: "3–5 weeks",
    includes: ["Logo suite", "Colour and type system", "Brand guidelines", "Stationery and social kit"],
  },
  {
    id: "product-design",
    name: "Product Design",
    audience: "For teams building a website or app.",
    from: "$3,500",
    timeline: "4–8 weeks",
    includes: ["Research and wireframes", "Interactive prototype", "Full UI design system", "Developer handoff"],
    featured: true,
  },
  {
    id: "complete-launch",
    name: "Complete Launch",
    audience: "For a full brand and website, ready to go live.",
    from: "$6,500",
    timeline: "8–12 weeks",
    includes: ["Everything in Brand Kit", "Everything in Product Design", "Responsive front-end build", "Launch campaign visuals"],
  },
];

/** Shown instead of the packages when `showPrices` is false. */
export const hireGuide = {
  types: {
    title: "Project types",
    items: ["Brand identities", "Websites and apps", "Campaigns and social", "Front-end builds"],
  },
  timeline: {
    title: "Typical timeline",
    items: ["Small projects: 2–3 weeks", "Brand identities: 3–5 weeks", "Websites and apps: 4–8 weeks"],
  },
  start: {
    title: "How to start",
    items: ["Send a short brief", "We talk it through", "You receive a fixed quote"],
  },
} as const;

export const contact = {
  title: "Let’s talk",
  band: {
    eyebrow: "Have a project in mind?",
    headline: ["Let’s work", "together."],
    primary: "Start a project",
    secondary: "Book a call",
  },
  quickNote: "Prefer a quick note? Send it here.",
  portrait: {
    src: "/images/contact-portrait.webp",
    width: 744,
    height: 900,
    alt: "Portrait of a person in sunglasses and a red turtleneck against a red background",
  },
} as const;

export const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Work Gallery", href: "/work" },
  { label: "Services", href: "/services" },
] as const;

export const legalLinks = [
  { label: "Privacy", href: routes.privacy },
  { label: "Terms", href: routes.terms },
] as const;
