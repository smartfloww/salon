"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "../Reveal";
import { Photo } from "../ui";
import { GALLERY, GALLERY_FILTERS, type GalleryCategory } from "@/lib/gallery";
import { Lightbox } from "../Lightbox";

export function GalleryPage() {
  const [filter, setFilter] = useState<(typeof GALLERY_FILTERS)[number]>("All");
  const [openAt, setOpenAt] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter]
  );

  return (
    <>
      <header className="shell pt-28 pb-10 lg:pt-40 lg:pb-14">
        <p className="eyebrow text-copper">Portfolio</p>
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.5rem,7vw,4.8rem)] leading-[1.02] tracking-[-0.015em]">
          Selected work.
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          Ten frames from the chair — color, cuts, styling, rituals, occasions.
          Unretouched, shot in the atelier between appointments.
        </p>

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter portfolio by discipline"
          className="mt-10 flex flex-wrap gap-2.5"
        >
          {GALLERY_FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(f);
                  setOpenAt(null);
                }}
                className={cn(
                  "h-10 border px-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors",
                  active
                    ? "border-ink bg-ink text-porcelain"
                    : "border-ink/25 text-ink-soft hover:border-ink hover:text-ink"
                )}
              >
                {f}
                <span className={cn("ml-2 tabular-nums", active ? "text-brass" : "text-ink-soft/60")}>
                  {f === "All" ? GALLERY.length : GALLERY.filter((g) => g.category === f).length}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Grid */}
      <section aria-label="Portfolio gallery" className="shell pb-20 lg:pb-28">
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 md:grid-cols-3 lg:gap-y-12">
            {items.map((g, i) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => setOpenAt(i)}
                  aria-label={`Open photo — ${g.title}`}
                  className="group block w-full text-left outline-offset-4"
                >
                  <Photo
                    src={g.src}
                    alt={g.alt}
                    ratio="aspect-square"
                    sizes="(min-width: 768px) 30vw, 46vw"
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <p className="mt-3 flex items-baseline justify-between gap-3 sm:mt-4">
                    <span className="font-serif text-[15px] italic text-ink group-hover:text-copper sm:text-base">
                      {g.title}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft">
                      {g.category}
                    </span>
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-16 border-t border-ink/15 pt-6 text-center text-[13px] leading-relaxed text-ink-soft">
          Every frame is in-house work — no stock, no borrow. Follow the daily
          chair on Instagram&nbsp;
          <a
            href="https://instagram.com/marahuyo.qc"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-copper underline-offset-4 hover:underline"
          >
            @marahuyo.qc
          </a>
          .
        </p>
      </section>

      {openAt !== null && items[openAt] ? (
        <Lightbox
          items={items}
          index={openAt}
          onClose={() => setOpenAt(null)}
          onNavigate={(n) => setOpenAt(n)}
        />
      ) : null}
    </>
  );
}
