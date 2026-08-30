# Coding Standards - Banten IT Solutions Company Profile

## File Naming Conventions

### Svelte Components

- **PascalCase** for component files: `Header.svelte`, `Footer.svelte`, `SEO.svelte`
- **Descriptive names**: `AnimatedCounter.svelte`, `ScrollReveal.svelte`
- **Grouped by category**: `ui/animation/`, `ui/card/`, `ui/hero/`, etc.

### Routes (SvelteKit)

- **Lowercase with hyphens**: `/services/web-design`, `/blog/[slug]`
- **Standard files**: `+page.svelte`, `+layout.svelte`, `+page.ts`, `+server.ts`

### TypeScript Files

- **camelCase** for utility files: `seo.ts`, `index.ts`
- **Descriptive function names**: `generateOrganizationSchema()`

### CSS

- **kebab-case** for class names: `.contact-item`, `.footer-link`
- **BEM-like naming** for complex components: `.card-header`, `.card-body`

## Svelte 5 Runes Usage

### State Management

```svelte
<script lang="ts">
	// Reactive state
	let count = $state(0);
	let items = $state<string[]>([]);
	let isOpen = $state(false);

	// Derived values (computed)
	let doubled = $derived(count * 2);
	let itemCount = $derived(items.length);
	let classes = $derived(`component ${isOpen ? 'open' : 'closed'}`);

	// Side effects (runs when dependencies change)
	$effect(() => {
		console.log('Count changed:', count);
	});

	// Cleanup effects
	$effect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
</script>
```

### Props Declaration

```svelte
<script lang="ts">
	interface Props {
		title: string;
		description?: string;
		items: string[];
		onSelect?: (id: string) => void;
	}

	// Destructure props with default values
	let { title, description = 'Default', items, onSelect }: Props = $props();
</script>
```

### Event Handlers

```svelte
<script lang="ts">
	let count = $state(0);
	let value = $state('');

	function handleClick() {
		count++;
	}

	function handleInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		value = target.value;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		// Handle form submission
	}
</script>

<!-- Use native event handlers -->
<button onclick={handleClick}>Increment</button>
<input oninput={handleInput} type="text" />

<!-- For forms -->
<form onsubmit={handleSubmit}>
	<!-- Form fields -->
</form>
```

## TypeScript Guidelines

### Type Definitions

```typescript
// Use interfaces for objects
interface Service {
	id: string;
	title: string;
	description: string;
	icon: typeof Icon;
	href: string;
}

// Use type for unions/intersections
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
```

### Function Typing

```typescript
function formatDate(date: string): string {
	return new Date(date).toLocaleDateString();
}

async function fetchData<T>(url: string): Promise<T> {
	const response = await fetch(url);
	return response.json();
}
```

### Component Props Typing

```typescript
interface Props {
	title: string;
	count?: number;
	items: Array<{ id: string; name: string }>;
	onSelect?: (id: string) => void;
}
```

## CSS Standards

### Custom Properties Usage

```css
/* Use CSS custom properties from app.css */
.component {
	color: var(--color-gray-900);
	background: var(--color-white);
	padding: var(--space-4);
	border-radius: var(--radius-lg);
	transition: var(--transition-base);
}
```

### Dark Mode Support

```css
/* Light mode (default) */
.card {
	background: var(--color-white);
	color: var(--color-gray-900);
}

/* Dark mode override */
:global(.dark) .card {
	background: var(--color-gray-800);
	color: var(--color-white);
}
```

### Responsive Design

```css
/* Mobile-first approach */
.grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
	.grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

/* Desktop */
@media (min-width: 1024px) {
	.grid {
		grid-template-columns: repeat(3, 1fr);
	}
}
```

### Animation Standards

```css
/* Use CSS custom properties for consistency */
.animated {
	transition:
		transform var(--transition-base),
		opacity var(--transition-base);
}

/* Prefer transform over position changes */
.hover-effect:hover {
	transform: translateY(-4px) scale(1.02);
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
	.animated {
		transition: none;
	}
}
```

## Component Structure

### Standard Component Template

