import Link from "next/link";
import { BookButton } from "@/components/Booking";
import { HeroPipeline } from "@/components/HeroPipeline";
import { BlurText, HeroBackdrop, Reveal } from "@/components/motion";
import RotatingText from "@/components/reactbits/RotatingText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { CtaBand, Eyebrow, Faq, ShinyBadge, StatsBand, ToolMarquee } from "@/components/Sections";
import { Timeline } from "@/components/Timeline";
import { RoiCalculator } from "@/components/widgets/RoiCalculator";
import { verticals } from "@/lib/site";

const debts = [
  { title: "Copy-pasting between portals and spreadsheets", cost: "Hours of re-keying the same figures" },
  { title: "Reading PDFs line by line", cost: "Skilled staff doing clerical work" },
  { title: "Matching registers by eye", cost: "Errors that surface at filing time" },
  { title: "Compliance grunt work under deadline", cost: "Late nights every month-end" },
];

const startSteps = [
  {
    title: "Discovery audit",
    time: "15 minutes",
    body: "You share your screen and walk us through the workflow as it runs today. We isolate the exact data-entry or compliance bottleneck.",
  },
  {
    title: "Free prototype",
    time: "5–10 sample files",
    body: "Send a handful of anonymized documents. We build a working extraction and validation script on your actual format.",
  },
  {
    title: "Scope and lock",
    time: "Fixed deliverables",
    body: "You see the prototype run on your documents. We lock a fixed scope and the 14-day sprint begins.",
  },
];

const deliverables = [
  {
    title: "A pipeline on your stack",
    body: "Wired into Tally, your ERP or the spreadsheet you already use, not a new tool your team has to learn.",
  },
  {
    title: "An exception review screen",
    body: "One place where your staff approve or correct the items the pipeline flags. Humans keep the final say.",
  },
  {
    title: "Deterministic checks",
    body: "GSTIN and PAN checksums, ISO 6346 container digits, TDS split math, 3-way audits. Rules, not guesses.",
  },
  {
    title: "Exports in your format",
    body: "Tally XML, ERP-ready CSV or Excel. Whatever your system imports in one click.",
  },
  {
    title: "Operator training",
    body: "A 15-minute session on handover day, after 50 live documents have been processed alongside your team.",
  },
  {
    title: "Ownership, no seat fees",
    body: "A fixed-scope build that is yours. Add ten more staff and the bill does not change.",
  },
];

