# Venveel Article Workflow

Use this flow to publish future articles with fewer manual steps.

## Create a Draft

```bash
npm run article:new -- "Your Article Title"
```

This creates a new MDX file in `content/` with frontmatter, a slug, and the standard article sections.

## Before Publishing

1. Fill in `description`, `category`, `readTime`, and the article body.
2. Replace any placeholder affiliate links with real URLs.
3. Add a clear last-updated note inside the article when prices, products, or subscriptions are discussed.
4. Run:

```bash
npm run content:check
npm run check
```

## Recommended Content Rules

- Keep one article per file in `content/`.
- Keep the filename and `slug` the same.
- Use `featured: true` only for articles you want on the homepage.
- Keep templates prefixed with `_` so they are ignored by the site.
- For buying guides, include methodology, sources, affiliate disclosure, and the date you last checked prices.
