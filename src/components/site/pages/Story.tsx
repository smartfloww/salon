import { Reveal } from "../Reveal";
import { ArrowLink, Fig, Photo, SectionHead } from "../ui";

const TEAM = [
  {
    img: "/images/founder-kat.jpg",
    alt: "Katrina Villanueva, founder, in a copper silk shirt in the bright atelier",
    name: "Katrina “Kat” Villanueva",
    role: "Founder · Creative Director",
    line: "Corrects color gently and tells you the truth first.",
  },
  {
    img: "/images/team-paolo.jpg",
    alt: "Paolo Mendoza, senior stylist, in a black apron over an ecru shirt",
    name: "Paolo Mendoza",
    role: "Senior Stylist · Cuts",
    line: "Cuts dry, in response to the wave. The bob people stop you about is usually his.",
  },
  {
    img: "/images/team-mika.jpg",
    alt: "Mika Dela Cruz, color lead, in a terracotta work shirt and black apron",
    name: "Mika Dela Cruz",
    role: "Color Lead · Training",
    line: "Hand-paints color that grows out without a line — then wrote the program that teaches it.",
  },
  {
    img: "/images/team-jaz.jpg",
    alt: "Jasmine Reyes, rituals lead, in an ivory tunic before the backwash lounge",
    name: "Jasmine “Jaz” Reyes",
    role: "Rituals · Treatments Lead",
    line: "Reads scalps like handwriting. The reason Mondays smell like eucalyptus.",
  },
];

const RULES = [
  {
    n: "I",
    title: "Honesty first",
    body: "We will talk you out of a service your hair doesn't need — loudly, and before you've sat down. A sale you regret is a guest we never see again.",
  },
  {
    n: "II",
    title: "The chair is yours",
    body: "Unhurried appointments, one guest per stylist at a time. We never double-book color, and nobody is rushed off the schedule.",
  },
  {
    n: "III",
    title: "Craft is a practice",
    body: "Mondays are closed on purpose: training, deep-cleaning, and the unglamorous work that makes everything else possible.",
  },
  {
    n: "IV",
    title: "Home, not a transaction",
    body: "Quezon City is our city. Beauty here shouldn't feel like an errand you fly somewhere else for — it should feel like coming home with better hair.",
  },
];

const MILESTONES = [
  {
    year: "2017",
    text: "Three chairs on the second floor of a bakery on Katipunan. The bread smelled incredible; the mirrors were borrowed.",
  },
  {
    year: "2019",
    text: "Third floor of Casa Aurora — six stations, two backwash lounges, and the afternoon light we can't take credit for.",
  },
  {
    year: "2022",
    text: "The color bar rebuilt around Mika's in-house training program. Every colorist at Marahuyo paints the same way — deliberately.",
  },
];

