"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock3, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "../Reveal";
import { ArrowLink, CtaLink, Fig, Mark, Photo, SectionHead } from "../ui";
import { HOME_STRIP } from "@/lib/gallery";
import { TESTIMONIALS } from "@/lib/testimonials";
import { directionsUrl, publicAssetPath, site } from "@/lib/site";

const MARQUEE_ITEMS = [
  "Lived-in color",
  "Precision cuts",
  "Scalp rituals",
  "Glass-hair smoothing",
  "Bridal & occasions",
  "Honest pricing",
];

const SIGNATURES = [
  {
    n: "01",
    title: "Color & Dimension",
    line: "Balayage, lived-in color, and an upkeep map that tells you the truth.",
    price: "from ₱5,500",
    img: "/images/svc-balayage.jpg",
    alt: "Back view of lived-in caramel balayage on a dark base, glossy loose waves in warm light",
  },
  {
    n: "02",
    title: "Cut & Shape",
    line: "Cut in response to your hair — not to the trend cycle.",
    price: "from ₱1,450",
    img: "/images/svc-cut.jpg",
    alt: "Profile of a sharp glossy jet-black precision bob against a cream backdrop",
  },
  {
    n: "03",
    title: "Treatments & Rituals",
    line: "The quiet work that makes everything else possible.",
    price: "from ₱1,350",
    img: "/images/svc-treatment.jpg",
    alt: "Glossy healthy dark hair being smoothed with a bristle brush in warm light",
  },
  {
    n: "04",
    title: "Bridal & Occasions",
    line: "One morning, planned to the minute — trial included, always.",
    price: "from ₱3,500",
    img: "/images/svc-bridal.jpg",
    alt: "Low textured chignon with pearl pins on a bride, back three-quarter view",
  },
];

export function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Atelier />
      <Signature />
      <SelectedWork />
      <KindWords />
      <VisitTeaser />
      <ClosingCta />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────── */

function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="shell grid items-stretch gap-10 pb-12 pt-28 sm:pt-32 lg:min-h-[calc(100svh-76px)] lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-40">
        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="eyebrow text-copper">
            Hair &amp; Beauty Atelier — Katipunan, Quezon City
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-serif text-[clamp(2.9rem,8.4vw,5.4rem)] leading-[0.98] tracking-[-0.02em] text-ink"
          >
            Come as you are.
            <br />
            <span className="italic text-copper">Leave captivated.</span>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Honest consultations, unhurried chairs, and color that respects the
            hair it lives on — a salon for people who treat beauty as a ritual,
            not an errand.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#/visit" className="w-full sm:w-auto">
              Book a Visit
            </CtaLink>
            <CtaLink href="#/services" variant="outline" className="w-full sm:w-auto">
              Browse Services
            </CtaLink>
          </div>

          <p className="mt-10 hidden items-center gap-3 border-t border-ink/15 pt-5 text-[10px] font-medium uppercase tracking-[0.3em] text-ink-soft sm:flex">
            <Mark className="h-3.5 w-5 text-copper" />
            Est. {site.founded} — Loyola Heights, Quezon City
          </p>
        </div>

        <div className="lg:col-span-7">
          <Photo
            src="/images/hero-home.jpg"
            alt="A guest with a soft glossy blowout in warm window light, wearing an ivory silk blouse"
            ratio="aspect-[4/5] lg:h-full lg:aspect-auto"
            className="lg:h-full"
            imgClassName="object-[50%_22%]"
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <p className="mt-3 hidden text-[10px] font-medium uppercase tracking-[0.28em] text-ink-soft lg:block">
            The atelier, mid-afternoon — Katipunan Avenue
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ───────────────────────────────────────────── */

function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div aria-hidden className="overflow-hidden border-y border-ink/10 py-4">
      <div className="marquee-track flex w-max items-center gap-12 pr-12">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-12">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-12 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.32em] text-ink-soft"
              >
                {item}
                <span className="text-[8px] text-copper">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 01 · The atelier ──────────────────────────────────── */

