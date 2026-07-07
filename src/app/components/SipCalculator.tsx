"use client";

import { useState } from "react";

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(12);

  const monthlyRate = rate / 12 / 100;
  const months = years * 12;

  const futureValue =
    monthly *
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));

  return (
    <div className="premium-surface mx-auto max-w-2xl rounded-2xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        SIP Calculator
      </h2>

      <div className="space-y-6">

        <div>
          <label className="block mb-2 font-medium">
            Monthly Investment (₹)
          </label>

          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Annual Return (%)
          </label>

          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Investment Years
          </label>

          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border rounded-xl p-3"
          />
        </div>

      </div>

      <div className="mt-10 rounded-xl border border-blue-200 bg-blue-50/80 p-6">

        <h3 className="text-xl font-semibold">
          Estimated Future Value
        </h3>

        <p className="text-4xl font-bold text-blue-600 mt-3">
          ₹ {futureValue.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}
        </p>

      </div>

    </div>
  );
}
