# Banten IT Solutions Website

Modern, multilingual corporate website showcasing digital solutions including custom software development, web design, ERP systems, AI & automation, IT infrastructure, and creative services.

## Important: Never Run These Commands

**DO NOT run** any of the following unless explicitly requested by the user:

- `pnpm dev` / `npm dev` / `npm run dev`
- `pnpm preview`, `pnpm build`
- `pnpm check`, `pnpm lint`

Ask the user to run these commands themselves if needed.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm check

# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm format

# Sanity data export (requires SANITY_TOKEN)
pnpm export

# Sanity data export with raw snapshots and full raw dumps
pnpm export -- --with-raw

# Sanity data export with asset download (assets-manifest + files)
pnpm export -- --with-assets

# Full Sanity export (published + raw + assets)
pnpm export -- --with-raw --with-assets

# Sanity seed audit (validate sanity/data/*.json integrity)
pnpm audit:seed

# Safe seed (audit first, then import)
pnpm seed:safe

# Sanity data seed/import (requires SANITY_TOKEN)
pnpm seed
```

## 📋 Project Overview

**Company:** Banten IT Solutions (BITS)
**Website:** https://bits.co.id
**Tech Stack:** SvelteKit 2 + Svelte 5 + TypeScript + Tailwind CSS 4 + Sanity CMS
**Deployment:** Cloudflare Pages (Static Site Generation with Cloudflare Functions)
**Architecture:** Static-first with dynamic routes handled by Cloudflare Functions

## 🛠️ Technologies

### Core Framework

- **SvelteKit 2.50.1** - Full-stack web framework with file-based routing
- **Svelte 5.48.5** - Component framework with Runes mode (`$state`, `$derived`, `$effect`)
- **TypeScript 5.9.3** - Type-safe development

### Styling & UI

- **Tailwind CSS 4.1.18** - Utility-first CSS framework with Vite integration
- **Lucide Svelte 0.563.0** - Icon library (import individual icons for tree-shaking)
- **Custom CSS** - Advanced animations, glassmorphism effects, dark mode support
- **Design System** - Custom properties for colors, spacing, typography

### CMS & Data

- **Sanity CMS 7.14.1** - Headless content management system
  - `@sanity/client` - API client
  - `@sanity/image-url` - Image optimization
  - `@portabletext/svelte 3.0.1` - Rich text rendering
- **Zod 4.3.6** - Schema validation for forms and API requests

### Development Tools

- **Vite** - Build tool
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Svelte Check** - Type checking

### Deployment

- **@sveltejs/adapter-static 3.0.10** - Static site generation with `strict: false`
- **Cloudflare Pages** - Hosting platform with Cloudflare Functions for dynamic routes
- **Fallback**: `404.html` for unmatched routes

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/       # Reusable Svelte components
│   │   ├── animations/ # ScrollReveal, AnimatedCounter, FloatingElement
│   │   ├── SEO.svelte  # SEO component with meta tags
│   │   ├── Header.svelte
│   │   ├── Footer.svelte
│   │   └── LanguageSwitcher.svelte
│   ├── sanity/          # Sanity CMS client
│   │   ├── client.ts   # Sanity client configuration
│   │   └── queries.ts  # GROQ queries (with locale support)
│   ├── stores/           # Svelte stores
│   │   └── theme.ts   # Dark/light mode store
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts   # Locale type: 'id' | 'en'
│   └── utils/            # Utility functions
│       └── seo.ts      # SEO schema generators
```

## 🌐 Features

### Internationalization (i18n)

- Multi-language support (Indonesian `id` & English `en`)
- Dynamic route segments: `/[lang]/` (e.g., `/id/`, `/en/`)
- Default locale: Indonesian (`id`)
- Content stored in Sanity CMS with locale-specific fields (e.g., `title.id`, `title.en`)
- Locale type defined in `$lib/types/index.ts`
- Language switching via `LanguageSwitcher.svelte` (URL-based, no client-side translation)
- No translation files - all content from Sanity CMS

### SEO Optimization

- Structured data (JSON-LD schemas)
- Dynamic meta tags
- Canonical URLs
- Sitemap generation
- Open Graph & Twitter Card tags

### Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Adaptive components
- Dark/Light theme support

### Animations & Interactions

- Scroll-triggered animations
- Hover effects
- Counter animations
- Smooth transitions

### Accessibility

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support

## 🔧 Configuration

### Environment Variables

Required environment variables (set in `.env` for development, Cloudflare dashboard for production):

