# Best Practices - Banten IT Solutions Company Profile

## Performance Optimization

### Image Optimization

```svelte
<!-- Use lazy loading for images below the fold -->
<img src="/images/project.jpg" alt="Project screenshot" loading="lazy" decoding="async" />

<!-- Use appropriate image sizes -->
<img
	src="/images/hero-mobile.jpg"
	srcset="/images/hero-mobile.jpg 640w,
          /images/hero-tablet.jpg 1024w,
          /images/hero-desktop.jpg 1920w"
	sizes="(max-width: 640px) 640px,
         (max-width: 1024px) 1024px,
         1920px"
	alt="Hero image"
/>
```

### Code Splitting

```typescript
// Use dynamic imports for heavy components
const HeavyComponent = await import('$lib/components/HeavyComponent.svelte');

// Lazy load routes (automatic in SvelteKit)
// Each route is automatically code-split
```

### CSS Performance

```css
/* Avoid expensive selectors */
/* Bad */
.container * {
}
div.card > p.text {
}

/* Good */
.card-text {
}

/* Use transform instead of changing layout properties */
/* Bad */
.animate {
	left: 10px;
}

/* Good */
.animate {
	transform: translateX(10px);
}

/* Use will-change sparingly */
.animated-element {
	will-change: transform;
}
```

### Bundle Size

- Import only needed icons from lucide-svelte
- Tree-shake unused utilities
- Avoid importing entire libraries

```typescript
// Good - specific imports
import { Mail, Phone } from 'lucide-svelte';

// Bad - importing everything
import * as Icons from 'lucide-svelte';
```

## Icon System Best Practices

### Dynamic Icons from CMS

When using icons from Sanity CMS:

```svelte
<script lang="ts">
	import { getIconComponent } from '$lib/icons';
	import { Sparkles } from '$lib/icons/lucide';

	// Use centralized icon system with fallback
	const IconComponent = $derived(getIconComponent(service.icon) || Sparkles);
</script>

<div class="icon-wrapper">
	<IconComponent class="w-5 h-5" />
</div>
```

### Icon Naming Convention

- Use **lowercase kebab-case** in Sanity: `code-xml`, `server`, `cloud`, `database`
- Always provide a fallback icon (Sparkles)
- Common service icons: `code`, `server`, `cloud`, `database`, `palette`, `globe`

### Icon Size Standards

- Small (inline): `w-4 h-4`
- Default: `w-5 h-5`
- Large: `w-6 h-6`
- XL (hero): `w-8 h-8` or `w-10 h-10`

## Accessibility (a11y)

### Semantic HTML

```svelte
<!-- Use semantic elements -->
<header>
	<nav aria-label="Main navigation">
		<ul>
			<li><a href="/">Home</a></li>
		</ul>
	</nav>
</header>

<main>
	<article>
		<h1>Page Title</h1>
		<section aria-labelledby="section-heading">
			<h2 id="section-heading">Section Title</h2>
		</section>
	</article>
</main>

<footer>
	<!-- Footer content -->
</footer>
```

### ARIA Labels

```svelte
<!-- Icon buttons need labels -->
<button aria-label="Close menu" onclick={closeMenu}>
	<X class="w-6 h-6" aria-hidden="true" />
</button>

<!-- External links -->
<a
	href="https://example.com"
	target="_blank"
	rel="noopener noreferrer"
	aria-label="Visit Example (opens in new tab)"
>
	Example
</a>

<!-- Form labels -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" aria-describedby="email-hint" required />
<span id="email-hint">We'll never share your email</span>
```

### Keyboard Navigation

```svelte
<script lang="ts">
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleAction();
		}
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<div role="button" tabindex="0" onclick={handleAction} onkeydown={handleKeyDown}>
	Interactive Element
</div>
```

### Focus Management

```css
/* Visible focus indicators */
.focus-ring:focus-visible {
	outline: 2px solid var(--color-primary);
	outline-offset: 2px;
}

/* Skip link for keyboard users */
.skip-link {
	position: absolute;
	top: -40px;
	left: 0;
	z-index: 100;
}

.skip-link:focus {
	top: 0;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

```svelte
<script lang="ts">
	let prefersReducedMotion = $state(false);

	$effect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mediaQuery.matches;

		const handler = (e: MediaQueryListEvent) => {
			prefersReducedMotion = e.matches;
		};

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	});
</script>

