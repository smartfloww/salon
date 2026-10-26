"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV, type RouteId } from "./routes";
import { Mark } from "./ui";
import { useFocusTrap } from "./use-focus-trap";
import { site } from "@/lib/site";

export function Header({ route }: { route: RouteId }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menuRef, open);

  /* Close the menu on navigation (hashchange) — covers links, back button, and edge cases. */
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* Lock body scroll while the overlay is open. */
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  /* Escape closes the overlay. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = NAV.filter((n) => n.id !== "home");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-porcelain/90 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between gap-6 lg:h-[76px]">
          {/* Wordmark */}
          <a href="#/" className="group flex items-center gap-3" aria-label="Marahuyo — home">
            <span className="text-ink transition-colors group-hover:text-copper">
              <Mark className="h-6 w-9" />
            </span>
            <span className="leading-none">
              <span className="wordmark block text-[15px] text-ink lg:text-base">MARAHUYO</span>
              <span className="mt-1 hidden text-[8.5px] font-medium uppercase tracking-[0.34em] text-ink-soft sm:block">
                Hair &amp; Beauty Atelier
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {links.map((n) => {
              const active = route === n.id;
              return (
                <a
                  key={n.id}
                  href={n.hash}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors",
                    active ? "text-copper" : "text-ink/65 hover:text-ink"
                  )}
                >
                  {n.label}
                  {active ? (
                    <span aria-hidden className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-copper" />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#/visit"
              className="hidden h-11 items-center bg-ink px-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-porcelain transition-colors hover:bg-copper-deep sm:inline-flex"
            >
              Book a Visit
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center text-ink lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {open ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="page-enter fixed inset-0 z-[80] flex flex-col bg-porcelain lg:hidden"
        >
          <div className="shell flex h-16 items-center justify-between border-b border-ink/10">
            <span className="flex items-center gap-3">
              <span className="text-ink">
                <Mark className="h-6 w-9" />
              </span>
              <span className="wordmark text-[15px] text-ink">MARAHUYO</span>
            </span>
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center text-ink"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Primary mobile" className="shell flex flex-1 flex-col justify-center">
            <ul className="space-y-1">
              {NAV.map((n, i) => {
                const active = route === n.id;
                return (
                  <li key={n.id} className="border-t border-ink/10">
                    <a
                      href={n.hash}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-baseline gap-4 py-4 font-serif text-[clamp(1.6rem,7.5vw,2.4rem)] leading-none transition-colors",
                        active ? "text-copper" : "text-ink hover:text-copper"
                      )}
                    >
                      <span className="w-8 text-[10px] font-medium tracking-[0.2em] text-ink-soft">
                        0{i + 1}
                      </span>
                      {n.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shell border-t border-ink/10 py-6">
            <p className="eyebrow text-ink-soft">Open today by appointment</p>
            <a
              href={site.mobile.href}
              className="mt-3 inline-flex items-center gap-2.5 text-sm font-medium text-ink"
            >
              <Phone className="size-4 text-copper" aria-hidden />
              {site.mobile.display}
            </a>
            <p className="mt-1 text-xs text-ink-soft">{site.address.line2}, {site.address.city}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
