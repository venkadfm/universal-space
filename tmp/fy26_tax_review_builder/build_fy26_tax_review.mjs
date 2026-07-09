import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/venkad/universal-space/outputs/fy26_tax_review";
const outputPath = `${outputDir}/fy26_old_regime_review.xlsx`;

const workbook = Workbook.create();
const summary = workbook.worksheets.add("Summary");
const inputs = workbook.worksheets.add("Inputs");
const calc = workbook.worksheets.add("Tax Calc");
const compare = workbook.worksheets.add("CA Comparison");
const sources = workbook.worksheets.add("Source Notes");

const money = '₹#,##0;[Red]-₹#,##0;₹0';
const headerFill = "#1F4E78";
const subFill = "#D9EAF7";
const inputFill = "#FFF2CC";
const calcFill = "#E2F0D9";

function styleSheet(sheet) {
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(1);
}

for (const sheet of [summary, inputs, calc, compare, sources]) styleSheet(sheet);

// Inputs
inputs.getRange("A1:G1").values = [[
  "Section",
  "Line item",
  "Kumar CA",
  "OneFinance",
  "My calculation",
  "Formula / source note",
  "Editable?",
]];
inputs.getRange("A1:G1").format.fill.color = headerFill;
inputs.getRange("A1:G1").format.font.color = "#FFFFFF";
inputs.getRange("A1:G1").format.font.bold = true;

const inputRows = [
  ["Salary", "Gross salary", 5575000, 5575000, 5575000, "AIS/Form 16 salary paid/credited.", "Yes"],
  ["Salary", "HRA received", 660000, 660000, 660000, "Form 16 salary breakup.", "Yes"],
  ["Salary", "Annual rent paid", 780000, 720000, 720000, "All 12 rent receipts show Rs 60,000/month.", "Yes"],
  ["Salary", "Salary for HRA calculation", 1650000, 1650000, 1650000, "Basic salary used for HRA formula.", "Yes"],
  ["Salary", "Flexi / other section 10 exemption", 154800, 208730, 208730, "Form 16 shows Flexi Exemption Rs 208,730.", "Yes"],
  ["Salary", "Standard deduction", 50000, 50000, 50000, "Old regime salaried standard deduction.", "Yes"],
  ["Salary", "Professional tax", 2500, 0, 2500, "Form 16 includes professional tax Rs 2,500.", "Yes"],
  ["House Property", "Home loan interest paid", 276118, 276119, 276119, "HSBC provisional interest certificate.", "Yes"],
  ["Other Income", "Dividends", 12601, 14684, 14684, "OneFinance includes Indian and US dividends.", "Yes"],
  ["Other Income", "Savings account interest", 10418, 10418, 10418, "AIS savings interest.", "Yes"],
  ["Other Income", "Term deposit interest", 925, 925, 925, "AIS SBI term deposit interest.", "Yes"],
  ["Other Income", "Other interest", 5590, 9382, 9382, "Includes Muthoot, Krazybee, refund interest and US interest.", "Yes"],
  ["Capital Gains", "Taxable capital gains", 0, 0, 0, "Capital gains are offset/loss in both SOIs.", "Yes"],
  ["Deductions", "80C gross eligible amount", 181167, 193258, 193258, "Allowed amount capped at Rs 150,000.", "Yes"],
  ["Deductions", "80CCD(1B) NPS", 50000, 25000, 50000, "Two successful NPS Tier I receipts of Rs 25,000 each.", "Yes"],
  ["Deductions", "80D health insurance", 75000, 57217, 57217, "HDFC ERGO Rs 21,306 + Care parents Rs 35,911.", "Yes"],
  ["Deductions", "80G donation deductible", 0, 3500, 3500, "Two Rs 3,500 donation receipts; 50% deductible.", "Yes"],
  ["Tax Credits", "Foreign tax relief", 0, 453, 453, "OneFinance Schedule 15/Form 67 relief.", "Yes"],
  ["Tax Credits", "TDS/TCS", 1147346, 1147346, 1147346, "AIS/Form 16 salary TDS plus Form 16A TDS.", "Yes"],
  ["Tax Credits", "Interest u/s 234B/234C", 0, 588, 0, "Keep editable; final portal may compute this differently.", "Yes"],
];
inputs.getRange(`A2:G${inputRows.length + 1}`).values = inputRows;
inputs.getRange(`C2:E${inputRows.length + 1}`).format.numberFormat = money;
inputs.getRange(`E2:E${inputRows.length + 1}`).format.fill.color = inputFill;
inputs.getRange(`A1:G${inputRows.length + 1}`).format.borders = { preset: "all", style: "thin", color: "#D9D9D9" };
inputs.getRange("A:G").format.autofitColumns();
inputs.getRange("F:F").format.wrapText = true;
inputs.getRange("F:F").format.columnWidth = 48;

