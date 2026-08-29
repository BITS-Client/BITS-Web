/**
 * SEO Helper Utilities for Banten IT Solutions Corporate Platform
 * Provides functions for generating meta tags, JSON-LD structured data, and SEO configuration
 */

// Default SEO Configuration
export const seoConfig = {
	siteName: 'Banten IT Solutions',
	siteUrl: 'https://bits.co.id',
	defaultTitle: 'Banten IT Solutions - Digital Solutions That Drive Growth',
	defaultDescription:
		'Banten IT Solutions - Digital Solutions That Drive Growth. Custom software development, web design, ERP systems, AI & automation services.',
	defaultImage: '', // Will be populated from Sanity in components
	twitterHandle: '@bitscoid',
	locale: 'id_ID',
	themeColor: '#ff3e00',
	sitemapPriority: 0.5,
	sitemapChangeFreq: 'monthly'
};

export function getSiteUrl(siteUrl?: string): string {
	return siteUrl || seoConfig.siteUrl;
}

// Types for SEO utilities
export interface MetaTag {
	name?: string;
	property?: string;
	content: string;
}

export interface OpenGraphData {
	title: string;
	description: string;
	type?: 'website' | 'article' | 'profile';
	url?: string;
	image?: string;
	siteName?: string;
	locale?: string;
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	section?: string;
	tags?: string[];
}

export interface TwitterCardData {
	card?: 'summary' | 'summary_large_image' | 'app' | 'player';
	site?: string;
	creator?: string;
	title: string;
	description: string;
	image?: string;
}

export interface SEOData {
	title: string;
	description: string;
	canonical?: string;
	noindex?: boolean;
	nofollow?: boolean;
	openGraph?: Partial<OpenGraphData>;
	twitter?: Partial<TwitterCardData>;
}

// JSON-LD Structured Data Types
export interface OrganizationSchema {
	'@context': 'https://schema.org';
	'@type': 'Organization';
	name: string;
	url: string;
	logo?: string;
	description?: string;
	sameAs?: string[];
	address?: {
		'@type': 'PostalAddress';
		streetAddress?: string;
		addressLocality?: string;
		addressRegion?: string;
		postalCode?: string;
		addressCountry?: string;
	};
	contactPoint?: {
		'@type': 'ContactPoint';
		telephone?: string;
		contactType?: string;
		email?: string;
		availableLanguage?: string[];
	};
}

export interface ServiceSchema {
	'@context': 'https://schema.org';
	'@type': 'Service';
	name: string;
	description: string;
	provider: {
		'@type': 'Organization';
		name: string;
		url: string;
	};
	serviceType?: string;
	areaServed?: string;
	url?: string;
}

export interface ArticleSchema {
	'@context': 'https://schema.org';
	'@type': 'Article' | 'BlogPosting';
	headline: string;
	description: string;
	image?: string;
	datePublished: string;
	dateModified?: string;
	author: {
		'@type': 'Person';
		name: string;
		url?: string;
	};
	publisher: {
		'@type': 'Organization';
		name: string;
		url: string;
		logo?: {
			'@type': 'ImageObject';
			url: string;
		};
	};
	mainEntityOfPage?: {
		'@type': 'WebPage';
		'@id': string;
	};
}

export interface CreativeWorkSchema {
	'@context': 'https://schema.org';
	'@type': 'CreativeWork';
	name: string;
	description: string;
	creator: {
		'@type': 'Organization';
		name: string;
		url: string;
	};
	dateCreated?: string;
	image?: string;
	url?: string;
	about?: string;
}

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export interface BreadcrumbListSchema {
	'@context': 'https://schema.org';
	'@type': 'BreadcrumbList';
	itemListElement: Array<{
		'@type': 'ListItem';
		position: number;
		name: string;
		item: string;
	}>;
}

export interface WebPageSchema {
	'@context': 'https://schema.org';
	'@type': 'WebPage';
	name: string;
	description: string;
	url: string;
	isPartOf?: {
		'@type': 'WebSite';
		name: string;
		url: string;
	};
}

