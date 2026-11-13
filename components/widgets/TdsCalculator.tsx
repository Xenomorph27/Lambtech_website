"use client";

import { useState } from "react";
import { inr } from "@/lib/checks";

const UNIT = "B402";
const buyers = [
  { name: "Rahul Sharma", first: "Rahul", pan: "ABCDE1234F" },
  { name: "Priya Sharma", first: "Priya", pan: "FGHIJ5678K" },
];

export function TdsCalculator() {
  const [amountText, setAmountText] = useState("1000000");
  const [shareA, setShareA] = useState(50);

  const amount = Math.max(0, Number(amountText.replace(/[^\d]/g, "")) || 0);
  const totalTds = Math.round(amount * 0.01);
  const tdsA = Math.round((totalTds * shareA) / 100);
  const split = [
    { ...buyers[0], share: shareA, tds: tdsA },
    { ...buyers[1], share: 100 - shareA, tds: totalTds - tdsA },
  ];
  const active = split.filter((b) => b.share > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Inputs */}
      <div>
        <dl className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="rounded-lg border border-slate-800 px-3.5 py-3">
            <dt className="text-slate-500">Unit</dt>
            <dd className="mt-1 text-sm text-slate-200">Tower B, 402</dd>
          </div>
          <div className="rounded-lg border border-slate-800 px-3.5 py-3">
            <dt className="text-slate-500">Total consideration</dt>
            <dd className="mt-1 text-sm text-slate-200">₹85,00,000</dd>
          </div>
        </dl>

        <label className="mt-6 block text-sm font-medium text-slate-300">
          Installment paid (₹)
          <input
            inputMode="numeric"
            value={amount === 0 ? "" : inr(amount)}
            onChange={(e) => setAmountText(e.target.value.slice(0, 15))}
            placeholder="10,00,000"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 font-mono text-xl font-bold text-white placeholder:text-slate-600 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
          />
        </label>

        <label className="mt-6 block text-sm font-medium text-slate-300">
          Ownership split
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={shareA}
            onChange={(e) => setShareA(Number(e.target.value))}
            aria-valuetext={`Rahul ${shareA}%, Priya ${100 - shareA}%`}
            className="mt-3 w-full accent-indigo-400"
          />
        </label>
        <div className="mt-1.5 flex justify-between font-mono text-xs text-slate-400">
          <span>Rahul {shareA}%</span>
          <span>Priya {100 - shareA}%</span>
        </div>

        <div className="mt-6 flex items-baseline justify-between border-t border-slate-800 pt-5">
          <span className="text-sm text-slate-400">Total TDS at 1% (Sec. 194-IA)</span>
          <span className="font-mono text-2xl font-bold text-white tabular-nums">
            ₹{inr(totalTds)}
          </span>
        </div>
      </div>

      {/* Outputs */}
      <div aria-live="polite">
        <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500">
          Form 26QB challans
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {split.map((b) => (
            <div
              key={b.pan}
              className={`rounded-xl border p-4 transition-opacity ${
                b.share > 0
                  ? "border-slate-700 bg-slate-950/50"
                  : "border-slate-800 opacity-40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{b.name}</span>
                <span className="font-mono text-xs text-slate-400">{b.share}%</span>
              </div>
              <div className="mt-1 font-mono text-xs text-slate-500">PAN {b.pan}</div>
              <div className="mt-4 font-mono text-2xl font-bold text-white tabular-nums">
                ₹{inr(b.tds)}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                on ₹{inr((amount * b.share) / 100)} share
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-7 font-mono text-xs uppercase tracking-wider text-slate-500">
          Form 16B dispatch queue
        </h3>
        <ul className="mt-3 space-y-2 font-mono text-xs">
          {amount > 0 && active.length > 0 ? (
            active.map((b) => (
              <li
                key={b.pan}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 px-3.5 py-2.5"
              >
                <span className="truncate text-slate-200">
                  Unit-{UNIT}_{b.first}_Form16B.pdf
                </span>
                <span className="shrink-0 text-emerald-400">queued</span>
              </li>
            ))
          ) : (
            <li className="rounded-lg border border-dashed border-slate-800 px-3.5 py-2.5 text-slate-600">
              Enter an installment amount to queue certificates.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