```svelte
<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Icon } from '@lucide/svelte';

	interface Props {
		title: string;
		variant?: 'default' | 'primary';
	}

	let { title, variant = 'default' }: Props = $props();

	// State
	let isOpen = $state(false);

	// Derived
	let classes = $derived(`component ${variant}`);

	// Functions
	function handleClick() {
		isOpen = !isOpen;
	}
</script>

<div class={classes}>
	<h2>{title}</h2>
	<button onclick={handleClick}>Toggle</button>
	{#if isOpen}
		<div transition:fade>Content</div>
	{/if}
</div>

<style>
	.component {
		/* Component-scoped styles */
	}
</style>
```

## Import Organization

### Order of Imports

```typescript
// 1. Svelte imports
import { onMount } from 'svelte';
import { fade, fly } from 'svelte/transition';

// 2. External libraries
import { z } from 'zod';

// 3. Icons
import { Mail, Phone, ArrowRight } from '@lucide/svelte';

// 4. Internal components
import SEO from '$lib/components/SEO.svelte';
import Header from '$lib/components/Header.svelte';

// 5. Utilities
import { formatDate } from '$lib/utils';
import { generateSchema } from '$lib/utils/seo';

// 6. Types
import type { Locale, Service, BlogPost } from '$lib/types';
```

## Comments and Documentation

### Component Documentation

```svelte
<!--
  @component
  ServiceCard - Displays a service with icon, title, and description
  
  @prop {string} title - Service title
  @prop {string} description - Service description
  @prop {Component} icon - Lucide icon component
  @prop {string} href - Link to service page
-->
```

### Function Documentation

```typescript
/**
 * Generates SEO-friendly JSON-LD schema for organization
 * @param overrides - Optional overrides for default values
 * @returns Organization schema object
 */
export function generateOrganizationSchema(
	overrides?: Partial<OrganizationSchema>
): OrganizationSchema {
	// Implementation
}
```

## Error Handling

### Form Validation

```typescript
const schema = z.object({
	email: z.string().email('Invalid email address'),
	name: z.string().min(2, 'Name must be at least 2 characters')
});

try {
	const validated = schema.parse(formData);
} catch (error) {
	if (error instanceof z.ZodError) {
		errors = error.flatten().fieldErrors;
	}
}
```

### API Error Handling

```typescript
async function fetchData() {
	try {
		const response = await fetch('/api/data');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
}
```

## Icon System

### Centralized Icon Management

Use the centralized icon system from `$lib/icons`:

```typescript
// For dynamic icon mapping (e.g., from CMS)
import { getIconComponent } from '$lib/icons';
import { Sparkles } from '$lib/icons/lucide';

// Get icon by name with fallback
const IconComponent = $derived(getIconComponent(service.icon) || Sparkles);
```

### Icon Naming Convention

- Icons in Sanity CMS should use **lowercase kebab-case**
- Examples: `code`, `server`, `cloud`, `database`, `sparkles`, `globe`, `palette`
- Fallback icon is `Sparkles` (not `Code`)

### Available Icon Functions

```typescript
// Get icon component by string name
import { getIconComponent } from '$lib/icons';
const Icon = getIconComponent('cloud'); // Returns Cloud icon component

// Get icon with fallback
const Icon = getIconComponent(service.icon) || Sparkles;

// Direct import for static usage
import { Cloud, Server, Database } from '$lib/icons/lucide';
```

### Component Usage

```svelte
<script lang="ts">
	import { getIconComponent } from '$lib/icons';
	import { Sparkles } from '$lib/icons/lucide';
	import type { Component } from 'svelte';

	interface Props {
		iconName: string;
	}

	let { iconName }: Props = $props();

	const IconComponent = $derived(getIconComponent(iconName) || Sparkles);
</script>

<div class="icon-wrapper">
	<IconComponent class="w-5 h-5" />
</div>
```

## Git Commit Messages

### Format

```
<type>(<scope>): <description>

[optional body]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `style`: Styling changes
- `refactor`: Code refactoring
- `docs`: Documentation
- `chore`: Maintenance tasks

### Examples

```
feat(header): add mega menu for services
fix(contact): resolve form validation error
style(footer): update contact icons with brand colors
refactor(seo): extract schema generation to utility
```