// Tax Calc
calc.getRange("A1:D1").values = [["Calculation", "Formula", "Amount", "Notes"]];
calc.getRange("A1:D1").format.fill.color = headerFill;
calc.getRange("A1:D1").format.font.color = "#FFFFFF";
calc.getRange("A1:D1").format.font.bold = true;

const calcRows = [
  ["HRA exemption", "=MIN('Inputs'!E3,'Inputs'!E5*40%,'Inputs'!E4-'Inputs'!E5*10%)", "", "Minimum of HRA received, 40% salary, rent minus 10% salary."],
  ["Salary after section 10 exemptions", "='Inputs'!E2-C2-'Inputs'!E6", "", "Gross salary less HRA exemption and flexi exemption."],
  ["Income from salary", "=C3-'Inputs'!E7-'Inputs'!E8", "", "After standard deduction and professional tax."],
  ["House property loss allowed", "=-MIN('Inputs'!E9,200000)", "", "Self-occupied house property loss capped at Rs 2,00,000."],
  ["Income from capital gains", "='Inputs'!E14", "", "Editable capital-gain taxable income."],
  ["Income from other sources", "='Inputs'!E10+'Inputs'!E11+'Inputs'!E12+'Inputs'!E13", "", "Dividends plus all interest categories."],
  ["Gross total income", "=SUM(C4:C7)", "", "Salary + house property + capital gains + other sources."],
  ["80C allowed", "=MIN('Inputs'!E15,150000)", "", "Cap applied."],
  ["80CCD(1B) NPS", "=MIN('Inputs'!E16,50000)", "", "Additional NPS cap."],
  ["80D health insurance", "='Inputs'!E17", "", "Editable claim as per evidence."],
  ["80G donation", "='Inputs'!E18", "", "Deductible portion only."],
  ["80TTA savings interest", "=MIN('Inputs'!E11,10000)", "", "Savings interest deduction cap."],
  ["Total Chapter VI-A deduction", "=SUM(C9:C13)", "", "80C + NPS + 80D + 80G + 80TTA."],
  ["Total income", "=C8-C14", "", "Before rounding."],
  ["Rounded total income", "=ROUND(C15,-1)", "", "Rounded u/s 288A."],
  ["Tax before cess", "=IF(C16<=250000,0,IF(C16<=500000,(C16-250000)*5%,IF(C16<=1000000,12500+(C16-500000)*20%,112500+(C16-1000000)*30%)))", "", "Old regime slab for non-senior individual."],
  ["Cess", "=C17*4%", "", "Health and education cess."],
  ["Tax with cess", "=C17+C18", "", ""],
  ["Less foreign tax relief", "='Inputs'!E19", "", ""],
  ["Net tax after relief", "=C19-C20", "", ""],
  ["Less TDS/TCS", "='Inputs'!E20", "", ""],
  ["Balance before interest", "=C21-C22", "", "Positive means payable; negative means refund."],
  ["Interest u/s 234B/234C", "='Inputs'!E21", "", "Editable."],
  ["Final payable / (refund)", "=C23+C24", "", "Positive payable, negative refund."],
];
calc.getRange(`A2:A${calcRows.length + 1}`).values = calcRows.map((r) => [r[0]]);
calc.getRange(`B2:B${calcRows.length + 1}`).values = calcRows.map((r) => [r[1]]);
calc.getRange(`C2:C${calcRows.length + 1}`).formulas = calcRows.map((r) => [r[1]]);
calc.getRange(`D2:D${calcRows.length + 1}`).values = calcRows.map((r) => [r[3]]);
calc.getRange(`C2:C${calcRows.length + 1}`).format.numberFormat = money;
calc.getRange(`A1:D${calcRows.length + 1}`).format.borders = { preset: "all", style: "thin", color: "#D9D9D9" };
calc.getRange("A:D").format.autofitColumns();
calc.getRange("B:B").format.columnWidth = 55;
calc.getRange("D:D").format.columnWidth = 42;
calc.getRange("B:D").format.wrapText = true;
calc.getRange("A24:D25").format.fill.color = calcFill;
calc.getRange("A25:D25").format.font.bold = true;

