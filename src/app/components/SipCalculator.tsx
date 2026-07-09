"use client";

import { useState } from "react";
import { Calculator, TrendingUp, Wallet } from "lucide-react";

type InvestmentMode = "sip" | "lumpsum" | "both";
type SipFrequency = "monthly" | "quarterly" | "yearly";

const modes: Array<{ label: string; value: InvestmentMode }> = [
  { label: "SIP", value: "sip" },
  { label: "Lump sum", value: "lumpsum" },
  { label: "Both", value: "both" },
];

const frequencies: Array<{
  label: string;
  value: SipFrequency;
  periodsPerYear: number;
}> = [
  { label: "Monthly", value: "monthly", periodsPerYear: 12 },
  { label: "Quarterly", value: "quarterly", periodsPerYear: 4 },
  { label: "Yearly", value: "yearly", periodsPerYear: 1 },
];

function formatCurrency(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function clampNumber(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export default function SipCalculator() {
  const [mode, setMode] = useState<InvestmentMode>("sip");
  const [sipAmount, setSipAmount] = useState(5000);
  const [frequency, setFrequency] = useState<SipFrequency>("monthly");
  const [lumpsum, setLumpsum] = useState(100000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(12);

  const selectedFrequency =
    frequencies.find((item) => item.value === frequency) ?? frequencies[0];
  const periodsPerYear = selectedFrequency.periodsPerYear;
  const periodicRate = rate / periodsPerYear / 100;
  const totalSipPeriods = years * periodsPerYear;
  const annualRate = rate / 100;

  const sipPrincipal = mode === "lumpsum" ? 0 : sipAmount * totalSipPeriods;
  const lumpSumPrincipal = mode === "sip" ? 0 : lumpsum;
  const principal = sipPrincipal + lumpSumPrincipal;

  const sipValue =
    mode === "lumpsum"
      ? 0
      : periodicRate === 0
        ? sipPrincipal
        : sipAmount *
          ((Math.pow(1 + periodicRate, totalSipPeriods) - 1) / periodicRate);

  const lumpSumValue =
    mode === "sip" ? 0 : lumpsum * Math.pow(1 + annualRate, years);

  const futureValue = sipValue + lumpSumValue;
  const expectedReturns = futureValue - principal;

  const resultBlocks = [
    {
      label: "Principal invested",
      value: principal,
      icon: Wallet,
      tone: "border-slate-200 bg-white",
    },
    {
      label: "Expected returns",
      value: expectedReturns,
      icon: TrendingUp,
      tone: "border-emerald-200 bg-emerald-50/80",
    },
    {
      label: "Total payout",
      value: futureValue,
      icon: Calculator,
      tone: "border-blue-200 bg-blue-50/80",
    },
  ];

  return (
    <div className="premium-surface mx-auto max-w-5xl rounded-2xl p-6 md:p-8">

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-eyebrow mb-2">
            Wealth tool
          </p>

          <h2 className="text-3xl font-bold text-slate-950">
            SIP & Lump Sum Calculator
          </h2>
        </div>

        <div className="grid grid-cols-3 rounded-xl border border-slate-200 bg-slate-100 p-1">
          {modes.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setMode(item.value)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === item.value
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {mode !== "lumpsum" && (
          <div>
            <label className="mb-2 block font-medium text-slate-800">
            {selectedFrequency.label} SIP Investment (₹)
            </label>

            <input
              type="number"
              min="0"
              value={sipAmount}
              onChange={(e) => setSipAmount(clampNumber(Number(e.target.value)))}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        )}

        {mode !== "lumpsum" && (
          <div>
            <label className="mb-2 block font-medium text-slate-800">
              SIP Frequency
            </label>

            <div className="grid grid-cols-3 rounded-xl border border-slate-200 bg-slate-100 p-1">
              {frequencies.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFrequency(item.value)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    frequency === item.value
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode !== "sip" && (
          <div>
            <label className="mb-2 block font-medium text-slate-800">
              Lump Sum Investment (₹)
            </label>

            <input
              type="number"
              min="0"
              value={lumpsum}
              onChange={(e) => setLumpsum(clampNumber(Number(e.target.value)))}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block font-medium text-slate-800">
            Expected Annual Return (%)
          </label>

          <input
            type="number"
            min="0"
            value={rate}
            onChange={(e) => setRate(clampNumber(Number(e.target.value)))}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-800">
            Investment Years
          </label>

          <input
            type="number"
            min="1"
            value={years}
            onChange={(e) => setYears(clampNumber(Number(e.target.value)))}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {resultBlocks.map((block) => {
          const Icon = block.icon;

          return (
            <div
              key={block.label}
              className={`rounded-xl border p-5 ${block.tone}`}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold uppercase text-slate-600">
                  {block.label}
                </h3>

                <Icon className="size-5 text-slate-700" />
              </div>

              <p className="text-3xl font-black text-slate-950">
                {formatCurrency(block.value)}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
