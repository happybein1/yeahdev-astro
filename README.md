# YeahDev — Astro Site

> Practical articles to help you build and grow your business.
> Live at [yeahdev.com](https://yeahdev.com)

## Stack

- **Framework:** [Astro](https://astro.build) v4 (static output)
- **Styling:** Plain CSS with CSS variables (no Tailwind, no framework)
- **Analytics:** Google Analytics 4 (`G-YT5223V63F`)
- **Hosting:** Cloudflare Pages

## Project Structure

```
yeahdev-astro/
├── public/
│   ├── images/
│   │   └── og-home.png          # OG image (used for all social sharing)
│   └── styles/
│       ├── global.css           # Header, footer, nav, shared tokens
│       └── article.css          # Article page styles
├── src/
│   ├── layouts/
│   │   └── Base.astro           # Main layout: SEO, OG tags, GA, header, footer
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   └── articles/
│   │       ├── best-free-ai-video-tools-2026.astro
│   │       └── brand-image-campaigns-strategic-justification.astro
│   └── styles/                  # Source styles (same as public/styles)
├── astro.config.mjs
└── package.json
```

## Getting Started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to ./dist/
npm run preview    # preview the build locally
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. In Cloudflare → **Pages → Create a project → Connect to Git**
3. Select your repo, then set:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Hit deploy → add `yeahdev.com` as a custom domain

## Adding a New Article

1. Create `src/pages/articles/your-article-slug.astro`
2. Copy the structure from an existing article
3. Update the `<Base>` props: `title`, `description`, `articleDate`, `articleTag`
4. Add the article to the dropdown in `src/layouts/Base.astro`
5. Add a card to the `articles` array in `src/pages/index.astro`
6. Commit and push — Cloudflare auto-deploys

## SEO Features (all automatic via Base.astro)

- `<title>` and `<meta name="description">`
- `<link rel="canonical">`
- Open Graph tags (title, description, image, type, locale)
- Twitter/X card (`summary_large_image`)
- `article:published_time` and `article:tag` for article pages
- JSON-LD structured data (WebSite or Article schema)
- Google Analytics 4
