import { Clock3 } from "lucide-react";
import { Reveal } from "../Reveal";
import { CtaLink, Fig, Photo, SectionHead } from "../ui";
import { CATEGORIES, SERVICES, durationText, priceText, type CategoryId } from "@/lib/catalog";

export function ServicesPage() {
  const mainCats = CATEGORIES.filter((c) => c.id !== "consult");
  const consult = SERVICES.find((s) => s.id === "consult")!;

  return (
    <>
      <PageHead />

      {/* ── Notes + photograph ── */}
      <div className="shell grid gap-10 pb-4 lg:grid-cols-12 lg:gap-16">
        <Reveal className="order-2 lg:order-1 lg:col-span-5">
          <div className="space-y-6 border-t border-ink/15 pt-6 text-[15px] leading-relaxed text-ink-soft">
            <p>
              All prices in Philippine pesos (₱), VAT-inclusive. Color and
              treatment quotes can move with length and density — we confirm the
              final number at consultation, <em className="font-serif">before</em> anything
              begins. Nobody likes a surprise at the counter. Least of all us.
            </p>
            <p className="border-t border-ink/15 pt-6">
              Vivids and corrective color are quoted at consultation — they&apos;re
              commitments, and we&apos;d rather you know the upkeep before you fall
              in love.
            </p>
            <p className="border-t border-ink/15 pt-6 text-sm">
              First-time color and lash guests: a complimentary patch test is
              needed at least 48 hours before the appointment. We&apos;ll arrange
              it when we confirm your booking.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120} className="order-1 lg:col-span-7 lg:order-2">
          <Photo
            src="/images/tools.jpg"
            alt="Overhead still life of brass scissors, a bristle brush, amber bottles and silk ribbon on a travertine counter"
            ratio="aspect-[16/10]"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <Fig>The counter, set for the afternoon — tools, toners, ribbon.</Fig>
        </Reveal>
      </div>

      {/* ── Begin here ── */}
      <section aria-labelledby="begin-title" className="shell mt-16 lg:mt-24">
        <Reveal>
          <div className="border border-ink/15 bg-parchment p-6 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <h2 id="begin-title" className="font-serif text-2xl text-ink lg:text-3xl">
                Begin here — {consult.name}
              </h2>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-copper">
                {durationText(consult.duration)} · {priceText(consult.price)}
              </p>
            </div>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              {consult.blurb}
            </p>
            <div className="mt-8">
              <CtaLink href="#/visit" variant="copper">
                Book a free consultation
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Categories ── */}
      {mainCats.map((cat) => (
        <CategorySection key={cat.id} id={cat.id} />
      ))}

      {/* ── Closing ── */}
      <section className="border-t border-ink/10 py-20 text-center lg:py-24">
        <Reveal>
          <p className="eyebrow text-copper">Still deciding?</p>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-ink">
            Tell us what your hair is doing.
            <br />
            <span className="italic text-copper">We&apos;ll be straight with it.</span>
          </h2>
          <div className="mt-9 flex justify-center">
            <CtaLink href="#/visit" variant="copper">
              Book a Visit
            </CtaLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ── Page head ─────────────────────────────────────────── */

function PageHead() {
  return (
    <header className="shell pt-28 pb-12 lg:pt-40 lg:pb-16">
      <p className="eyebrow text-copper">Services &amp; Pricing</p>
      <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.5rem,7vw,4.8rem)] leading-[1.02] tracking-[-0.015em]">
        Honest work,
        <br />
        <span className="italic text-copper">clearly priced.</span>
      </h1>
      <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
        Twenty-four services across five disciplines — and one rule that applies
        to all of them: we&apos;d rather talk you out of a service your hair
        doesn&apos;t need than into one it will regret.
      </p>
    </header>
  );
}

/* ── One category ──────────────────────────────────────── */

function CategorySection({ id }: { id: CategoryId }) {
  const cat = CATEGORIES.find((c) => c.id === id)!;
  const items = SERVICES.filter((s) => s.category === id);

  return (
    <section aria-labelledby={`cat-${id}`} className="shell mt-20 border-t border-ink/10 pt-10 lg:mt-28 lg:pt-12">
      <Reveal>
        <SectionHead
          kicker={`${cat.index} — ${cat.title}`}
          title={<span id={`cat-${id}`}>{cat.title}</span>}
          aside={`${items.length} ${items.length === 1 ? "service" : "services"}`}
        />
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{cat.intro}</p>
      </Reveal>

      <Reveal delay={80}>
        <ul className="mt-10 border-b border-ink/12">
          {items.map((s) => (
            <li
              key={s.id}
              className="grid gap-y-2 border-t border-ink/12 py-6 lg:grid-cols-12 lg:items-baseline lg:gap-x-8"
            >
              <div className="flex items-baseline justify-between gap-4 lg:col-span-3 lg:block">
                <h3 className="font-serif text-[clamp(1.15rem,2vw,1.45rem)] leading-snug text-ink">
                  {s.name}
                </h3>
                <p className="whitespace-nowrap tabular-nums text-[15px] font-medium text-ink lg:hidden">
                  {priceText(s.price)}
                </p>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-ink-soft lg:col-span-5">
                {s.blurb}
              </p>
              <p className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink-soft lg:col-span-2 lg:mt-0 lg:justify-end lg:text-right">
                <Clock3 className="size-3.5 shrink-0 text-copper lg:hidden" aria-hidden />
                <span className="tabular-nums">{durationText(s.duration)}</span>
              </p>
              <p className="hidden whitespace-nowrap tabular-nums text-[15px] font-medium text-ink lg:col-span-2 lg:block lg:text-right">
                {priceText(s.price)}
              </p>
            </li>
          ))}
        </ul>
        {id === "color" ? (
          <p className="mt-5 text-[13px] leading-relaxed text-ink-soft">
            * Every color service includes a toner, a blow-dry finish, and a
            six-week check-in — not because we&apos;re generous, but because
            grow-out is where color lives or dies.
          </p>
        ) : null}
      </Reveal>
    </section>
  );
}
