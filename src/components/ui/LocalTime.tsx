"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/content";

/** "California, USA · 3:42 PM". The time appears after load so it never mismatches the server. */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: site.timeZone,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className={className}>
      {site.location}
      {time && <> &middot; {time}</>}
    </span>
  );
}
