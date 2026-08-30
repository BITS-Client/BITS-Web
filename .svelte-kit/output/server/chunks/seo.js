import "./public.js";
//#region src/lib/utils/seo.ts
/**
* SEO Helper Utilities for Banten IT Solutions Corporate Platform
* Provides functions for generating meta tags, JSON-LD structured data, and SEO configuration
*/
var seoConfig = {
	siteName: "Banten IT Solutions",
	siteUrl: "https://bits.co.id",
	contactEmail: "admin@bits.co.id",
	defaultTitle: "Banten IT Solutions - Digital Solutions That Drive Growth",
	defaultDescription: "Banten IT Solutions - Digital Solutions That Drive Growth. Custom software development, web design, ERP systems, AI & automation services.",
	defaultImage: "",
	twitterHandle: "@bitscoid",
	locale: "id_ID",
	phoneDisplay: "+62 819 678 048",
	whatsappNumber: "62819678048",
	themeColor: "#ff3e00",
	sitemapPriority: .5,
	sitemapChangeFreq: "monthly"
};
function generateOrganizationSchema(overrides) {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Banten IT Solutions",
		url: seoConfig.siteUrl,
		logo: overrides?.logo || "",
		description: overrides?.description || seoConfig.defaultDescription,
		sameAs: [
			"https://www.linkedin.com/company/bits-id",
			"https://twitter.com/bits_id",
			"https://www.instagram.com/bits_id",
			"https://github.com/bits-id"
		],
		address: {
			"@type": "PostalAddress",
			streetAddress: "Jl. Komp. Taman Pesona",
			addressLocality: "Taktakan, Kota Serang",
			addressRegion: "Banten",
			postalCode: "42162",
			addressCountry: "ID"
		},
		contactPoint: {
			"@type": "ContactPoint",
			telephone: seoConfig.phoneDisplay,
			contactType: "customer service",
			email: seoConfig.contactEmail,
			availableLanguage: ["English", "Indonesian"]
		},
		...overrides
	};
}
function generateServiceSchema(name, description, serviceType, url) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name,
		description,
		provider: {
			"@type": "Organization",
			name: "Banten IT Solutions",
			url: seoConfig.siteUrl
		},
		serviceType: serviceType || "Digital Services",
		areaServed: "Indonesia",
		url: url || seoConfig.siteUrl
	};
}
function generateArticleSchema(options) {
	const { headline, description, authorName, datePublished, dateModified, image, url, publisherLogo } = options;
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline,
		description,
		image: image || seoConfig.defaultImage,
		datePublished,
		dateModified: dateModified || datePublished,
		author: {
			"@type": "Person",
			name: authorName,
			url: `${seoConfig.siteUrl}/about`
		},
		publisher: {
			"@type": "Organization",
			name: "Banten IT Solutions",
			url: seoConfig.siteUrl,
			logo: {
				"@type": "ImageObject",
				url: publisherLogo || image || ""
			}
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url || seoConfig.siteUrl
		}
	};
}
function generateCreativeWorkSchema(name, description, dateCreated, image, url) {
	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name,
		description,
		creator: {
			"@type": "Organization",
			name: "Banten IT Solutions",
			url: seoConfig.siteUrl
		},
		dateCreated,
		image: image || seoConfig.defaultImage,
		url: url || seoConfig.siteUrl
	};
}
function generateWebPageSchema(name, description, url) {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name,
		description,
		url: url.startsWith("http") ? url : `${seoConfig.siteUrl}${url}`,
		isPartOf: {
			"@type": "WebSite",
			name: seoConfig.siteName,
			url: seoConfig.siteUrl
		}
	};
}
function serializeJsonLd(schema) {
	return JSON.stringify(schema, null, 0);
}
function generatePageTitle(pageTitle) {
	if (!pageTitle) return seoConfig.defaultTitle;
	return `${pageTitle} | ${seoConfig.siteName}`;
}
function generateCanonicalUrl(path) {
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	return `${seoConfig.siteUrl}${cleanPath}`;
}
//#endregion
export { generatePageTitle as a, seoConfig as c, generateOrganizationSchema as i, serializeJsonLd as l, generateCanonicalUrl as n, generateServiceSchema as o, generateCreativeWorkSchema as r, generateWebPageSchema as s, generateArticleSchema as t };