{#if !prefersReducedMotion}
	<div transition:fly={{ y: 20 }}>Animated content</div>
{:else}
	<div>Static content</div>
{/if}
```

## SEO Best Practices

### Meta Tags

```svelte
<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Page Title - Banten IT Solutions"
	description="Compelling description under 160 characters"
	url="/page-url"
	image="/images/og-image.jpg"
	type="website"
/>
```

### Structured Data

```typescript
// Use JSON-LD for rich snippets
import { generateOrganizationSchema } from '$lib/utils/seo';

const schema = generateOrganizationSchema();

// Include in page
<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
```

### Semantic Headings

```svelte
<!-- One H1 per page -->
<h1>Main Page Title</h1>

<!-- Logical heading hierarchy -->
<section>
	<h2>Section Title</h2>
	<h3>Subsection Title</h3>
</section>

<section>
	<h2>Another Section</h2>
</section>
```

### Internal Linking

```svelte
<!-- Use descriptive anchor text -->
<!-- Bad -->
<a href="/services">Click here</a>

<!-- Good -->
<a href="/services">View our services</a>

<!-- Breadcrumbs for navigation -->
<nav aria-label="Breadcrumb">
	<ol>
		<li><a href="/">Home</a></li>
		<li><a href="/services">Services</a></li>
		<li aria-current="page">Web Design</li>
	</ol>
</nav>
```

## Dark Mode Implementation

### CSS Custom Properties

```css
/* Light mode (default) */
:root {
	--bg-primary: #ffffff;
	--text-primary: #111827;
}

/* Dark mode */
.dark {
	--bg-primary: #111827;
	--text-primary: #f9fafb;
}
```

### Component Styling

```css
.card {
	background: var(--bg-primary);
	color: var(--text-primary);
}

/* Or use :global(.dark) in scoped styles */
:global(.dark) .card {
	background: var(--color-gray-800);
	border-color: var(--color-gray-700);
}
```

### Theme Toggle

```svelte
<script lang="ts">
	let isDark = $state(false);

	$effect(() => {
		// Check system preference
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const savedTheme = localStorage.getItem('theme');

		isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
		document.documentElement.classList.toggle('dark', isDark);
	});

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}
</script>
```

## Form Handling

### Validation

```svelte
<script lang="ts">
	import { z } from 'zod';

	const contactSchema = z.object({
		name: z.string().min(2, 'Name is required'),
		email: z.string().email('Invalid email'),
		inquiryType: z.enum(['Software', 'Hardware', 'Web Design', 'ERP', 'AI', 'Other']),
		message: z.string().min(1, 'Message is required'),
		turnstile_token: z.string().min(1, 'Turnstile verification required')
	});

	let errors = $state<Record<string, string[]>>({});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData);

		const result = contactSchema.safeParse(data);

		if (!result.success) {
			errors = result.error.flatten().fieldErrors;
			return;
		}

		// Submit valid data to API
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(result.data)
		});

		const json = await response.json();
		if (json.success) {
			// Show success message
		}
	}
</script>
```

### Error Display

```svelte
<div class="form-group">
	<label for="email">Email</label>
	<input
		type="email"
		id="email"
		name="email"
		aria-invalid={errors.email ? 'true' : undefined}
		aria-describedby={errors.email ? 'email-error' : undefined}
	/>
	{#if errors.email}
		<span id="email-error" class="error" role="alert">
			{errors.email[0]}
		</span>
	{/if}
</div>
```

## Security Best Practices

### XSS Prevention

```svelte
<!-- Svelte automatically escapes content -->
<p>{userInput}</p>

<!-- Be careful with @html -->
<!-- Only use with trusted content -->
{@html sanitizedHtml}
```

### External Links

```svelte
<!-- Dynamic links with locale -->
<script lang="ts">
	let { locale = 'id' } = $props();

	function resolve(path: string): string {
		return `/${locale}${path}`;
	}
</script>

<!-- Always use rel="noopener noreferrer" for external links -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer"> External Link </a>

<a href={resolve('/services')}>Services</a>
```

### Environment Variables

```typescript
// Use $env for secrets (server-side only)
import { SANITY_TOKEN } from '$env/static/private';

// Use $env/static/public for client-safe variables
import { PUBLIC_API_URL } from '$env/static/public';
```

### Content Security

```typescript
// In hooks.server.ts
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');

	return response;
};
```

## Testing Considerations

### Component Testing

```typescript
// Test file: Component.test.ts
import { render, fireEvent } from '@testing-library/svelte';
import Component from './Component.svelte';

test('renders correctly', () => {
	const { getByText } = render(Component, { props: { title: 'Test' } });
	expect(getByText('Test')).toBeInTheDocument();
});

test('handles click', async () => {
	const { getByRole } = render(Component);
	await fireEvent.click(getByRole('button'));
	// Assert expected behavior
});
```

### Accessibility Testing

```bash
# Use axe-core or similar tools
pnpm add -D @axe-core/playwright

# Run accessibility audits during build
```

## Deployment Checklist

### Pre-deployment

- [ ] Run `pnpm check` - No TypeScript errors
- [ ] Run `pnpm lint` - No ESLint errors
- [ ] Run `pnpm build` - Build succeeds
- [ ] Test all pages manually
- [ ] Verify dark mode on all pages
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Check all links work
- [ ] Verify meta tags and SEO
- [ ] Test form submissions
- [ ] Check console for errors

### Post-deployment

- [ ] Verify site loads correctly
- [ ] Test all critical paths
- [ ] Check analytics tracking
- [ ] Monitor error logs
- [ ] Verify SSL certificate
- [ ] Test page speed (Lighthouse)
