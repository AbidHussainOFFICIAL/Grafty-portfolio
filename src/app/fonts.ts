import { Archivo, Inter_Tight } from "next/font/google";

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

/** The class names that define the two font variables; the root layout and the global error page both put them on <html>. */
export const fontVariables = `${archivo.variable} ${interTight.variable}`;
