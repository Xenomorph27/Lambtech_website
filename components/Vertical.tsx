import type { ReactNode } from "react";
import { BookButton } from "./Booking";
import { BlurText, HeroBackdrop, Reveal } from "./motion";
import SpotlightCard from "./reactbits/SpotlightCard";
import { CtaBand, Eyebrow, Faq, ShinyBadge, StatsBand } from "./Sections";

export type VerticalContent = {
  eyebrow: string;
  headline: string;
  accent: string[];
  sub: string;
  before: string;
  after: string;
  cta: string;
  doc: {
    name: string;
    rows: { label: string; value: string; flag?: boolean }[];
    chips: { text: string; ok: boolean }[];
  };
  stats: { to: number; prefix?: string; suffix?: string; label: string; tone?: "green" | "red" }[];
  widgetTitle: string;
  widgetSub: string;
  flow: { title: string; body: string }[];
  checks: { title: string; body: string }[];
  comparison: { metric: string; manual: string; automated: string }[];
  faq: { q: string; a: string }[];
  closing: string;
};

/** A sample source document being scanned, with the checks it triggers. */
function DocCard({ doc }: { doc: VerticalContent["doc"] }) {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="relative -rotate-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
          <span className="truncate font-mono text-xs text-slate-600">{doc.name}</span>
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-indigo-700">
            <span className="pulse-dot size-1.5 rounded-full bg-indigo-500" />
            parsing
          </span>
        </div>
        <dl className="relative divide-y divide-slate-100 px-5">
          <div className="scan-line" aria-hidden />
          {doc.rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-sm text-slate-500">{r.label}</dt>
              <dd
                className={`rounded px-1.5 text-right font-mono text-sm font-semibold ${
                  r.flag ? "bg-rose-50 text-rose-700" : "bg-indigo-50/70 text-slate-900"
                }`}
              >
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {doc.chips.map((c, i) => (
          <li
            key={c.text}
            className={`pop-in inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 font-mono text-xs font-semibold shadow-sm ${
              c.ok ? "border-emerald-200 text-emerald-800" : "border-rose-200 text-rose-700"
            }`}
            style={{ animationDelay: `${0.9 + i * 0.25}s` }}
          >
            <span aria-hidden>{c.ok ? "✓" : "✕"}</span>
            {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VerticalPage({
  content: c,
  widget,
}: {
  content: VerticalContent;
  widget: ReactNode;
}) {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <HeroBackdrop />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.15fr_1fr] lg:pb-24 lg:pt-20">
          <div>
            <ShinyBadge>{c.eyebrow}</ShinyBadge>
            <BlurText
              text={c.headline}
              accent={c.accent}
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-[3.25rem]"
            />
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600">
              {c.sub}
            </p>
            <dl className="mt-6 max-w-xl space-y-2 text-[0.95rem]">
              <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                <dt className="shrink-0 rounded bg-rose-600 px-2 py-0.5 font-mono text-xs font-bold uppercase text-white">
                  Today
                </dt>
                <dd className="font-semibold text-rose-800">{c.before}</dd>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3">
                <dt className="shrink-0 rounded bg-emerald-600 px-2 py-0.5 font-mono text-xs font-bold uppercase text-white">
                  After
                </dt>
                <dd className="font-semibold text-emerald-800">{c.after}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookButton topic={c.cta}>{c.cta}</BookButton>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-[0.95rem] font-semibold text-slate-800 transition hover:border-slate-400"
              >
                Try the live demo <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
          <DocCard doc={c.doc} />
        </div>
      </section>

      <StatsBand stats={c.stats} />

      {/* Widget */}
      <section id="demo" className="px-5 py-24">
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <Eyebrow>Live demo</Eyebrow>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Try it before you talk to us.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-3xl bg-slate-900 text-slate-100 shadow-2xl shadow-slate-900/20">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-800 px-6 py-5 sm:px-8">
              <div>
                <h3 className="text-xl font-bold text-white">{c.widgetTitle}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.widgetSub}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 font-mono text-xs text-slate-400">
                <span className="pulse-dot size-1.5 rounded-full bg-emerald-400" />
                interactive · sample data
              </span>
            </div>
            <div className="p-6 sm:p-8">{widget}</div>
          </div>
        </Reveal>
      </section>

      {/* Flow */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <Eyebrow>The pipeline</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            How it runs, start to finish
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {c.flow.map((f, i) => (
            <li key={f.title} className="relative">
              <Reveal delay={i * 100} className="h-full">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                  <span className="grid size-11 place-items-center rounded-xl bg-indigo-600 font-mono text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{f.body}</p>
                </div>
              </Reveal>
              {i < c.flow.length - 1 && (
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
      </section>

      {/* Checks */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <Eyebrow>Built-in checks</Eyebrow>
            <h2 className="mt-2 max-w-xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Rules that run on every document.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.checks.map((k, i) => (
              <Reveal key={k.title} delay={i * 80} className="h-full">
                <SpotlightCard
                  theme="light"
                  spotlightColor="#6366f1"
                  intensity={0.18}
                  className="h-full !rounded-2xl !p-6"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    ✓
                  </span>
                  <h3 className="mt-4 font-bold">{k.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{k.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <Eyebrow>Before and after</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Manual vs. LambTech
          </h2>
        </Reveal>
        <Reveal className="mt-10">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="text-sm">
                  <th scope="col" className="w-[24%] bg-slate-50 px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider text-slate-500">
                    Step
                  </th>
                  <th scope="col" className="w-[38%] bg-rose-50 px-5 py-4 font-semibold text-rose-800">
                    Manual process
                  </th>
                  <th scope="col" className="w-[38%] bg-emerald-700 px-5 py-4 font-semibold text-white">
                    LambTech pipeline
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.comparison.map((row) => (
                  <tr key={row.metric} className="group border-t border-slate-200 align-top transition-colors hover:bg-slate-50">
                    <th scope="row" className="px-5 py-4 font-bold">
                      {row.metric}
                    </th>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="mr-2 font-bold text-rose-600" aria-hidden>
                        ✕
                      </span>
                      {row.manual}
                    </td>
                    <td className="bg-emerald-50 px-5 py-4 font-medium text-emerald-950 group-hover:bg-emerald-100">
                      <span className="mr-2 font-bold text-emerald-700" aria-hidden>
                        ✓
                      </span>
                      {row.automated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1.6fr]">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              What teams ask first.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Built and handed over in 14 days, on a fixed scope.
            </p>
            <BookButton topic={c.cta} variant="dark" className="mt-6">
              Ask us directly
            </BookButton>
          </Reveal>
          <Reveal>
            <Faq items={c.faq} />
          </Reveal>
        </div>
      </section>

      <CtaBand title={c.cta} body={c.closing} topic={c.cta} button="Get started" />
    </>
  );
}
