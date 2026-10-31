import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight } from "next/font/google";
import { site } from "@/data/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | Branding, Product UI/UX & Design`,
  description:
    "Jessy Linda is an award-winning creative designer in California, USA, crafting intuitive, user-friendly experiences through branding, wireframing, prototyping and visual design.",
  openGraph: {
    title: `${site.name} | Branding, Product UI/UX & Design`,
    description:
      "Award-winning creative designer specialising in branding, product UI/UX and visual design.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#c5cdd6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${interTight.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
