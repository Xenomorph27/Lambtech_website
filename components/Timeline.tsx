"use client";

import { useState } from "react";

const steps = [
  {
    name: "Sample Lock",
    days: "Days 1–2",
    from: 1,
    to: 2,
    detail:
      "We collect 20–30 of your real documents and the exact output you need, then lock a fixed scope. No open-ended retainers.",
  },
  {
    name: "Custom Build",
    days: "Days 3–12",
    from: 3,
    to: 12,
    detail:
      "Extraction is tuned on your formats until field accuracy passes 95%. Then come the hard rules (checksums, split math, cross-audits) and the export to Tally XML or your ERP.",
  },
  {
    name: "Live Test",
    days: "Day 13",
    from: 13,
    to: 13,
    detail:
      "We process 50 live documents side by side with your staff, on the exception review screen they will use every day.",
  },
  {
    name: "Handover",
    days: "Day 14",
    from: 14,
    to: 14,
    detail:
      "A 15-minute operator training, then ownership transfers to you. The pipeline is yours, with no per-seat fees.",
  },
];

export function Timeline() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div>
      <div role="tablist" aria-label="14-day delivery steps" className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {steps.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.name}
              role="tab"
              id={`step-tab-${i}`}
              aria-selected={selected}
              aria-controls="step-panel"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`rounded-xl border p-4 text-left transition-all ${
                selected
                  ? "border-indigo-500 bg-white shadow-md shadow-indigo-500/10"
                  : "border-slate-200 bg-white/60 hover:border-slate-300"
              }`}
            >
              <span
                className={`font-mono text-xs ${selected ? "text-indigo-600" : "text-slate-500"}`}
              >
                0{i + 1} · {s.days}
              </span>
              <span className="mt-1.5 block font-bold">{s.name}</span>
            </button>
          );
        })}
      </div>

      {/* 14-day bar */}
      <div className="mt-6 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1" aria-hidden>
        {Array.from({ length: 14 }, (_, d) => {
          const day = d + 1;
          const on = day >= step.from && day <= step.to;
          const done = day < step.from;
          return (
            <div key={day} className="text-center">
              <div
                className={`h-2 rounded-full transition-colors duration-300 ${
                  on ? "bg-indigo-500" : done ? "bg-indigo-200" : "bg-slate-200"
                }`}
              />
              <span className={`mt-1.5 block font-mono text-[10px] ${on ? "text-indigo-600" : "text-slate-400"}`}>
                {day}
              </span>
            </div>
          );
        })}
      </div>

      <p
        id="step-panel"
        role="tabpanel"
        aria-labelledby={`step-tab-${active}`}
        className="mt-5 min-h-[4.5rem] max-w-2xl text-lg leading-relaxed text-slate-600"
      >
        {step.detail}
      </p>
    </div>
  );
}