export interface WebsiteSchema {
	'@context': 'https://schema.org';
	'@type': 'WebSite';
	name: string;
	url: string;
	description?: string;
	keywords?: string;
	image?: string;
	potentialAction?: {
		'@type': 'SearchAction';
		target: {
			'@type': 'EntryPoint';
			urlTemplate: string;
		};
		'query-input': string;
	};
}

export interface FAQPageSchema {
	'@context': 'https://schema.org';
	'@type': 'FAQPage';
	mainEntity: Array<{
		'@type': 'Question';
		name: string;
		acceptedAnswer: {
			'@type': 'Answer';
			text: string;
		};
	}>;
}

export interface LocalBusinessSchema {
	'@context': 'https://schema.org';
	'@type': 'LocalBusiness' | 'ProfessionalService';
	name: string;
	description: string;
	url: string;
	image?: string;
	telephone?: string;
	email?: string;
	address?: {
		'@type': 'PostalAddress';
		streetAddress?: string;
		addressLocality?: string;
		addressRegion?: string;
		postalCode?: string;
		addressCountry?: string;
	};
	geo?: {
		'@type': 'GeoCoordinates';
		latitude?: number;
		longitude?: number;
	};
	openingHoursSpecification?: Array<{
		'@type': 'OpeningHoursSpecification';
		dayOfWeek: string;
		opens: string;
		closes: string;
	}>;
	priceRange?: string;
}

export interface ImageObjectSchema {
	'@context': 'https://schema.org';
	'@type': 'ImageObject';
	url: string;
	title?: string;
	description?: string;
	width?: number;
	height?: number;
	contentUrl?: string;
	thumbnailUrl?: string;
	uploadDate?: string;
}

export interface VideoObjectSchema {
	'@context': 'https://schema.org';
	'@type': 'VideoObject';
	name: string;
	description: string;
	thumbnailUrl?: string;
	uploadDate?: string;
	contentUrl?: string;
	embedUrl?: string;
	duration?: string;
	keywords?: string;
}

// Meta Tag Generation Functions
export function generateMetaTags(seoData: SEOData): MetaTag[] {
	const tags: MetaTag[] = [];
	const { title, description, canonical, noindex, nofollow, openGraph, twitter } = seoData;

	// Basic meta tags
	if (description) {
		tags.push({ name: 'description', content: description });
	}

	// Robots meta tag
	const robotsDirectives: string[] = [];
	if (noindex) robotsDirectives.push('noindex');
	if (nofollow) robotsDirectives.push('nofollow');
	if (robotsDirectives.length > 0) {
		tags.push({ name: 'robots', content: robotsDirectives.join(', ') });
	}

	// Open Graph meta tags
	const ogData: OpenGraphData = {
		title: openGraph?.title || title,
		description: openGraph?.description || description,
		type: openGraph?.type || 'website',
		url: openGraph?.url || canonical,
		image: openGraph?.image || seoConfig.defaultImage,
		siteName: openGraph?.siteName || seoConfig.siteName,
		locale: openGraph?.locale || seoConfig.locale
	};

	tags.push({ property: 'og:title', content: ogData.title });
	tags.push({ property: 'og:description', content: ogData.description });
	tags.push({ property: 'og:type', content: ogData.type || 'website' });
	if (ogData.url) tags.push({ property: 'og:url', content: ogData.url });
	if (ogData.image) tags.push({ property: 'og:image', content: ogData.image });
	if (ogData.siteName) tags.push({ property: 'og:site_name', content: ogData.siteName });
	if (ogData.locale) tags.push({ property: 'og:locale', content: ogData.locale });

	// Article-specific Open Graph tags
	if (ogData.type === 'article') {
		if (openGraph?.publishedTime) {
			tags.push({ property: 'article:published_time', content: openGraph.publishedTime });
		}
		if (openGraph?.modifiedTime) {
			tags.push({ property: 'article:modified_time', content: openGraph.modifiedTime });
		}
		if (openGraph?.author) {
			tags.push({ property: 'article:author', content: openGraph.author });
		}
		if (openGraph?.section) {
			tags.push({ property: 'article:section', content: openGraph.section });
		}
		if (openGraph?.tags) {
			openGraph.tags.forEach((tag) => {
				tags.push({ property: 'article:tag', content: tag });
			});
		}
	}

	// Twitter Card meta tags
	const twitterData: TwitterCardData = {
		card: twitter?.card || 'summary_large_image',
		site: twitter?.site || seoConfig.twitterHandle,
		creator: twitter?.creator || seoConfig.twitterHandle,
		title: twitter?.title || title,
		description: twitter?.description || description,
		image: twitter?.image || ogData.image
	};

	tags.push({ name: 'twitter:card', content: twitterData.card || 'summary_large_image' });
	if (twitterData.site) tags.push({ name: 'twitter:site', content: twitterData.site });
	if (twitterData.creator) tags.push({ name: 'twitter:creator', content: twitterData.creator });
	tags.push({ name: 'twitter:title', content: twitterData.title });
	tags.push({ name: 'twitter:description', content: twitterData.description });
	if (twitterData.image) tags.push({ name: 'twitter:image', content: twitterData.image });

	return tags;
}

