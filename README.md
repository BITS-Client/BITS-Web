<div align="center">
  <h1>BITS Corporate Website</h1>
  <p>
    Official website for <strong>Banten IT Solutions (BITS)</strong> — digital solutions company in Banten, Indonesia.
  </p>
  <p>
    <a href="https://bits.co.id">
      <img src="https://img.shields.io/badge/bits.co.id-Online-00C853?style=for-the-badge&logo=statuspage&logoColor=white" alt="bits.co.id Online" />
    </a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/SvelteKit-FF3E00?style=flat&logo=svelte&logoColor=white" alt="SvelteKit" />
    <img src="https://img.shields.io/badge/Svelte%205-FF3E00?style=flat&logo=svelte&logoColor=white" alt="Svelte 5" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Sanity-F03E2F?style=flat&logo=sanity&logoColor=white" alt="Sanity" />
    <img src="https://img.shields.io/badge/Lucide-F56565?style=flat&logo=lucide&logoColor=white" alt="Lucide" />
    <img src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=flat&logo=cloudflarepages&logoColor=white" alt="Cloudflare Pages" />
    <img src="https://img.shields.io/badge/Resend-000000?style=flat&logo=resend&logoColor=white" alt="Resend" />
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat" alt="MIT License" />
  </p>
</div>

---

## ✨ Features

| Feature                           | Description                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Multilingual (i18n)**           | Indonesian (`id`) & English (`en`) via `/[lang]/` route segment — locale-specific fields in Sanity, URL-based language switching.           |
| **Sanity CMS**                    | Headless content for services, portfolio, blog, pages & settings — live GROQ queries via `web/src/lib/sanity`.                              |
| **Contact + Newsletter + Resend** | Server-side Zod validation, sanitization, Cloudflare Turnstile CAPTCHA, Resend email delivery + rate limiting.                              |
| **SEO Optimized**                 | Dynamic meta, OpenGraph, JSON-LD, canonical URLs, `sitemap.xml` per locale, `robots.txt`.                                                   |
| **Dark / Light Theme**            | Theme store + `dark:` variants, persisted preference.                                                                                       |
| **Animations**                    | Scroll-reveal, counters, floating elements — localized in `web/src/lib/components/animations`.                                              |
| **Static-First**                  | `@sveltejs/adapter-static` SSG + `404.html` fallback; dynamic routes served by Cloudflare Functions.                                        |
| **Icon System**                   | `@lucide/svelte` with centralized re-export (`$lib/icons/lucide`) + local brand SVGs (`$lib/icons/brand`) + CMS-driven `iconMap`.           |
| **Cloudflare Native**             | Deployed to Cloudflare Pages via GitHub Actions (`wrangler pages deploy`).                                                                  |
| **Code Quality**                  | Prettier 3 + ESLint 10 + `simple-git-hooks` + `lint-staged` — auto-format on commit, type-check + build on push, weekly Dependabot updates. |

## 🛠️ Tech Stack

