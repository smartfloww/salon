/**
 * Service catalogue — the single source of truth used by the Services page,
 * the booking form.
 * All prices in Philippine pesos (₱), VAT-inclusive.
 */

export type Price = {
  /** "from" prefix shown when length/hair density affects the final quote. */
  from?: boolean;
  amount?: number;
  /** Set for services quoted only at consultation. */
  quoted?: string;
};

export type Service = {
  id: string;
  category: CategoryId;
  name: string;
  blurb: string;
  duration: number | null; // minutes
  price: Price;
};

export type CategoryId = "consult" | "cut" | "color" | "rituals" | "styling" | "additions";

export type Category = {
  id: CategoryId;
  index: string; // "01"
  title: string;
  intro: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "consult",
    index: "00",
    title: "Begin Here",
    intro: "Not sure what your hair needs? Sit in a chair, have some tea, and let's look at it together — on the house.",
  },
  {
    id: "cut",
    index: "01",
    title: "Cut & Shape",
    intro: "Cut in response to your hair — its weight, its wave, the way it falls when nobody's styling it. Every cut includes a consultation, wash, scalp massage, and a finish you can recreate at home.",
  },
  {
    id: "color",
    index: "02",
    title: "Color",
    intro: "Dimension over drama — color that grows out gracefully and behaves between visits. First-time color guests are asked to come in for a complimentary patch test at least 48 hours before the appointment.",
  },
  {
    id: "rituals",
    index: "03",
    title: "Treatments & Rituals",
    intro: "The unglamorous work that makes everything else possible. We diagnose before we prescribe — if your hair doesn't need it, we'll talk you out of it.",
  },
  {
    id: "styling",
    index: "04",
    title: "Styling & Occasions",
    intro: "From a Tuesday blowout to the morning you say yes. Occasion bookings include a trial so there are no surprises on the day itself.",
  },
  {
    id: "additions",
    index: "05",
    title: "The Beauty Bar",
    intro: "Small finishing touches while your color processes — add them to any appointment, or come in just for these.",
  },
];

