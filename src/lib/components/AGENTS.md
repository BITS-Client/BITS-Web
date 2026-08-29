# UI Components

Svelte 5 components for BITS corporate website. All use runes (`$props`, `$state`, `$derived`, `$effect`).

## Directory Structure

```
src/lib/components/ui/
├── animation/     # ScrollReveal, AnimatedCounter, FloatingElement, LoadingSpinner
├── card/          # ServiceCard, BlogCard, TeamCard, TestimonialCard, etc.
├── content/       # BlogContent, PortfolioContent, LegalContent, BenefitsContent
├── cta/           # BigCTA, GeneralCTA, ContactCTA, MoreCTA
├── form/          # ContactForm, Turnstile, SearchModal, CustomSelect
├── header/        # WaveHeader, ShineHeader
├── hero/          # HomeHero, PageHero, DetailHero, AboutHero, LegalHero
├── layout/        # Header, Footer (+ .css files)
├── misc/          # Background, ShareBar, FloatingIcon, NotFound, Empty
├── navigation/    # Breadcrumb, LanguageSwitcher, ThemeSwitcher, TableOfContents
├── section/       # ServicesSection, BlogSection, PortfolioSection, StatsSection
└── seo/           # SEO.svelte
```

## Component Pattern

```svelte
<script lang="ts">
	import { Mail } from 'lucide-svelte';
	import type { Locale } from '$lib/types';

	interface Props {
		title: string;
		locale: Locale;
		items?: string[];
	}

	let { title, locale, items = [] }: Props = $props();
	let count = $state(0);
	let total = $derived(items.length);
</script>

<div class="component-name">
	<h2>{title}</h2>
	<span>{total} items</span>
</div>
```

## Key Components

### Animation Components

| Component         | Props                            | Usage                                             |
| ----------------- | -------------------------------- | ------------------------------------------------- |
| `ScrollReveal`    | `animation`, `delay`             | `<ScrollReveal animation="fly-up" delay={200}>`   |
| `AnimatedCounter` | `value`, `duration`              | `<AnimatedCounter value={100} duration={2000} />` |
| `FloatingElement` | `duration`, `delay`, `amplitude` | Decorative floating elements                      |
| `LoadingSpinner`  | -                                | Loading states                                    |

**Animation options**: `fade`, `fly-up`, `fly-down`, `fly-left`, `fly-right`, `scale`

### SEO Component

```svelte
<SEO
	title="Page Title"
	description="Page description"
	url="https://bits.co.id/page"
	locale={data.locale}
	alternates={[
		{ locale: 'id', url: 'https://bits.co.id/id/page' },
		{ locale: 'en', url: 'https://bits.co.id/en/page' }
	]}
/>
```

### Form Components

| Component      | Purpose           | Notes                            |
| -------------- | ----------------- | -------------------------------- |
| `ContactForm`  | Main contact form | Uses Turnstile, Zod validation   |
| `Turnstile`    | CAPTCHA widget    | Cloudflare Turnstile integration |
| `SearchModal`  | Search overlay    | Keyboard shortcut: Cmd/Ctrl+K    |
| `CustomSelect` | Styled select     | Accessible dropdown              |

### Layout Components

- **Header.svelte** + **Header.css**: Navigation, mobile menu, theme/language switchers
- **Footer.svelte** + **Footer.css**: Site footer, contact info, social links

### Card Components

All cards follow pattern: `{Type}Card.svelte` with props for content + locale.

Examples:

- `ServiceCard` - Service offerings grid
- `BlogCard` - Blog post previews
- `TeamCard` - Team member display
- `TestimonialCard` - Client testimonials

## Creating New Components

1. Create in appropriate category folder: `src/lib/components/ui/{category}/`
2. Use `interface Props` with `$props()` rune
3. Accept `locale: Locale` if content varies by language
4. Use Tailwind classes (avoid inline styles)
5. Import icons from `lucide-svelte` individually

### Example: New Card Component

```svelte
<!-- src/lib/components/ui/card/FeatureCard.svelte -->
<script lang="ts">
	import { Check } from 'lucide-svelte';
	import type { Locale } from '$lib/types';

	interface Props {
		title: string;
		description: string;
		locale: Locale;
	}

	let { title, description, locale }: Props = $props();
</script>

<div class="rounded-xl border border-zinc-200 p-6 dark:border-zinc-700">
	<div class="mb-2 flex items-center gap-2">
		<Check class="h-5 w-5 text-emerald-500" />
		<h3 class="font-semibold">{title}</h3>
	</div>
	<p class="text-zinc-600 dark:text-zinc-400">{description}</p>
</div>
```

## Icon System

### Dynamic Icons (from CMS)

Use `getIconComponent` for icons stored in Sanity:

```svelte
<script lang="ts">
	import { getIconComponent } from '$lib/icons';
	import { Sparkles } from '$lib/icons/lucide';

	interface Props {
		service: {
			title: string;
			icon: string; // e.g., "cloud", "server", "database"
		};
	}

	let { service }: Props = $props();

	// Dynamic icon with sparkles fallback
	const IconComponent = $derived(getIconComponent(service.icon) || Sparkles);
</script>

<div class="card">
	<IconComponent class="w-6 h-6" />
	<h3>{service.title}</h3>
</div>
```

### Icon Guidelines

- **CMS icons**: Use lowercase kebab-case (e.g., `code-xml`, `database`, `cloud`)
- **Fallback**: Always provide `Sparkles` as fallback
- **Static icons**: Import directly from `$lib/icons/lucide` or `lucide-svelte`
- **Size**: Use Tailwind classes `w-5 h-5` or `w-6 h-6`
- **Color**: Inherit from parent or use Tailwind color classes

## JIT Index

```bash
# Find component by name
rg -n "interface Props" src/lib/components/ui/

# Find component usage
rg -n "import.*from.*components/ui" src/routes/

# Find all cards
ls src/lib/components/ui/card/

# Find animation components
ls src/lib/components/ui/animation/
```

## Common Gotchas

- **Always use `$props()`** - No `export let` (Svelte 4 syntax)
- **Dark mode**: Use `dark:` prefix for dark mode styles
- **Icons**: Import individually from `lucide-svelte`, not barrel imports
- **Locale prop**: Most components need `locale: Locale` for i18n content
- **CSS files**: Only Header and Footer have separate `.css` files; use Tailwind elsewhere