const faqs = [
  {
    q: "Do we have to replace Tally or our ERP?",
    a: "No. The pipeline is built around what you already run. It reads your documents, applies the checks, and exports in the format your existing system imports.",
  },
  {
    q: "How is this different from buying a SaaS tool?",
    a: "A SaaS product gives everyone the same workflow and charges per seat, every month. We build one pipeline around your documents and your rules, for a fixed scope, with no per-seat fees.",
  },
  {
    q: "What if the extraction gets something wrong?",
    a: "Extraction is tuned on your own samples until field accuracy passes 95% before go-live. After that, hard checks such as checksums and cross-document audits catch what doesn't add up and route it to a person on the review screen. Nothing uncertain is pushed through silently.",
  },
  {
    q: "What do you need from us to start?",
    a: "A 15-minute screen-share of the current process and 5 to 10 anonymized sample documents for the free prototype. For the full build we collect 20 to 30 real samples and the exact output you want.",
  },
  {
    q: "What happens after the 14 days?",
    a: "The pipeline is handed over and your team runs it. If you want us to keep watching for format changes and maintain it, that is available as an ongoing support retainer.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <HeroBackdrop />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_1fr] lg:pb-28 lg:pt-24">
          <div>
            <ShinyBadge>Operational engineering studio</ShinyBadge>
            <BlurText
              text="We Eliminate Operational Debt for High-Volume Businesses."
              accent={["Operational", "Debt"]}
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-[3.5rem]"
            />
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-semibold text-slate-700 sm:text-xl">
              <span>No more</span>
              <RotatingText
                texts={[
                  "copy-pasting between portals",
                  "reading PDFs line by line",
                  "matching registers by eye",
                  "month-end grunt work",
                ]}
                mainClassName="overflow-hidden rounded-lg bg-indigo-600 px-3 py-1.5 text-white"
                splitLevelClassName="overflow-hidden"
                staggerDuration={0.012}
                rotationInterval={2600}
              />
            </div>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600">
              Custom automation pipelines for the{" "}
              <span className="hl-red">manual document work</span> slowing your
              team down. Built on your existing ERP, Tally or spreadsheets, and{" "}
              <span className="hl-green">live in 14 days</span>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookButton topic="Book a 15-minute discovery audit">
                Book a 15-min audit
              </BookButton>
              <a
                href="#verticals"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-[0.95rem] font-semibold text-slate-800 transition hover:border-slate-400"
              >
                Find your workflow
                <span aria-hidden>↓</span>
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-emerald-700">
              {["Free prototype on your documents", "Fixed scope", "No per-seat fees"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-emerald-600 text-[11px] text-white" aria-hidden>
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-2 sm:px-6 lg:px-0">
            <HeroPipeline />
          </div>
        </div>
      </section>

      <ToolMarquee />

      <StatsBand
        stats={[
          { to: 14, label: "days from your samples to handover" },
          { to: 95, suffix: "%+", label: "field accuracy before go-live" },
          { to: 90, suffix: "%", label: "of routine documents cleared without a human", tone: "green" },
          { to: 0, prefix: "₹", label: "recurring per-seat fees", tone: "green" },
        ]}
      />

      {/* Problem */}
      <section className="relative">
        <div className="bg-grid">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-[1fr_1.15fr] md:items-center">
            <Reveal>
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
                You don&apos;t need another SaaS subscription.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-600">
                You need the <span className="hl-red">manual work gone</span>.
                Operational debt is every hour skilled people spend doing what a
                pipeline should.
              </p>
              <p className="mt-6 inline-flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 font-bold text-emerald-800">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-600 text-xs text-white" aria-hidden>
                  ✓
                </span>
                A pipeline clears about 90%. Your team reviews the rest.
              </p>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {debts.map((d, i) => (
                <li key={d.title}>
                  <Reveal delay={i * 80} className="h-full">
                    <div className="group h-full rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg">
                      <span className="grid size-7 place-items-center rounded-full bg-rose-600 text-sm font-bold text-white" aria-hidden>
                        ✕
                      </span>
                      <p className="mt-2 font-bold text-slate-800 decoration-rose-400 decoration-2 group-hover:line-through">
                        {d.title}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-rose-700">{d.cost}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Routing cards */}
      <section id="verticals" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <Eyebrow>Pick your vertical</Eyebrow>
          <h2 className="mt-2 max-w-xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Three workflows we&apos;ve productized.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {verticals.map((v, i) => (
            <Reveal key={v.href} delay={i * 100} className="h-full">
              <SpotlightCard
                theme="light"
                spotlightColor="#6366f1"
                intensity={0.22}
                className="group h-full !rounded-2xl !p-0 transition-transform duration-300 hover:-translate-y-1"
              >
                <Link href={v.href} scroll={false} className="flex h-full flex-col p-7">
                  <span className="font-mono text-xs text-slate-500">
                    lambtech.in{v.href}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{v.title}</h3>
                  <p className="mt-2.5 flex-1 leading-relaxed text-slate-600">
                    {v.blurb}
                  </p>
                  <div className="mt-7 flex items-end justify-between border-t border-slate-100 pt-5">
                    <div>
                      <div className="font-mono text-2xl font-bold">{v.stat}</div>
                      <div className="text-xs text-slate-600">{v.statLabel}</div>
                    </div>
                    <span
                      aria-hidden
                      className="grid size-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition-all group-hover:translate-x-1 group-hover:bg-indigo-600 group-hover:text-white"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ROI calculator */}
      <section className="px-5">
        <Reveal>
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-slate-900 text-slate-100 shadow-2xl shadow-slate-900/20">
            <div className="bg-grid-dark p-6 sm:p-10">
              <Eyebrow dark>Operational debt calculator</Eyebrow>
              <h2 className="mt-2 max-w-xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                What is the manual work costing you?
              </h2>
              <div className="mt-10">
                <RoiCalculator />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 14-day guarantee */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <Eyebrow>The 14-day guarantee</Eyebrow>
          <h2 className="mt-2 max-w-xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            From your sample documents to a live pipeline in two weeks.
          </h2>
        </Reveal>
        <Reveal className="mt-10">
          <Timeline />
        </Reveal>
      </section>

      {/* How we start */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <Eyebrow>Before you commit to anything</Eyebrow>
            <h2 className="mt-2 max-w-xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              See it work on your own documents first.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {startSteps.map((s, i) => (
              <li key={s.title} className="relative">
                <Reveal delay={i * 120} className="h-full">
                  <div className="h-full rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl bg-indigo-600 font-mono text-lg font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 font-mono text-xs text-indigo-700">
                        {s.time}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                </Reveal>
                {i < startSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-2xl text-slate-400 md:block"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Deliverables */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <Eyebrow>What you own on day 14</Eyebrow>
          <h2 className="mt-2 max-w-xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            A finished system, not a login.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 90} className="h-full">
              <SpotlightCard
                theme="light"
                spotlightColor="#6366f1"
                intensity={0.18}
                className="h-full !rounded-2xl !p-6"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-slate-900 font-mono text-sm font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{d.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1.6fr]">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Asked before every build.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Something else on your mind? Bring it to the audit call.
            </p>
          </Reveal>
          <Reveal>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Show us the workflow. We'll show you the prototype."
        body="A 15-minute screen-share is enough for us to find the bottleneck. Send 5 sample documents and we'll build a working demo on your own format, free."
        topic="Book a 15-minute discovery audit"
        button="Book a 15-min audit"
      />
    </>
  );
}