```env
# Resend API (Email service)
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=admin@bits.co.id

# Cloudflare Turnstile (CAPTCHA)
# Test key for development: 0x4AAAAAAACEIn84L8pN--7921SPbxZKaInI
VITE_TURNSTILE_SITE_KEY=0x4AAAAAAACEIn84L8pN--7921SPbxZKaInI
TURNSTILE_SECRET_KEY=0x4AAAAAAACEIn84L8pN--7921SPbxZKaInI
```

### Key Files

- `svelte.config.js` - SvelteKit configuration
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
- `.prettierrc` - Prettier configuration

## 📦 Package Manager

**Always use `pnpm`** - DO NOT use npm or yarn

```bash
pnpm install          # Install dependencies
pnpm add <package>   # Add package
pnpm add -D <package>  # Add dev dependency
pnpm remove <package>  # Remove package
```

## 🧪 Testing & Quality

```bash
# Type checking
pnpm check

# Linting
pnpm lint
pnpm lint:fix

# Format code
pnpm format

# Format check
pnpm format:check

# Build (for verification)
pnpm build
```

## 🚢 Deployment

### Static Site Generation

The project uses `@sveltejs/adapter-static` to generate a static site:

```bash
pnpm build
```

Build output is placed in `build/` directory and can be deployed to:

- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Cloudflare Pages Deployment (GitLab Repository Connection)

This project deploys through **Cloudflare Pages Git integration** (connected directly to the GitLab repo).

- Push to branch → Cloudflare builds and deploys automatically
- Pull/Merge Request branches get preview deployments automatically
- Production branch (`main`) deploys to `https://bits.co.id`

#### GitLab CI Responsibility (Quality Gate Only)

GitLab CI in `.gitlab-ci.yml` is used only for code quality checks:

- Security templates (SAST, Secret Detection, Dependency Scanning)
- `install` job (`pnpm install --frozen-lockfile`)
- `validate` job (`pnpm lint` and `pnpm check`)

No deploy job runs in GitLab CI.

#### Environment Variables for Cloudflare Pages

Set these in **Cloudflare Pages → Settings → Environment variables**:

| Variable                  | Description                              |
| ------------------------- | ---------------------------------------- |
| `VITE_SANITY_PROJECT_ID`  | Sanity CMS project ID                    |
| `VITE_SANITY_DATASET`     | Sanity dataset name (e.g., `production`) |
| `VITE_SANITY_API_VERSION` | Sanity API version                       |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key            |
| `TURNSTILE_SECRET_KEY`    | Cloudflare Turnstile secret key          |
| `RESEND_API_KEY`          | Resend API key for emails                |
| `ADMIN_EMAIL`             | Admin email address                      |
| `CONTACT_FROM_EMAIL`      | Sender email for contact form            |
| `NEWSLETTER_FROM_EMAIL`   | Sender email for newsletter              |

## 📚 Important Documentation

- [`AGENTS.md`](./AGENTS.md) - AI Agent rules and conventions (Root)
  - [`src/lib/components/AGENTS.md`](./src/lib/components/AGENTS.md) - UI Patterns & Components
  - [`sanity/AGENTS.md`](./sanity/AGENTS.md) - CMS Schema & Patterns
- [`docs/PRD.md`](./docs/PRD.md) - Product Requirements Document
- [`docs/TECH_STACK.md`](./docs/TECH_STACK.md) - Technology stack details
- [`docs/CODING_STANDARD.md`](./docs/CODING_STANDARD.md) - Coding standards
- [`docs/BEST_PRACTICES.md`](./docs/BEST_PRACTICES.md) - Best practices

## 🗄️ Sanity Data Management

Export and import data from Sanity CMS:

```bash
# Export published schema JSON only (default; lightweight)
export SANITY_TOKEN=sk_your_token
pnpm export

# Export raw snapshots + full raw dumps
pnpm export -- --with-raw

# Export + download assets (creates assets-manifest.json)
pnpm export -- --with-assets

# Full export: published + raw + assets
pnpm export -- --with-raw --with-assets

# Validate seed integrity before import
pnpm audit:seed

# Safe import (runs audit first, then seed)
pnpm seed:safe

# Import seed data to a fresh Sanity project
export SANITY_TOKEN=sk_your_token
pnpm seed

# Import subset only (skip asset upload)
pnpm seed -- --only=posts --skip-assets

# Import only one collection
pnpm seed -- --only=clients
```

Notes:

