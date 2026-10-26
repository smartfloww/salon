"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { publicAssetPath } from "@/lib/site";
import type { GalleryItem } from "@/lib/gallery";
import { useFocusTrap } from "./use-focus-trap";

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useFocusTrap(rootRef, true);
  const item = items[index];
  const total = items.length;

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      restoreRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
      if (e.key === "ArrowRight") onNavigate((index + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Portfolio photo — ${item.title}`}
      className="page-enter fixed inset-0 z-[90] flex flex-col bg-night/97 text-porcelain backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top bar */}
      <div className="shell flex h-16 shrink-0 items-center justify-between border-b border-porcelain/15">
        <p className="eyebrow text-brass">Marahuyo — Portfolio</p>
        <div className="flex items-center gap-6">
          <p className="tabular-nums text-[11px] tracking-[0.2em] text-porcelain/80">
            {index + 1} / {total}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="inline-flex size-11 items-center justify-center border border-porcelain/25 text-porcelain/80 transition-colors hover:border-brass hover:text-brass"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Photo */}
      <div className="shell flex flex-1 items-center justify-center py-6">
        <figure key={item.id} className="page-enter w-full max-w-[min(90vw,540px)]">
          <div className="relative mx-auto aspect-square w-full overflow-hidden bg-espresso">
            <Image
              src={publicAssetPath(item.src)}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 540px, 90vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4 text-center">
            <p className="font-serif text-lg italic text-porcelain">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-porcelain/75">{item.caption}</p>
          </figcaption>
        </figure>
      </div>

      {/* Controls */}
      <div className="shell flex shrink-0 items-center justify-between gap-4 border-t border-porcelain/15 py-5">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + total) % total)}
          aria-label="Previous photo"
          className="inline-flex size-12 items-center justify-center border border-porcelain/25 text-porcelain/80 transition-colors hover:border-brass hover:text-brass"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <p className="hidden text-[11px] uppercase tracking-[0.28em] text-porcelain/70 sm:block">
          {item.category} — use ← → keys
        </p>
        <button
          type="button"
          onClick={() => onNavigate((index + 1) % total)}
          aria-label="Next photo"
          className={cn(
            "inline-flex size-12 items-center justify-center border border-porcelain/25 text-porcelain/80 transition-colors hover:border-brass hover:text-brass"
          )}
        >
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
