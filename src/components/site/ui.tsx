import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ── Monogram ──────────────────────────────────────────── */

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 72" aria-hidden className={cn("h-5 w-7", className)}>
      <path
        d="M18 52 C18 36 25 28 33 28 C39 28 42 32 42 40 C42 32 45 28 51 28 C59 28 66 36 66 52"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="74" cy="52" r="3.6" fill="currentColor" />
    </svg>
  );
}

/* ── Section heading ───────────────────────────────────── */

export function SectionHead({
  kicker,
  title,
  aside,
  dark = false,
  className,
}: {
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className={cn(
          "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t pt-4",
          dark ? "border-porcelain/25" : "border-ink/15"
        )}
      >
        <p className={cn("eyebrow", dark ? "text-brass" : "text-copper")}>{kicker}</p>
        {aside ? (
          <p className={cn("text-xs", dark ? "text-porcelain/60" : "text-ink-soft")}>{aside}</p>
        ) : null}
      </div>
      <h2
        className={cn(
          "mt-6 font-serif text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.04] tracking-[-0.01em]",
          dark ? "text-porcelain" : "text-ink"
        )}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── Calls to action ───────────────────────────────────── */

type CtaVariant = "solid" | "outline" | "copper" | "ghost-dark";

const ctaBase =
  "inline-flex h-12 items-center justify-center gap-2.5 px-7 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300";

const ctaVariants: Record<CtaVariant, string> = {
  solid: "bg-ink text-porcelain hover:bg-copper-deep",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-porcelain",
  copper: "bg-copper text-porcelain hover:bg-copper-deep",
  "ghost-dark": "border border-porcelain/30 text-porcelain hover:border-porcelain hover:bg-porcelain hover:text-ink",
};

export function CtaLink({
  href,
  variant = "solid",
  children,
  external,
  className,
  ...rest
}: {
  href: string;
  variant?: CtaVariant;
  children: ReactNode;
  external?: boolean;
  className?: string;
} & Omit<React.ComponentProps<"a">, "href" | "children">) {
  return (
    <a
      href={href}
      className={cn(ctaBase, ctaVariants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export function CtaButton({
  variant = "solid",
  children,
  className,
  ...rest
}: { variant?: CtaVariant; children: ReactNode; className?: string } & React.ComponentProps<"button">) {
  return (
    <button type="submit" className={cn(ctaBase, ctaVariants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/** Quiet inline link with arrow — for "view all →" affordances. */
export function ArrowLink({
  href,
  children,
  external,
  dark,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors",
        dark ? "text-porcelain/80 hover:text-brass" : "text-ink hover:text-copper",
        className
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

/* ── Photography ───────────────────────────────────────── */

export function Photo({
  src,
  alt,
  ratio = "aspect-[4/5]",
  sizes,
  priority,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-parchment", ratio, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}

export function Fig({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-3 font-serif text-sm italic text-ink-soft", className)}>{children}</p>;
}

/* ── Page hero block (shared by inner pages) ───────────── */

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="shell pt-28 pb-10 lg:pt-40 lg:pb-14">
      <p className="eyebrow text-copper">{kicker}</p>
      <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.5rem,7vw,4.8rem)] leading-[1.02] tracking-[-0.015em]">
        {title}
      </h1>
      {children ? (
        <div className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{children}</div>
      ) : null}
    </header>
  );
}
