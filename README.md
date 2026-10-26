# Marahuyo — Hair & Beauty Atelier

A complete website for **Marahuyo**, a luxury hair atelier on Katipunan Avenue,
Loyola Heights, Quezon City. Five pages (Home, Services & Pricing, Portfolio,
Our Story, Book & Visit), an interactive map, editorial art direction, and a
fully responsive, mobile-first layout.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4** and
exported as a static site. No paid services or API keys required.

---

## Quick start

> **Prerequisites:** Node.js 20+ and npm.
> The first build fetches the Fraunces & Inter webfonts from Google, so it
> needs an internet connection. Everything else runs locally.

```bash
npm install
npm run dev
```

Open **http://localhost:3000** — that's the whole site.

### Scripts

| Script          | What it does                      |
| --------------- | --------------------------------- |
| `npm run dev`   | Dev server on port 3000           |
| `npm run build` | Exports the static site to `out/` |
| `npm run lint`  | ESLint                            |

---

## Booking form

The booking form validates details in the browser and displays a demo
confirmation. It does not send or save appointment requests. Guests must
contact the salon directly to make a real appointment.

## Before you go live

All brand facts live in one file: **`src/lib/site.ts`**

- Replace the placeholder social handles (`messenger`, `instagram`,
  `facebook`) with the salon's real pages.
- Update the address, coordinates (`site.coords` drive the embedded map),
  phone numbers, email and opening hours if any of them change.
- Point `metadataBase` in `src/app/layout.tsx` at the real domain so social
  share cards resolve.
- Prices, durations and service descriptions live in `src/lib/catalog.ts`;
  portfolio items in `src/lib/gallery.ts`; testimonials in
  `src/lib/testimonials.ts`.

## Architecture notes

The user-facing site is a **single Next.js route (`/`) with hash-based
client-side routing** (`#/`, `#/services`, `#/gallery`, `#/our-story`,
`#/visit`). Every "page" is a real component with its own composition,
title updates, scroll restoration and browser back/forward support — it
behaves like a multi-page site without a page reload.

```
src/
  app/
    page.tsx              # SPA shell: hash router + header/footer + pages
    layout.tsx            # Fonts (Fraunces + Inter), metadata, social cards
    globals.css           # Design tokens, motion, grain, utilities
  lib/
    site.ts               # Brand facts: address, hours, contacts, map, slots
    catalog.ts            # Services & PHP pricing (single source of truth)
    gallery.ts            # Portfolio items
    testimonials.ts       # Guest letters
  components/site/
    Header.tsx Footer.tsx # Fixed nav, mobile menu, sticky footer
    pages/Home|Services|Gallery|Story|Visit.tsx
    BookingForm.tsx       # Client-side form validation + demo confirmation
    Lightbox.tsx          # Keyboard-navigable portfolio viewer
    ui.tsx Reveal.tsx     # Shared primitives & scroll reveals
```

## Brand identity

- **Name.** *Marahuyo* (ma·ra·HU·yo) — an old Tagalog word meaning “to be
  captivated; to be drawn toward something beautiful without quite meaning
  to.”
- **Wordmark.** Set in Fraunces, tracked wide; the monogram is a wave-m
  drawn as a falling hair strand (`public/brand/mark.svg`, also the favicon).
- **Palette.** Porcelain `#F8F3EB` · Ink `#221A13` · Copper `#A65B3F` ·
  Brass `#C3A57C` · Parchment `#F1EADD` · Espresso `#2B221A`.
- **Type.** Fraunces (display, italics) + Inter (UI/body).
- **Photography.** All 24 images in `public/images/` are original
  in-house campaign work generated for this brand — warm golden light,
  cream/terracotta art direction, Filipina and Filipino models. Reuse
  freely with the brand.

## Testing done

- Responsive passes at 320, 375, 390, 430, 768, 1024 and 1440 px — no
  horizontal overflow, mobile menu, forms and map verified on touch widths.
- Booking form validation and demo confirmation run entirely in the browser;
  no appointment data is transmitted or persisted.
- Keyboard support: skip link, focus trap + restore in the lightbox and
  mobile menu, arrow-key gallery navigation.
- `eslint` and `tsc --noEmit` pass clean.

## Deployment

Run `npm run build` to export the site to `out/`, then deploy that folder to
any static hosting provider. The map embed uses OpenStreetMap — no key.

---

© 2026 Marahuyo Hair & Beauty Atelier — sample brand and website delivered
as a complete, self-contained project. All photography is original to this
project and free to use with it.