// Comparison
compare.getRange("A1:E1").values = [["Heading", "Kumar CA", "OneFinance", "Which is correct", "My calculation"]];
compare.getRange("A1:E1").format.fill.color = headerFill;
compare.getRange("A1:E1").format.font.color = "#FFFFFF";
compare.getRange("A1:E1").format.font.bold = true;

const comparison = [
  ["Gross salary as per AIS/Form 16", "='Inputs'!C2", "='Inputs'!D2", "Both correct", "='Inputs'!E2"],
  ["HRA received", "='Inputs'!C3", "='Inputs'!D3", "Both correct", "='Inputs'!E3"],
  ["Annual rent considered", "='Inputs'!C4", "='Inputs'!D4", "OneFinance correct", "='Inputs'!E4"],
  ["HRA exemption", "=MIN('Inputs'!C3,'Inputs'!C5*40%,'Inputs'!C4-'Inputs'!C5*10%)", "=MIN('Inputs'!D3,'Inputs'!D5*40%,'Inputs'!D4-'Inputs'!D5*10%)", "OneFinance correct", "='Tax Calc'!C2"],
  ["Flexi / other section 10 exemption", "='Inputs'!C6", "='Inputs'!D6", "OneFinance/Form 16 correct", "='Inputs'!E6"],
  ["Standard deduction", "='Inputs'!C7", "='Inputs'!D7", "Both correct", "='Inputs'!E7"],
  ["Professional tax", "='Inputs'!C8", "='Inputs'!D8", "Kumar/Form 16 correct", "='Inputs'!E8"],
  ["Income from salary", "='Inputs'!C2-MIN('Inputs'!C3,'Inputs'!C5*40%,'Inputs'!C4-'Inputs'!C5*10%)-'Inputs'!C6-'Inputs'!C7-'Inputs'!C8", "='Inputs'!D2-MIN('Inputs'!D3,'Inputs'!D5*40%,'Inputs'!D4-'Inputs'!D5*10%)-'Inputs'!D6-'Inputs'!D7-'Inputs'!D8", "Neither exact", "='Tax Calc'!C4"],
  ["House property loss allowed", "=-MIN('Inputs'!C9,200000)", "=-MIN('Inputs'!D9,200000)", "Both correct", "='Tax Calc'!C5"],
  ["Taxable capital gains", "='Inputs'!C14", "='Inputs'!D14", "Both correct", "='Inputs'!E14"],
  ["Income from other sources", "=SUM('Inputs'!C10:C13)", "=SUM('Inputs'!D10:D13)", "OneFinance correct", "='Tax Calc'!C7"],
  ["Gross total income", "=B9+B10+B11+B12", "=C9+C10+C11+C12", "Neither exact", "='Tax Calc'!C8"],
  ["80C allowed", "=MIN('Inputs'!C15,150000)", "=MIN('Inputs'!D15,150000)", "Both correct due to cap", "='Tax Calc'!C9"],
  ["80CCD(1B) NPS", "=MIN('Inputs'!C16,50000)", "=MIN('Inputs'!D16,50000)", "My evidence-based value is correct", "='Tax Calc'!C10"],
  ["80D health insurance", "='Inputs'!C17", "='Inputs'!D17", "OneFinance correct", "='Tax Calc'!C11"],
  ["80G donation", "='Inputs'!C18", "='Inputs'!D18", "OneFinance correct", "='Tax Calc'!C12"],
  ["80TTA", "=MIN('Inputs'!C11,10000)", "=MIN('Inputs'!D11,10000)", "Both correct", "='Tax Calc'!C13"],
  ["Total Chapter VI-A deduction", "=SUM(B14:B18)", "=SUM(C14:C18)", "Neither exact", "='Tax Calc'!C14"],
  ["Rounded total income", "=ROUND(B13-B19,-1)", "=ROUND(C13-C19,-1)", "Neither exact", "='Tax Calc'!C16"],
  ["Tax with cess", "=IF(B20<=250000,0,IF(B20<=500000,(B20-250000)*5%,IF(B20<=1000000,12500+(B20-500000)*20%,112500+(B20-1000000)*30%)))*104%", "=IF(C20<=250000,0,IF(C20<=500000,(C20-250000)*5%,IF(C20<=1000000,12500+(C20-500000)*20%,112500+(C20-1000000)*30%)))*104%", "Neither exact", "='Tax Calc'!C19"],
  ["Foreign tax relief", "='Inputs'!C19", "='Inputs'!D19", "OneFinance correct", "='Tax Calc'!C20"],
  ["TDS/TCS", "='Inputs'!C20", "='Inputs'!D20", "Both correct", "='Tax Calc'!C22"],
  ["Final payable / (refund)", "=-1610", "=16010", "Neither exact", "='Tax Calc'!C25"],
];
compare.getRange(`A2:A${comparison.length + 1}`).values = comparison.map((r) => [r[0]]);
compare.getRange(`B2:B${comparison.length + 1}`).formulas = comparison.map((r) => [r[1]]);
compare.getRange(`C2:C${comparison.length + 1}`).formulas = comparison.map((r) => [r[2]]);
compare.getRange(`D2:D${comparison.length + 1}`).values = comparison.map((r) => [r[3]]);
compare.getRange(`E2:E${comparison.length + 1}`).formulas = comparison.map((r) => [r[4]]);
compare.getRange(`B2:C${comparison.length + 1}`).format.numberFormat = money;
compare.getRange(`E2:E${comparison.length + 1}`).format.numberFormat = money;
compare.getRange(`A1:E${comparison.length + 1}`).format.borders = { preset: "all", style: "thin", color: "#D9D9D9" };
compare.getRange("A:E").format.autofitColumns();
compare.getRange("D:D").format.columnWidth = 28;
compare.getRange("D:D").format.wrapText = true;

