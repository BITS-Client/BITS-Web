# Tech Stack - Banten IT Solutions Company Profile

## Frontend Framework

### SvelteKit 2

- **Version**: ^2.52.0
- **Purpose**: Full-stack web framework

### Svelte 5

- **Version**: ^5.51.2
- **Mode**: Runes mode (new reactivity system)
- **Key Features**:
  - `$state` - Reactive state declaration
  - `$derived` - Computed values
  - `$effect` - Side effects
  - `$props` - Component props
  - Improved performance over Svelte 4

## Styling

### Tailwind CSS 4

- **Version**: ^4.1.18
- **Integration**: `@tailwindcss/vite` plugin
- **Usage**: Utility-first CSS framework
- **Custom Configuration**: Extended with CSS custom properties

### Custom CSS

- **Location**: `src/app.css`
- **Features**:
  - CSS Custom Properties (variables)
  - Design tokens (colors, spacing, typography)
  - Component-specific styles
  - Dark mode support
  - Glassmorphism effects
  - Animation keyframes

## Build Tools

### Vite 7

- **Version**: ^7.3.1
- **Purpose**: Build tool and dev server
- **Features**:
  - Hot Module Replacement (HMR)
  - Fast cold starts
  - Optimized production builds

### TypeScript

- **Version**: ^5.9.3
- **Configuration**: `tsconfig.json`
- **Strictness**: Standard strict mode

## Content Management

### Sanity CMS

- **Client Version**: ^7.14.1
- **Features**:
  - Headless CMS
  - Real-time collaboration
  - Structured content with locale support
  - Image optimization with `@sanity/image-url` (^2.0.3)
  - Portable text rendering with `@portabletext/svelte` (^3.0.1)
  - GROQ query language for efficient data fetching

## UI Components

### lucide-svelte

- **Version**: ^0.563.0
- **Purpose**: Icon library

### Zod

- **Version**: ^4.3.6
- **Purpose**: Schema validation
- **Usage**:
  - Form validation (contact form, newsletter)
  - API request/response validation
  - Type-safe data parsing
  - Error handling with detailed field errors

## Code Quality

### ESLint

- **Version**: ^10.0.0
- **Plugins**:
  - `eslint-plugin-svelte` (^3.15.0) - Svelte-specific rules
  - `typescript-eslint` (^8.55.0) - TypeScript support
  - `eslint-config-prettier` (^10.1.8) - Prettier integration
  - `@eslint/js` (^10.0.1) - ESLint configuration

### Prettier

- **Version**: ^3.8.1
- **Plugins**:
  - `prettier-plugin-svelte` (^3.4.1) - Svelte file formatting
- **Configuration**: `.prettierrc`
- **Settings**: Tabs, single quotes, no trailing commas, 100 char line width

### svelte-check

- **Version**: ^4.4.0
- **Purpose**: Type checking for Svelte files

## Deployment

### Adapter

- **Package**: `@sveltejs/adapter-static`
- **Version**: ^3.0.10
- **Output**: Static HTML/CSS/JS files
- **Target**: Cloudflare Pages

### Build Output

- **Directory**: `build/`
- **Fallback**: `404.html`
- **Precompression**: Disabled

## Package Manager

### pnpm

- **Lock File**: `pnpm-lock.yaml`
- **Workspace**: `pnpm-workspace.yaml`
- **Why pnpm**:
  - Faster installation
  - Disk space efficient
  - Strict dependency resolution

## Data Management Scripts

### Sanity Export/Import

Located in `sanity/scripts/`:

- **`export.mjs`** - Exports all content from Sanity CMS to `sanity/data/`
- **`seed.mjs`** - Imports per-type JSON data from `sanity/data/*.json` to Sanity

**Usage**:

```bash
export SANITY_TOKEN=sk_your_token
pnpm export  # Export data
pnpm seed    # Import data
```

**Exported Content**:

- Services, Posts, Projects
- Categories, Team, Clients
- Page content (home, about, services, etc.)
- Settings (general, information, configuration, menu)

## Project Dependencies Summary

### Production Dependencies

```json
{
	"@portabletext/svelte": "^3.0.1",
	"@sanity/client": "^7.15.0",
	"@sanity/image-url": "^2.0.3",
	"groq": "^5.9.0",
	"lucide-svelte": "^0.564.0",
	"react": "^19.2.4",
	"react-dom": "^19.2.4",
	"sanity": "^5.9.0",
	"styled-components": "^6.3.9",
	"zod": "^4.3.6"
}
```

**Note**: React and styled-components are used by Sanity Studio (separate workspace).

### Development Dependencies

```json
{
	"@eslint/js": "^10.0.1",
	"@sveltejs/adapter-static": "^3.0.10",
	"@sveltejs/kit": "^2.52.0",
	"@sveltejs/vite-plugin-svelte": "^6.2.4",
	"@tailwindcss/vite": "^4.1.18",
	"eslint": "^10.0.0",
	"eslint-config-prettier": "^10.1.8",
	"eslint-plugin-svelte": "^3.15.0",
	"globals": "^17.3.0",
	"prettier": "^3.8.1",
	"prettier-plugin-svelte": "^3.4.1",
	"svelte": "^5.51.2",
	"svelte-check": "^4.4.0",
	"tailwindcss": "^4.1.18",
	"typescript": "^5.9.3",
	"typescript-eslint": "^8.55.0",
	"vite": "^7.3.1"
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties (CSS Variables)
- Responsive breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

## Architecture Notes

### Static vs Dynamic Routes

**Prerendered (Static)**: Homepage, sitemap, privacy, terms for both locales

- `/id/`, `/en/` (homepage)
- `/id/privacy`, `/en/privacy`
- `/id/terms`, `/en/terms`
- `/id/sitemap.xml`, `/en/sitemap.xml`

**Dynamic (Cloudflare Functions)**:

- `/[lang]/blog/[slug]/`
- `/[lang]/portfolio/[slug]/`
- `/[lang]/services/[slug]/`
- `/api/contact` (form submission)
- `/api/newsletter` (newsletter subscription)

### Multilingual Implementation

- Dynamic route segments: `/[lang]/`
- Locale type: `'id' | 'en'` (defined in `$lib/types/index.ts`)
- Default locale: `id` (Indonesian)
- Content fetched from Sanity with locale-specific GROQ queries (e.g., `"title": title.${locale}`)
- Language switching via `LanguageSwitcher.svelte` component (modifies URL path)
- `<html lang>` attribute updated dynamically via `$effect` in layout
- No translation function needed - all content from Sanity CMS
- Example query field: `"title": title.${locale}` - fetches `title.id` or `title.en`
