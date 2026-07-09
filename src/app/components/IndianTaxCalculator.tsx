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
  Keyboard,
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
type EntryMode = "upload" | "manual";

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
  | "hraExemptionOverride"
  | "otherExemptAllowances"
  | "professionalTax"
  | "employerNps"
  | "selfOccupiedInterest"
  | "section80c"
  | "section80dSelf"
  | "section80dParents"
  | "npsSelf"
  | "tdsTcs";

type ExtractedValue = {
  key: ExtractedKey;
  label: string;
  value: number;
  source: string;
};

type Form16Part = "partA" | "partB";

const sections: Array<{ key: SectionKey; label: string; description: string }> = [
  {
    key: "salary",
    label: "Salary details",
    description: "Form 16 salary, HRA, exemptions and professional tax.",
  },
  {
    key: "other",
    label: "Other income",
    description: "AIS income such as bank interest, FD interest and dividends.",
  },
  {
    key: "deductions",
    label: "Deductions",
    description: "80C, NPS, 80D and other old-regime deductions.",
  },
  {
    key: "credits",
    label: "Tax already paid",
    description: "TDS, TCS, advance tax and relief already available.",
  },
  {
    key: "profile",
    label: "Profile settings",
    description: "Residence and HRA city settings.",
  },
  {
    key: "house",
    label: "Home loan & property",
    description: "Self-occupied or let-out house property income/loss.",
  },
  {
    key: "capital",
    label: "Capital gains",
    description: "Shares, mutual funds and other taxable capital gains.",
  },
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
  return Number.isFinite(amount) && amount >= 0 ? Math.round(amount) : null;
}

function amountsNear(text: string, pattern: RegExp, maxCharacters = 260) {
  const found: number[] = [];
  const matches = text.matchAll(pattern);

  for (const match of matches) {
    const start = match.index ?? 0;
    const segment = text.slice(start, start + maxCharacters);
    const amounts = [...segment.matchAll(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]{5,})(?:\.\d{1,2})?/gi)]
      .map((item) => parseAmount(item[1]))
      .filter((item): item is number => item !== null);

    found.push(...amounts);
  }

  return found;
}

function bestAmount(text: string, patterns: RegExp[], maxCharacters?: number) {
  const amounts = patterns
    .flatMap((pattern) => amountsNear(text, pattern, maxCharacters))
    .filter((amount) => amount > 0);

  if (amounts.length === 0) {
    return null;
  }

  return Math.max(...amounts);
}

function firstAmountAfter(text: string, pattern: RegExp, maxCharacters = 220) {
  const match = pattern.exec(text);

  if (!match) {
    return null;
  }

  const segment = text.slice(match.index + match[0].length, match.index + match[0].length + maxCharacters);
  const amountMatch = segment.match(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)(?:\.\d{1,2})?/i);

  return amountMatch ? parseAmount(amountMatch[1]) : null;
}

function firstDecimalAmountAfter(text: string, pattern: RegExp, maxCharacters = 220) {
  const match = pattern.exec(text);

  if (!match) {
    return null;
  }

  const segment = text.slice(match.index + match[0].length, match.index + match[0].length + maxCharacters);
  const amountMatch = segment.match(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)\.\d{1,2}/i);

  return amountMatch ? parseAmount(amountMatch[1]) : null;
}

function lastAmountAfter(text: string, pattern: RegExp, maxCharacters = 260) {
  const match = pattern.exec(text);

  if (!match) {
    return null;
  }

  const segment = text.slice(match.index + match[0].length, match.index + match[0].length + maxCharacters);
  const amounts = [...segment.matchAll(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)(?:\.\d{1,2})?/gi)]
    .map((item) => parseAmount(item[1]))
    .filter((item): item is number => item !== null);

  return amounts.length > 0 ? amounts[amounts.length - 1] : null;
}

function lastDecimalAmountAfter(text: string, pattern: RegExp, maxCharacters = 260) {
  const match = pattern.exec(text);

  if (!match) {
    return null;
  }

  const segment = text.slice(match.index + match[0].length, match.index + match[0].length + maxCharacters);
  const amounts = [...segment.matchAll(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)\.\d{1,2}/gi)]
    .map((item) => parseAmount(item[1]))
    .filter((item): item is number => item !== null);

  return amounts.length > 0 ? amounts[amounts.length - 1] : null;
}

