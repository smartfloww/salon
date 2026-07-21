# Lumière — Hair & Beauty Atelier

A premium, mobile-first static website for a fictional hair & beauty salon in
Makati, Manila. Built as a portfolio demo to showcase modern, mobile-first
salon web design.

> **Note:** This is a fictional demo. Lumière, the address, the phone number,
> and the team members are all invented for portfolio purposes.

---

## Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, fluid type, mobile-first layout primitives
- **Vanilla JS** — no framework, no dependencies (~6 KB unminified)
- **Fraunces + Inter + JetBrains Mono** — Google Fonts

No build step. No backend. No CDN dependencies. No GSAP, no Lenis — all
animations are powered by `IntersectionObserver` and CSS transitions, so they
work identically on touch devices and desktops.

---

## Pages

| File             | Purpose                                                              |
|------------------|----------------------------------------------------------------------|
| `index.html`     | Home — hero, philosophy, signature services, featured work, atelier, testimonial |
| `services.html`  | Service cards, process, FAQ                                          |
| `gallery.html`   | Filterable portfolio with tap-to-open lightbox                       |
| `contact.html`   | Booking form, info cards, location map                               |

---

## Folder Structure

```
lumiere-salon/
├── index.html
├── services.html
├── gallery.html
├── contact.html
├── README.md
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── css/
│   └── style.css
├── js/
│   └── main.js
├── favicon/
│   └── favicon.svg
└── images/
    ├── atelier/      (salon interiors)
    ├── services/     (haircut, color, bridal, spa)
    └── gallery/      (portraits, blonde bob, long hair)
```

---

## Mobile-First Design Decisions

- **Mobile bottom nav** — Home / Services / Book (CTA) / Gallery / Contact, always one tap away
- **Sticky "Book" CTA** — appears on mobile only, hides when the booking form is in view
- **Full-screen mobile drawer** — large tap targets, big editorial typography
- **Touch-optimized interactions** — every hover state has an equivalent `:active` state
- **Safe-area aware** — respects iOS notch (`env(safe-area-inset-*)`)
- **No custom cursor, no parallax** on touch devices — pure, performant motion
- **Reveal animations** are scroll-triggered via `IntersectionObserver`, so
  they fire the same way on mobile and desktop
- **`prefers-reduced-motion`** fully respected — all animations disabled when requested

---

## Customisation

All brand tokens (colors, type, spacing) live in `:root` at the top of
`css/style.css`. Edit those and the whole site re-themes.

The navigation and footer are duplicated across pages — if you change them,
update all four files.

Images live in `images/`. Swap any of them — keep the filenames and the
layout will hold.

---

## Deploy

The site is 100% static. Drop the entire folder into any static host:

### GitHub Pages
1. Push the `lumiere-salon/` contents to the root of a repository (or to the
   `docs/` folder, or to a `gh-pages` branch).
2. In **Settings → Pages**, choose the branch and folder.
3. Wait ~1 minute. Your site is live.

### Netlify
1. Drag-and-drop the `lumiere-salon/` folder onto
   [app.netlify.com/drop](https://app.netlify.com/drop), or
2. Connect the repo and set:
   - **Build command:** _(empty)_
   - **Publish directory:** `lumiere-salon`

### Vercel
1. `vercel` in the project root, or
2. Import the repo. Framework preset: **Other**. No build settings needed.

---

## Browser Support

- Modern Chromium, Firefox, Safari (last 2 versions)
- `prefers-reduced-motion` respected
- Touch devices fully supported — no degraded experience

---

## License

Demo content is fictional and free to use as a portfolio piece.
Stock imagery is sourced from public web sources via ZAI image search and
remains the property of the original photographers.

© 2025 Lumière Hair & Beauty Atelier (fictional).
