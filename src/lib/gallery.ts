/**
 * Portfolio — used by the Gallery page and the home "Selected Work" strip.
 * All photography: in-house campaign work, consistent square presentation.
 */

export type GalleryCategory = "Color" | "Cuts" | "Styling" | "Treatments" | "Occasions";

export type GalleryItem = {
  id: string;
  src: string; // /images/*.jpg
  alt: string;
  title: string;
  caption: string;
  category: GalleryCategory;
};

export const GALLERY_FILTERS: ("All" | GalleryCategory)[] = [
  "All", "Color", "Cuts", "Styling", "Treatments", "Occasions",
];

export const GALLERY: GalleryItem[] = [
  {
    id: "copper-living-in",
    src: "/images/g-copper-curls.jpg",
    alt: "Deep copper-red curls catching warm light, styled in soft terracotta tones",
    title: "Copper, lived in",
    caption: "A single vivid shade, melted by hand so it grows out without a line. Color by Mika.",
    category: "Color",
  },
  {
    id: "french-bob",
    src: "/images/g-bob-gloss.jpg",
    alt: "Glossy raven-black french bob with a soft fringe on a Filipina model",
    title: "The French bob, glossed",
    caption: "Cut dry, in response to the wave — so it falls the same way on day thirty as on day one. Cut by Paolo.",
    category: "Cuts",
  },
  {
    id: "ash-money-piece",
    src: "/images/g-blonde.jpg",
    alt: "Soft ash-blonde face-framing money-piece highlights over dark roots, glossy waves",
    title: "Ash face-frame",
    caption: "A bright frame over a dark base — one morning in the chair, four months of easy grow-out.",
    category: "Color",
  },
  {
    id: "high-ponytail",
    src: "/images/g-ponytail.jpg",
    alt: "Sleek high ponytail with a polished wrapped base on jet-black hair, model in profile",
    title: "The wrapped ponytail",
    caption: "Pulled, wrapped, and set for a gala — built to survive the ride home.",
    category: "Styling",
  },
  {
    id: "glass-hair",
    src: "/images/g-keratin.jpg",
    alt: "Glass-straight sleek jet-black hair flowing over one shoulder, shine catching warm light",
    title: "Glass hair, honestly",
    caption: "After a keratin ritual, not a flat iron — the shine is the hair itself.",
    category: "Treatments",
  },
  {
    id: "textured-crop",
    src: "/images/g-mens-cut.jpg",
    alt: "Filipino man with a textured crop haircut and clean taper, warm cream studio backdrop",
    title: "Textured crop",
    caption: "Keep the top honest, the sides short, the mirror time short. Cut by Paolo.",
    category: "Cuts",
  },
  {
    id: "pearl-chignon",
    src: "/images/g-updo.jpg",
    alt: "Braided crown gathered into a low bun with gold pearl pins on dark hair, back three-quarter view",
    title: "Pearl-pinned chignon",
    caption: "A braided crown into a low bun — pinned for a December wedding, still perfect at midnight.",
    category: "Occasions",
  },
  {
    id: "third-day-blowout",
    src: "/images/g-blowout.jpg",
    alt: "Voluminous bouncy caramel-brown blowout on a Filipina woman laughing softly",
    title: "The day-three blowout",
    caption: "Our signature blowout is styled to look better on day three than most do on day one.",
    category: "Styling",
  },
  {
    id: "scalp-hour",
    src: "/images/g-scalp.jpg",
    alt: "Close-up of healthy wet dark hair with water droplets and soft steam at a cream backwash sink",
    title: "The scalp hour",
    caption: "Steam, warm oils, and twenty minutes where nobody is allowed to ask you anything.",
    category: "Treatments",
  },
  {
    id: "boho-fishtail",
    src: "/images/g-braid.jpg",
    alt: "Loose bohemian fishtail braid on dark chocolate hair with soft tendrils, three-quarter view",
    title: "Sunday fishtail",
    caption: "Loose on purpose — a braid that reads as an afternoon, not an event.",
    category: "Occasions",
  },
];

/** Curated five for the home strip (first appearance on the site). */
export const HOME_STRIP = [
  GALLERY[0], // copper
  GALLERY[2], // ash money piece
  GALLERY[1], // french bob
  GALLERY[7], // blowout
  GALLERY[6], // pearl chignon
];