function nthDecimalAmountAfter(text: string, pattern: RegExp, index: number, maxCharacters = 180) {
  const match = pattern.exec(text);

  if (!match) {
    return null;
  }

  const segment = text.slice(match.index + match[0].length, match.index + match[0].length + maxCharacters);
  const amounts = [...segment.matchAll(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)\.\d{1,2}/gi)]
    .map((item) => parseAmount(item[1]))
    .filter((item): item is number => item !== null);

  return amounts[index] ?? null;
}

function lastAmountBefore(text: string, pattern: RegExp, maxCharacters = 180) {
  const match = pattern.exec(text);

  if (!match) {
    return null;
  }

  const segment = text.slice(Math.max(0, match.index - maxCharacters), match.index);
  const amounts = [...segment.matchAll(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)(?:\.\d{1,2})?/gi)]
    .map((item) => parseAmount(item[1]))
    .filter((item): item is number => item !== null);

  return amounts.length > 0 ? amounts[amounts.length - 1] : null;
}

function lastDecimalAmountBefore(text: string, pattern: RegExp, maxCharacters = 180) {
  const match = pattern.exec(text);

  if (!match) {
    return null;
  }

  const segment = text.slice(Math.max(0, match.index - maxCharacters), match.index);
  const amounts = [...segment.matchAll(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)\.\d{1,2}/gi)]
    .map((item) => parseAmount(item[1]))
    .filter((item): item is number => item !== null);

  return amounts.length > 0 ? amounts[amounts.length - 1] : null;
}

function firstFoundAmount(text: string, patterns: RegExp[], maxCharacters?: number) {
  for (const pattern of patterns) {
    const amount = firstAmountAfter(text, pattern, maxCharacters);

    if (amount !== null) {
      return amount;
    }
  }

  return null;
}

function buildExtractedValue(
  key: ExtractedKey,
  label: string,
  value: number | null,
  source: string
): ExtractedValue | null {
  return value === null ? null : { key, label, value, source };
}

function reportedHousePropertyInterest(text: string) {
  const match = /income \(or admissible loss\) from house property/i.exec(text);

  if (!match) {
    return null;
  }

  const segment = text.slice(match.index + match[0].length, match.index + match[0].length + 260);
  const amountMatch = segment.match(/-([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)\.\d{1,2}/);

  return amountMatch ? parseAmount(amountMatch[1]) : null;
}

function partATaxDeducted(text: string) {
  const matches = [...text.matchAll(/total\s*\(rs\.?\)/gi)];

  for (const match of matches) {
    const segment = text.slice(match.index + match[0].length, match.index + match[0].length + 220);
    const amounts = [...segment.matchAll(/(?:rs\.?|inr|₹)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)\.\d{1,2}/gi)]
      .map((item) => parseAmount(item[1]))
      .filter((item): item is number => item !== null);

    if (amounts.length >= 3) {
      const taxColumns = amounts.slice(1, 3).filter((amount) => amount > 0);

      if (taxColumns.length > 0) {
        return Math.min(...taxColumns);
      }
    }

    if (amounts.length === 2 && amounts[1] > 0) {
      return amounts[1];
    }
  }

  const verificationMatch = /a sum of rs\.\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]+)\.\d{1,2}[^.]{0,140}has been deducted/i.exec(text);

  return verificationMatch ? parseAmount(verificationMatch[1]) : null;
}