export const SERVICES: Service[] = [
  // Begin here
  {
    id: "consult",
    category: "consult",
    name: "Complimentary Consultation",
    blurb: "Fifteen unhurried minutes with a senior stylist. We look at your hair, talk about your life, and tell you honestly what's worth doing — and what isn't.",
    duration: 20,
    price: { amount: 0 },
  },

  // Cut & shape
  {
    id: "cut-signature",
    category: "cut",
    name: "Signature Cut & Finish",
    blurb: "Consultation, wash with scalp massage, precision cut, and a heat-styled finish — plus a quick lesson in getting the same shape at home.",
    duration: 60,
    price: { amount: 1450 },
  },
  {
    id: "cut-precision",
    category: "cut",
    name: "Precision Cut — Men",
    blurb: "A considered cut, not a routine one. Wash, cut, and a styled finish that survives Quezon City humidity.",
    duration: 45,
    price: { amount: 950 },
  },
  {
    id: "cut-fringe",
    category: "cut",
    name: "Fringe & Trim",
    blurb: "Between full cuts — fringe reshaped, ends dusted, and set again.",
    duration: 20,
    price: { amount: 450 },
  },

  // Color
  {
    id: "color-balayage",
    category: "color",
    name: "Balayage & Dimension",
    blurb: "Hand-painted, lived-in color — caramel on dark, or a soft melt of three tones. Includes toner, blow-dry finish, and a six-week check-in.",
    duration: 180,
    price: { from: true, amount: 5500 },
  },
  {
    id: "color-single",
    category: "color",
    name: "Single-Process Color",
    blurb: "One clean, all-over shade — deeper, richer, or a quiet grey-blend.",
    duration: 120,
    price: { from: true, amount: 2900 },
  },
  {
    id: "color-highlights",
    category: "color",
    name: "Full Highlights",
    blurb: "Traditional foils for a crisper, more uniform lift — chosen when balayage isn't the right tool for the job.",
    duration: 150,
    price: { from: true, amount: 4200 },
  },
  {
    id: "color-retouch",
    category: "color",
    name: "Root Retouch",
    blurb: "Regrowth refreshed between full colors — matched to your existing shade, not the swatch chart.",
    duration: 90,
    price: { amount: 1900 },
  },
  {
    id: "color-gloss",
    category: "color",
    name: "Toner & Gloss",
    blurb: "A twenty-minute shine and tone correction that makes color look freshly done — even when it isn't.",
    duration: 45,
    price: { amount: 1500 },
  },
  {
    id: "color-creative",
    category: "color",
    name: "Creative & Fashion Shades",
    blurb: "Coppers, roses, cool platinums. Vivids are a commitment — we'll map out the upkeep honestly before you commit.",
    duration: 150,
    price: { quoted: "Quoted at consultation" },
  },

  // Treatments & rituals
  {
    id: "trt-bond",
    category: "rituals",
    name: "Bond-Building Ritual",
    blurb: "For hair that's been through bleach, box dye, or a rough year. Rebuilds bonds from inside the strand; safe even on compromised hair.",
    duration: 75,
    price: { amount: 2400 },
  },
  {
    id: "trt-keratin",
    category: "rituals",
    name: "Keratin Smoothing",
    blurb: "A proper smoothing treatment — not a straightening. Frizz calms, drying time halves, and your natural wave survives.",
    duration: 150,
    price: { from: true, amount: 4800 },
  },
  {
    id: "trt-botox",
    category: "rituals",
    name: "Hair Botox",
    blurb: "A deep reconstructive fill for hair that's lost its body — proteins and ceramides, no formaldehyde.",
    duration: 120,
    price: { from: true, amount: 4200 },
  },
  {
    id: "trt-ginto",
    category: "rituals",
    name: "Ginto Conditioning Ritual",
    blurb: "Our signature half-hour: a warm oil massage, a camellia-and-honey mask, and twenty quiet minutes under steam.",
    duration: 45,
    price: { amount: 1600 },
  },
  {
    id: "trt-scalp",
    category: "rituals",
    name: "Scalp Detox & Massage",
    blurb: "Product build-up dissolved, then a massage you'll think about for days. Recommended before any color service.",
    duration: 40,
    price: { amount: 1350 },
  },

  // Styling & occasions
  {
    id: "sty-blowout",
    category: "styling",
    name: "Signature Blowout",
    blurb: "Washed, treated, and dried into shape — the kind that still looks intentional on day three.",
    duration: 45,
    price: { amount: 750 },
  },
  {
    id: "sty-waves",
    category: "styling",
    name: "Waves & Curls",
    blurb: "Set with heat, finished without that set look. Bring a photo; we'll be honest about what your hair will hold.",
    duration: 60,
    price: { amount: 950 },
  },
  {
    id: "sty-updo",
    category: "styling",
    name: "Evening Updo",
    blurb: "Events, galas, last-minute invitations. Includes wash and a light treatment so the style holds through the night.",
    duration: 75,
    price: { amount: 2200 },
  },
  {
    id: "sty-bridal-trial",
    category: "styling",
    name: "Bridal Trial",
    blurb: "We style the full look — hair, pace, and pins — then photograph it from every angle so the day itself is repetition, not experiment.",
    duration: 120,
    price: { amount: 3500 },
  },
  {
    id: "sty-wedding",
    category: "styling",
    name: "Wedding Day Styling",
    blurb: "On the day, in the chair or on location. Quoted after the trial, once we know exactly what the morning asks of us.",
    duration: null,
    price: { quoted: "Quoted after trial" },
  },

  // Beauty bar
  {
    id: "add-brows",
    category: "additions",
    name: "Brow Shaping & Tint",
    blurb: "Mapped to your face, not a stencil. Shaped, tinted, and set with a clear gel.",
    duration: 30,
    price: { amount: 650 },
  },
  {
    id: "add-lash",
    category: "additions",
    name: "Lash Extensions — Classic",
    blurb: "One-by-one, black on black, with a fill booked at three weeks. Patch test required 48 hours ahead.",
    duration: 90,
    price: { amount: 1800 },
  },
  {
    id: "add-facial",
    category: "additions",
    name: "Express Glow Facial",
    blurb: "A forty-five minute reset — cleanse, gentle extraction, and a massage. You leave with your face back.",
    duration: 45,
    price: { amount: 1750 },
  },
  {
    id: "add-hands",
    category: "additions",
    name: "Hand & Foot Ritual",
    blurb: "Warm soak, scrub, massage, and a quiet polish change — while your color processes or after it.",
    duration: 75,
    price: { amount: 1400 },
  },
];

/* ───────────────────────── helpers ───────────────────────── */

export function serviceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function servicesByCategory(cat: CategoryId): Service[] {
  return SERVICES.filter((s) => s.category === cat);
}

/** "₱1,450" · "from ₱5,500" · "Quoted at consultation" · "Free" */
export function priceText(price: Price): string {
  if (price.quoted) return price.quoted;
  const amt = price.amount ?? 0;
  const pesos = `₱${amt.toLocaleString("en-PH")}`;
  if (amt === 0) return "Free";
  return price.from ? `from ${pesos}` : pesos;
}

/** "1 hr 15 min" · "3 hrs" · "—" */
export function durationText(min: number | null): string {
  if (min == null) return "—";
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h && m) return `${h} hr ${m} min`;
  if (h) return `${h} ${h === 1 ? "hr" : "hrs"}`;
  return `${m} min`;
}
