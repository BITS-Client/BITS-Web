# BITS Corporate Website - Agent Guide

SvelteKit 2 + Svelte 5 static site for Banten IT Solutions, with Sanity CMS as content source.

This file is for coding agents working at repository root.

## Scope And Rule Sources

- Primary scope: `/code/production/bits.co.id`
- Sub-guides:
  - `sanity/AGENTS.md` for Sanity Studio/schema workflows
  - `src/lib/components/AGENTS.md` for UI component patterns
- Cursor rules:
  - `.cursor/rules/` not found
  - `.cursorrules` not found
- Copilot rules:
  - `.github/copilot-instructions.md` not found

## Runtime And Tooling

- Package manager: `pnpm` only
- Node runtime: modern Node (repo uses ESM and SvelteKit 2)
- TypeScript mode: strict (`tsconfig.json`)
- Lint stack: ESLint flat config + TypeScript + Svelte
- Formatter: Prettier + `prettier-plugin-svelte`

## Build / Lint / Verify Commands

Run from repo root unless stated otherwise.

### Main App

- Install deps: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Preview: `pnpm preview`
- Type check: `pnpm check`
- Type check watch: `pnpm check:watch`
- Lint all: `pnpm lint`
- Lint fix: `pnpm lint:fix`
- Format all: `pnpm format`
- Format check: `pnpm format:check`

### Single-Test / Single-Target Equivalents

There is no dedicated unit-test runner configured (no `vitest`/`jest`/`playwright` config in repo).
Use these focused checks instead:

- Lint a single file:
  - `pnpm lint -- src/lib/components/Header.svelte`
- Lint a folder:
  - `pnpm lint -- src/routes/[lang]/blog`
- Type-check project quickly (closest to test gate):
  - `pnpm check`

If true unit tests are added later, document the single-test command here immediately.

### Sanity Content Ops

- Export content (published schema JSON only, lightweight default): `pnpm export`
- Export with raw snapshots and full raw dumps: `pnpm export -- --with-raw`
- Export with asset download (`assets-manifest.json` + asset files): `pnpm export -- --with-assets`
- Full export (published + raw + assets): `pnpm export -- --with-raw --with-assets`
- Seed content: `pnpm seed`
- Seed with filters:
  - `pnpm seed -- --only=posts --skip-assets`
  - `pnpm seed -- --only=clients`
- Seed audit: `pnpm audit:seed`
- Safe seed (audit first, then seed):
  - `pnpm seed:safe -- --only=projects --skip-assets`

### Sanity Studio (run in `sanity/`)

- `pnpm dev`
- `pnpm build`
- `pnpm deploy`

## Code Style And Conventions

### Formatting

- Tabs, single quotes, no trailing commas, 100 char print width
- Respect `.prettierrc` and run `pnpm format` when touching many files

### Imports

Use stable grouping and keep type imports explicit.

1. Svelte / SvelteKit
2. External packages
3. Internal aliases (`$lib`, `$components`, `$utils`)
4. Relative imports
5. `import type` lines

Example:

```ts
import { onMount } from 'svelte';
import { z } from 'zod';
import { formatDate } from '$lib/utils/date';
import type { Locale } from '$lib/types';
```

### Types And Safety

- Keep strict typing; avoid `any` unless unavoidable
- Avoid `@ts-ignore`; prefer real type fixes
- Prefer narrow unions and explicit interfaces for props and API payloads
- Validate external input with `zod` on API routes

### Naming

- Svelte components: `PascalCase.svelte`
- Utility files/functions: `camelCase`
- Route segments: kebab-case
- Slugs: lowercase kebab-case
- Constants: `UPPER_SNAKE_CASE` for true constants only

### Svelte 5 Patterns

- Use runes (`$state`, `$derived`, `$effect`, `$props`) consistently
- Keep component state local unless clearly shared
- Prefer derived state over duplicated mutable state

### Error Handling

- Never swallow errors silently
- Add actionable context in thrown/logged errors
- API handlers should return clear status codes + safe error messages
- For content scripts, fail fast on invalid required inputs

## Sanity Content Rules For Agents

- Only active settings in this repo: `generalSettings`, `informationSettings`, `configuration`, `menuSettings`
- `navigationSettings`, `siteSettings`, and `brand` are removed from active flow
- `clients` data must have unique `name` and unique numeric `order` (enforced by audit and export checks)
- Keep `posts/projects/pages/services` SEO complete:
  - `title`, `description`, `keywords`, `ogImage`, `noIndex`, `noFollow`, `excludeFromSitemap`
- Posts must use `category` type `blog` or `both`
- Projects must use `category` type `portfolio` or `both`
- Portable Text blocks/spans must include `_key`
- Client ordering must stay unique and numeric

## Paths And Architecture Notes

- App routes: `src/routes/`
- Localized pages: `src/routes/[lang]/...`
- API endpoints: `src/routes/api/.../+server.ts`
- Sanity queries/client: `src/lib/sanity/`
- Types: `src/lib/types/`
- Sanity schemas/scripts/data: `sanity/`

## Suggested PR / Change Verification

Minimum before finalizing substantial work:

1. `pnpm format:check`
2. `pnpm lint`
3. `pnpm check`
4. If CMS data changed: `pnpm audit:seed`

If you modified seed/export logic, also run a focused seed command that proves the change.

## Agent Do/Do-Not

- Do keep diffs minimal and reversible
- Do preserve existing UI/content conventions unless asked to redesign
- Do not introduce new frameworks/test runners without request
- Do not commit secrets or tokens in code/scripts/data
- Do not reintroduce deprecated settings/doc types removed from active Studio flow