function Atelier() {
  return (
    <section aria-labelledby="atelier-title" className="py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHead
            kicker="01 — The Atelier"
            title={
              <span id="atelier-title">
                A quiet room
                <br />
                above Katipunan.
              </span>
            }
            aside="Est. 2017"
          />
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Marahuyo sits on the third floor of Casa Aurora — six styling
            stations, two backwash lounges, and the kind of afternoon light you
            can&apos;t fake. We keep the chairs unhurried: one guest per stylist
            at a time, and nobody rushed off the schedule.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            The name is an old Tagalog word — <em className="font-serif">marahuyo</em>, to be
            captivated — because that&apos;s what a good chair does. You don&apos;t
            decide to feel at home in it. You just do.
          </p>
          <div className="mt-8">
            <ArrowLink href="#/our-story">Read our story</ArrowLink>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/15 pt-8 sm:grid-cols-4">
            {[
              ["2017", "founded on Katipunan"],
              ["6", "styling stations"],
              ["4", "senior stylists"],
              ["1", "philosophy — honesty"],
            ].map(([num, label]) => (
              <div key={label}>
                <dt className="font-serif text-3xl text-ink">{num}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <Photo
            src="/images/intro-interior.jpg"
            alt="The Marahuyo floor — cream walls, brass arched mirrors, caramel leather chairs, golden afternoon light"
            ratio="aspect-[4/3]"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <Fig>The main floor, mid-afternoon — brass, cream, and the 4pm light.</Fig>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 02 · Signature services ───────────────────────────── */

function Signature() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="signature-title" className="border-t border-ink/10 py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHead
            kicker="02 — Signature"
            title={<span id="signature-title">Four chairs, four disciplines.</span>}
            aside="Full menu on the Services page"
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Rows */}
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <ul className="border-t border-ink/12">
              {SIGNATURES.map((s, i) => (
                <li key={s.n} className="border-b border-ink/12">
                  <a
                    href="#/services"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center gap-5 py-6 outline-offset-4 sm:gap-6"
                  >
                    <span
                      className={cn(
                        "hidden shrink-0 tabular-nums text-[11px] tracking-[0.2em] transition-colors sm:block",
                        active === i ? "text-copper" : "text-ink-soft"
                      )}
                    >
                      {s.n}
                    </span>
                    {/* mobile thumb */}
                    <span className="relative block h-20 w-16 shrink-0 overflow-hidden bg-parchment sm:hidden">
                      <Image
                        src={publicAssetPath(s.img)}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block font-serif text-[clamp(1.4rem,3.4vw,2.2rem)] leading-tight transition-colors duration-300",
                          active === i ? "text-copper" : "text-ink"
                        )}
                      >
                        {s.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-snug text-ink-soft">
                        {s.line}
                      </span>
                      <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft sm:hidden">
                        {s.price}
                      </span>
                    </span>
                    <span className="hidden shrink-0 text-right sm:block">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                        {s.price}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "mt-3 ml-auto inline-flex size-10 items-center justify-center border transition-all duration-300",
                          active === i
                            ? "border-copper bg-copper text-porcelain"
                            : "border-ink/20 text-ink group-hover:border-ink"
                        )}
                      >
                        <ArrowRight className="size-4" />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-ink-soft">
              Every service starts the same way: an honest look at your hair and
              a straight answer about what it can take.
            </p>
          </Reveal>

          {/* Hover image panel (desktop) */}
          <Reveal delay={120} className="order-1 hidden lg:order-2 lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-parchment">
                {SIGNATURES.map((s, i) => (
                  <Image
                    key={s.n}
                    src={publicAssetPath(s.img)}
                    alt={s.alt}
                    fill
                    sizes="40vw"
                    loading={i === 0 ? "eager" : "lazy"}
                    className={cn(
                      "object-cover transition-opacity duration-500",
                      active === i ? "opacity-100" : "opacity-0"
                    )}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <Fig className="mt-0">
                  {SIGNATURES[active].title.toLowerCase()} — the short version.
                </Fig>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                  {SIGNATURES[active].price}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 03 · Selected work ────────────────────────────────── */

function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className="py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHead
            kicker="03 — Selected Work"
            title={<span id="work-title">From the chair, lately.</span>}
            aside={<ArrowLink href="#/gallery">View all work</ArrowLink>}
          />
        </Reveal>
      </div>

      <Reveal delay={100} className="mt-10 lg:mt-14">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-[max(2.75rem,calc((100vw-78rem)/2+2.75rem))]">
          {HOME_STRIP.map((g) => (
            <a
              key={g.id}
              href="#/gallery"
              className="group w-[70vw] shrink-0 snap-start sm:w-[320px] lg:w-[290px]"
            >
              <Photo
                src={g.src}
                alt={g.alt}
                ratio="aspect-[4/5]"
                sizes="(min-width: 640px) 320px, 70vw"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <p className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-serif text-[15px] italic text-ink">{g.title}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft">
                  {g.category}
                </span>
              </p>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ── 04 · Testimonials ─────────────────────────────────── */

function KindWords() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % total), 7000);
    return () => clearInterval(t);
  }, [paused, total]);

  const t = TESTIMONIALS[i];

  return (
    <section
      aria-labelledby="words-title"
      className="border-t border-ink/10 bg-espresso py-20 text-porcelain lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="shell">
        <div className="flex items-baseline justify-between border-t border-porcelain/25 pt-4">
          <p className="eyebrow text-brass">04 — In their words</p>
          <p className="text-xs text-porcelain/65">Guest letters, shortened</p>
        </div>

        <div
          aria-live="polite"
          className="mx-auto mt-12 max-w-3xl text-center lg:mt-16"
        >
          <blockquote key={i} className="page-enter">
            <p className="font-serif text-[clamp(1.35rem,3.4vw,2.1rem)] italic leading-[1.35] text-porcelain">
              “{t.quote}”
            </p>
            <footer className="mt-7">
              <p className="text-sm font-medium tracking-[0.06em] text-brass">{t.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-porcelain/50">
                {t.detail}
              </p>
            </footer>
          </blockquote>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => setI((v) => (v - 1 + total) % total)}
              aria-label="Previous testimonial"
              className="inline-flex size-11 items-center justify-center border border-porcelain/25 text-porcelain/70 transition-colors hover:border-brass hover:text-brass"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <div className="flex items-center gap-2.5" aria-label="Testimonials">
              {TESTIMONIALS.map((_, d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={d === i}
                  aria-label={`Show testimonial ${d + 1}`}
                  onClick={() => setI(d)}
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    d === i ? "bg-brass" : "bg-porcelain/25 hover:bg-porcelain/50"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setI((v) => (v + 1) % total)}
              aria-label="Next testimonial"
              className="inline-flex size-11 items-center justify-center border border-porcelain/25 text-porcelain/70 transition-colors hover:border-brass hover:text-brass"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 05 · Visit teaser ─────────────────────────────────── */

function VisitTeaser() {
  return (
    <section aria-labelledby="visit-title" className="py-20 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHead
            kicker="05 — Visit"
            title={
              <span id="visit-title">
                Third floor,
                <br />
                Casa Aurora.
              </span>
            }
          />
          <address className="mt-7 space-y-1 text-[15px] not-italic leading-relaxed text-ink-soft">
            <span className="block">{site.address.line1}</span>
            <span className="block">{site.address.line2}</span>
            <span className="block">{site.address.city}</span>
          </address>
          <ul className="mt-7 space-y-3 border-t border-ink/15 pt-6 text-sm">
            <li className="flex items-center gap-3 text-ink-soft">
              <Clock3 className="size-4 shrink-0 text-copper" aria-hidden />
              Tue–Fri 10 AM – 8 PM · Sat 9 AM – 7 PM · Sun 10 AM – 6 PM
            </li>
            <li className="flex items-center gap-3 text-ink-soft">
              <MapPin className="size-4 shrink-0 text-copper" aria-hidden />
              Along Katipunan Avenue — a short walk from the universities
            </li>
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#/visit" className="w-full sm:w-auto">
              Plan your visit
            </CtaLink>
            <CtaLink
              href={directionsUrl}
              variant="outline"
              external
              className="w-full sm:w-auto"
            >
              Get directions
            </CtaLink>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <Photo
            src="/images/facade.jpg"
            alt="The Casa Aurora facade at golden hour — warm light from tall windows, palms and ferns at the entrance"
            ratio="aspect-[4/3]"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <Fig>Casa Aurora at golden hour — we keep the light on.</Fig>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Closing CTA ───────────────────────────────────────── */

function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-porcelain/10 bg-night py-20 text-porcelain lg:py-28">
      <div className="shell text-center">
        <p className="eyebrow text-brass">Begin</p>
        <h2
          id="cta-title"
          className="mx-auto mt-6 max-w-3xl font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.015em]"
        >
          The chair is <span className="italic text-brass">yours.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-porcelain/65">
          Tell us what you&apos;re growing out, covering up, or walking down the
          aisle with — we&apos;ll take it from there. Consultations are free and
          always honest.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CtaLink href="#/visit" variant="copper" className="w-full sm:w-auto">
            Book a Visit
          </CtaLink>
          <a
            href={site.mobile.href}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-porcelain/70 transition-colors hover:text-brass"
          >
            or call {site.mobile.display}
          </a>
        </div>
      </div>
    </section>
  );
}