// JSON-LD Structured Data Generation Functions
export function generateOrganizationSchema(
	overrides?: Partial<OrganizationSchema>
): OrganizationSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Banten IT Solutions',
		url: seoConfig.siteUrl,
		logo: overrides?.logo || '',
		description: overrides?.description || seoConfig.defaultDescription,
		sameAs: [
			'https://www.linkedin.com/company/bits-id',
			'https://twitter.com/bits_id',
			'https://www.instagram.com/bits_id',
			'https://github.com/bits-id'
		],
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Jl. Komp. Taman Pesona',
			addressLocality: 'Taktakan, Kota Serang',
			addressRegion: 'Banten',
			postalCode: '42162',
			addressCountry: 'ID'
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+62-819-678-048',
			contactType: 'customer service',
			email: 'admin@bits.co.id',
			availableLanguage: ['English', 'Indonesian']
		},
		...overrides
	};
}

export function generateServiceSchema(
	name: string,
	description: string,
	serviceType?: string,
	url?: string
): ServiceSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name,
		description,
		provider: {
			'@type': 'Organization',
			name: 'Banten IT Solutions',
			url: seoConfig.siteUrl
		},
		serviceType: serviceType || 'Digital Services',
		areaServed: 'Indonesia',
		url: url || seoConfig.siteUrl
	};
}

export interface ArticleSchemaOptions {
	headline: string;
	description: string;
	authorName: string;
	datePublished: string;
	dateModified?: string;
	image?: string;
	url?: string;
	publisherLogo?: string;
}

export function generateArticleSchema(options: ArticleSchemaOptions): ArticleSchema {
	const {
		headline,
		description,
		authorName,
		datePublished,
		dateModified,
		image,
		url,
		publisherLogo
	} = options;

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline,
		description,
		image: image || seoConfig.defaultImage,
		datePublished,
		dateModified: dateModified || datePublished,
		author: {
			'@type': 'Person',
			name: authorName,
			url: `${seoConfig.siteUrl}/about`
		},
		publisher: {
			'@type': 'Organization',
			name: 'Banten IT Solutions',
			url: seoConfig.siteUrl,
			logo: {
				'@type': 'ImageObject',
				url: publisherLogo || image || ''
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url || seoConfig.siteUrl
		}
	};
}

export function generateCreativeWorkSchema(
	name: string,
	description: string,
	dateCreated?: string,
	image?: string,
	url?: string
): CreativeWorkSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name,
		description,
		creator: {
			'@type': 'Organization',
			name: 'Banten IT Solutions',
			url: seoConfig.siteUrl
		},
		dateCreated,
		image: image || seoConfig.defaultImage,
		url: url || seoConfig.siteUrl
	};
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url.startsWith('http') ? item.url : `${seoConfig.siteUrl}${item.url}`
		}))
	};
}

export function generateWebPageSchema(
	name: string,
	description: string,
	url: string
): WebPageSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name,
		description,
		url: url.startsWith('http') ? url : `${seoConfig.siteUrl}${url}`,
		isPartOf: {
			'@type': 'WebSite',
			name: seoConfig.siteName,
			url: seoConfig.siteUrl
		}
	};
}

