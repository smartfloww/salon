/**
 * MARAHUYO — Hair & Beauty Atelier
 * Single source of truth for brand facts, contact details and opening hours.
 *
 * ─────────────────────────────────────────────────────────────
 * BEFORE GOING LIVE: replace the placeholder handles below
 * (Messenger, Instagram, Facebook) with the salon's real pages,
 * and point `metadataBase` in `src/app/layout.tsx` at the live domain.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Marahuyo",
  wordmark: "MARAHUYO",
  descriptor: "Hair & Beauty Atelier",
  founded: "2017",
  meaning:
    "Marahuyo (ma·ra·HU·yo) — an old Tagalog word: to be captivated; to be drawn toward something beautiful without quite meaning to.",
  positioning:
    "A hair atelier on Katipunan Avenue for people who consider beauty a ritual — honest consultations, unhurried chairs, and color that respects the hair it lives on.",
  address: {
    line1: "3F Casa Aurora Building",
    line2: "108 Katipunan Avenue, Loyola Heights",
    city: "Quezon City, 1108 Metro Manila",
    full: "3F Casa Aurora Building, 108 Katipunan Avenue, Loyola Heights, Quezon City, 1108 Metro Manila",
  },
  // Approximate marker position along Katipunan Avenue (Loyola Heights).
  coords: { lat: 14.6403, lng: 121.0712 },
  neighborhood: "Loyola Heights · Quezon City",
  mobile: {
    display: "+63 917 214 8890",
    href: "tel:+639172148890",
    label: "Mobile & Viber",
  },
  landline: {
    display: "(02) 8571 4408",
    href: "tel:+63285714408",
    label: "Landline",
  },
  email: {
    display: "hello@marahuyo.ph",
    href: "mailto:hello@marahuyo.ph",
    label: "Email",
  },
  // Configurable social destinations — replace with the salon's real pages.
  messenger: "https://m.me/marahuyo.qc",
  instagram: "https://instagram.com/marahuyo.qc",
  facebook: "https://facebook.com/marahuyo.qc",
} as const;

/** Google Maps directions to the salon (works on mobile & desktop). */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  site.address.full + " (Katipunan Avenue)"
)}&travelmode=driving`;

/** Plain Google Maps view of the address. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.full
)}`;

/** OpenStreetMap embed (no API key, works offline of Google). */
export const osmEmbedUrl = (() => {
  const { lat, lng } = site.coords;
  const d = 0.004; // ~450 m
  const bbox = `${(lng - d).toFixed(5)}%2C${(lat - d).toFixed(5)}%2C${(lng + d).toFixed(5)}%2C${(lat + d).toFixed(5)}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(5)}%2C${lng.toFixed(5)}`;
})();

/** OpenStreetMap permalink (map centred on the salon). */
export const osmPermalinkUrl = `https://www.openstreetmap.org/#map=17/${site.coords.lat}/${site.coords.lng}`;

/** Max bookable date, computed in Manila time (BOOKING_MAX_DAYS ahead of today). */
export function bookingMaxDate(): string {
  const d = new Date(`${todayInManila()}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + BOOKING_MAX_DAYS);
  return d.toISOString().slice(0, 10);
}

/* ─────────────────────────────── Hours ─────────────────────────────── */

export type DayHours = {
  /** 0 = Sunday … 6 = Saturday (matches Date.getDay()) */
  dow: number;
  day: string;
  open: string | null; // "HH:mm" 24h
  close: string | null;
  note?: string;
};

export const HOURS: DayHours[] = [
  { dow: 1, day: "Monday", open: null, close: null, note: "Closed — training & deep-clean day" },
  { dow: 2, day: "Tuesday", open: "10:00", close: "20:00" },
  { dow: 3, day: "Wednesday", open: "10:00", close: "20:00" },
  { dow: 4, day: "Thursday", open: "10:00", close: "20:00" },
  { dow: 5, day: "Friday", open: "10:00", close: "20:00" },
  { dow: 6, day: "Saturday", open: "09:00", close: "19:00" },
  { dow: 0, day: "Sunday", open: "10:00", close: "18:00" },
];

/** Order for display: Monday-first week. */
export const HOURS_DISPLAY = [
  HOURS[1], HOURS[2], HOURS[3], HOURS[4], HOURS[5], HOURS[6], HOURS[0],
];

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Minutes a color/service needs to finish before closing — last bookable slot. */
const LAST_SLOT_BUFFER = 105;

/**
 * Bookable appointment slots (every 30 min) for a given YYYY-MM-DD.
 * Returns [] for closed days (Mondays) — the source of truth for the
 * booking form.
 */
export function slotsFor(dateStr: string): string[] {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return [];
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const day = HOURS.find((h) => h.dow === dow);
  if (!day || !day.open || !day.close) return [];
  const openM = toMin(day.open);
  const closeM = toMin(day.close);
  const lastM = Math.floor((closeM - LAST_SLOT_BUFFER) / 30) * 30;
  const out: string[] = [];
  for (let t = openM; t <= lastM; t += 30) out.push(toHHMM(t));
  return out;
}

/** "10:00 AM – 8:00 PM" style label for a day. */
export function hoursLabel(day: DayHours): string {
  if (!day.open || !day.close) return "Closed";
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hr = h % 12 === 0 ? 12 : h % 12;
    return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
  };
  return `${fmt(day.open)} – ${fmt(day.close)}`;
}

/** Today's hours, keyed to Asia/Manila regardless of server timezone. */
export function todayInManila(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** Current "HH:mm" in Asia/Manila. */
export function nowInManila(): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

/** Max days ahead a booking may be made. */
export const BOOKING_MAX_DAYS = 45;

/** Same-day requests need at least this much lead time. */
export const SAME_DAY_LEAD = 120; // minutes