function extractForm16Values(text: string): ExtractedValue[] {
  const normalized = text.replace(/\s+/g, " ");
  const parts = detectForm16Parts(normalized);
  const candidates: Array<ExtractedValue | null> = [
    buildExtractedValue(
      "grossSalary",
      "Gross salary",
      firstDecimalAmountAfter(normalized, /salary as per provisions contained in section 17\(1\)/i, 220) ??
        firstDecimalAmountAfter(normalized, /total amount of salary received from current employer\s*3\.?/i, 220) ??
        firstDecimalAmountAfter(normalized, /\(d\)\s*total/i, 180) ??
        firstFoundAmount(normalized, [
          /salary as per provisions contained in section 17\(1\)/i,
          /total amount of salary received from current employer\s*3\.?/i,
          /\(d\)\s*total/i,
        ], 220) ??
        bestAmount(normalized, [
        /gross salary/gi,
        /total amount of salary/gi,
        /income chargeable under the head salaries/gi,
        /salary as per provisions contained in section 17/gi,
      ], 420),
      "Form 16 Part B salary section"
    ),
    buildExtractedValue(
      "basicSalary",
      "Basic salary for HRA",
      bestAmount(normalized, [/basic salary/gi, /\bbasic\b/gi], 180),
      "Basic salary line, if available"
    ),
    buildExtractedValue(
      "hraExemptionOverride",
      "HRA exemption from Form 16",
      firstDecimalAmountAfter(normalized, /house rent allowance under section 10\(13a\)/i, 180) ??
        firstFoundAmount(normalized, [/house rent allowance under section 10\(13a\)/i], 180) ??
        bestAmount(normalized, [/house rent allowance/gi, /\bhra\b/gi], 220),
      "Form 16 Part B HRA exemption line"
    ),
    buildExtractedValue(
      "otherExemptAllowances",
      "Other section 10 exemptions",
      firstDecimalAmountAfter(
        normalized,
        /total amount of any other exemption under section 10/i,
        180
      ),
      "Other Section 10 exemption line"
    ),
    buildExtractedValue(
      "professionalTax",
      "Professional tax",
      firstDecimalAmountAfter(normalized, /tax on employment under section 16\(iii\)/i, 180) ??
        firstFoundAmount(normalized, [/tax on employment under section 16\(iii\)/i], 180) ??
        bestAmount(normalized, [/professional tax/gi, /tax on employment/gi], 220),
      "Professional tax line"
    ),
    buildExtractedValue(
      "employerNps",
      "Employer NPS contribution",
      lastDecimalAmountBefore(normalized, /scheme under section 80ccd\s*\(2\)/i, 120) ??
        lastAmountBefore(normalized, /scheme under section 80ccd\s*\(2\)/i, 120) ??
        firstFoundAmount(normalized, [/scheme under section 80ccd\s*\(2\)/i], 160) ??
        firstFoundAmount(normalized, [/80ccd\s*\(2\)/i, /employer'?s? contribution.*nps/i], 260),
      "Employer NPS / 80CCD(2)"
    ),
    buildExtractedValue(
      "selfOccupiedInterest",
      "Self-occupied home loan interest",
      reportedHousePropertyInterest(normalized),
      "House property loss reported to employer"
    ),
    buildExtractedValue(
      "section80c",
      "80C investments",
      nthDecimalAmountAfter(
        normalized,
        /total deduction under section 80c,\s*80ccc and 80ccd\(1\)/i,
        1,
        90
      ) ??
        lastDecimalAmountAfter(normalized, /total deduction under section 80c,\s*80ccc and 80ccd\(1\)/i, 90) ??
        lastAmountAfter(normalized, /total deduction under section 80c,\s*80ccc and 80ccd\(1\)/i, 120) ??
        firstFoundAmount(normalized, [/section 80c/i], 240),
      "Section 80C deduction"
    ),
    (() => {
      const section80d =
        lastDecimalAmountBefore(normalized, /\b80d\b/i, 120) ??
        lastAmountBefore(normalized, /\b80d\b/i, 120) ??
        firstFoundAmount(normalized, [/\b80d\b/i], 180);

      return buildExtractedValue(
        "section80dSelf",
        "80D self/family",
        section80d === null ? null : Math.min(section80d, 25000),
        "Section 80D deduction"
      );
    })(),
    (() => {
      const section80d =
        lastDecimalAmountBefore(normalized, /\b80d\b/i, 120) ??
        lastAmountBefore(normalized, /\b80d\b/i, 120) ??
        firstFoundAmount(normalized, [/\b80d\b/i], 180);

      return buildExtractedValue(
        "section80dParents",
        "80D parents / additional",
        section80d !== null && section80d > 25000 ? section80d - 25000 : null,
        "Section 80D balance"
      );
    })(),
    buildExtractedValue(
      "npsSelf",
      "80CCD(1B) self NPS",
      lastDecimalAmountBefore(normalized, /scheme under section 80ccd\s*\(1b\)/i, 120) ??
        lastAmountBefore(normalized, /scheme under section 80ccd\s*\(1b\)/i, 120) ??
        firstFoundAmount(normalized, [/scheme under section 80ccd\s*\(1b\)/i], 160) ??
        firstFoundAmount(normalized, [/80ccd\s*\(1b\)/i], 240),
      "Section 80CCD(1B)"
    ),
    parts.partA
      ? buildExtractedValue(
          "tdsTcs",
          "TDS / TCS",
          partATaxDeducted(normalized) ??
            lastDecimalAmountAfter(normalized, /total \(rs\.\)/i, 140) ??
            lastAmountAfter(normalized, /total \(rs\.\)/i, 140) ??
            firstFoundAmount(normalized, [
              /total tax deducted/gi,
              /tax deducted at source/gi,
              /amount of tax deducted/gi,
            ], 360),
          "Form 16 Part A tax deducted section"
        )
      : null,
  ];

  return candidates.filter((item): item is ExtractedValue => item !== null);
}

function detectForm16Parts(text: string) {
  const normalized = text.replace(/\s+/g, " ");

  return {
    partA:
      (/part\s*a/i.test(normalized) &&
        /summary of amount paid\/credited and tax deducted at source/i.test(normalized)) ||
      /quarter\(s\).*amount paid\/credited/i.test(normalized) ||
      /receipt numbers of original quarterly statements of tds/i.test(normalized),
    partB:
      (/part\s*b/i.test(normalized) && /details of salary paid/i.test(normalized)) ||
      /salary as per provisions contained in section 17/i.test(normalized) ||
      /deductions under chapter vi-a/i.test(normalized) ||
      /income chargeable under the head salaries/i.test(normalized),
  };
}

function form16PartMessage(parts: Record<Form16Part, boolean>) {
  if (parts.partA && parts.partB) {
    return "Combined Form 16 or both Part A and Part B detected. Review salary, deductions and TDS after autofill.";
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
    profile: false,
    salary: true,
    house: false,
    capital: false,
    other: true,
    deductions: true,
    credits: true,
  });
  const [entryMode, setEntryMode] = useState<EntryMode>("upload");

  const [resident, setResident] = useState(true);
  const [grossSalary, setGrossSalary] = useState(0);
  const [basicSalary, setBasicSalary] = useState(0);
  const [hraReceived, setHraReceived] = useState(0);
  const [hraExemptionOverride, setHraExemptionOverride] = useState(0);
  const [annualRent, setAnnualRent] = useState(0);
  const [metroCity, setMetroCity] = useState(false);
  const [otherExemptAllowances, setOtherExemptAllowances] = useState(0);
  const [professionalTax, setProfessionalTax] = useState(0);
  const [employerNps, setEmployerNps] = useState(0);
  const [selfOccupiedInterest, setSelfOccupiedInterest] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [municipalTaxes, setMunicipalTaxes] = useState(0);
  const [letOutInterest, setLetOutInterest] = useState(0);
  const [stcg111a, setStcg111a] = useState(0);
  const [ltcg112a, setLtcg112a] = useState(0);
  const [otherCapitalGains, setOtherCapitalGains] = useState(0);
  const [savingsInterest, setSavingsInterest] = useState(0);
  const [fdInterest, setFdInterest] = useState(0);
  const [dividends, setDividends] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [section80c, setSection80c] = useState(0);
  const [section80dSelf, setSection80dSelf] = useState(0);
  const [section80dParents, setSection80dParents] = useState(0);
  const [npsSelf, setNpsSelf] = useState(0);
  const [donation80g, setDonation80g] = useState(0);
  const [tdsTcs, setTdsTcs] = useState(0);
  const [foreignRelief, setForeignRelief] = useState(0);
  const [advanceTax, setAdvanceTax] = useState(0);
  const [form16Status, setForm16Status] = useState<string>("");
  const [form16Error, setForm16Error] = useState<string>("");
  const [detectedForm16Parts, setDetectedForm16Parts] = useState<Record<Form16Part, boolean>>({
    partA: false,
    partB: false,
  });

  const result = useMemo(() => {
    const hraPercent = metroCity ? 0.5 : 0.4;
    const calculatedHraExemption = Math.max(
      0,
      Math.min(hraReceived, basicSalary * hraPercent, annualRent - basicSalary * 0.1)
    );
    const hraExemption = hraExemptionOverride > 0 ? hraExemptionOverride : calculatedHraExemption;
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
    hraExemptionOverride,
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
    hraExemptionOverride: setHraExemptionOverride,
    otherExemptAllowances: setOtherExemptAllowances,
    professionalTax: setProfessionalTax,
    employerNps: setEmployerNps,
    selfOccupiedInterest: setSelfOccupiedInterest,
    section80c: setSection80c,
    section80dSelf: setSection80dSelf,
    section80dParents: setSection80dParents,
    npsSelf: setNpsSelf,
    tdsTcs: setTdsTcs,
  };

  const fillExtractedValues = (values: ExtractedValue[]) => {
    values.forEach((item) => {
      setters[item.key](item.value);
    });
    setOpenSections((current) => ({
      ...current,
      salary: true,
      deductions: true,
      credits: true,
    }));
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

      fillExtractedValues(extracted);
      setForm16Status(
        `${form16PartMessage(parts)} Filled ${extracted.length} value${
          extracted.length === 1 ? "" : "s"
        } in the calculator. Please review the fields before filing. You can upload the other part if anything is missing.`
      );
    } catch (error) {
      setForm16Status("");
      setForm16Error(getForm16UploadError(error));
    } finally {
      event.target.value = "";
    }
  };

  const recommendedPayable =
    result.recommended === "new" ? result.newPayable : result.oldPayable;
  const recommendedTax =
    result.recommended === "new" ? result.newTotalTax : result.oldTotalTax;
  const creditsUsed = tdsTcs + advanceTax + foreignRelief;

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

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
              Start here
            </p>
            <h3 className="mt-1 text-lg font-black text-slate-950">
              Choose how you want to fill the calculator
            </h3>
          </div>
          <div className="grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-100 p-1 lg:min-w-[360px]">
            <button
              type="button"
              onClick={() => setEntryMode("upload")}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-black transition ${
                entryMode === "upload"
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <Upload className="size-4" />
              Form 16
            </button>
            <button
              type="button"
              onClick={() => setEntryMode("manual")}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-black transition ${
                entryMode === "manual"
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <Keyboard className="size-4" />
              Manual
            </button>
          </div>
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
          {entryMode === "upload"
            ? "Best for salaried users. Upload Form 16, review what we detect, then edit any field before calculating."
            : "Use the input guide and fill only the sections that apply to you. Form 16 upload stays available anytime."}
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 font-black text-slate-950">
          <FileText className="size-5 text-blue-700" />
          Keep these ready
        </div>
        <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
          <span className="rounded-lg bg-slate-50 px-3 py-2">Form 16</span>
          <span className="rounded-lg bg-slate-50 px-3 py-2">AIS / TIS</span>
          <span className="rounded-lg bg-slate-50 px-3 py-2">Form 26AS</span>
          <span className="rounded-lg bg-slate-50 px-3 py-2">Broker report, if applicable</span>
        </div>
      </div>

      {entryMode === "upload" ? (
      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-black text-slate-950">
              <Upload className="size-5 text-blue-700" />
              Form 16 autofill
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

      </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 font-black text-slate-950">
                <Keyboard className="size-5 text-blue-700" />
                Manual entry selected
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
                Start with salary, other income, deductions and tax already paid.
                Open home loan, property or capital gains only if they apply.
              </p>
            </div>
            <Link
              href="/articles/how-to-use-indian-tax-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-800 shadow-sm transition hover:bg-blue-50"
            >
              Input guide
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.key} className="rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => toggleSection(section.key)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-bold text-slate-950"
              >
                <span>
                  <span className="block">{section.label}</span>
                  <span className="mt-1 block text-sm font-medium leading-5 text-slate-500">
                    {section.description}
                  </span>
                </span>
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
                      <Field
                        label="HRA exemption from Form 16"
                        value={hraExemptionOverride}
                        onChange={setHraExemptionOverride}
                      />
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
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="rounded-xl bg-white/80 p-3">
                <dt className="font-semibold text-slate-600">
                  {recommendedPayable >= 0 ? "Estimated payable" : "Estimated refund"}
                </dt>
                <dd className="mt-1 text-2xl font-black text-slate-950">
                  {formatCurrency(Math.abs(recommendedPayable))}
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/70 p-3">
                  <dt className="font-semibold text-slate-600">Total tax</dt>
                  <dd className="mt-1 font-black text-slate-950">
                    {formatCurrency(recommendedTax)}
                  </dd>
                </div>
                <div className="rounded-xl bg-white/70 p-3">
                  <dt className="font-semibold text-slate-600">Tax paid</dt>
                  <dd className="mt-1 font-black text-slate-950">
                    {formatCurrency(creditsUsed)}
                  </dd>
                </div>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              Saving versus the other regime:{" "}
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
