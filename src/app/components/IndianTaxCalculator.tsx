"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Upload,
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

type PdfJsDocument = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<{
    getTextContent: () => Promise<{
      items: Array<{ str?: string }>;
    }>;
  }>;
};

type PdfJsLib = {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (source: { data: Uint8Array }) => {
    promise: Promise<PdfJsDocument>;
  };
};

declare global {
  interface Window {
    pdfjsLib?: PdfJsLib;
  }
}

type ExtractedKey =
  | "grossSalary"
  | "basicSalary"
  | "hraReceived"
  | "professionalTax"
  | "employerNps"
  | "section80c"
  | "section80dSelf"
  | "npsSelf"
  | "tdsTcs";

type ExtractedValue = {
  key: ExtractedKey;
  label: string;
  value: number;
  source: string;
};

type Form16Part = "partA" | "partB";

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

const pdfJsUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const pdfWorkerUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function loadPdfJs() {
  return new Promise<PdfJsLib>((resolve, reject) => {
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
      resolve(window.pdfjsLib);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${pdfJsUrl}"]`
    );

    const onLoad = () => {
      if (!window.pdfjsLib) {
        reject(new Error("PDF reader could not be loaded."));
        return;
      }

      window.pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
      resolve(window.pdfjsLib);
    };

    if (existingScript) {
      existingScript.addEventListener("load", onLoad, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("PDF reader could not be loaded.")),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = pdfJsUrl;
    script.async = true;
    script.onload = onLoad;
    script.onerror = () => reject(new Error("PDF reader could not be loaded."));
    document.head.appendChild(script);
  });
}

function parseAmount(raw: string) {
  const amount = Number(raw.replace(/[,\s]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount) : 0;
}

function amountsNear(text: string, pattern: RegExp, maxCharacters = 260) {
  const found: number[] = [];
  const matches = text.matchAll(pattern);

  for (const match of matches) {
    const start = match.index ?? 0;
    const segment = text.slice(start, start + maxCharacters);
    const amounts = [...segment.matchAll(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]{5,})(?:\.\d{1,2})?/gi)]
      .map((item) => parseAmount(item[1]))
      .filter(Boolean);

    found.push(...amounts);
  }

  return found;
}

function bestAmount(text: string, patterns: RegExp[], maxCharacters?: number) {
  const amounts = patterns.flatMap((pattern) => amountsNear(text, pattern, maxCharacters));

  if (amounts.length === 0) {
    return 0;
  }

  return Math.max(...amounts);
}

