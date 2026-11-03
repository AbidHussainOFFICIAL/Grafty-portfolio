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
  { label: "Services", href: "#services", inBar: true },
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
  readonly body: string;
}

export const services: readonly Service[] = [
  {
    id: "branding",
    title: "Branding",
    body: "Logos, identity systems and brand guidelines that make your business instantly recognisable and consistent everywhere it appears.",
  },
  {
    id: "design",
    title: "Design",
    body: "Efficient, knowledgeable, & smooth experience. Highly recommended",
  },
  {
    id: "marketing",
    title: "Marketing",
    body: "Campaign visuals, social content and landing pages designed to attract the right audience and turn attention into enquiries.",
  },
  {
    id: "code",
    title: "Code",
    body: "Pixel-accurate, responsive front-end builds, so what gets designed is exactly what ships.",
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
}

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

/** Not shown on Home any more. Kept for the Services and Contact pages. */
export interface Faq {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const faqs: readonly Faq[] = [
  {
    id: "about",
    question: "More about me?",
    answer:
      "Creative and award-winning designer with 7+ years of experience crafting innovative digital experiences. Expert in branding, UI/UX and interactive design. Passionate about pushing creative and technical boundaries.",
  },
  {
    id: "contact",
    question: "How can I contact you?",
    answer: `The quickest way is email at ${site.email}, or send a message through the contact form.`,
  },
  {
    id: "cost",
    question: "How much does it cost?",
    answer:
      "Every project is scoped individually. Send a short brief through the contact form and I will come back with a tailored quote.",
  },
  {
    id: "services",
    question: "Which services do you provide?",
    answer:
      "Branding, UI/UX design, marketing design and front-end code. See the Services page for details.",
  },
];

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
  { label: "Services", href: "#services" },
] as const;

export const legalLinks = [
  { label: "Privacy", href: routes.privacy },
  { label: "Terms", href: routes.terms },
] as const;