// Summary
summary.getRange("A1:E1").merge();
summary.getRange("A1").values = [["FY26 Old Regime SOI Review"]];
summary.getRange("A1").format.fill.color = headerFill;
summary.getRange("A1").format.font.color = "#FFFFFF";
summary.getRange("A1").format.font.bold = true;
summary.getRange("A1").format.font.size = 16;
summary.getRange("A1:E1").format.rowHeight = 28;

summary.getRange("A3:A8").values = [
  ["Kumar CA result"],
  ["OneFinance result"],
  ["My calculated result"],
  ["Best-supported SOI"],
  ["Main correction 1"],
  ["Main correction 2"],
];
summary.getRange("B3:B5").formulas = [
  ["='CA Comparison'!B24"],
  ["='CA Comparison'!C24"],
  ["=ROUND('Tax Calc'!C25,0)"],
];
summary.getRange("B6:B8").values = [
  ["OneFinance is closer, but needs corrections"],
  ["Use Rs 7.20L rent, not Rs 7.80L"],
  ["Use Rs 50,000 NPS and Rs 57,217 80D"],
];
summary.getRange("B3:B5").format.numberFormat = money;
summary.getRange("A3:B8").format.borders = { preset: "all", style: "thin", color: "#D9D9D9" };
summary.getRange("A3:A8").format.fill.color = subFill;
summary.getRange("A3:A8").format.font.bold = true;
summary.getRange("B5").format.fill.color = calcFill;
summary.getRange("B5").format.font.bold = true;

