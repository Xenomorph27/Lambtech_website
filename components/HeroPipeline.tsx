"use client";

import { useEffect, useState } from "react";

const runs = [
  {
    tab: "CA & Tax",
    file: "purchase_invoices_oct/ (500 files)",
    steps: [
      { label: "OCR extraction", value: "500 / 500" },
      { label: "GSTIN checksum", value: "all valid" },
      { label: "GSTR-2B match", value: "452 exact" },
    ],
    flag: "48 exceptions sent to review",
    result: "452 vouchers ready for Tally",
  },
  {
    tab: "Real Estate",
    file: "TowerB-402_agreement.pdf",
    steps: [
      { label: "KYC + PAN parse", value: "2 buyers" },
      { label: "1% TDS split", value: "₹5,000 + ₹5,000" },
      { label: "Form 26QB pre-fill", value: "2 challans" },
    ],
    flag: "0 exceptions",
    result: "2 Form 16B certificates queued",
  },
  {
    tab: "Logistics",
    file: "MSCU9876543_docs.zip (3 files)",
    steps: [
      { label: "Inbox capture", value: "BoL · PL · INV" },
      { label: "ISO 6346 check", value: "valid" },
      { label: "3-way audit", value: "420 vs 400" },
    ],
    flag: "Carton mismatch held for review",
    result: "ERP sync blocked",
  },
];

/** Looping preview of a pipeline run. Click a tab to pin a vertical. */
export function HeroPipeline() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (pinned) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % runs.length), 4200);
    return () => clearInterval(id);
  }, [pinned]);

  const run = runs[active];
  const held = run.result.includes("blocked");

  return (
    <div className="relative">
      <div className="float-a absolute -right-4 -top-7 z-10 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block">
        <div className="font-mono text-[11px] text-slate-500">cleared automatically</div>
        <div className="font-mono text-xl font-bold text-slate-900">~90%</div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-slate-900 text-left shadow-2xl shadow-slate-900/25 ring-1 ring-slate-900/10">
        <div className="flex items-center gap-1 border-b border-slate-800 px-3 py-2.5">
          <div className="mr-2 flex gap-1.5 pl-1" aria-hidden>
            <span className="size-2.5 rounded-full bg-slate-700" />
            <span className="size-2.5 rounded-full bg-slate-700" />
            <span className="size-2.5 rounded-full bg-slate-700" />
          </div>
          <div role="tablist" aria-label="Pipeline preview" className="flex gap-1">
            {runs.map((r, i) => (
              <button
                key={r.tab}
                role="tab"
                aria-selected={i === active}
                onClick={() => {
                  setActive(i);
                  setPinned(true);
                }}
                className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                  i === active
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {r.tab}
              </button>
            ))}
          </div>
        </div>

        <div key={active} className="space-y-2.5 p-5 font-mono text-[13px]">
          <div className="pop-in flex items-center gap-2 text-slate-400">
            <span className="text-indigo-400">▸</span> in:
            <span className="truncate text-slate-200">{run.file}</span>
          </div>
          {run.steps.map((s, i) => (
            <div
              key={s.label}
              className="pop-in flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/50 px-3.5 py-2.5"
              style={{ animationDelay: `${0.25 + i * 0.3}s` }}
            >
              <span className="flex items-center gap-2.5 text-slate-300">
                <span className="grid size-4 place-items-center rounded-full bg-emerald-500/20 text-[10px] text-emerald-400">
                  ✓
                </span>
                {s.label}
              </span>
              <span className="text-slate-400">{s.value}</span>
            </div>
          ))}
          <div
            className={`pop-in flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 ${
              held || run.flag.startsWith("48")
                ? "bg-amber-500/10 text-amber-300"
                : "bg-emerald-500/10 text-emerald-300"
            }`}
            style={{ animationDelay: "1.2s" }}
          >
            <span className="pulse-dot size-1.5 rounded-full bg-current" />
            {run.flag}
          </div>
          <div
            className="pop-in flex items-center justify-between border-t border-slate-800 pt-3.5 text-slate-400"
            style={{ animationDelay: "1.5s" }}
          >
            <span>out:</span>
            <span className={`font-bold ${held ? "text-rose-400" : "text-white"}`}>
              {run.result}
            </span>
          </div>
        </div>
      </div>

      <div className="float-b absolute -bottom-7 -left-4 z-10 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block">
        <div className="font-mono text-[11px] text-slate-500">human review</div>
        <div className="text-sm font-bold text-slate-900">only the exceptions</div>
      </div>
    </div>
  );
}
