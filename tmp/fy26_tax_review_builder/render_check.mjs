import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const p='/Users/venkad/universal-space/outputs/fy26_tax_review/fy26_old_regime_review.xlsx';
const input=await FileBlob.load(p);
const wb=await SpreadsheetFile.importXlsx(input);
for (const sheetName of ['Summary','Inputs','Tax Calc','CA Comparison','Source Notes']) {
  const blob=await wb.render({sheetName, autoCrop:'all', scale:1, format:'png'});
  const bytes=new Uint8Array(await blob.arrayBuffer());
  await fs.writeFile(`/Users/venkad/universal-space/outputs/fy26_tax_review/render_${sheetName.replaceAll(' ','_')}.png`, bytes);
  console.log(sheetName, bytes.length);
}