| Layer                 | Technology                                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**         | [SvelteKit 2](https://kit.svelte.dev/) with [Svelte 5 Runes](https://svelte.dev/) (`$state`, `$derived`, `$props`).                 |
| **Styling**           | [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`) + custom CSS design system.                                   |
| **Language**          | [TypeScript 6](https://www.typescriptlang.org/).                                                                                    |
| **Icons**             | [`@lucide/svelte`](https://lucide.dev/) (migrated from deprecated `lucide-svelte`) + local brand icons.                             |
| **Build Tool**        | [Vite 8](https://vitejs.dev/).                                                                                                      |
| **CMS**               | [Sanity](https://www.sanity.io/) + `@sanity/client` + `groq` + [`@portabletext/svelte`](https://github.com/portabletext/to-svelte). |
| **Validation**        | [Zod](https://zod.dev/) — API request schemas.                                                                                      |
| **Email**             | [Resend](https://resend.com/) + Cloudflare Turnstile.                                                                               |
| **Adapter / Hosting** | [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) → [Cloudflare Pages](https://pages.cloudflare.com/).       |
| **Tooling**           | ESLint 10, Prettier 3, `svelte-check`, `simple-git-hooks`, `lint-staged`, GitHub Actions, Dependabot.                               |

---

## 📁 Project Structure

```text
BITS-Web/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml       # GitHub Actions → Cloudflare Pages
│   └── dependabot.yml       # Weekly deps + GitHub Actions updates
├── docs/                    # PRD, tech stack, coding standards, best practices
├── studio/                  # Sanity Studio (CMS workspace)
│   ├── schemas/             # Sanity document schemas (post, project, service, client…)
│   ├── scripts/             # export.mjs, seed.mjs, seed-safe.mjs, audit-seed.mjs
│   ├── data/                # Exported JSON seed data
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   └── package.json         # bits-studio
├── web/                     # SvelteKit app
│   ├── src/
│   │   ├── app.html         # HTML template
│   │   ├── app.css          # Tailwind v4 @theme + global styles
│   │   ├── app.d.ts         # SvelteKit type overrides
│   │   ├── hooks.server.ts  # Security headers
│   │   ├── lib/
│   │   │   ├── components/  # ui/ (animation, card, content, cta, form, header, hero, layout, misc, navigation, section, seo) + SEO.svelte
│   │   │   ├── icons/       # lucide.ts (centralized re-export) + brand/ (local brand SVGs)
│   │   │   ├── sanity/      # Sanity client + GROQ queries
│   │   │   ├── stores/      # theme store
│   │   │   ├── types/       # Locale type: 'id' | 'en', content types
│   │   │   └── utils/       # seo, share, helpers
│   │   └── routes/
│   │       ├── +layout.svelte / +error.svelte
│   │       ├── [lang]/      # Home, about, services, portfolio, blog, contact, privacy, terms, sitemap.xml
│   │       └── api/         # contact/, newsletter/ → Resend
│   ├── static/              # Favicons, robots.txt, shared.css
│   ├── eslint.config.js
│   ├── svelte.config.js     # adapter-static (output: build/)
│   ├── vite.config.ts       # tailwindcss() + sveltekit()
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json         # bits-web-app
├── .prettierrc
├── .prettierignore
├── pnpm-workspace.yaml
└── package.json             # bits-web (workspace root)
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ and [pnpm](https://pnpm.io/) 10+
- A [Sanity](https://www.sanity.io/) project (`PUBLIC_SANITY_PROJECT_ID` + dataset)
- Optional: [Resend](https://resend.com) + [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) for contact/newsletter APIs
- Optional: [Cloudflare](https://dash.cloudflare.com) account for Pages deploy (`bits-web` project)

### 1. Clone & Install

```bash
git clone https://github.com/BITS-Client/BITS-Web.git
cd BITS-Web
pnpm install
```

### 2. Configure (Local)

```bash
cp web/.env.example web/.env
```

Edit `web/.env` — see [Environment Configuration](#️-environment-configuration).

### 3. Develop

```bash
pnpm dev
# → http://localhost:5173

# Sanity Studio:
cd studio && pnpm dev
```

### 4. Build

```bash
pnpm build
# → outputs to web/build/ (static SSG + 404.html fallback)
```

### 5. Deploy

Production deploys run automatically via GitHub Actions on `push` to `main` and `workflow_dispatch`. See [Deployment](#-deployment) below.

---

## 💻 Development

### Scripts

| Command                        | Description                                                     |
| ------------------------------ | --------------------------------------------------------------- |
| `pnpm dev`                     | Start SvelteKit dev server with HMR (`vite dev --host`).        |
| `pnpm build`                   | Build app + Studio (workspace filters).                         |
| `pnpm preview`                 | Preview the production build with Vite.                         |
| `pnpm check`                   | `svelte-kit sync` + `svelte-check` type-check.                  |
| `pnpm check:watch`             | Type-check in watch mode.                                       |
| `pnpm lint`                    | Run ESLint over the project.                                    |
| `pnpm lint:fix`                | Apply automatic ESLint fixes.                                   |
| `pnpm format`                  | Format all files with Prettier.                                 |
| `pnpm format:check`            | Verify formatting without writing.                              |
| `pnpm export`                  | Export published Sanity data to `studio/data/*.json`.           |
| `pnpm export -- --with-raw`    | Export + raw snapshots and full raw dumps.                      |
| `pnpm export -- --with-assets` | Export + download assets (`assets-manifest.json`).              |
| `pnpm audit:seed`              | Validate seed JSON integrity (unique names/orders, `_key`s).    |
| `pnpm seed`                    | Import `studio/data/*.json` into Sanity (needs `SANITY_TOKEN`). |
| `pnpm seed:safe`               | Audit first, then seed.                                         |

### Code Style

- **Quotes**: single, **Semi**: off, **Tabs**: on, **Print width**: 100.
- **Svelte 5 Runes**: `$state`, `$derived`, `$props` only — no `export let`.
- **Icons**: import individually from `$lib/icons/lucide` (or `@lucide/svelte`); never barrel imports.
- **Styling**: Tailwind 4 + `dark:` variants; Header/Footer keep separate CSS files, everything else uses Tailwind.
- **Content**: never hardcode business content — all copy lives in Sanity CMS with `{ id, en }` locale fields.

More conventions: [`AGENTS.md`](./AGENTS.md), [`docs/CODING_STANDARD.md`](./docs/CODING_STANDARD.md), [`web/src/lib/components/AGENTS.md`](./web/src/lib/components/AGENTS.md), [`studio/AGENTS.md`](./studio/AGENTS.md).

### Git Hooks

`simple-git-hooks` + `lint-staged` install via `prepare`:

- **pre-commit**: Prettier formats `*.{js,ts,svelte,json,css,md,yml,yaml}` + ESLint fixes `src/**/*.{ts,svelte}`.
- **pre-push**: `pnpm run check && pnpm run build` — must pass before push.

Skip with `git commit --no-verify` / `git push --no-verify` if needed.

---

## ⚙️ Environment Configuration

No hardcoded config in the source — every environment-specific value comes from env vars.
**Local dev** uses `web/.env` (app, gitignored) and `studio/.env` (Studio + scripts, gitignored). **CI/Production** keeps non-sensitive config in GitHub **Variables** and true secrets in GitHub **Secrets**. See [`web/.env.example`](./web/.env.example) and [`studio/.env.example`](./studio/.env.example).

### App (`web/.env`)

| Variable                    | Description                                       | Remote store                           |
| --------------------------- | ------------------------------------------------- | -------------------------------------- |
| `PUBLIC_SITE_URL`           | Canonical site URL (SEO/canonical/OG).            | GitHub Actions **variable**.           |
| `PUBLIC_SANITY_PROJECT_ID`  | Sanity project ID (required, no fallback).        | GitHub Actions **variable**.           |
| `PUBLIC_SANITY_DATASET`     | Sanity dataset (defaults `production`).           | GitHub Actions **variable**.           |
| `PUBLIC_SANITY_API_VERSION` | Sanity API version (defaults `2024-01-01`).       | GitHub Actions **variable**.           |
| `PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key (public).                      | GitHub Actions **variable**.           |
| `PUBLIC_CONTACT_EMAIL`      | General contact email (SEO JSON-LD, legal pages). | GitHub Actions **variable**.           |
| `TURNSTILE_SECRET_KEY`      | Turnstile secret key (private).                   | GitHub **secret** → synced to Pages.   |
| `RESEND_API_KEY`            | [resend.com](https://resend.com) API key.         | GitHub **secret** → synced to Pages.   |
| `PUBLIC_CONTACT_TO_EMAIL`   | Recipient for contact/newsletter notifications.   | GitHub **variable** → synced to Pages. |
| `PUBLIC_CONTACT_FROM_EMAIL` | Sender email for contact form (verified domain).  | GitHub **variable** → synced to Pages. |

Dev note: in `import.meta.env.DEV` mode the app falls back to official Cloudflare Turnstile **test keys** (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`) — no real keys needed locally.

### Sanity Studio & scripts (`studio/.env`)

| Variable                   | Description                                           | Used by                              |
| -------------------------- | ----------------------------------------------------- | ------------------------------------ |
| `SANITY_STUDIO_PROJECT_ID` | Sanity project ID for Studio (required, no fallback). | `sanity.config.ts`, `sanity.cli.ts`. |
| `SANITY_PROJECT_ID`        | Sanity project ID for export/seed scripts.            | `pnpm export`, `pnpm seed`.          |
| `SANITY_TOKEN`             | Sanity write token — never commit.                    | `pnpm export`, `pnpm seed`.          |

### GitHub Actions deploy secrets

| Secret                  | Description                        | Where to get it                       |
| ----------------------- | ---------------------------------- | ------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Deploy token (Pages `Edit` scope). | Cloudflare → My Profile → API Tokens. |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID.             | Cloudflare dashboard (right sidebar). |

---

## 📡 API

| Endpoint               | Method | Description                                                                                  |
| ---------------------- | ------ | -------------------------------------------------------------------------------------------- |
| `POST /api/contact`    | POST   | Zod validation, HTML sanitization, Turnstile verification, rate limiting (5/min/IP), Resend. |
| `POST /api/newsletter` | POST   | Newsletter subscription with validation + Turnstile, Resend email.                           |

---

## 🚀 Deployment

- **CI file**: `.github/workflows/deploy.yml` (aligned with `BataBagus-Web` — proven pattern).
- **Triggers**: `push` to `main`, `pull_request` (CI only), `workflow_dispatch` (manual, optional `ref` input).
- **Job**: `☁️ Deploy to Cloudflare` (single job) — `📥 Checkout` → `📦 Setup pnpm` → `🟢 Setup Node.js 24` → `📚 Install` → `🔍 Typecheck` → `🧹 Lint` → `🎨 Format check` → `🏗️ Build` (with `PUBLIC_SANITY_*` + `PUBLIC_TURNSTILE_SITE_KEY`) → `🏗️ Ensure Pages project exists` → `🔐 Set Pages Secrets (when deploy)` → `🚀 Deploy` (`wrangler pages deploy build`) → `🎉 Summary`.
- **Project**: `bits-web` on Cloudflare Pages. Output: `web/build/` (static, deploy step runs in `web/`).
- **Custom Domain**: `bits.co.id` — add once via Dashboard → `Workers & Pages → bits-web → Settings → Custom domains`. After the first add, all future `git push` deploys auto-serve the domain.
- **Dependabot**: `.github/dependabot.yml` — weekly `github-actions` (Mon 02:30) + `npm` for `/` and `/sanity` (Mon 03:00/03:30), grouped dev-deps minor/patch, ignores `typescript` major.
- **Secrets (GitHub)**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY` — secrets only.
- **Variables (GitHub)**: `PUBLIC_SITE_URL`, `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SANITY_API_VERSION`, `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_CONTACT_EMAIL`, `PUBLIC_CONTACT_TO_EMAIL`, `PUBLIC_CONTACT_FROM_EMAIL`, `PUBLIC_PHONE_DISPLAY`, `PUBLIC_WHATSAPP_NUMBER` — non-sensitive config with a consistent `PUBLIC_` prefix.
- **Cloudflare Pages secrets (set-when-deploy)**: `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `PUBLIC_CONTACT_TO_EMAIL`, `PUBLIC_CONTACT_FROM_EMAIL` — synced via `wrangler pages secret put` in CI (see `🔐 Set Cloudflare Pages Secrets`).

Production URL: **https://bits.co.id**

---

## 🗄️ Sanity Data Management

```bash
# Export published schema JSON only (default; lightweight)
# Prereqs in studio/.env: SANITY_PROJECT_ID + SANITY_TOKEN
pnpm export

# Full export: published + raw + assets
pnpm export -- --with-raw --with-assets

# Validate seed integrity before import
pnpm audit:seed

# Safe import (runs audit first, then seed)
pnpm seed:safe

# Import subset only
pnpm seed -- --only=posts --skip-assets
```

Notes:

- `pnpm seed` reads per-schema JSON files in `studio/data/*.json`.
- `clients` data must have unique `name` and unique numeric `order` (enforced by audit + export).
- Posts use `category` type `blog`/`both`; projects use `portfolio`/`both`.
- See [`studio/scripts/README.md`](./studio/scripts/README.md) for details.

---

## 🏢 Company Information

- **Name:** Banten IT Solutions
- **Email:** admin@bits.co.id
- **Phone / WhatsApp:** +62 819 678 048
- **Address:** Jl. Komp. Taman Pesona, Taktakan, Kota Serang, Banten 42162, Indonesia
- **Website:** https://bits.co.id

## 🤝 Contributing

1. Follow the coding standards in [`docs/CODING_STANDARD.md`](./docs/CODING_STANDARD.md)
2. Use TypeScript + Svelte 5 runes
3. Follow existing component patterns in [`web/src/lib/components/AGENTS.md`](./web/src/lib/components/AGENTS.md)
4. Run `pnpm format:check && pnpm lint && pnpm check` before pushing
5. Ensure accessibility standards

## 📄 License

MIT License. See [`LICENSE`](./LICENSE).

---

<div align="center">
  Developed with ❤️ by <a href="https://bits.co.id"><strong>Banten IT Solutions</strong></a>
</div>
