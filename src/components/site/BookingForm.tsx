"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CtaButton } from "./ui";
import { SERVICES, durationText, priceText, serviceById } from "@/lib/catalog";
import {
  BOOKING_MAX_DAYS,
  HOURS,
  bookingMaxDate,
  hoursLabel,
  nowInManila,
  slotsFor,
  todayInManila,
} from "@/lib/site";
import { site } from "@/lib/site";

type FieldName = "service" | "date" | "time" | "name" | "phone" | "email" | "notes";
type Errors = Partial<Record<FieldName | "form", string>>;

const inputCls =
  "h-12 w-full border bg-linen px-4 text-[15px] text-ink transition-colors placeholder:text-ink-soft/60 focus:border-copper";

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function pretty(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
}

function maxDateStr() {
  return bookingMaxDate();
}

/* ── Field wrapper ─────────────────────────────────────── */

function Field({
  label,
  forId,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  forId: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={forId} className="text-[13px] font-semibold tracking-[0.02em] text-ink">
          {label}
          {optional ? (
            <span className="ml-2 text-[11px] font-normal uppercase tracking-[0.18em] text-ink-soft">
              optional
            </span>
          ) : null}
        </label>
      </div>
      <div className="mt-2">{children}</div>
      {error ? (
        <p role="alert" className="mt-2 flex items-start gap-1.5 text-[13px] leading-snug text-clay">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-[12.5px] leading-snug text-ink-soft">{hint}</p>
      ) : null}
    </div>
  );
}

/* ── The form ──────────────────────────────────────────── */

