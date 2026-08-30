<script lang="ts">
	import {
		seoConfig,
		generatePageTitle,
		generateCanonicalUrl,
		serializeJsonLd,
		type BreadcrumbItem
	} from '$lib/utils/seo';

	interface LocalizedString {
		en?: string;
		id?: string;
		[key: string]: string | undefined;
	}

	interface Props {
		title?: string | LocalizedString;
		description?: string | LocalizedString;
		image?: string;
		imageWidth?: number;
		imageHeight?: number;
		imageAlt?: string;
		type?: 'website' | 'article' | 'profile';
		url?: string;
		noindex?: boolean;
		nofollow?: boolean;
		locale?: string;
		alternates?: Array<{ lang: string; url: string }>;
		// Site settings from Sanity
		siteIcon?: string;
		// Article specific
		publishedTime?: string;
		modifiedTime?: string;
		author?: string;
		section?: string;
		tags?: string[];
		// JSON-LD
		jsonLd?: unknown | unknown[];
		// Breadcrumbs
		breadcrumbs?: BreadcrumbItem[];
	}

	let {
		title = undefined,
		description = undefined,
		image = seoConfig.defaultImage,
		imageWidth = 1200,
		imageHeight = 630,
		imageAlt = seoConfig.siteName,
		type = 'website',
		url = '',
		noindex = false,
		nofollow = false,
		locale = seoConfig.locale,
		alternates = [],
		siteIcon,
		publishedTime,
		modifiedTime,
		author,
		section,
		tags = [],
		jsonLd,
		breadcrumbs
	}: Props = $props();

	// Helper to extract localized string
	const getLocalizedValue = (
		value: string | LocalizedString | undefined,
		locale: string
	): string => {
		if (!value) return '';
		if (typeof value === 'string') return value;
		return value[locale] || value.en || value.id || '';
	};

	// Compute title with proper locale handling
	const resolvedTitle = $derived(getLocalizedValue(title, locale));
	const resolvedDescription = $derived(getLocalizedValue(description, locale));

	// Compute full title and canonical URL
	const fullTitle = $derived(generatePageTitle(resolvedTitle || undefined));
	const canonicalUrl = $derived(url ? generateCanonicalUrl(url) : '');

	// Fallback description
	const metaDescription = $derived(resolvedDescription || seoConfig.defaultDescription);

	// Fallback title for OG/Twitter
	const ogTitle = $derived(resolvedTitle || seoConfig.defaultTitle);

	// Secure URL for OG image (HTTPS)
	const secureImageUrl = $derived(image ? image.replace(/^http:\/\//, 'https://') : '');

	// Generate robots meta content
	const robotsContent = $derived(() => {
		const directives: string[] = [];
		if (noindex) directives.push('noindex');
		else directives.push('index');
		if (nofollow) directives.push('nofollow');
		else directives.push('follow');
		return directives.join(', ');
	});

	// Generate breadcrumb JSON-LD
	const breadcrumbJsonLd = $derived(() => {
		if (!breadcrumbs || breadcrumbs.length === 0) return null;
		return {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((item, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.name,
				item: item.url.startsWith('http') ? item.url : `${seoConfig.siteUrl}${item.url}`
			}))
		};
	});

	// Serialize all JSON-LD schemas
	const jsonLdScripts = $derived(() => {
		const schemas: string[] = [];

		if (jsonLd) {
			if (Array.isArray(jsonLd)) {
				jsonLd.forEach((schema) => {
					schemas.push(serializeJsonLd(schema));
				});
			} else {
				schemas.push(serializeJsonLd(jsonLd));
			}
		}

		const breadcrumbSchema = breadcrumbJsonLd();
		if (breadcrumbSchema) {
			schemas.push(serializeJsonLd(breadcrumbSchema));
		}

		return schemas;
	});
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />
	<meta name="generator" content="SvelteKit" />
	<meta name="referrer" content="strict-origin-when-cross-origin" />
	<meta name="format-detection" content="telephone=no" />

	<!-- Theme Color -->
	<meta name="theme-color" content={seoConfig.themeColor} />

	<!-- Favicon with sizes -->
	{#if siteIcon}
		<link rel="icon" href={siteIcon} sizes="any" />
		<link rel="icon" type="image/png" href={siteIcon} sizes="192x192" />
		<link rel="icon" type="image/png" href={siteIcon} sizes="512x512" />
		<link rel="apple-touch-icon" href={siteIcon} />
	{/if}

	<!-- Web App Manifest -->
	<link rel="manifest" href="/site.webmanifest" />

	<!-- Preconnect for Performance -->
	<link rel="preconnect" href={seoConfig.siteUrl} />
	<link rel="dns-prefetch" href={seoConfig.siteUrl} />

	<!-- Page Title -->
	<title>{fullTitle}</title>

	<!-- Meta Description -->
	<meta name="description" content={metaDescription} />

	<!-- Robots -->
	<meta name="robots" content={robotsContent()} />

	<!-- Canonical URL -->
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	<!-- Language Alternates (hreflang) -->
	{#if alternates.length > 0}
		{#each alternates as alt (alt.lang)}
			<link rel="alternate" hreflang={alt.lang} href={alt.url} />
		{/each}
		<link rel="alternate" hreflang="x-default" href={canonicalUrl} />
	{/if}

	<!-- Open Graph Tags -->
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:type" content={type} />
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}
	{#if image}
		<meta property="og:image" content={image} />
		<meta property="og:image:secure_url" content={secureImageUrl} />
		<meta property="og:image:width" content={String(imageWidth)} />
		<meta property="og:image:height" content={String(imageHeight)} />
		<meta property="og:image:alt" content={imageAlt} />
	{/if}
	<meta property="og:site_name" content={seoConfig.siteName} />
	<meta property="og:locale" content={locale} />

	<!-- Article specific Open Graph tags -->
	{#if type === 'article'}
		{#if publishedTime}
			<meta property="article:published_time" content={publishedTime} />
		{/if}
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
		{#if author}
			<meta property="article:author" content={author} />
		{/if}
		{#if section}
			<meta property="article:section" content={section} />
		{/if}
		{#each tags as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={seoConfig.twitterHandle} />
	<meta name="twitter:creator" content={seoConfig.twitterHandle} />
	<meta name="twitter:title" content={ogTitle} />
	<meta name="twitter:description" content={metaDescription} />
	{#if image}
		<meta name="twitter:image" content={image} />
		<meta name="twitter:image:alt" content={imageAlt} />
	{/if}

	<!-- JSON-LD Structured Data -->
	{#if jsonLdScripts && jsonLdScripts().length > 0}
		{#each jsonLdScripts() as _script, index (index)}
			<script type="application/ld+json">
{_script}
			</script>
		{/each}
	{/if}
</svelte:head>
