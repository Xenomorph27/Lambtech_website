"use client";

import { useState } from "react";
import { inr } from "@/lib/checks";
import { BookButton } from "../Booking";

const AUTOMATED_SHARE = 0.9; // routine share the pipelines clear in the sample flows
const WEEKS_PER_MONTH = 4.33;

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm font-medium text-slate-300">
        {label}
        <span className="font-mono text-base font-bold text-white">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={display}
        className="mt-3 w-full accent-indigo-400"
      />
    </label>
  );
}

/** Rough estimate of what manual document work costs a team each month. */
export function RoiCalculator() {
  const [people, setPeople] = useState(6);
  const [hours, setHours] = useState(12);
  const [salary, setSalary] = useState(30000);

  const monthlyHours = Math.round(people * hours * WEEKS_PER_MONTH);
  const hourly = salary / (WEEKS_PER_MONTH * 45);
  const monthlyCost = monthlyHours * hourly;
  const recoveredHours = Math.round(monthlyHours * AUTOMATED_SHARE);
  const recoveredCost = monthlyCost * AUTOMATED_SHARE;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-7">
        <Slider
          label="People doing manual document work"
          value={people}
          onChange={setPeople}
          min={1}
          max={40}
          step={1}
          display={String(people)}
        />
        <Slider
          label="Hours each spends on it per week"
          value={hours}
          onChange={setHours}
          min={2}
          max={40}
          step={1}
          display={`${hours} hrs`}
        />
        <Slider
          label="Average monthly cost per person"
          value={salary}
          onChange={setSalary}
          min={15000}
          max={100000}
          step={5000}
          display={`₹${inr(salary)}`}
        />
        <p className="text-xs leading-relaxed text-slate-500">
          An illustrative estimate, assuming a 45-hour week and a pipeline that
          clears about 90% of routine documents. Your real numbers come out of
          the discovery audit.
        </p>
      </div>

      <div aria-live="polite" className="flex flex-col rounded-2xl border border-slate-700 bg-slate-950/60 p-6 sm:p-7">
        <div className="font-mono text-xs uppercase tracking-wider text-slate-500">
          Your operational debt
        </div>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-mono text-5xl font-bold text-white tabular-nums">
            {inr(monthlyHours)}
          </span>
          <span className="text-slate-400">hours a month</span>
        </div>
        <div className="mt-1 font-mono text-slate-400">
          ≈ ₹{inr(monthlyCost)} in salaried time
        </div>

        <div className="mt-6">
          <div className="flex h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="bg-emerald-400 transition-all duration-300"
              style={{ width: `${AUTOMATED_SHARE * 100}%` }}
            />
            <div className="flex-1 bg-amber-400" />
          </div>
          <div className="mt-2 flex justify-between font-mono text-xs">
            <span className="text-emerald-400">automated</span>
            <span className="text-amber-400">human review</span>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-800 p-4">
            <dt className="text-xs text-slate-400">Hours handed back</dt>
            <dd className="mt-1 font-mono text-2xl font-bold text-emerald-400 tabular-nums">
              {inr(recoveredHours)}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-800 p-4">
            <dt className="text-xs text-slate-400">Value per month</dt>
            <dd className="mt-1 font-mono text-2xl font-bold text-emerald-400 tabular-nums">
              ₹{inr(recoveredCost)}
            </dd>
          </div>
        </dl>

        <BookButton
          topic="Audit my team's manual hours"
          className="mt-6 w-full"
          magnetic={false}
        >
          Get these numbers audited
        </BookButton>
      </div>
    </div>
  );
}
