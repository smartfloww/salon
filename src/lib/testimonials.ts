/**
 * Guest words — used on the home page.
 * Names shortened at guests' request; on file at the front desk.
 */

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Three years of balayage with Mika and I have never once left the chair unhappy. They tell you honestly what your hair can take — and, more unusually, what it can't.",
    name: "Ariella C.",
    detail: "Balayage · guest since 2022",
  },
  {
    quote:
      "Kat did my hair for my wedding. At the trial she photographed the chignon from every angle, then pinned a copy of the plan into my kit. On the day, nothing was left to chance — including my nerves.",
    name: "Denise L.",
    detail: "Bridal · December 2024",
  },
  {
    quote:
      "I came in after a box-dye situation I won't describe. The consultation was mostly them listening. Six months on, my hair is the healthiest it's been since college.",
    name: "Trisha M.",
    detail: "Color correction · 2024",
  },
  {
    quote:
      "Best ₱950 I spend every five weeks. Paolo cuts like he's studying the hair, not just tidying it — and the finish survives the commute home.",
    name: "Miguel S.",
    detail: "Precision cut · guest since 2023",
  },
  {
    quote:
      "The keratin ritual gave me back my mornings. Forty minutes of my life returned every single day — I did the math in the chair.",
    name: "Karla V.",
    detail: "Smoothing ritual · 2025",
  },
];