function extractForm16Values(text: string): ExtractedValue[] {
  const normalized = text.replace(/\s+/g, " ");
  const candidates: Array<ExtractedValue | null> = [
    {
      key: "grossSalary",
      label: "Gross salary",
      value: bestAmount(normalized, [
        /gross salary/gi,
        /total amount of salary/gi,
        /income chargeable under the head salaries/gi,
        /salary as per provisions contained in section 17/gi,
      ], 420),
      source: "Form 16 salary section",
    },
    {
      key: "basicSalary",
      label: "Basic salary for HRA",
      value: bestAmount(normalized, [/basic salary/gi, /\bbasic\b/gi], 180),
      source: "Basic salary line, if available",
    },
    {
      key: "hraReceived",
      label: "HRA received",
      value: bestAmount(normalized, [/house rent allowance/gi, /\bhra\b/gi], 220),
      source: "HRA / house rent allowance line",
    },
    {
      key: "professionalTax",
      label: "Professional tax",
      value: bestAmount(normalized, [/professional tax/gi, /tax on employment/gi], 220),
      source: "Professional tax line",
    },
    {
      key: "employerNps",
      label: "Employer NPS contribution",
      value: bestAmount(normalized, [/80ccd\s*\(?2\)?/gi, /employer'?s? contribution.*nps/gi], 260),
      source: "Employer NPS / 80CCD(2)",
    },
    {
      key: "section80c",
      label: "80C investments",
      value: bestAmount(normalized, [/80c\b/gi, /section 80c/gi], 240),
      source: "Section 80C deduction",
    },
    {
      key: "section80dSelf",
      label: "80D self/family",
      value: bestAmount(normalized, [/80d\b/gi, /section 80d/gi], 240),
      source: "Section 80D deduction",
    },
    {
      key: "npsSelf",
      label: "80CCD(1B) self NPS",
      value: bestAmount(normalized, [/80ccd\s*\(?1b\)?/gi, /section 80ccd\s*\(?1b\)?/gi], 240),
      source: "Section 80CCD(1B)",
    },
    {
      key: "tdsTcs",
      label: "TDS / TCS",
      value: bestAmount(normalized, [
        /total tax deducted/gi,
        /tax deducted at source/gi,
        /amount of tax deducted/gi,
      ], 360),
      source: "Tax deducted section",
    },
  ];

  return candidates.filter((item): item is ExtractedValue => Boolean(item?.value));
}

function detectForm16Parts(text: string) {
  const normalized = text.replace(/\s+/g, " ");

  return {
    partA:
      /part\s*a/i.test(normalized) ||
      /certificate under section 203/i.test(normalized) ||
      /tan of the deductor/i.test(normalized) ||
      /summary of tax deducted at source/i.test(normalized),
    partB:
      /part\s*b/i.test(normalized) ||
      /annexure/i.test(normalized) ||
      /salary as per provisions contained in section 17/i.test(normalized) ||
      /deductions under chapter vi-a/i.test(normalized) ||
      /income chargeable under the head salaries/i.test(normalized),
  };
}

function mergeExtractedValues(current: ExtractedValue[], incoming: ExtractedValue[]) {
  const byKey = new Map<ExtractedKey, ExtractedValue>();

  current.forEach((item) => byKey.set(item.key, item));
  incoming.forEach((item) => byKey.set(item.key, item));

  return Array.from(byKey.values());
}

function form16PartMessage(parts: Record<Form16Part, boolean>) {
  if (parts.partA && parts.partB) {
    return "Combined Form 16 or both Part A and Part B detected. Review salary, deductions and TDS before applying.";
  }

  if (parts.partA) {
    return "Part A detected. This usually helps with TDS. Upload Part B or a combined Form 16 PDF to detect salary and deduction values.";
  }

  if (parts.partB) {
    return "Part B detected. This usually helps with salary and deductions. Upload Part A or a combined Form 16 PDF to detect TDS.";
  }

  return "Form 16 part could not be identified confidently. Review any detected values carefully.";
}

function getForm16UploadError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  if (/password|encrypted|decrypt|protected/i.test(message)) {
    return "File is password protected. Please upload an unlocked Form 16 PDF, or enter values manually using the input guide.";
  }

  return error instanceof Error
    ? error.message
    : "We could not read this Form 16. Please enter values manually.";
}

async function extractTextFromPdf(file: File) {
  const pdfjsLib = await loadPdfJs();
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
  const pageTexts: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pageTexts.push(content.items.map((item) => item.str ?? "").join(" "));
  }

  return pageTexts.join("\n");
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
  const [form16Status, setForm16Status] = useState<string>("");
  const [form16Error, setForm16Error] = useState<string>("");
  const [extractedValues, setExtractedValues] = useState<ExtractedValue[]>([]);
  const [detectedForm16Parts, setDetectedForm16Parts] = useState<Record<Form16Part, boolean>>({
    partA: false,
    partB: false,
  });
  const [selectedExtractedKeys, setSelectedExtractedKeys] = useState<Record<ExtractedKey, boolean>>({
    grossSalary: true,
    basicSalary: true,
    hraReceived: true,
    professionalTax: true,
    employerNps: true,
    section80c: true,
    section80dSelf: true,
    npsSelf: true,
    tdsTcs: true,
  });

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

  const setters: Record<ExtractedKey, (value: number) => void> = {
    grossSalary: setGrossSalary,
    basicSalary: setBasicSalary,
    hraReceived: setHraReceived,
    professionalTax: setProfessionalTax,
    employerNps: setEmployerNps,
    section80c: setSection80c,
    section80dSelf: setSection80dSelf,
    npsSelf: setNpsSelf,
    tdsTcs: setTdsTcs,
  };

  const handleForm16Upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setForm16Error("");
    setForm16Status("Reading Form 16 in your browser...");

    try {
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        throw new Error("Please upload a PDF Form 16 file.");
      }

      const text = await extractTextFromPdf(file);
      const extracted = extractForm16Values(text);
      const parts = detectForm16Parts(text);

      setDetectedForm16Parts((current) => ({
        partA: current.partA || parts.partA,
        partB: current.partB || parts.partB,
      }));

      if (extracted.length === 0) {
        setForm16Status("");
        setForm16Error(
          `${form16PartMessage(parts)} We could not confidently read calculator values from this PDF. You can upload another Form 16 part or enter values manually.`
        );
        return;
      }

      setSelectedExtractedKeys((current) => ({
        ...current,
        ...Object.fromEntries(extracted.map((item) => [item.key, true])),
      }));
      setExtractedValues((current) => mergeExtractedValues(current, extracted));
      setForm16Status(
        `${form16PartMessage(parts)} Found ${extracted.length} possible value${
          extracted.length === 1 ? "" : "s"
        } from this upload. You can upload the other part now or review and apply selected values.`
      );
    } catch (error) {
      setForm16Status("");
      setForm16Error(getForm16UploadError(error));
    } finally {
      event.target.value = "";
    }
  };

  const applyExtractedValues = () => {
    extractedValues.forEach((item) => {
      if (selectedExtractedKeys[item.key]) {
        setters[item.key](item.value);
      }
    });
    setOpenSections((current) => ({
      ...current,
      salary: true,
      deductions: true,
      credits: true,
    }));
    setForm16Status("Selected Form 16 values applied. Please review the fields before filing.");
  };

  return (
    <section className="premium-surface rounded-2xl p-5 md:p-8">
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="section-eyebrow mb-2">Personal finance tool</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Tax Calculator
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
            Know your exact tax amount before filing. Compare old and new
            regime tax using salary, HRA, house property, capital gains, other
            income, deductions, TDS, and foreign tax relief.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/articles/how-to-use-indian-tax-calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800 transition hover:border-blue-300 hover:bg-blue-100"
            >
              Need help filling inputs?
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/articles/form-16-vs-ais-vs-26as"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-800"
            >
              Form 16 vs AIS vs 26AS
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/wealth#tax-filing-guides"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-800"
            >
              All tax guides
              <ArrowRight className="size-4" />
            </Link>
          </div>
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

      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-black text-slate-950">
              <Upload className="size-5 text-blue-700" />
              Upload Form 16 to autofill
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
              Optional beta feature. Upload Form 16 Part A, Part B, or a
              combined PDF. We will try to read salary, deductions and TDS in
              your browser. The file is not stored. You can upload the second
              part later or enter everything manually below.
            </p>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-blue-900">
              Password-protected PDF? Please upload an unlocked Form 16. For
              privacy, Venveel does not ask for your Form 16 password.
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-900">
            Choose Form 16 PDF
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleForm16Upload}
              className="sr-only"
            />
          </label>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white bg-white/80 p-4 text-sm leading-6 text-slate-700">
            <p className="font-bold text-slate-950">1. Upload</p>
            <p className="mt-1">Select Part A, Part B, or combined Form 16.</p>
          </div>
          <div className="rounded-xl border border-white bg-white/80 p-4 text-sm leading-6 text-slate-700">
            <p className="font-bold text-slate-950">2. Review</p>
            <p className="mt-1">Upload the other part if anything is missing.</p>
          </div>
          <div className="rounded-xl border border-white bg-white/80 p-4 text-sm leading-6 text-slate-700">
            <p className="font-bold text-slate-950">3. Edit</p>
            <p className="mt-1">Adjust any field manually using the guide.</p>
          </div>
        </div>

        {(detectedForm16Parts.partA || detectedForm16Parts.partB) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                detectedForm16Parts.partA
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {detectedForm16Parts.partA ? "Part A detected" : "Part A not detected yet"}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                detectedForm16Parts.partB
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {detectedForm16Parts.partB ? "Part B detected" : "Part B not detected yet"}
            </span>
          </div>
        )}

        {form16Status && (
          <p className="mt-4 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-800">
            {form16Status}
          </p>
        )}

        {form16Error && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            <p className="font-bold">Manual entry is still available</p>
            <p className="mt-1">{form16Error}</p>
            <Link
              href="/articles/how-to-use-indian-tax-calculator"
              className="mt-2 inline-flex items-center gap-2 font-bold text-amber-950 underline-offset-4 hover:underline"
            >
              Open calculator input guide
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}

        {extractedValues.length > 0 && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-black text-slate-950">Review detected values</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Keep only the rows that look correct, then apply them to the
                  calculator. If you uploaded only Part A or only Part B, you
                  can upload the other part before applying. You can edit every
                  field after applying.
                </p>
              </div>
              <button
                type="button"
                onClick={applyExtractedValues}
                className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Apply selected values
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600">
                    <th className="py-3 pr-4 font-bold">Use</th>
                    <th className="py-3 pr-4 font-bold">Field</th>
                    <th className="py-3 pr-4 font-bold">Detected value</th>
                    <th className="py-3 pr-4 font-bold">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {extractedValues.map((item) => (
                    <tr key={item.key} className="border-b border-slate-100">
                      <td className="py-3 pr-4">
                        <input
                          type="checkbox"
                          checked={selectedExtractedKeys[item.key]}
                          onChange={(event) =>
                            setSelectedExtractedKeys((current) => ({
                              ...current,
                              [item.key]: event.target.checked,
                            }))
                          }
                          className="size-4"
                        />
                      </td>
                      <td className="py-3 pr-4 font-semibold text-slate-950">
                        {item.label}
                      </td>
                      <td className="py-3 pr-4 font-black text-slate-950">
                        {formatCurrency(item.value)}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">{item.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
            <div className="mt-4 grid gap-2">
              <Link
                href="/articles/how-to-use-indian-tax-calculator"
                className="inline-flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 font-bold text-blue-800 transition hover:bg-blue-50"
              >
                Calculator input guide
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/articles/how-to-file-new-tax-regime-itr-india"
                className="inline-flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 font-bold text-blue-800 transition hover:bg-blue-50"
              >
                New tax filing guide
                <ArrowRight className="size-4" />
              </Link>
            </div>
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
