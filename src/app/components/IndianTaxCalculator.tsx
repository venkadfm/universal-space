"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  BadgeIndianRupee,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
} from "lucide-react";

type SectionKey =
  | "profile"
  | "salary"
  | "house"
  | "capital"
  | "other"
  | "deductions"
  | "credits";

type Regime = "new" | "old";

const sections: Array<{ key: SectionKey; label: string }> = [
  { key: "profile", label: "Profile" },
  { key: "salary", label: "Salary" },
  { key: "house", label: "House Property" },
  { key: "capital", label: "Capital Gains" },
  { key: "other", label: "Other Income" },
  { key: "deductions", label: "Old Regime Deductions" },
  { key: "credits", label: "TDS & Relief" },
];

function formatCurrency(value: number) {
  const rounded = Math.round(value);

  if (rounded < 0) {
    return `-₹${Math.abs(rounded).toLocaleString("en-IN")}`;
  }

  return `₹${rounded.toLocaleString("en-IN")}`;
}

function positive(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function taxFromSlabs(income: number, slabs: Array<[number, number]>) {
  let remaining = Math.max(0, income);
  let previousLimit = 0;
  let tax = 0;

  for (const [limit, rate] of slabs) {
    const slabAmount = Math.max(0, Math.min(remaining, limit - previousLimit));
    tax += slabAmount * rate;
    remaining -= slabAmount;
    previousLimit = limit;

    if (remaining <= 0) {
      break;
    }
  }

  return tax;
}

function surchargeRate(income: number, regime: Regime) {
  if (income > 50000000) return regime === "new" ? 0.25 : 0.37;
  if (income > 20000000) return 0.25;
  if (income > 10000000) return 0.15;
  if (income > 5000000) return 0.1;
  return 0;
}

function surchargeWithBasicRelief(baseTax: number, taxableIncome: number, regime: Regime) {
  const rate = surchargeRate(taxableIncome, regime);

  if (rate === 0) {
    return 0;
  }

  const thresholds = [5000000, 10000000, 20000000, 50000000];
  const threshold = [...thresholds].reverse().find((item) => taxableIncome > item) ?? 0;

  if (!threshold) {
    return baseTax * rate;
  }

  const thresholdTax =
    regime === "new" ? newRegimeBaseTax(threshold) : oldRegimeBaseTax(threshold);
  const thresholdSurcharge = thresholdTax * surchargeRate(threshold, regime);
  const maxTaxBeforeCess = thresholdTax + thresholdSurcharge + (taxableIncome - threshold);
  const taxWithFullSurcharge = baseTax + baseTax * rate;

  return Math.max(0, Math.min(baseTax * rate, maxTaxBeforeCess - baseTax, taxWithFullSurcharge - baseTax));
}

function newRegimeBaseTax(income: number) {
  return taxFromSlabs(income, [
    [400000, 0],
    [800000, 0.05],
    [1200000, 0.1],
    [1600000, 0.15],
    [2000000, 0.2],
    [2400000, 0.25],
    [Number.POSITIVE_INFINITY, 0.3],
  ]);
}

function oldRegimeBaseTax(income: number) {
  return taxFromSlabs(income, [
    [250000, 0],
    [500000, 0.05],
    [1000000, 0.2],
    [Number.POSITIVE_INFINITY, 0.3],
  ]);
}

function numberInputProps(value: number, onChange: (value: number) => void) {
  return {
    type: "number",
    min: 0,
    value,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      onChange(positive(Number(event.target.value))),
    className:
      "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100",
  };
}

export default function IndianTaxCalculator() {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    profile: true,
    salary: true,
    house: true,
    capital: false,
    other: true,
    deductions: true,
    credits: true,
  });

  const [resident, setResident] = useState(true);
  const [grossSalary, setGrossSalary] = useState(1200000);
  const [basicSalary, setBasicSalary] = useState(600000);
  const [hraReceived, setHraReceived] = useState(240000);
  const [annualRent, setAnnualRent] = useState(300000);
  const [metroCity, setMetroCity] = useState(false);
  const [otherExemptAllowances, setOtherExemptAllowances] = useState(0);
  const [professionalTax, setProfessionalTax] = useState(2400);
  const [employerNps, setEmployerNps] = useState(0);
  const [selfOccupiedInterest, setSelfOccupiedInterest] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [municipalTaxes, setMunicipalTaxes] = useState(0);
  const [letOutInterest, setLetOutInterest] = useState(0);
  const [stcg111a, setStcg111a] = useState(0);
  const [ltcg112a, setLtcg112a] = useState(0);
  const [otherCapitalGains, setOtherCapitalGains] = useState(0);
  const [savingsInterest, setSavingsInterest] = useState(10000);
  const [fdInterest, setFdInterest] = useState(0);
  const [dividends, setDividends] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [section80c, setSection80c] = useState(150000);
  const [section80dSelf, setSection80dSelf] = useState(25000);
  const [section80dParents, setSection80dParents] = useState(0);
  const [npsSelf, setNpsSelf] = useState(50000);
  const [donation80g, setDonation80g] = useState(0);
  const [tdsTcs, setTdsTcs] = useState(0);
  const [foreignRelief, setForeignRelief] = useState(0);
  const [advanceTax, setAdvanceTax] = useState(0);

  const result = useMemo(() => {
    const hraPercent = metroCity ? 0.5 : 0.4;
    const hraExemption = Math.max(
      0,
      Math.min(hraReceived, basicSalary * hraPercent, annualRent - basicSalary * 0.1)
    );
    const newStandardDeduction = grossSalary > 0 ? 75000 : 0;
    const oldStandardDeduction = grossSalary > 0 ? 50000 : 0;
    const newSalaryIncome = Math.max(0, grossSalary - newStandardDeduction);
    const oldSalaryIncome = Math.max(
      0,
      grossSalary - hraExemption - otherExemptAllowances - oldStandardDeduction - professionalTax
    );
    const selfOccupiedLoss = -Math.min(selfOccupiedInterest, 200000);
    const netAnnualValue = Math.max(0, rentalIncome - municipalTaxes);
    const letOutIncome = netAnnualValue * 0.7 - letOutInterest;
    const housePropertyBeforeCap = selfOccupiedLoss + letOutIncome;
    const housePropertyIncome = Math.max(housePropertyBeforeCap, -200000);
    const capitalGains = stcg111a + Math.max(0, ltcg112a - 125000) + otherCapitalGains;
    const totalOtherIncome = savingsInterest + fdInterest + dividends + otherIncome;
    const oldGrossTotalIncome =
      oldSalaryIncome + housePropertyIncome + capitalGains + totalOtherIncome;
    const newGrossTotalIncome =
      newSalaryIncome + housePropertyIncome + capitalGains + totalOtherIncome;
    const oldDeductions =
      Math.min(section80c, 150000) +
      Math.min(npsSelf, 50000) +
      Math.min(section80dSelf, 25000) +
      Math.min(section80dParents, 50000) +
      Math.min(savingsInterest, 10000) +
      donation80g;
    const newDeductions = Math.min(employerNps, grossSalary * 0.14);
    const oldTaxableIncome = Math.max(0, Math.round((oldGrossTotalIncome - oldDeductions) / 10) * 10);
    const newTaxableIncome = Math.max(0, Math.round((newGrossTotalIncome - newDeductions) / 10) * 10);
    const newBaseTaxBeforeRebate = newRegimeBaseTax(newTaxableIncome);
    const oldBaseTax = oldRegimeBaseTax(oldTaxableIncome);
    const oldRebate = resident && oldTaxableIncome <= 500000 ? Math.min(oldBaseTax, 12500) : 0;
    const newRebate =
      resident && newTaxableIncome <= 1200000
        ? newBaseTaxBeforeRebate
        : resident
          ? Math.max(0, newBaseTaxBeforeRebate - Math.max(0, newTaxableIncome - 1200000))
          : 0;
    const oldTaxAfterRebate = Math.max(0, oldBaseTax - oldRebate);
    const newTaxAfterRebate = Math.max(0, newBaseTaxBeforeRebate - newRebate);
    const oldSurcharge = surchargeWithBasicRelief(oldTaxAfterRebate, oldTaxableIncome, "old");
    const newSurcharge = surchargeWithBasicRelief(newTaxAfterRebate, newTaxableIncome, "new");
    const oldCess = (oldTaxAfterRebate + oldSurcharge) * 0.04;
    const newCess = (newTaxAfterRebate + newSurcharge) * 0.04;
    const credits = tdsTcs + advanceTax + foreignRelief;
    const oldPayable = oldTaxAfterRebate + oldSurcharge + oldCess - credits;
    const newPayable = newTaxAfterRebate + newSurcharge + newCess - credits;
    const recommended: Regime = newPayable <= oldPayable ? "new" : "old";

    return {
      hraExemption,
      oldSalaryIncome,
      newSalaryIncome,
      housePropertyIncome,
      capitalGains,
      totalOtherIncome,
      oldDeductions,
      newDeductions,
      oldTaxableIncome,
      newTaxableIncome,
      oldTotalTax: oldTaxAfterRebate + oldSurcharge + oldCess,
      newTotalTax: newTaxAfterRebate + newSurcharge + newCess,
      oldPayable,
      newPayable,
      recommended,
      savings: Math.abs(oldPayable - newPayable),
    };
  }, [
    resident,
    grossSalary,
    basicSalary,
    hraReceived,
    annualRent,
    metroCity,
    otherExemptAllowances,
    professionalTax,
    employerNps,
    selfOccupiedInterest,
    rentalIncome,
    municipalTaxes,
    letOutInterest,
    stcg111a,
    ltcg112a,
    otherCapitalGains,
    savingsInterest,
    fdInterest,
    dividends,
    otherIncome,
    section80c,
    section80dSelf,
    section80dParents,
    npsSelf,
    donation80g,
    tdsTcs,
    foreignRelief,
    advanceTax,
  ]);

  const toggleSection = (key: SectionKey) => {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <section className="premium-surface rounded-2xl p-5 md:p-8">
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="section-eyebrow mb-2">Personal finance tool</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Indian Income Tax Calculator
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
            Compare old and new regime tax using detailed inputs across salary,
            HRA, house property, capital gains, other income, deductions, TDS,
            and foreign tax relief.
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <div className="flex items-center gap-2 font-bold">
            <ShieldCheck className="size-4" />
            Privacy first
          </div>
          <p className="mt-2 max-w-xs leading-6">
            This calculator runs in your browser. Do not enter PAN, Aadhaar, or
            document passwords.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.key} className="rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => toggleSection(section.key)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-bold text-slate-950"
              >
                {section.label}
                {openSections[section.key] ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </button>

              {openSections[section.key] && (
                <div className="grid gap-4 border-t border-slate-100 p-4 md:grid-cols-2">
                  {section.key === "profile" && (
                    <>
                      <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm font-semibold">
                        <input
                          type="checkbox"
                          checked={resident}
                          onChange={(event) => setResident(event.target.checked)}
                          className="size-4"
                        />
                        Resident individual
                      </label>
                      <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm font-semibold">
                        <input
                          type="checkbox"
                          checked={metroCity}
                          onChange={(event) => setMetroCity(event.target.checked)}
                          className="size-4"
                        />
                        HRA city is metro
                      </label>
                    </>
                  )}

                  {section.key === "salary" && (
                    <>
                      <Field label="Gross salary" value={grossSalary} onChange={setGrossSalary} />
                      <Field label="Basic salary for HRA" value={basicSalary} onChange={setBasicSalary} />
                      <Field label="HRA received" value={hraReceived} onChange={setHraReceived} />
                      <Field label="Annual rent paid" value={annualRent} onChange={setAnnualRent} />
                      <Field
                        label="Other section 10 exemptions"
                        value={otherExemptAllowances}
                        onChange={setOtherExemptAllowances}
                      />
                      <Field label="Professional tax" value={professionalTax} onChange={setProfessionalTax} />
                      <Field label="Employer NPS contribution" value={employerNps} onChange={setEmployerNps} />
                      <Output label="Calculated HRA exemption" value={result.hraExemption} />
                    </>
                  )}

                  {section.key === "house" && (
                    <>
                      <Field
                        label="Self-occupied home loan interest"
                        value={selfOccupiedInterest}
                        onChange={setSelfOccupiedInterest}
                      />
                      <Field label="Rental income received" value={rentalIncome} onChange={setRentalIncome} />
                      <Field label="Municipal taxes paid" value={municipalTaxes} onChange={setMunicipalTaxes} />
                      <Field label="Let-out property interest" value={letOutInterest} onChange={setLetOutInterest} />
                      <Output label="House property income/loss" value={result.housePropertyIncome} />
                    </>
                  )}

                  {section.key === "capital" && (
                    <>
                      <Field label="STCG on equity u/s 111A" value={stcg111a} onChange={setStcg111a} />
                      <Field label="LTCG on equity/MF u/s 112A" value={ltcg112a} onChange={setLtcg112a} />
                      <Field label="Other taxable capital gains" value={otherCapitalGains} onChange={setOtherCapitalGains} />
                      <Output label="Taxable capital gains used" value={result.capitalGains} />
                    </>
                  )}

                  {section.key === "other" && (
                    <>
                      <Field label="Savings interest" value={savingsInterest} onChange={setSavingsInterest} />
                      <Field label="FD / deposit interest" value={fdInterest} onChange={setFdInterest} />
                      <Field label="Dividends" value={dividends} onChange={setDividends} />
                      <Field label="Other income" value={otherIncome} onChange={setOtherIncome} />
                    </>
                  )}

                  {section.key === "deductions" && (
                    <>
                      <Field label="80C investments" value={section80c} onChange={setSection80c} />
                      <Field label="80CCD(1B) self NPS" value={npsSelf} onChange={setNpsSelf} />
                      <Field label="80D self/family" value={section80dSelf} onChange={setSection80dSelf} />
                      <Field label="80D parents" value={section80dParents} onChange={setSection80dParents} />
                      <Field label="80G deductible amount" value={donation80g} onChange={setDonation80g} />
                      <Output label="Old regime deductions used" value={result.oldDeductions} />
                    </>
                  )}

                  {section.key === "credits" && (
                    <>
                      <Field label="TDS / TCS" value={tdsTcs} onChange={setTdsTcs} />
                      <Field label="Advance / self-assessment tax" value={advanceTax} onChange={setAdvanceTax} />
                      <Field label="Foreign tax relief" value={foreignRelief} onChange={setForeignRelief} />
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-center gap-2 text-sm font-bold uppercase text-blue-800">
              <CheckCircle2 className="size-4" />
              Recommended regime
            </div>
            <p className="mt-3 text-4xl font-black text-slate-950">
              {result.recommended === "new" ? "New" : "Old"}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Estimated saving versus the other regime:{" "}
              <strong>{formatCurrency(result.savings)}</strong>
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            <ResultCard
              title="New regime"
              taxableIncome={result.newTaxableIncome}
              tax={result.newTotalTax}
              payable={result.newPayable}
              highlighted={result.recommended === "new"}
            />
            <ResultCard
              title="Old regime"
              taxableIncome={result.oldTaxableIncome}
              tax={result.oldTotalTax}
              payable={result.oldPayable}
              highlighted={result.recommended === "old"}
            />
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-950">
              <FileText className="size-4" />
              Use this with your documents
            </div>
            <p className="mt-2">
              Reconcile the result with Form 16, AIS, Form 26AS, bank interest,
              broker reports, and deduction proofs before filing.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input {...numberInputProps(value, onChange)} />
    </label>
  );
}

function Output({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <p className="mt-2 text-xl font-black text-slate-950">{formatCurrency(value)}</p>
    </div>
  );
}

function ResultCard({
  title,
  taxableIncome,
  tax,
  payable,
  highlighted,
}: {
  title: string;
  taxableIncome: number;
  tax: number;
  payable: number;
  highlighted: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlighted ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold text-slate-950">{title}</h3>
        {highlighted && <BadgeIndianRupee className="size-5 text-emerald-700" />}
      </div>
      <dl className="mt-4 grid gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-600">Taxable income</dt>
          <dd className="font-semibold text-slate-950">{formatCurrency(taxableIncome)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-600">Tax before credits</dt>
          <dd className="font-semibold text-slate-950">{formatCurrency(tax)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-slate-200 pt-2">
          <dt className="font-bold text-slate-950">
            {payable >= 0 ? "Payable" : "Refund"}
          </dt>
          <dd className="font-black text-slate-950">{formatCurrency(Math.abs(payable))}</dd>
        </div>
      </dl>
    </div>
  );
}
