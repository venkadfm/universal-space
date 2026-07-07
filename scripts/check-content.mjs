import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");
const requiredFields = ["title", "description", "category", "author", "date", "slug"];
const files = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));

const seenSlugs = new Set();
const errors = [];

for (const file of files) {
  const fullPath = path.join(contentDir, file);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(source);

  for (const field of requiredFields) {
    if (!data[field] || typeof data[field] !== "string") {
      errors.push(`${file}: missing or invalid "${field}"`);
    }
  }

  if (typeof data.slug === "string") {
    if (seenSlugs.has(data.slug)) {
      errors.push(`${file}: duplicate slug "${data.slug}"`);
    }
    seenSlugs.add(data.slug);

    const expectedFile = `${data.slug}.mdx`;
    if (file !== expectedFile) {
      errors.push(`${file}: slug should match filename "${expectedFile}"`);
    }
  }

  if (typeof data.date === "string" && Number.isNaN(new Date(data.date).getTime())) {
    errors.push(`${file}: date "${data.date}" is not parseable`);
  }

  if (source.includes('href="#"')) {
    errors.push(`${file}: replace placeholder affiliate href="#" before publishing`);
  }
}

if (errors.length > 0) {
  console.error("Content check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Content check passed for ${files.length} article(s).`);
