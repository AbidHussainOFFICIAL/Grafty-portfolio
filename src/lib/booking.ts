import { booking, site } from "@/data/content";

/**
 * Calendar maths for the call booking. A day is a "YYYY-MM-DD" string (its own calendar date, with no
 * time zone), which compares correctly as text and is safe to send to the server. The availability is
 * demo data: weekdays only, with a fixed pattern of taken days and times.
 */
export type DayKey = string;

export interface Slot {
  /** "HH:MM", 24-hour. */
  time: string;
  taken: boolean;
}

const KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const pad = (value: number) => String(value).padStart(2, "0");

function parts(key: DayKey): [number, number, number] {
  const [year, month, day] = key.split("-").map(Number);
  return [year, month, day];
}

export function keyOf(year: number, monthIndex: number, day: number): DayKey {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

/** The visitor's own calendar date for a moment in time. */
export function localKey(date: Date): DayKey {
  return keyOf(date.getFullYear(), date.getMonth(), date.getDate());
}

/** True for a real calendar date written as YYYY-MM-DD. */
export function isKey(value: string): boolean {
  const match = KEY_PATTERN.exec(value);
  if (!match) return false;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function addDays(key: DayKey, amount: number): DayKey {
  const [year, month, day] = parts(key);
  const date = new Date(Date.UTC(year, month - 1, day + amount));
  return keyOf(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/** 0 for Monday ... 6 for Sunday. */
export function weekdayOf(key: DayKey): number {
  const [year, month, day] = parts(key);
  return (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7;
}

/** A small stable number for a piece of text, so the demo availability is the same on every visit. */
function hash(text: string): number {
  let value = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    value = Math.imul(value ^ text.charCodeAt(index), 16777619);
  }
  return value >>> 0;
}

/** Tomorrow up to `daysAhead` days from today, Monday to Friday, and not one of the fully booked days. */
export function isDayOpen(key: DayKey, today: DayKey): boolean {
  if (key <= today || key > addDays(today, booking.daysAhead)) return false;
  if (weekdayOf(key) > 4) return false;
  return hash(key) % 6 !== 0;
}

/** The first day a visitor can book. */
export function firstOpenDay(today: DayKey): DayKey {
  let key = addDays(today, 1);
  while (!isDayOpen(key, today)) key = addDays(key, 1);
  return key;
}

/** The last day a visitor can book. */
export function lastOpenDay(today: DayKey): DayKey {
  let key = addDays(today, booking.daysAhead);
  while (!isDayOpen(key, today)) key = addDays(key, -1);
  return key;
}

export function daySlots(key: DayKey): Slot[] {
  const slots: Slot[] = [];
  const last = booking.endHour * 60;
  for (let minute = booking.startHour * 60; minute + booking.durationMinutes <= last; minute += booking.stepMinutes) {
    const time = `${pad(Math.floor(minute / 60))}:${pad(minute % 60)}`;
    slots.push({ time, taken: hash(`${key}T${time}`) % 4 === 0 });
  }
  return slots;
}

export interface MonthRef {
  year: number;
  /** 0 for January. */
  month: number;
}

export function shiftMonth(ref: MonthRef, amount: number): MonthRef {
  const date = new Date(Date.UTC(ref.year, ref.month + amount, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() };
}

export function monthOf(key: DayKey): MonthRef {
  const [year, month] = parts(key);
  return { year, month: month - 1 };
}

/**
 * A month as rows of five (Monday to Friday). Empty cells are null: the days before the 1st and
 * after the last weekday, so every row is complete.
 */
export function monthWeekdays({ year, month }: MonthRef): (DayKey | null)[] {
  const length = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (DayKey | null)[] = [];
  const first = weekdayOf(keyOf(year, month, 1));
  if (first <= 4) for (let index = 0; index < first; index += 1) cells.push(null);
  for (let day = 1; day <= length; day += 1) {
    const key = keyOf(year, month, day);
    if (weekdayOf(key) <= 4) cells.push(key);
  }
  while (cells.length % 5 !== 0) cells.push(null);
  return cells;
}

/* Display text. These use the visitor's own language and time zone, so call them in the browser only. */

export function formatTime(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function formatDay(key: DayKey, style: "long" | "short"): string {
  const [year, month, day] = parts(key);
  return new Date(year, month - 1, day).toLocaleDateString(
    [],
    style === "long"
      ? { weekday: "long", day: "numeric", month: "long" }
      : { weekday: "short", day: "numeric", month: "short" },
  );
}

export function formatMonth({ year, month }: MonthRef): string {
  return new Date(year, month, 1).toLocaleDateString([], { month: "long", year: "numeric" });
}

/** A calendar file (.ics) for the booked call, so the visitor can add it to their own calendar. */
export function buildIcs(key: DayKey, time: string, now: Date): string {
  const [year, month, day] = parts(key);
  const [hour, minute] = time.split(":").map(Number);
  const start = new Date(year, month - 1, day, hour, minute);
  const end = new Date(start.getTime() + booking.durationMinutes * 60_000);
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Grafty//Contact//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${key}T${time.replace(":", "")}@grafty`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:Intro call with ${site.name}`,
    `DESCRIPTION:${booking.meeting} link will be sent by email.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
