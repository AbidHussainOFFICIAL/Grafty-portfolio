"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

// Not part of the first download: fetched after the page settles, or on the first tap.
const loadSheet = () => import("./ContactSheet").then((module) => module.ContactSheet);
const ContactSheet = dynamic(loadSheet);

interface ContactSheetApi {
  open: () => void;
}

const ContactSheetContext = createContext<ContactSheetApi | null>(null);

export function useContactSheet(): ContactSheetApi {
  const api = useContext(ContactSheetContext);
  if (!api) throw new Error("useContactSheet must be used inside ContactSheetProvider");
  return api;
}

/** Holds the open/closed state of the phone contact sheet and renders it above everything. */
export function ContactSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const api = useMemo(() => ({ open }), [open]);

  // Warm the sheet's code once the browser is idle, so the first tap opens it instantly.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 2000));
    idle(() => void loadSheet());
  }, []);

  return (
    <ContactSheetContext.Provider value={api}>
      {children}
      <AnimatePresence>{isOpen && <ContactSheet key="sheet" onClose={close} />}</AnimatePresence>
    </ContactSheetContext.Provider>
  );
}