export function BookingForm() {
  const today = todayInManila();
  const [values, setValues] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [summary, setSummary] = useState<{ service: string; date: string; time: string } | null>(null);

  const slots = useMemo(() => (values.date ? slotsFor(values.date) : []), [values.date]);

  const dayInfo = useMemo(() => {
    if (!values.date) return null;
    const [y, m, d] = values.date.split("-").map(Number);
    const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
    return { day: HOURS.find((h) => h.dow === dow)!, dow };
  }, [values.date]);

  const lastSlot = slots.length ? slots[slots.length - 1] : null;

  /* Date bounds are applied imperatively — server/client clocks can disagree
     across timezones, and this keeps hydration clean (no state, no mismatch). */
  const dateInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const el = dateInputRef.current;
    if (!el) return;
    el.min = todayInManila();
    el.max = bookingMaxDate();
  }, []);

  function set<K extends keyof typeof values>(k: K, v: string) {
    setValues((s) => ({ ...s, [k]: v }));
    if (k === "date") {
      // changing the day invalidates a previously chosen time (and its error)
      setValues((s) => ({ ...s, time: "" }));
      setErrors((e) => ({ ...e, [k]: undefined, time: undefined, form: undefined }));
    } else {
      setErrors((e) => ({ ...e, [k]: undefined, form: undefined }));
    }
  }

  function validate(): Errors {
    const e: Errors = {};
    const svc = values.service ? serviceById(values.service) : undefined;
    if (!svc) e.service = "Choose a service — or pick the free consultation if you're unsure.";

    if (!values.date) {
      e.date = "Pick a preferred date.";
    } else {
      const [y, m, d] = values.date.split("-").map(Number);
      const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
      if (dow === 1) {
        e.date = "We're closed on Mondays (training day). Any other day works.";
      } else if (values.date < today) {
        e.date = "That date has already passed — pick one ahead.";
      } else if (values.date > maxDateStr()) {
        e.date = `We take bookings up to ${BOOKING_MAX_DAYS} days ahead. Message us for later dates.`;
      }

      if (values.date && dow !== 1) {
        const valid = slotsFor(values.date);
        if (!values.time) {
          if (!e.date) e.time = "Choose a time — or call us and we'll find one together.";
        } else if (!valid.includes(values.time)) {
          e.time = "That slot isn't open. Pick one from the list.";
        } else if (values.date === today) {
          const nowM = toMinutes(nowInManila());
          if (toMinutes(values.time) < nowM + 120) {
            e.time =
              "Same-day requests need at least two hours' notice — for today, please call or Viber us directly.";
          }
        }
      }
    }

    if (!values.name || values.name.trim().length < 2) e.name = "Your name, as you'd like us to call you.";
    const phone = values.phone.replace(/[\s()-]/g, "");
    if (!/^(\+63|0)9\d{9}$/.test(phone)) {
      e.phone = "A PH mobile number, e.g. 0917 214 8890 — we confirm by SMS or Viber.";
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = "That email doesn't look right — or leave it empty, that's fine too.";
    }
    if (values.notes.length > 600) e.notes = "A little shorter, please — 600 characters max.";
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.values(e).some(Boolean)) {
      document.getElementById("book-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const svc = serviceById(values.service)!;
    setSummary({ service: svc.name, date: values.date, time: values.time });
    setStatus("done");
    document.getElementById("book-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reset() {
    setValues({ service: "", date: "", time: "", name: "", phone: "", email: "", notes: "" });
    setErrors({});
    setStatus("idle");
    setSummary(null);
  }

  /* ── Success state ── */
  if (status === "done" && summary) {
    const [y, m, d] = summary.date.split("-").map(Number);
    const dateLabel = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-PH", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
    return (
      <div id="book-form" className="border border-copper/40 bg-linen p-6 sm:p-10" role="status">
        <CheckCircle2 className="size-9 text-copper" aria-hidden />
        <h3 className="mt-5 font-serif text-3xl leading-tight text-ink">
          Demo booking complete<span className="text-copper">.</span>
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          This is a local preview only. No appointment request was sent or saved.
        </p>

        <dl className="mt-7 space-y-3 border-t border-ink/15 pt-6 text-[15px]">
          <div className="flex gap-4">
            <dt className="w-24 shrink-0 text-[11px] uppercase tracking-[0.2em] text-ink-soft">Service</dt>
            <dd className="text-ink">{summary.service}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-24 shrink-0 text-[11px] uppercase tracking-[0.2em] text-ink-soft">Preferred</dt>
            <dd className="text-ink">
              {dateLabel} · {pretty(summary.time)}
            </dd>
          </div>
        </dl>

        <p className="mt-7 max-w-lg border-l-2 border-copper pl-5 text-[15px] leading-relaxed text-ink-soft">
          To make a real appointment, contact the salon directly using the
          Messenger link below.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CtaButton type="button" variant="outline" onClick={reset}>
            Make another request
          </CtaButton>
          <a
            href={site.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-copper transition-colors hover:text-copper-deep"
          >
            <MessageCircle className="size-4" aria-hidden />
            Continue on Messenger
          </a>
        </div>
      </div>
    );
  }

  /* ── Form state ── */
  const dayHoursHint = dayInfo
    ? dayInfo.day.open
      ? `${dayInfo.day.day}s · ${hoursLabel(dayInfo.day)} · last slot ${pretty(lastSlot ?? dayInfo.day.close!)}`
      : null
    : "Pick a date and the open times appear here.";

  return (
    <form
      id="book-form"
      onSubmit={onSubmit}
      noValidate
      className="border border-ink/15 bg-linen p-6 sm:p-10"
    >
      <h3 className="font-serif text-2xl text-ink">
        Request an appointment<span className="text-copper">.</span>
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
        Choose a service and preferred time to preview the booking confirmation.
        This demo does not send or save your details.
      </p>

      {errors.form ? (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2 border border-clay/40 bg-clay/5 p-4 text-[13.5px] leading-snug text-clay"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {errors.form}
        </p>
      ) : null}

      {/* 01 — Service */}
      <fieldset className="mt-9 border-t border-ink/15 pt-7">
        <legend className="eyebrow px-0 text-copper">01 — The Service</legend>
        <div className="mt-5 space-y-6">
          <Field forId="bf-service" label="What are you coming in for?" error={errors.service}>
            <div className="relative">
              <select
                id="bf-service"
                name="service"
                required
                value={values.service}
                onChange={(e) => set("service", e.target.value)}
                aria-invalid={!!errors.service}
                className={cn(inputCls, "appearance-none pr-11", errors.service ? "border-clay" : "border-ink/25")}
              >
                <option value="" disabled>
                  Choose a service…
                </option>
                {["consult", "cut", "color", "rituals", "styling", "additions"].map((cat) => {
                  const group = SERVICES.filter((s) => s.category === cat);
                  return (
                    <optgroup
                      key={cat}
                      label={
                        cat === "consult"
                          ? "Begin here — free"
                          : cat === "rituals"
                            ? "Treatments & Rituals"
                            : cat === "additions"
                              ? "The Beauty Bar"
                              : cat === "styling"
                                ? "Styling & Occasions"
                                : cat === "cut"
                                  ? "Cut & Shape"
                                  : "Color"
                      }
                    >
                      {group.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {priceText(s.price)} · {durationText(s.duration)}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft"
              />
            </div>
          </Field>
        </div>
      </fieldset>

      {/* 02 — Date & time */}
      <fieldset className="mt-9 border-t border-ink/15 pt-7">
        <legend className="eyebrow px-0 text-copper">02 — When</legend>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <Field forId="bf-date" label="Preferred date" error={errors.date} hint={dayHoursHint}>
            <input
              ref={dateInputRef}
              id="bf-date"
              name="date"
              type="date"
              required
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
              aria-invalid={!!errors.date}
              className={cn(inputCls, "border-ink/25", errors.date && "border-clay")}
            />
          </Field>
          <Field
            forId="bf-time"
            label="Preferred time"
            error={errors.time}
            hint={values.date ? "Slots every 30 minutes — final time confirmed by the front desk." : "Choose a date first."}
          >
            <div className="relative">
              <select
                id="bf-time"
                name="time"
                required
                disabled={!values.date || !slots.length}
                value={values.time}
                onChange={(e) => set("time", e.target.value)}
                aria-invalid={!!errors.time}
                className={cn(
                  inputCls,
                  "appearance-none pr-11 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.time ? "border-clay" : "border-ink/25"
                )}
              >
                <option value="" disabled>
                  {values.date ? (slots.length ? "Choose a time…" : "No slots that day") : "Choose a date first"}
                </option>
                {slots.map((s) => (
                  <option key={s} value={s}>
                    {pretty(s)}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft"
              />
            </div>
          </Field>
        </div>
      </fieldset>

      {/* 03 — Guest */}
      <fieldset className="mt-9 border-t border-ink/15 pt-7">
        <legend className="eyebrow px-0 text-copper">03 — You</legend>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <Field forId="bf-name" label="Name" error={errors.name}>
            <input
              id="bf-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="How should the chair know you?"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={!!errors.name}
              className={cn(inputCls, "border-ink/25", errors.name && "border-clay")}
            />
          </Field>
          <Field forId="bf-phone" label="Mobile" error={errors.phone}>
            <input
              id="bf-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="0917 214 8890"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              className={cn(inputCls, "border-ink/25", errors.phone && "border-clay")}
            />
          </Field>
          <Field forId="bf-email" label="Email" optional error={errors.email}>
            <input
              id="bf-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@somewhere.ph"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email}
              className={cn(inputCls, "border-ink/25", errors.email && "border-clay")}
            />
          </Field>
        </div>
      </fieldset>

      {/* 04 — Notes */}
      <fieldset className="mt-9 border-t border-ink/15 pt-7">
        <legend className="eyebrow px-0 text-copper">04 — Anything else</legend>
        <div className="mt-5">
          <Field
            forId="bf-notes"
            label="Notes for your stylist"
            optional
            error={errors.notes}
            hint="Hair history, allergies, the wedding date, a photo you can't stop thinking about."
          >
            <textarea
              id="bf-notes"
              name="notes"
              rows={4}
              maxLength={600}
              placeholder="Tell us where your hair has been…"
              value={values.notes}
              onChange={(e) => set("notes", e.target.value)}
              aria-invalid={!!errors.notes}
              className={cn(
                "w-full border bg-linen p-4 text-[15px] leading-relaxed text-ink transition-colors placeholder:text-ink-soft/60 focus:border-copper",
                errors.notes ? "border-clay" : "border-ink/25"
              )}
            />
          </Field>
        </div>
      </fieldset>

      <div className="mt-10 border-t border-ink/15 pt-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <CtaButton variant="solid" className="w-full sm:w-auto">
            Preview booking
          </CtaButton>
          <p className="text-[12.5px] leading-snug text-ink-soft sm:max-w-[16rem]">
            Prefer a person? Message the front desk on{" "}
            <a
              href={site.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-copper underline-offset-4 hover:underline"
            >
              Messenger
            </a>{" "}
            or call {site.landline.display}.
          </p>
        </div>
      </div>
    </form>
  );
}