export function StoryPage() {
  return (
    <>
      {/* ── Head ── */}
      <header className="shell pt-28 pb-12 lg:pt-40 lg:pb-16">
        <p className="eyebrow text-copper">Our Story</p>
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.5rem,7vw,4.8rem)] leading-[1.02] tracking-[-0.015em]">
          It started with a word.
        </h1>

        <div className="mt-10 max-w-2xl border-l-2 border-copper pl-6 lg:pl-8">
          <p className="font-serif text-[clamp(1.2rem,2.6vw,1.7rem)] italic leading-relaxed text-ink">
            marahuyo · ma·ra·HU·yo — <span className="text-copper">verb, old Tagalog.</span> To
            be captivated; to be drawn toward something beautiful without quite
            meaning to.
          </p>
        </div>

        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          We chose it because that&apos;s what a good chair does. You don&apos;t
          decide to feel at home in it — you just do. The rest of this page is
          the longer version of that sentence.
        </p>
      </header>

      {/* ── Founder ── */}
      <section aria-labelledby="founder-title" className="border-t border-ink/10 py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Photo
              src="/images/founder-kat.jpg"
              alt="Katrina Villanueva in a copper silk shirt, standing in the bright atelier"
              ratio="aspect-[4/5]"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
            <Fig>Kat, between appointments — the third floor, mid-morning.</Fig>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:pl-6">
            <SectionHead
              kicker="01 — The Founder"
              title={
                <span id="founder-title">
                  Katrina Villanueva<span className="text-copper">.</span>
                </span>
              }
              aside="Founder · Creative Director"
            />
            <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-relaxed text-ink-soft">
              <p>
                Kat spent a decade behind chairs in Singapore and Tokyo before
                coming home to Quezon City in 2016 — with one conviction and a
                notebook full of consultations: Manila clients deserve the same
                standard as any capital, and honesty is the fastest way there.
              </p>
              <p>
                She still takes corrections other salons won&apos;t — box dye,
                bleach burns, the silver transition nobody warned you about. Her
                method hasn&apos;t changed since the bakery: diagnose slowly,
                tell the truth early, and never book more hair than the guest
                has.
              </p>
              <blockquote className="border-l-2 border-copper pl-6 font-serif text-xl italic leading-relaxed text-ink">
                “A consultation is mostly listening. The chair tells you
                everything — you just have to be quiet long enough to hear it.”
              </blockquote>
              <p className="font-serif text-lg italic text-copper">— Kat</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── House rules ── */}
      <section aria-labelledby="rules-title" className="border-t border-ink/10 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHead
              kicker="02 — The House Rules"
              title={<span id="rules-title">Four things we don&apos;t negotiate.</span>}
            />
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:gap-x-16">
            {RULES.map((r, i) => (
              <Reveal key={r.n} delay={i * 70}>
                <div className="border-t border-ink/15 pt-6">
                  <p className="font-serif text-3xl italic text-copper">{r.n}.</p>
                  <h3 className="mt-4 font-serif text-2xl text-ink">{r.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rituals band ── */}
      <section aria-labelledby="rituals-title" className="border-t border-ink/10 bg-parchment py-20 lg:py-28">
        <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7 lg:order-2">
            <SectionHead
              kicker="03 — The Rituals"
              title={
                <span id="rituals-title">
                  Why we close
                  <br />
                  on Mondays.
                </span>
              }
            />
            <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-relaxed text-ink-soft">
              <p>
                Every salon says “training day.” Ours is scheduled like a class:
                the team works on mannequins and each other from nine to noon,
                the backwash lounge gets stripped and rebuilt after, and the
                afternoon belongs to whoever&apos;s behind on the syllabus.
              </p>
              <p>
                Guests sometimes ask to be squeezed in anyway. We say no, kindly,
                and offer Tuesday — because the version of Marahuyo you meet on a
                Tuesday is the one worth coming back for.
              </p>
            </div>
            <div className="mt-8">
              <ArrowLink href="#/services">See the treatment menu</ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:order-1">
            <Photo
              src="/images/interior-backwash.jpg"
              alt="The backwash lounge — cream sinks with brass fixtures, folded ecru towels, amber bottles on travertine"
              ratio="aspect-[4/5]"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
            <Fig>The backwash lounge, set for the afternoon.</Fig>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section aria-labelledby="years-title" className="border-t border-ink/10 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHead
              kicker="04 — In Passing"
              title={<span id="years-title">Eight years, three doors.</span>}
            />
          </Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 lg:mt-16 lg:gap-x-16">
            {MILESTONES.map((m, i) => (
              <li key={m.year}>
                <Reveal delay={i * 70}>
                  <div className="border-t border-ink/15 pt-6">
                    <p className="font-serif text-4xl text-ink">{m.year}</p>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                      {m.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Team ── */}
      <section aria-labelledby="team-title" className="border-t border-ink/10 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHead
              kicker="05 — The Chairs"
              title={<span id="team-title">Four people, one standard.</span>}
              aside="Senior stylists only — no juniors on the floor"
            />
          </Reveal>

          <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 lg:mt-16 lg:grid-cols-4 lg:gap-x-6">
            {TEAM.map((t, i) => (
              <li key={t.name}>
                <Reveal delay={i * 60}>
                  <Photo
                    src={t.img}
                    alt={t.alt}
                    ratio="aspect-[4/5]"
                    sizes="(min-width: 1024px) 22vw, 46vw"
                  />
                  <h3 className="mt-4 font-serif text-xl leading-tight text-ink">{t.name}</h3>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-copper">
                    {t.role}
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">{t.line}</p>
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="mt-16 border-t border-ink/15 pt-8 text-[15px] leading-relaxed text-ink-soft lg:max-w-2xl">
            Senior stylists only, on purpose. Every name above trained for at
            least two years before touching a paying chair — most of them here,
            on Mondays, when the salon is closed and the work is quiet.
          </p>
          <div className="mt-6">
            <ArrowLink href="#/visit">Sit in a chair — book a visit</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
