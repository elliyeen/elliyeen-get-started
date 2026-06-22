# Elliyeen Research — Marketing Site

A high-performance marketing landing page for **Elliyeen Research**, built with Next.js 15, Tailwind CSS v4, and TypeScript. Deployed as a static export on Cloudflare Pages.

---

## Live Site

**[elliyeen-get-started.pages.dev](https://elliyeen-get-started.pages.dev)**

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | Next.js 15 (App Router)           |
| Styling     | Tailwind CSS v4                   |
| Language    | TypeScript                        |
| Icons       | lucide-react                      |
| Deployment  | Cloudflare Pages (static export)  |
| Source      | GitHub — `elliyeen/elliyeen-get-started` |

---

## Project Structure

```
elliyeen-get-started/
├── app/
│   ├── CyclingWord.tsx   # Client component — cycling hero headline words
│   ├── globals.css       # Tailwind base styles
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main landing page
├── next.config.js        # Static export config
├── postcss.config.js     # Tailwind v4 PostCSS plugin
├── tailwind.config.ts    # Tailwind configuration
└── package.json
```

---

## Key Features

- **Cycling hero headline** — "Revenue.", "Profit.", "Customer Satisfaction." cycle with fade animation, each in a distinct brand color (currency blue / dollar green)
- **Sticky navigation** — frosted glass nav locks to top on scroll
- **AI Advisor section** — prompt-based UI showcasing Elliyeen AI
- **Process section** — four-step methodology (Understand → Identify → Design → Engineer)
- **Case studies** — three industry case studies with metrics
- **CTA section** — dark full-width call to action
- **Footer** — four-column link grid with LinkedIn profile link

---

## Colors

| Token           | Hex       | Usage                          |
|-----------------|-----------|--------------------------------|
| Currency Blue   | `#1B5EA8` | "Revenue.", graph, accents     |
| Dollar Green    | `#85BB65` | "Profit." cycling word         |
| Background      | `#f7f4ee` | Warm off-white page background |
| Ink             | `#111111` | Body text, nav CTA             |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
open http://localhost:3000
```

---

## Build & Deploy

### Build static export

```bash
npm run build
# Output written to: out/
```

### Deploy to Cloudflare Pages

```bash
wrangler pages deploy out --project-name=elliyeen-get-started --branch=master
```

### Push to GitHub

```bash
git add .
git commit -m "your message"
git push origin master
```

---

## Deployment Architecture

```
Local dev  →  npm run build  →  out/  →  wrangler pages deploy  →  Cloudflare CDN
GitHub repo (source of truth) — manual deploy via Wrangler CLI
```

---

## LinkedIn

[linkedin.com/in/abbasabdullah](https://www.linkedin.com/in/abbasabdullah/)
