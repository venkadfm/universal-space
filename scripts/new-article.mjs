import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error("Usage: npm run article:new -- \"Article title\"");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/&/g, " and ")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

if (!slug) {
  console.error("Could not create a valid slug from that title.");
  process.exit(1);
}

const contentDir = path.join(process.cwd(), "content");
const target = path.join(contentDir, `${slug}.mdx`);

if (fs.existsSync(target)) {
  console.error(`Article already exists: content/${slug}.mdx`);
  process.exit(1);
}

const now = new Date();
const month = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
}).format(now);

const body = `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
category: "Artificial Intelligence"
author: "Venveel"
date: "${month}"
featured: false
slug: "${slug}"
readTime: "5 min read"
---

## 30-Second Summary

- Who this is for:
- Best recommendation:
- Cost:
- Best alternative:

<RecommendationBox title="Venveel Recommendation">

Write the one-sentence recommendation here.

</RecommendationBox>

## Who Is This For?

Write 2-3 short paragraphs.

## Why It Matters

Explain the problem clearly.

## Main Guide

Write the article body here.

## Venveel Verdict

Summarize the recommendation in 3-5 lines.

## Frequently Asked Questions

### Question 1

Answer.

### Question 2

Answer.

## Related Guides

- Guide 1
- Guide 2
- Guide 3
`;

fs.writeFileSync(target, body, "utf8");
console.log(`Created content/${slug}.mdx`);
