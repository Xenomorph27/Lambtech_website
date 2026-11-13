"use client";

import { useState, type ReactNode } from "react";
import CountUp from "./reactbits/CountUp";
import DotGrid from "./reactbits/DotGrid";
import LogoLoop from "./reactbits/LogoLoop";
import ShinyText from "./reactbits/ShinyText";
import { BookButton } from "./Booking";
import { Reveal } from "./motion";

/** Small label above a section heading. */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-wider ${dark ? "text-indigo-300" : "text-indigo-700"}`}
    >
      {children}
    </p>
  );
}

/** Pill badge with a moving shine. */
export function ShinyBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-xs shadow-sm">
      <span className="pulse-dot size-1.5 rounded-full bg-emerald-500" />
      <ShinyText text={children} color="#475569" shineColor="#6366f1" speed={3} />
    </span>
  );
}

/** Dark band of headline numbers that count up on scroll. */
export function StatsBand({
  stats,
}: {
  stats: { to: number; prefix?: string; suffix?: string; label: string; tone?: "green" | "red" }[];
}) {
  return (
    <section className="bg-slate-900 text-white">
      <div className="bg-grid-dark">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-14 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-slate-700 pl-5">
              <dd
                className={`font-mono text-4xl font-bold tabular-nums sm:text-5xl ${
                  s.tone === "green" ? "text-emerald-400" : s.tone === "red" ? "text-rose-400" : ""
                }`}
              >
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} duration={1.6} />
              </dd>
              <dt className="mt-2 max-w-[14rem] text-sm leading-snug text-slate-400">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const tools = [
  "Tally Prime",
  "Excel",
  "Google Sheets",
  "Zoho Books",
  "SAP",
  "GST Portal",
  "TRACES",
  "Gmail",
  "Outlook",
  "WhatsApp",
  "Custom ERP",
];

/** Scrolling strip of the tools the pipelines plug into. Drag or hover to slow it. */
export function ToolMarquee() {
  return (
    <section className="border-y border-slate-200 bg-white/80 py-8 backdrop-blur-sm">
      <p className="text-center font-mono text-xs uppercase tracking-wider text-slate-500">
        Plugs into the tools you already run
      </p>
      <div className="mt-6">
        <LogoLoop
          ariaLabel="Tools LambTech pipelines connect to"
          speed={60}
          gap={14}
          logoHeight={40}
          hoverSpeed={15}
          fadeOut={false}
          logos={tools.map((t) => ({
            title: t,
            node: (
              <span className="inline-flex h-10 items-center gap-2.5 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-semibold text-slate-700">
                <span className="size-1.5 rounded-full bg-indigo-500" />
                {t}
              </span>
            ),
          }))}
        />
      </div>
    </section>
  );
}

/** Accordion FAQ. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-bold transition-colors hover:text-indigo-700"
              >
                {item.q}
                <span
                  aria-hidden
                  className={`grid size-8 shrink-0 place-items-center rounded-full border text-lg transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 text-slate-600"
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-${i}`}
              role="region"
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl px-6 pb-6 leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Closing call-to-action on an interactive dot grid (reacts to cursor and clicks). */
export function CtaBand({
  title,
  body,
  topic,
  button,
}: {
  title: string;
  body: string;
  topic: string;
  button: string;
}) {
  return (
    <section className="px-5 py-24">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-slate-950 text-center text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <DotGrid
              dotSize={3}
              gap={20}
              baseColor="#27324a"
              activeColor="#a5b4fc"
              proximity={150}
              glow={0.6}
            />
          </div>
          <div className="relative px-6 py-20 sm:px-12">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-200">{body}</p>
            <BookButton topic={topic} variant="light" className="mt-9">
              {button}
            </BookButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