// Helper to serialize JSON-LD for HTML
export function serializeJsonLd(schema: unknown): string {
	return JSON.stringify(schema, null, 0);
}

// Generate full page title with site name
export function generatePageTitle(pageTitle?: string): string {
	if (!pageTitle) return seoConfig.defaultTitle;
	return `${pageTitle} | ${seoConfig.siteName}`;
}

// Generate canonical URL
export function generateCanonicalUrl(path: string): string {
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	return `${seoConfig.siteUrl}${cleanPath}`;
}

// Type for localized string from Sanity
export type LocalizedString = Record<string, string>;

// Helper to extract localized value
export function getLocalizedValue(
	obj: LocalizedString | undefined,
	locale: string,
	fallback?: string
): string {
	if (!obj) return fallback || '';
	return obj[locale] || obj.en || obj.id || fallback || '';
}

// SEO Data extractor helper for Sanity data
export interface SanitySEOData {
	title?: string;
	description?: string;
	keywords?: string[];
	ogImage?: string;
	ogTitle?: string;
	ogDescription?: string;
	canonicalUrl?: string;
	noIndex?: boolean;
	noFollow?: boolean;
	excludeFromSitemap?: boolean;
	priority?: number;
	changeFreq?: string;
}

export function extractSanitySEOData(
	seo: Record<string, unknown> | undefined,
	locale: string
): SanitySEOData {
	if (!seo) return {};

	return {
		title: getLocalizedValue(seo.title as LocalizedString, locale),
		description: getLocalizedValue(seo.description as LocalizedString, locale),
		keywords: seo.keywords as string[] | undefined,
		noIndex: seo.noIndex as boolean | undefined,
		noFollow: seo.noFollow as boolean | undefined,
		excludeFromSitemap: seo.excludeFromSitemap as boolean | undefined,
		priority: seo.priority as number | undefined,
		changeFreq: seo.changeFreq as string | undefined
	};
}

// Generate Website schema with search functionality
export function generateWebsiteSchema(): WebsiteSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: seoConfig.siteName,
		url: seoConfig.siteUrl,
		description: seoConfig.defaultDescription,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${seoConfig.siteUrl}/search?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};
}

// Generate FAQPage schema from Q&A pairs
export function generateFAQPageSchema(
	faqItems: Array<{ question: string; answer: string }>
): FAQPageSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer
			}
		}))
	};
}

// Generate LocalBusiness schema for BITS
export function generateLocalBusinessSchema(
	overrides?: Partial<LocalBusinessSchema>
): LocalBusinessSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: seoConfig.siteName,
		description: seoConfig.defaultDescription,
		url: seoConfig.siteUrl,
		image: overrides?.image || '',
		telephone: '+62-819-678-048',
		email: 'admin@bits.co.id',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Jl. Komp. Taman Pesona',
			addressLocality: 'Taktakan, Kota Serang',
			addressRegion: 'Banten',
			postalCode: '42162',
			addressCountry: 'ID'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: -6.1208,
			longitude: 106.1503
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Monday',
				opens: '08:00',
				closes: '17:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Tuesday',
				opens: '08:00',
				closes: '17:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Wednesday',
				opens: '08:00',
				closes: '17:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Thursday',
				opens: '08:00',
				closes: '17:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Friday',
				opens: '08:00',
				closes: '17:00'
			}
		],
		priceRange: 'IDR 500K - 50M',
		...overrides
	};
}

// Generate ImageObject schema
export function generateImageObjectSchema(
	url: string,
	title?: string,
	description?: string,
	width?: number,
	height?: number,
	uploadDate?: string
): ImageObjectSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'ImageObject',
		url,
		title,
		description,
		width,
		height,
		uploadDate
	};
}

// Generate VideoObject schema
export function generateVideoObjectSchema(
	name: string,
	description: string,
	thumbnailUrl?: string,
	uploadDate?: string,
	embedUrl?: string,
	duration?: string,
	keywords?: string[]
): VideoObjectSchema {
	return {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name,
		description,
		thumbnailUrl,
		uploadDate,
		embedUrl,
		duration,
		keywords: keywords?.join(', ')
	};
}
