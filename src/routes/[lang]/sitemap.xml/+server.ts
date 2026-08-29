import type { RequestHandler } from './$types';
import { seoConfig } from '$lib/utils/seo';
import { getSitemapData } from '$lib/sanity/queries';

// Prerender the sitemap at build time
export const prerender = true;

// Static pages that should always be in the sitemap
const staticPages = [
	{ url: '/', changefreq: 'weekly', priority: 1.0 },
	{ url: '/about', changefreq: 'monthly', priority: 0.8 },
	{ url: '', changefreq: 'weekly', priority: 1.0 }, // services page
	{ url: '/portfolio', changefreq: 'weekly', priority: 0.9 },
	{ url: '/blog', changefreq: 'daily', priority: 0.9 },
	{ url: '/contact', changefreq: 'monthly', priority: 0.8 }
];
interface SitemapItem {
	slug?: { current: string };
	_updatedAt?: string;
}

function generateSitemapXml(
	locale: string,
	data: { services: SitemapItem[]; projects: SitemapItem[]; posts: SitemapItem[] }
): string {
	const today = new Date().toISOString().split('T')[0];

	let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
	xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

	// Add static pages with locale
	for (const page of staticPages) {
		xml += '  <url>\n';
		xml += `    <loc>${seoConfig.siteUrl}/${locale}${page.url}</loc>\n`;
		xml += `    <lastmod>${today}</lastmod>\n`;
		xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
		xml += `    <priority>${page.priority}</priority>\n`;
		xml += '  </url>\n';
	}

	// Add service pages with locale
	for (const service of data.services || []) {
		if (service.slug?.current) {
			xml += '  <url>\n';
			xml += `    <loc>${seoConfig.siteUrl}/${locale}/services/${service.slug.current}</loc>\n`;
			xml += `    <lastmod>${(service._updatedAt || today).split('T')[0]}</lastmod>\n`;
			xml += '    <changefreq>monthly</changefreq>\n';
			xml += `    <priority>0.8</priority>\n`;
			xml += '  </url>\n';
		}
	}

	// Add portfolio pages with locale
	for (const project of data.projects || []) {
		if (project.slug?.current) {
			xml += '  <url>\n';
			xml += `    <loc>${seoConfig.siteUrl}/${locale}/portfolio/${project.slug.current}</loc>\n`;
			xml += `    <lastmod>${(project._updatedAt || today).split('T')[0]}</lastmod>\n`;
			xml += '    <changefreq>monthly</changefreq>\n';
			xml += `    <priority>0.7</priority>\n`;
			xml += '  </url>\n';
		}
	}

	// Add blog posts with locale
	for (const post of data.posts || []) {
		if (post.slug?.current) {
			xml += '  <url>\n';
			xml += `    <loc>${seoConfig.siteUrl}/${locale}/blog/${post.slug.current}</loc>\n`;
			xml += `    <lastmod>${(post._updatedAt || today).split('T')[0]}</lastmod>\n`;
			xml += '    <changefreq>monthly</changefreq>\n';
			xml += `    <priority>0.7</priority>\n`;
			xml += '  </url>\n';
		}
	}

	xml += '</urlset>';

	return xml;
}

export const GET: RequestHandler = async ({ params }) => {
	const locale = params.lang || 'id';
	const sitemapData = (await getSitemapData()) || { services: [], projects: [], posts: [] };
	const sitemap = generateSitemapXml(locale, sitemapData);

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