- `pnpm seed` reads per-schema JSON files in `sanity/data/*.json`.
- Raw files (`*.raw.json`, `all-data.raw.json`, `all-documents.raw.json`, `drafts-data.json`) are optional and only generated with `--with-raw`.
- Asset download is optional and only needed when migrating to a different dataset/project, or when you need to rehydrate assets via `assets-manifest.json`.
- Export now fails fast when `client` documents contain duplicate `name` or duplicate numeric `order`.

See [`sanity/scripts/README.md`](./sanity/scripts/README.md) for details.

## 🏗️ Project Architecture

### File Structure

```
src/lib/
├── types/           # TypeScript type definitions
│   └── index.ts   # Locale type: 'id' | 'en'
├── components/       # Reusable Svelte components
├── sanity/          # Sanity CMS client and queries
├── stores/          # Svelte stores (theme, etc.)
└── utils/           # Utility functions

sanity/
├── schemas/         # Sanity CMS schemas
├── scripts/         # Sanity data export/import scripts
│   ├── export.mjs   # Export data from Sanity
│   └── seed.mjs     # Import seed data to Sanity
├── data/            # Exported JSON seed data
└── ...
```

### Internationalization (i18n)

- **Locale Type:** Defined in `$lib/types/index.ts` as `'id' | 'en'`
- **Route Structure:** `/[lang]/` dynamic segment (e.g., `/id/`, `/en/`)
- **Default Locale:** Indonesian (`id`)
- **Content Source:** Sanity CMS with locale-specific fields
  - Example: `{ "title": { "id": "Beranda", "en": "Home" } }`
- **Language Switching:** `LanguageSwitcher.svelte` component (URL-based)
- **No Translation Files:** All content managed via Sanity CMS
- **Query Pattern:** `"title": title.${locale}` fetches correct locale field

## 🏢 Company Information

- **Name:** Banten IT Solutions
- **Email:** admin@bits.co.id
- **Phone:** +62 819 678 048
- **WhatsApp:** +62 819 678 048
- **Address:** Jl. Komp. Taman Pesona, Taktakan, Kota Serang, Banten 42162, Indonesia
- **Website:** https://bits.co.id

## 🔒 Security

- **Cloudflare Turnstile** - Privacy-focused CAPTCHA (test key for dev, production key for prod)
- **Resend API** - Secure email delivery with API key authentication
- **Environment Variables** - Sensitive data stored in `.env` (dev) and Cloudflare dashboard (prod)
- **Input Validation** - Zod schemas for form validation on client and server
- **Sanitization** - HTML tag removal to prevent XSS attacks
- **Rate Limiting** - 5 requests per IP per minute for contact form
- **Security Headers** - `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`
- **Content Security** - No hardcoded credentials in source code

## 📊 Performance

- Static Site Generation (SSG)
- Image optimization
- Code splitting
- Lazy loading
- Core Web Vitals optimization
- Target: < 1s initial load

## 🤝 Contributing

1. Follow the coding standards in [`docs/CODING_STANDARD.md`](./docs/CODING_STANDARD.md)
2. Use TypeScript for type safety
3. Follow existing component patterns
4. Test on multiple devices and browsers
5. Ensure accessibility standards

## 🚀 Deployment Checklist

Before deploying to production:

### Pre-deployment

- [ ] Run `pnpm check` - No TypeScript errors
- [ ] Run `pnpm lint` - No ESLint errors
- [ ] Run `pnpm build` - Build succeeds
- [ ] Test all pages manually (both `/id/` and `/en/` routes)
- [ ] Verify dark mode on all pages
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Check all links work
- [ ] Verify meta tags and SEO
- [ ] Test form submissions with Turnstile verification
- [ ] Check console for errors

### Environment Variables

- [ ] `RESEND_API_KEY` - Resend API key for email sending
- [ ] `ADMIN_EMAIL` - Admin email address
- [ ] `VITE_TURNSTILE_SITE_KEY` - Turnstile site key (public)
- [ ] `TURNSTILE_SECRET_KEY` - Turnstile secret key (private)

### Post-deployment

- [ ] Verify site loads correctly
- [ ] Test all critical paths
- [ ] Check contact form submission
- [ ] Verify Turnstile captcha works
- [ ] Test both language routes (`/id/` and `/en/`)
- [ ] Check analytics tracking (if enabled)
- [ ] Monitor error logs
- [ ] Verify SSL certificate
- [ ] Test page speed (Lighthouse)

## 📝 License

Copyright © 2025 Banten IT Solutions. All rights reserved.

---

**Built with ❤️ using SvelteKit**
