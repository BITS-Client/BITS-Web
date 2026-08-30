# Sanity Studio

React-based CMS workspace for BITS corporate website content management.

## STRUCTURE

```
sanity/
├── schemas/
│   ├── documents/        # Content types (service, portfolio, blog, category)
│   ├── objects/          # Reusable field types (blockContent, seoSettings)
│   └── index.ts          # Schema exports
├── sanity.config.ts      # Studio plugins, structure, schema registration
└── sanity.cli.ts         # CLI config (studioHost: 'bits')
```

## WHERE TO LOOK

| Task                   | Location             | Notes                               |
| ---------------------- | -------------------- | ----------------------------------- |
| Add content type       | `schemas/documents/` | Use `defineType()`, export in index |
| Add reusable field     | `schemas/objects/`   | For shared field patterns           |
| Modify Studio sidebar  | `sanity.config.ts`   | `structureTool({ structure: })`     |
| Change project/dataset | `sanity.cli.ts`      | Also in sanity.config.ts            |

## SCHEMA TYPES

| Type      | Purpose                | Ordering              |
| --------- | ---------------------- | --------------------- |
| service   | Service offerings      | by `order` asc        |
| portfolio | Portfolio items        | by `publishedAt` desc |
| blog      | Blog articles          | by `publishedAt` desc |
| category  | Content categorization | default               |

## SCHEMA PATTERN

```typescript
// schemas/documents/example.ts
import { defineType } from 'sanity';

export default defineType({
	name: 'example',
	title: 'Example',
	type: 'document',
	fields: [
		{ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
		{ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
		{ name: 'content', title: 'Content', type: 'blockContent' }
	]
});

// Then add to schemas/index.ts
```

## COMMANDS

```bash
# Run from /studio directory
pnpm dev              # Studio at localhost:3333
pnpm build            # Build for deployment
pnpm deploy           # Deploy to bits.sanity.studio
```

## PLUGINS

- `@sanity/code-input` - Code block fields
- `@sanity/vision` - GROQ query testing
- `structureTool` - Custom sidebar ordering

## Seed Data Management

Export and import content using scripts in `studio/scripts/`:

```bash
# From project root

# Export all content from Sanity
export SANITY_TOKEN=sk_your_token
pnpm export

# Validate seed consistency before import
pnpm audit:seed

# Import seed data to fresh Sanity project
export SANITY_TOKEN=sk_your_token
pnpm seed

# Safe import (audit first, then seed)
pnpm seed:safe

# Filtered seed examples
pnpm seed -- --only=posts --skip-assets
pnpm seed:safe -- --only=projects
```

**Exported files** in `studio/data/`:

- `services.json` - Service offerings
- `posts.json` - Blog posts
- `projects.json` - Portfolio projects
- `categories.json` - Blog categories
- `team.json` - Team members
- `clients.json` - Clients
- `*.raw.json` - Raw variants (includes drafts perspective)
- `all-data.raw.json` - Combined raw export
- `all-documents.raw.json` - Full raw dataset dump
- `drafts-data.json` - Draft-focused seed helper
- `assets-manifest.json` - Downloaded asset map for seed asset remap

### Active settings scope

Only these settings are active and shown in Studio:

- `generalSettings`
- `informationSettings`
- `configuration`
- `menuSettings`

Deprecated/non-active settings are intentionally excluded from seed/export workflow.

## NOTES

- **Separate workspace**: Has own `node_modules`, run commands from this directory
- **React 19**: Uses React (not Svelte) for Studio UI
- **Project ID**: `j996ej4v` / Dataset: `production`
- **Studio URL**: bits.sanity.studio (after deploy)
- **Memory**: Deploy uses `--max-old-space-size=4096` for large builds
