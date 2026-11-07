import { budgets, packages, projectTypes, routes, timelines } from "@/data/content";

/** What a link to the Contact page can pre-select in the brief. Anything unknown is ignored. */
export interface Prefill {
  types: string[];
  budget: string;
  timeline: string;
}

export const emptyPrefill: Prefill = { types: [], budget: "", timeline: "" };

/**
 * Reads "?type=design,code&budget=3500-7000&timeline=asap" or "?package=product-design" from the
 * address. Service pages link here so "Get started" and "Get a design quote" arrive filled in.
 */
export function parsePrefill(search: string): Prefill {
  if (!search) return emptyPrefill;
  const params = new URLSearchParams(search);
  const pack = packages.find((item) => item.id === params.get("package"));

  const asked = (params.get("type") ?? "").split(",");
  const types = projectTypes.map((type) => type.id).filter((id) => asked.includes(id));

  return {
    types: types.length > 0 ? types : [...(pack?.projectTypes ?? [])],
    budget: budgets.find((item) => item.id === params.get("budget"))?.id ?? pack?.budget ?? "",
    timeline: timelines.find((item) => item.id === params.get("timeline"))?.id ?? "",
  };
}

/** The address of the Contact page, optionally pre-selecting a service or a package. */
export function contactHref(query: { type?: string; package?: string } = {}): string {
  const params = new URLSearchParams();
  if (query.type) params.set("type", query.type);
  if (query.package) params.set("package", query.package);
  const search = params.toString();
  return search ? `${routes.contact}?${search}` : routes.contact;
}
