/**
 * The text of the Privacy and Terms pages. It describes what the site really does today (the forms,
 * Vercel Web Analytics, Resend, one browser flag), so change it whenever that changes.
 * Placeholders: {email} becomes the contact address, {privacy} and {terms} link to the other pages.
 * Plain-language drafts: have them reviewed before launch and add your business name and address.
 */

/** A paragraph (string) or a bulleted list (array of strings). */
export type LegalBlock = string | readonly string[];

export interface LegalSection {
  readonly id: string;
  readonly title: string;
  readonly body: readonly LegalBlock[];
}

export interface LegalDoc {
  /** The large ghost word and its width-to-height ratio. */
  readonly ghost: string;
  readonly ratio: number;
  /** Which side the ghost word slides in from (the two pages alternate). */
  readonly from: "left" | "right";
  readonly title: string;
  readonly description: string;
  readonly intro: string;
  /** "The short version": three plain-English lines. */
  readonly summary: readonly string[];
  readonly sections: readonly LegalSection[];
  /** The link to the other document at the foot of the page. */
  readonly other: { readonly label: string; readonly href: string };
}

export const legalUpdated = "November 7, 2026";

export const privacy: LegalDoc = {
  ghost: "PRIVACY",
  ratio: 5.6,
  from: "left",
  title: "Privacy policy",
  description:
    "How this website handles your information: what the contact forms collect, the privacy-friendly analytics, who sees it and how to ask for it to be changed or deleted.",
  intro: "What I collect, why, and what you can do about it. Short and in plain words.",
  summary: [
    "I only use what you send me to reply and to do the work.",
    "No tracking cookies, no ads, and I never sell your data.",
    "You can ask to see, fix or delete your information at any time.",
  ],
  sections: [
    {
      id: "who",
      title: "Who I am",
      body: [
        "This website, Grafty, is run by Jessy Linda, an independent creative designer based in California, USA. I decide how the information described here is used. Questions go to {email}.",
      ],
    },
    {
      id: "collect",
      title: "What I collect",
      body: [
        [
          "What you send me: the name, email, organisation, project type, budget, timeline and message you enter in the project brief, the call time you pick, and any files you attach (up to 3 files, 3 MB in total).",
          "Quick notes: the short message form on the home page collects your name, email and message.",
          "Anonymous visit data: Vercel Web Analytics counts page views and a few actions, such as sending the form or downloading my CV. It uses no cookies, cannot follow you across other sites and never receives your name, email or message.",
          "Technical logs: my hosting provider, Vercel, keeps standard server logs, such as IP address and browser type, for security and reliability.",
          "One browser setting: a small flag called grafty-intro-seen is kept in your browser so the opening animation plays only once. It holds no personal information.",
        ],
      ],
    },
    {
      id: "use",
      title: "How I use it",
      body: [
        [
          "To reply to you and agree a time for a call.",
          "To prepare a quote and run the project if we work together.",
          "To keep the site secure and working.",
          "To see which pages are useful, using the anonymous counts above.",
        ],
        "I do not sell your information, show advertising or build marketing profiles.",
      ],
    },
    {
      id: "sharing",
      title: "Who else sees it",
      body: [
        "Only the services that run the site for me: Vercel (hosting and analytics) and Resend (email delivery). They handle information on my behalf and may not use it for their own purposes. I may also share information if the law requires it.",
      ],
    },
    {
      id: "keeping",
      title: "How long I keep it",
      body: [
        "Enquiries that lead nowhere are deleted within 12 months of the last message. If we work together I keep project records for as long as the work, my accounts and the law require. Analytics data is kept for the period my Vercel plan allows.",
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      body: [
        "You can ask me to show you what I hold about you, correct it, delete it or stop using it. If you live in the EU, the UK or California you have these rights by law, and you can also complain to your local data protection authority. Email {email} and I will reply within 30 days.",
        "I do not sell or share personal information as those terms are defined in California law.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      body: [
        "This site sets no cookies and uses no tracking scripts apart from the privacy-friendly analytics described above, so there is no cookie banner.",
      ],
    },
    {
      id: "security",
      title: "Keeping it safe",
      body: [
        "The site is served over HTTPS and messages go straight to my inbox. Files you attach are emailed to me and are not stored on the website’s servers. No system is perfectly secure, so please do not send passwords or sensitive personal documents.",
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "The site is meant for businesses and adults. It is not aimed at children under 16 and I do not knowingly collect their information.",
      ],
    },
    {
      id: "transfers",
      title: "Where it is processed",
      body: [
        "I am in the United States, and Vercel and Resend process information in the United States and other countries. Where the law requires it, they use approved safeguards for international transfers.",
      ],
    },
    {
      id: "changes",
      title: "Changes",
      body: ["If I change this policy I will update the date at the top of this page and note any significant change here."],
    },
    {
      id: "contact",
      title: "Contact",
      body: ["Questions or requests about your information: {email}. You can also read the {terms}."],
    },
  ],
  other: { label: "Read the terms", href: "/terms" },
};

export const terms: LegalDoc = {
  ghost: "TERMS",
  ratio: 4,
  from: "right",
  title: "Terms of use",
  description:
    "The terms for using this website: who owns the work shown here, how enquiries and bookings work, and what to expect from the site.",
  intro: "The simple rules for using this site and for sending me a project enquiry.",
  summary: [
    "The work you see here is mine or my clients’. Please ask before reusing it.",
    "Sending a brief or booking a call is not a contract. Projects start with a written agreement.",
    "Be reasonable: no spam, no scraping, no attempts to break the site.",
  ],
  sections: [
    {
      id: "using",
      title: "Using this site",
      body: [
        "By using this website you agree to these terms. If you do not agree, please do not use it. The site is a portfolio and a way to contact me.",
      ],
    },
    {
      id: "work",
      title: "My work and copyright",
      body: [
        "The designs, text, images, code and other material on this site belong to me or, where shown, to the clients who commissioned them and allowed me to show the work. You may view the site and share links to it. Please do not copy, republish or sell any of it, or use it to train AI systems, without my written permission.",
      ],
    },
    {
      id: "enquiries",
      title: "Enquiries and bookings",
      body: [
        "Sending a brief or booking a call is a request, not a contract. I confirm call times by email. A project begins only after we agree scope, price, timing and ownership in writing. Prices on this site are “starting from” guides, not quotes.",
      ],
    },
    {
      id: "submissions",
      title: "What you send me",
      body: [
        "Only send information and files you have the right to share, and nothing unlawful or harmful. How I handle what you send is explained in the {privacy}.",
      ],
    },
    {
      id: "use-rules",
      title: "Acceptable use",
      body: [
        [
          "Do not try to break, overload or probe the site or its forms.",
          "Do not use automated tools to scrape the site or to send spam through the forms.",
          "Do not pretend to be someone else.",
        ],
      ],
    },
    {
      id: "links",
      title: "Links to other sites",
      body: ["The site links to social profiles and other websites I do not control. I am not responsible for their content or policies."],
    },
    {
      id: "guarantees",
      title: "No guarantees",
      body: [
        "The site and everything on it are provided as they are. I work to keep the information accurate and the site available, but I cannot promise it will always be error-free or uninterrupted, and details such as prices, availability and examples may change without notice.",
      ],
    },
    {
      id: "liability",
      title: "Limit of liability",
      body: [
        "To the extent the law allows, I am not liable for any loss that results from using this site or relying on what it says. Nothing here limits rights you have by law that cannot be limited.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      body: ["How I handle your information is explained in the {privacy}."],
    },
    {
      id: "law",
      title: "Governing law",
      body: [
        "These terms are governed by the laws of the State of California, USA, and disputes are handled by the courts there, unless the law where you live says otherwise.",
      ],
    },
    {
      id: "changes",
      title: "Changes",
      body: [
        "I may update these terms from time to time. The date at the top shows the latest version, and continuing to use the site means you accept the update.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: ["Questions about these terms: {email}."],
    },
  ],
  other: { label: "Read the privacy policy", href: "/privacy" },
};