summary.getRange("D3:E8").values = [
  ["Editable Sheet", "Inputs"],
  ["Formula Sheet", "Tax Calc"],
  ["Comparison Sheet", "CA Comparison"],
  ["Source Notes", "Source Notes"],
  ["How to play", "Change yellow cells in Inputs column E."],
  ["Caution", "This is a review model, not a filed return."],
];
summary.getRange("D3:E8").format.borders = { preset: "all", style: "thin", color: "#D9D9D9" };
summary.getRange("D3:D8").format.fill.color = subFill;
summary.getRange("D3:D8").format.font.bold = true;
summary.getRange("A:E").format.autofitColumns();
summary.getRange("E:E").format.columnWidth = 42;
summary.getRange("E:E").format.wrapText = true;

// Sources
sources.getRange("A1:D1").values = [["Area", "Document reviewed", "Supported number", "Notes"]];
sources.getRange("A1:D1").format.fill.color = headerFill;
sources.getRange("A1:D1").format.font.color = "#FFFFFF";
sources.getRange("A1:D1").format.font.bold = true;
const sourceRows = [
  ["Salary/TDS", "Form16_AX042.pdf; AIS PDF", "Gross salary Rs 55,75,000; TDS/TCS Rs 11,47,346", "Form 16 also shows professional tax Rs 2,500."],
  ["Rent/HRA", "Rental Receipt.pdf", "Rs 60,000 per month; annual rent Rs 7,20,000", "This supports HRA exemption Rs 5,55,000."],
  ["Home loan", "HSBC provisional interest certificate", "Interest Rs 2,76,118.70; principal Rs 1,13,581.30", "House-property loss capped at Rs 2,00,000."],
  ["NPS", "NPS (1).pdf; NPS receipt 2.pdf", "Rs 25,000 + Rs 25,000", "Supports full Rs 50,000 under 80CCD(1B)."],
  ["80D", "HDFC ergo2.pdf; Care parents insurance.pdf", "Rs 21,306 + Rs 35,911 = Rs 57,217", "No separate parent medical bills found in ZIP to support Rs 75,000."],
  ["80G", "Two donation photos", "Rs 7,000 gross; Rs 3,500 deductible", "Thenammal Old Age Home receipts."],
  ["Other income", "AIS; OneFinance SOI; US stock reports", "Dividends Rs 14,684; interest Rs 20,725", "Includes refund interest and US income."],
  ["Foreign tax relief", "OneFinance Schedule 15 / US docs", "Rs 453", "Kumar CA did not claim this."],
];
sources.getRange(`A2:D${sourceRows.length + 1}`).values = sourceRows;
sources.getRange(`A1:D${sourceRows.length + 1}`).format.borders = { preset: "all", style: "thin", color: "#D9D9D9" };
sources.getRange("A:D").format.autofitColumns();
sources.getRange("D:D").format.columnWidth = 54;
sources.getRange("D:D").format.wrapText = true;

for (const range of [
  inputs.getRange("A2:A21"),
  calc.getRange("A2:A25"),
  compare.getRange("A2:A24"),
  sources.getRange("A2:A9"),
]) {
  range.format.fill.color = subFill;
}
inputs.getRange("E2:E21").format.borders = { preset: "all", style: "thin", color: "#BF9000" };
inputs.getRange("A1:G21").format.wrapText = true;

await fs.mkdir(outputDir, { recursive: true });

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

const calcPreview = await workbook.inspect({
  kind: "region",
  sheetId: "Tax Calc",
  range: "A1:D25",
  maxChars: 4000,
});
console.log(calcPreview.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
