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
} as const;

export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** Shown in the desktop bar. Every link appears in the mobile menu and footer. */
  readonly inBar: boolean;
}

export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "#home", inBar: true },
  { label: "Services", href: "#services", inBar: true },
  { label: "About", href: "#about", inBar: true },
  { label: "Work", href: "#work", inBar: true },
  { label: "Reviews", href: "#feedback", inBar: false },
  { label: "FAQ", href: "#faq", inBar: false },
  { label: "Contact", href: "#contact", inBar: true },
];

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

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly href: string;
  /** Colour of the panel beside the image on desktop. */
  readonly tone: "light" | "dark" | "violet" | "accent";
  readonly image: { readonly src: string; readonly alt: string };
}

/** Point each href at the project's own page or case study when you have one. */
export const projects: readonly Project[] = [
  {
    id: "mockup",
    title: "Mockup Design",
    href: "#work",
    tone: "light",
    image: {
      src: "/images/work-mockup.webp",
      alt: "Laptop showing an orange wallpaper on a concrete surface",
    },
  },
  {
    id: "book",
    title: "Book Cover",
    href: "#work",
    tone: "dark",
    image: {
      src: "/images/work-book.webp",
      alt: "Stack of white hardcover books against a blue wall",
    },
  },
  {
    id: "font",
    title: "Font Design",
    href: "#work",
    tone: "violet",
    image: {
      src: "/images/work-font.webp",
      alt: "Roll of patterned tape on a red and orange background",
    },
  },
  {
    id: "application",
    title: "Application",
    href: "#work",
    tone: "accent",
    image: {
      src: "/images/work-app.webp",
      alt: "Smartphone showing a purple app screen on dark woven fabric",
    },
  },
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
    image: { src: "/images/client-1.webp", alt: "Hugo Messy" },
  },
  {
    id: "rashed",
    rating: "5.00",
    quote:
      "Get quick solutions with great quality—a recommendation that’s unequivocal.",
    name: "Rashed Kabir",
    role: "CEO & Head of Sky Tech Inc.",
    image: { src: "/images/client-2.webp", alt: "Rashed Kabir" },
  },
  {
    id: "james",
    rating: "4.9",
    quote: "Professional, creative, & truly results-driven!",
    name: "James Bond",
    role: "CEO & Head of Sky Tech Inc.",
    image: { src: "/images/client-3.webp", alt: "James Bond" },
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
    answer: `The quickest way is email at ${site.email}, or send a message through the form below.`,
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
      "Branding, UI/UX design, marketing design and front-end code. See the Services section above for details.",
  },
];

export const contact = {
  title: "Let’s talk",
  portrait: {
    src: "/images/contact-portrait.webp",
    width: 744,
    height: 900,
    alt: "Portrait of a person in sunglasses and a red turtleneck against a red background",
  },
} as const;

export const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Work Gallery", href: "#work" },
  { label: "Services", href: "#services" },
] as const;
