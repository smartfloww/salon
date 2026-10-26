/** SPA route table — pages are hash-routes on the single `/` route. */

export type RouteId = "home" | "services" | "gallery" | "story" | "visit";

export const NAV: { id: RouteId; hash: string; label: string }[] = [
  { id: "home", hash: "#/", label: "Home" },
  { id: "services", hash: "#/services", label: "Services & Pricing" },
  { id: "gallery", hash: "#/gallery", label: "Portfolio" },
  { id: "story", hash: "#/our-story", label: "Our Story" },
  { id: "visit", hash: "#/visit", label: "Book & Visit" },
];

export const PAGE_META: Record<RouteId, { title: string; description: string }> = {
  home: {
    title: "Marahuyo — Hair & Beauty Atelier · Katipunan, Quezon City",
    description:
      "A hair atelier on Katipunan Avenue, Loyola Heights, Quezon City. Honest consultations, unhurried chairs, color that respects the hair it lives on.",
  },
  services: {
    title: "Services & Pricing — Marahuyo",
    description:
      "Cuts, color, treatments, styling and bridal — clearly priced in Philippine pesos, VAT-inclusive. Book a complimentary consultation at our Katipunan atelier.",
  },
  gallery: {
    title: "Portfolio — Marahuyo",
    description: "Selected work from the chair — color, cuts, styling and occasions, shot in the atelier.",
  },
  story: {
    title: "Our Story — Marahuyo",
    description:
      "Marahuyo is an old Tagalog word — to be captivated. The story, the house rules, and the people behind the chairs at Katipunan.",
  },
  visit: {
    title: "Book & Visit — Marahuyo",
    description:
      "Request an appointment at Marahuyo, Katipunan Avenue, Quezon City. Opening hours, contact details, directions and map.",
  },
};

/**
 * Parse a location hash into a route.
 * Returns null for in-page anchors (e.g. the skip link's "#main")
 * so they never trigger a route change.
 */
export function parseHash(hash: string): RouteId | null {
  const h = (hash || "").replace(/^#\/?/, "").split("?")[0].replace(/\/$/, "");
  if (h === "") return "home";
  if (h === "main") return null; // in-page anchor — not a route
  switch (h) {
    case "home":
      return "home";
    case "services":
      return "services";
    case "gallery":
      return "gallery";
    case "story":
    case "our-story":
      return "story";
    case "visit":
    case "book":
      return "visit";
    default:
      return "home"; // unknown #/… paths land on home
  }
}
