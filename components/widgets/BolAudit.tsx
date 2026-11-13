"use client";

import { useState } from "react";
import { checkContainer } from "@/lib/checks";

const BOL = { cartons: 420, weight: "24,500 kg", master: "MSCU9876543" };
const SAMPLES = {
  discrepancy: { cartons: "400", container: "MSCU-883920-3" },
  clean: { cartons: "420", container: "MSCU-883920-3" },
};

type Light = "green" | "red";

function Dot({ light }: { light: Light }) {
  return (
    <span
      className={`inline-block size-2.5 shrink-0 rounded-full ${
        light === "green"
          ? "bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/70"
          : "bg-rose-500 shadow-[0_0_10px] shadow-rose-500/70"
      }`}
    />
  );
}

export function BolAudit() {
  const [cartons, setCartons] = useState(SAMPLES.discrepancy.cartons);
  const [container, setContainer] = useState(SAMPLES.discrepancy.container);

  const packingCartons = Number(cartons);
  const cartonsOk = cartons !== "" && packingCartons === BOL.cartons;
  const iso = checkContainer(container);
  const allClear = cartonsOk && iso.valid;

  const input =
    "w-full rounded-md border bg-slate-950/60 px-2.5 py-1.5 font-mono text-sm text-white focus:outline-none focus:ring-2";
  const okRing = "border-slate-700 focus:border-indigo-400 focus:ring-indigo-400/30";
  const badRing = "border-rose-500/70 focus:border-rose-400 focus:ring-rose-400/30";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      {/* Cross-document table */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-slate-400">Load sample:</span>
          {(
            [
              ["discrepancy", "With discrepancy"],
              ["clean", "Clean shipment"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setCartons(SAMPLES[key].cartons);
                setContainer(SAMPLES[key].container);
              }}
              className="rounded-md border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-slate-950/60 font-mono text-xs text-slate-500">
              <tr>
                <th scope="col" className="px-4 py-3 font-normal">Field</th>
                <th scope="col" className="px-4 py-3 font-normal">Bill of Lading</th>
                <th scope="col" className="px-4 py-3 font-normal">Packing list</th>
                <th scope="col" className="px-4 py-3 font-normal">Invoice</th>
                <th scope="col" className="px-4 py-3 font-normal"><span className="sr-only">Status</span></th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr className={`border-t border-slate-800 ${cartonsOk ? "" : "bg-rose-500/10"}`}>
                <th scope="row" className="px-4 py-3 font-sans font-medium text-slate-300">Packages</th>
                <td className="px-4 py-3 text-white">{BOL.cartons} cartons</td>
                <td className="px-4 py-2">
                  <label className="sr-only" htmlFor="pl-cartons">Packing list cartons</label>
                  <input
                    id="pl-cartons"
                    inputMode="numeric"
                    value={cartons}
                    onChange={(e) => setCartons(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    className={`${input} max-w-[6.5rem] ${cartonsOk ? okRing : badRing}`}
                  />
                </td>
                <td className="px-4 py-3 text-white">{BOL.cartons} cartons</td>
                <td className="px-4 py-3"><Dot light={cartonsOk ? "green" : "red"} /></td>
              </tr>
              <tr className="border-t border-slate-800">
                <th scope="row" className="px-4 py-3 font-sans font-medium text-slate-300">Gross weight</th>
                <td className="px-4 py-3 text-white">{BOL.weight}</td>
                <td className="px-4 py-3 text-white">{BOL.weight}</td>
                <td className="px-4 py-3 text-white">{BOL.weight}</td>
                <td className="px-4 py-3"><Dot light="green" /></td>
              </tr>
              <tr className={`border-t border-slate-800 ${iso.valid ? "" : "bg-rose-500/10"}`}>
                <th scope="row" className="px-4 py-3 font-sans font-medium text-slate-300">Container ID</th>
                <td className="px-4 py-2" colSpan={3}>
                  <label className="sr-only" htmlFor="container-id">Container ID</label>
                  <input
                    id="container-id"
                    value={container}
                    onChange={(e) => setContainer(e.target.value.toUpperCase().slice(0, 14))}
                    spellCheck={false}
                    className={`${input} max-w-[13rem] ${iso.valid ? okRing : badRing}`}
                  />
                  <span className={`ml-3 text-xs ${iso.valid ? "text-emerald-400" : "text-rose-400"}`}>
                    {iso.valid
                      ? "ISO 6346 check digit valid"
                      : iso.wellFormed
                        ? `check digit should be ${iso.expected}`
                        : "needs 4 letters + 7 digits"}
                  </span>
                </td>
                <td className="px-4 py-3"><Dot light={iso.valid ? "green" : "red"} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Master BoL {BOL.master}. Edit the highlighted fields to see the audit react.
        </p>
      </div>

      {/* Verdict */}
      <div
        aria-live="polite"
        className={`flex flex-col justify-between rounded-xl border p-6 transition-colors duration-300 ${
          allClear
            ? "border-emerald-500/40 bg-emerald-500/10"
            : "border-rose-500/40 bg-rose-500/10"
        }`}
      >
        <div>
          <div className="flex items-center gap-3">
            <span
              className={`size-4 rounded-full ${
                allClear
                  ? "bg-emerald-400 shadow-[0_0_18px] shadow-emerald-400"
                  : "bg-rose-500 shadow-[0_0_18px] shadow-rose-500"
              }`}
            />
            <span className={`font-mono text-sm font-bold uppercase tracking-wider ${allClear ? "text-emerald-300" : "text-rose-300"}`}>
              {allClear ? "Green · cleared to sync" : "Red alert · hold"}
            </span>
          </div>
          <ul className="mt-5 space-y-2.5 text-sm text-slate-200">
            {!cartonsOk && (
              <li>
                Package count mismatch: BoL says {BOL.cartons} cartons, packing
                list says {cartons === "" ? "nothing" : packingCartons}.
              </li>
            )}
            {!iso.valid && (
              <li>
                Container ID fails ISO 6346 validation. Likely a single-digit typo.
              </li>
            )}
            {allClear && (
              <>
                <li>All three documents agree on packages and weight.</li>
                <li>Container ID passes ISO 6346 validation.</li>
              </>
            )}
          </ul>
        </div>
        <div
          className={`mt-6 rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${
            allClear ? "bg-emerald-400 text-emerald-950" : "bg-slate-800 text-slate-500"
          }`}
        >
          {allClear ? "Ready for 1-click ERP sync" : "ERP sync blocked until resolved"}
        </div>
      </div>
    </div>
  );
}
