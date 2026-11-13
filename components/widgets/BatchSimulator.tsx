"use client";

import { useEffect, useRef, useState } from "react";
import { inr } from "@/lib/checks";

type Status = "match" | "mismatch" | "missing";
type Row = {
  inv: string;
  vendor: string;
  tally: number | null;
  portal: number;
  status: Status;
};

const TOTAL = 500;
const vendors = [
  "Apex Logistics Ltd",
  "Shree Traders",
  "Kaveri Packaging",
  "Zenith Supplies",
  "Orbit Steel Pvt Ltd",
  "Nimbus Infotech",
  "Sai Enterprises",
  "Metro Corp",
  "Deccan Chemicals",
  "Bluepeak Freight",
];

/** Deterministic 500-invoice batch: 452 match, 34 mismatch, 14 missing. */
function buildBatch(): Row[] {
  return Array.from({ length: TOTAL }, (_, i) => {
    const status: Status =
      i % 36 === 7 ? "missing" : i % 15 === 3 ? "mismatch" : "match";
    let vendor = vendors[(i * 7) % vendors.length];
    let portal = 5000 + ((i * 7919) % 190) * 500;
    if (i === 0) [vendor, portal] = ["Apex Logistics Ltd", 100000];
    if (i === 3) [vendor, portal] = ["Zenith Supplies", 48000];
    if (i === 7) [vendor, portal] = ["Metro Corp", 25000];
    const tally =
      status === "missing"
        ? null
        : status === "mismatch"
          ? portal + (i === 3 ? 2000 : 500 * (1 + (i % 4)))
          : portal;
    return {
      inv: `INV-2026-${String(i + 1).padStart(3, "0")}`,
      vendor,
      tally,
      portal,
      status,
    };
  });
}

const BATCH = buildBatch();

const meta: Record<Status, { label: string; dot: string; text: string }> = {
  match: { label: "Exact match", dot: "bg-emerald-400", text: "text-emerald-400" },
  mismatch: { label: "Value mismatch", dot: "bg-amber-400", text: "text-amber-400" },
  missing: { label: "Missing in Tally", dot: "bg-rose-400", text: "text-rose-400" },
};

export function BatchSimulator() {
  const batch = BATCH;
  const [done, setDone] = useState(0);
  const [running, setRunning] = useState(false);
  const [tab, setTab] = useState<"mismatch" | "missing">("mismatch");
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  function run() {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(TOTAL);
      return;
    }
    setRunning(true);
    setDone(0);
    const start = performance.now();
    const duration = 3600;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      setDone(Math.round(TOTAL * t));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(tick);
  }

  const processed = batch.slice(0, done);
  const counts = { match: 0, mismatch: 0, missing: 0 };
  for (const r of processed) counts[r.status]++;
  const finished = done === TOTAL;
  const idle = done === 0 && !running;
  const recent = processed.slice(-6).reverse();
  const exceptions = batch.filter((r) => r.status === tab);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
      {/* Left: control + buckets */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <div className="font-mono text-sm text-slate-400">
            <span className="text-2xl font-bold text-white tabular-nums">{done}</span>
            <span> / {TOTAL} purchase invoices</span>
          </div>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50"
          >
            {running ? "Reconciling…" : finished ? "Run again" : "Run batch"}
          </button>
        </div>

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"
          role="progressbar"
          aria-label="Batch progress"
          aria-valuemin={0}
          aria-valuemax={TOTAL}
          aria-valuenow={done}
        >
          <div className="h-full bg-indigo-500" style={{ width: `${(done / TOTAL) * 100}%` }} />
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {(Object.keys(meta) as Status[]).map((s) => (
            <div key={s} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <dt className="flex items-center gap-2 text-xs text-slate-400">
                <span className={`size-2 rounded-full ${meta[s].dot}`} />
                {meta[s].label}
              </dt>
              <dd className={`mt-2 font-mono text-3xl font-bold tabular-nums ${meta[s].text}`}>
                {counts[s]}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 min-h-[3rem] text-sm leading-relaxed text-slate-400" aria-live="polite">
          {finished ? (
            <>
              <span className="font-semibold text-white">
                {((counts.match / TOTAL) * 100).toFixed(0)}% Tally-ready.
              </span>{" "}
              {counts.match} vouchers can be imported in one click. Your team
              reviews only the {counts.mismatch + counts.missing} exceptions.
            </>
          ) : idle ? (
            "Press Run batch to reconcile a 500-invoice purchase register against GSTR-2B."
          ) : (
            "OCR extraction → GSTIN checksum → GSTR-2B match…"
          )}
        </p>
      </div>

      {/* Right: log, then exception review */}
      <div className="min-h-[19rem] rounded-xl border border-slate-800 bg-slate-950/50 font-mono text-xs">
        {finished ? (
          <>
            <div className="flex gap-1 border-b border-slate-800 p-2" role="tablist" aria-label="Exceptions">
              {(["mismatch", "missing"] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`rounded-md px-3 py-1.5 transition-colors ${
                    tab === t ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {meta[t].label} ({counts[t]})
                </button>
              ))}
            </div>
            <div className="max-h-[16rem] overflow-y-auto" tabIndex={0} aria-label="Exception list">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-slate-950 text-slate-500">
                  <tr>
                    <th className="px-3 py-2 font-normal">Invoice</th>
                    <th className="px-3 py-2 font-normal">Vendor</th>
                    <th className="px-3 py-2 text-right font-normal">Tally</th>
                    <th className="px-3 py-2 text-right font-normal">GSTR-2B</th>
                  </tr>
                </thead>
                <tbody>
                  {exceptions.map((r) => (
                    <tr key={r.inv} className="border-t border-slate-800/70">
                      <td className="px-3 py-2 text-slate-400">{r.inv}</td>
                      <td className="px-3 py-2 text-slate-200">{r.vendor}</td>
                      <td className={`px-3 py-2 text-right ${meta[r.status].text}`}>
                        {r.tally === null ? "—" : inr(r.tally)}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-200">{inr(r.portal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-3">
            <div className="px-1 pb-2 text-slate-500">reconciliation.log</div>
            {recent.length === 0 ? (
              <div className="px-1 text-slate-600">waiting for batch…</div>
            ) : (
              <ul className="space-y-1">
                {recent.map((r) => (
                  <li
                    key={r.inv}
                    className="log-row flex items-center gap-3 rounded-md px-1 py-1.5"
                  >
                    <span className={`size-1.5 shrink-0 rounded-full ${meta[r.status].dot}`} />
                    <span className="text-slate-500">{r.inv}</span>
                    <span className="min-w-0 flex-1 truncate text-slate-300">{r.vendor}</span>
                    <span className={`shrink-0 ${meta[r.status].text}`}>
                      {r.status === "match"
                        ? `₹${inr(r.portal)} ✓`
                        : r.status === "mismatch"
                          ? `₹${inr(r.tally!)} ≠ ₹${inr(r.portal)}`
                          : `₹${inr(r.portal)} not in Tally`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
