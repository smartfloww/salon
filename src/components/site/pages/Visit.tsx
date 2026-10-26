"use client";

import { useSyncExternalStore } from "react";
import { MessageCircle, Phone, Mail, Instagram, MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "../Reveal";
import { ArrowLink } from "../ui";
import { BookingForm } from "../BookingForm";
import { HOURS_DISPLAY, hoursLabel, mapsUrl, osmEmbedUrl, osmPermalinkUrl, directionsUrl, site } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "You request",
    body: "The form below — or a message, or a call. Whatever's easiest.",
  },
  {
    n: "02",
    title: "We confirm",
    body: "A real person from the front desk replies, usually within a couple of hours during salon hours.",
  },
  {
    n: "03",
    title: "You come in",
    body: "Tea while you wait, if you're early. The chair is yours for the whole booking.",
  },
];

const noOpSubscribe = () => () => {};

export function VisitPage() {
  // Client-only value (server snapshot: null) — avoids hydration mismatch.
  const todayDow = useSyncExternalStore(
    noOpSubscribe,
    () => new Date().getDay(),
    () => null
  );

  return (
    <>
      {/* ── Head ── */}
      <header className="shell pt-28 pb-12 lg:pt-40 lg:pb-16">
        <p className="eyebrow text-copper">Book &amp; Visit</p>
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.5rem,7vw,4.8rem)] leading-[1.02] tracking-[-0.015em]">
          Two ways to begin<span className="text-copper">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          Send the form below — or message the front desk. Either way, a person
          (never a bot) confirms every booking.{" "}
          <em className="font-serif">
            Sending the form is a request, not a confirmed appointment.
          </em>
        </p>

        {/* Steps */}
        <ol className="mt-12 grid gap-x-10 gap-y-8 border-t border-ink/15 pt-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n}>
              <p className="font-serif text-2xl italic text-copper">{s.n}</p>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink">
                {s.title}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </header>

      {/* ── Form + aside ── */}
      <div className="shell grid gap-10 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-28">
        <Reveal className="lg:col-span-7">
          <BookingForm />
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Find us */}
            <section aria-labelledby="find-us" className="border border-ink/15 bg-linen p-6 sm:p-7">
              <h2 id="find-us" className="eyebrow text-copper">
                Find us
              </h2>
              <address className="mt-4 space-y-1 text-[15px] not-italic leading-relaxed text-ink">
                <span className="block">{site.address.line1}</span>
                <span className="block">{site.address.line2}</span>
                <span className="block">{site.address.city}</span>
              </address>
              <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                <MapPin className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden />
                Along Katipunan Avenue — a short walk from the universities; the
                third floor, follow the brass plate.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 border border-ink/30 px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-porcelain"
                >
                  Get directions
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-copper"
                >
                  Google Maps ↗
                </a>
              </div>
            </section>

            {/* Hours */}
            <section aria-labelledby="hours" className="border border-ink/15 bg-linen p-6 sm:p-7">
              <h2 id="hours" className="eyebrow text-copper">
                Hours
              </h2>
              <ul className="mt-4 divide-y divide-ink/10">
                {HOURS_DISPLAY.map((d) => {
                  const isToday = todayDow === d.dow;
                  return (
                    <li
                      key={d.day}
                      className={cn(
                        "flex items-baseline justify-between gap-4 py-2.5 text-[15px]",
                        isToday && "font-medium"
                      )}
                    >
                      <span className="flex items-baseline gap-2.5 text-ink">
                        {d.day}
                        {isToday ? (
                          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-copper">
                            today
                          </span>
                        ) : null}
                      </span>
                      <span className={d.open ? "tabular-nums text-ink" : "text-copper"}>
                        {d.open ? hoursLabel(d) : "Closed"}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">
                Mondays are reserved for training and deep-cleaning — the
                unglamorous work that makes everything else possible.
              </p>
            </section>

            {/* Contact */}
            <section aria-labelledby="contact" className="border border-ink/15 bg-parchment p-6 sm:p-7">
              <h2 id="contact" className="eyebrow text-copper">
                The front desk
              </h2>
              <ul className="mt-4 space-y-3 text-[15px]">
                <li>
                  <a
                    href={site.mobile.href}
                    className="flex items-center gap-3 text-ink transition-colors hover:text-copper"
                  >
                    <Phone className="size-4 shrink-0 text-copper" aria-hidden />
                    {site.mobile.display}
                    <span className="text-xs text-ink-soft">— mobile &amp; Viber</span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.landline.href}
                    className="flex items-center gap-3 text-ink transition-colors hover:text-copper"
                  >
                    <Phone className="size-4 shrink-0 text-copper" aria-hidden />
                    {site.landline.display}
                    <span className="text-xs text-ink-soft">— landline</span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.email.href}
                    className="flex items-center gap-3 text-ink transition-colors hover:text-copper"
                  >
                    <Mail className="size-4 shrink-0 text-copper" aria-hidden />
                    {site.email.display}
                  </a>
                </li>
                <li>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-ink transition-colors hover:text-copper"
                  >
                    <Instagram className="size-4 shrink-0 text-copper" aria-hidden />
                    @marahuyo.qc
                    <span className="text-xs text-ink-soft">— the daily chair</span>
                  </a>
                </li>
              </ul>
              <a
                href={site.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 bg-copper text-[11px] font-semibold uppercase tracking-[0.24em] text-porcelain transition-colors hover:bg-copper-deep"
              >
                <MessageCircle className="size-4" aria-hidden />
                Book on Messenger
              </a>
              <p className="mt-4 text-[12.5px] leading-relaxed text-ink-soft">
                Walk-ins are welcome whenever the chairs allow — appointments,
                adored.
              </p>
            </section>
          </div>
        </Reveal>
      </div>

      {/* ── Map ── */}
      <section aria-labelledby="map-title" className="border-t border-ink/15">
        <div className="shell py-10 lg:py-14">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <div>
              <p className="eyebrow text-copper" id="map-title">
                Katipunan Avenue · Loyola Heights
              </p>
              <h2 className="mt-3 font-serif text-2xl text-ink lg:text-3xl">
                The third floor of Casa Aurora<span className="text-copper">.</span>
              </h2>
            </div>
            <ArrowLink href={osmPermalinkUrl} external>
              Open in OpenStreetMap
            </ArrowLink>
          </div>

          <div className="mt-8 border border-ink/15 bg-parchment">
            <iframe
              src={osmEmbedUrl}
              title="Map showing Marahuyo on Katipunan Avenue, Loyola Heights, Quezon City"
              loading="lazy"
              className="block h-[360px] w-full border-0 sm:h-[400px] lg:h-[440px]"
            />
          </div>
          <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[12px] text-ink-soft">
            <span>Map data © OpenStreetMap contributors — zoom, pan, and plan the trip.</span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-copper underline-offset-4 hover:underline"
            >
              Same spot on Google Maps ↗
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
