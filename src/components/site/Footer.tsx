import { HOURS_DISPLAY, hoursLabel, site } from "@/lib/site";
import { NAV } from "./routes";
import { Mark } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-night text-porcelain">
      <div className="shell grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        {/* Brand */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="text-brass">
              <Mark className="h-6 w-9" />
            </span>
            <span className="wordmark text-[15px]">MARAHUYO</span>
          </div>
          <p className="mt-5 max-w-xs font-serif text-[15px] italic leading-relaxed text-porcelain/75">
            “{site.meaning.split("—")[1]?.trim().replace(/\.$/, "")}.”
          </p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-brass">
            Est. {site.founded} · {site.neighborhood}
          </p>
        </div>

        {/* Explore */}
        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="eyebrow text-brass">Explore</p>
          <ul className="mt-5 space-y-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={n.hash}
                  className="text-sm text-porcelain/70 transition-colors hover:text-porcelain"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visit */}
        <div className="lg:col-span-3">
          <p className="eyebrow text-brass">Visit</p>
          <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-porcelain/70">
            <span className="block">{site.address.line1}</span>
            <span className="block">{site.address.line2}</span>
            <span className="block">{site.address.city}</span>
          </address>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <a
                href={site.mobile.href}
                className="text-porcelain/80 transition-colors hover:text-brass"
              >
                {site.mobile.display}
              </a>
              <span className="ml-2 text-xs text-porcelain/40">mobile · Viber</span>
            </li>
            <li>
              <a
                href={site.landline.href}
                className="text-porcelain/80 transition-colors hover:text-brass"
              >
                {site.landline.display}
              </a>
              <span className="ml-2 text-xs text-porcelain/40">landline</span>
            </li>
            <li>
              <a
                href={site.email.href}
                className="text-porcelain/80 transition-colors hover:text-brass"
              >
                {site.email.display}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="lg:col-span-3">
          <p className="eyebrow text-brass">Hours</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {HOURS_DISPLAY.map((d) => (
              <li key={d.day} className="flex items-baseline justify-between gap-4">
                <span className="text-porcelain/70">{d.day}</span>
                <span
                  className={
                    d.open
                      ? "tabular-nums text-porcelain/80"
                      : "text-copper"
                  }
                >
                  {d.open ? hoursLabel(d) : "Closed"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-porcelain/65">
            Mondays are reserved for training and deep-cleaning.
          </p>
          <a
            href={site.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-brass transition-colors hover:text-porcelain"
          >
            Book via Messenger ↗
          </a>
        </div>
      </div>

      <div className="border-t border-porcelain/15">
        <div className="shell flex flex-col gap-2 py-6 text-[11px] uppercase tracking-[0.2em] text-porcelain/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Marahuyo Hair &amp; Beauty Atelier</p>
          <p>Katipunan Avenue · Quezon City</p>
          <p className="normal-case tracking-normal">
            Prices in Philippine pesos · VAT-inclusive
          </p>
        </div>
      </div>
    </footer>
  );
}
