import { t as getSitemapData } from "../../../../chunks/queries.js";
import { c as seoConfig } from "../../../../chunks/seo.js";
//#region src/routes/[lang]/sitemap.xml/+server.ts
var prerender = true;
var staticPages = [
	{
		url: "/",
		changefreq: "weekly",
		priority: 1
	},
	{
		url: "/about",
		changefreq: "monthly",
		priority: .8
	},
	{
		url: "",
		changefreq: "weekly",
		priority: 1
	},
	{
		url: "/portfolio",
		changefreq: "weekly",
		priority: .9
	},
	{
		url: "/blog",
		changefreq: "daily",
		priority: .9
	},
	{
		url: "/contact",
		changefreq: "monthly",
		priority: .8
	}
];
function generateSitemapXml(locale, data) {
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	let xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	xml += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
	for (const page of staticPages) {
		xml += "  <url>\n";
		xml += `    <loc>${seoConfig.siteUrl}/${locale}${page.url}</loc>\n`;
		xml += `    <lastmod>${today}</lastmod>\n`;
		xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
		xml += `    <priority>${page.priority}</priority>\n`;
		xml += "  </url>\n";
	}
	for (const service of data.services || []) if (service.slug?.current) {
		xml += "  <url>\n";
		xml += `    <loc>${seoConfig.siteUrl}/${locale}/services/${service.slug.current}</loc>\n`;
		xml += `    <lastmod>${(service._updatedAt || today).split("T")[0]}</lastmod>\n`;
		xml += "    <changefreq>monthly</changefreq>\n";
		xml += `    <priority>0.8</priority>\n`;
		xml += "  </url>\n";
	}
	for (const project of data.projects || []) if (project.slug?.current) {
		xml += "  <url>\n";
		xml += `    <loc>${seoConfig.siteUrl}/${locale}/portfolio/${project.slug.current}</loc>\n`;
		xml += `    <lastmod>${(project._updatedAt || today).split("T")[0]}</lastmod>\n`;
		xml += "    <changefreq>monthly</changefreq>\n";
		xml += `    <priority>0.7</priority>\n`;
		xml += "  </url>\n";
	}
	for (const post of data.posts || []) if (post.slug?.current) {
		xml += "  <url>\n";
		xml += `    <loc>${seoConfig.siteUrl}/${locale}/blog/${post.slug.current}</loc>\n`;
		xml += `    <lastmod>${(post._updatedAt || today).split("T")[0]}</lastmod>\n`;
		xml += "    <changefreq>monthly</changefreq>\n";
		xml += `    <priority>0.7</priority>\n`;
		xml += "  </url>\n";
	}
	xml += "</urlset>";
	return xml;
}
var GET = async ({ params }) => {
	const sitemap = generateSitemapXml(params.lang || "id", await getSitemapData() || {
		services: [],
		projects: [],
		posts: []
	});
	return new Response(sitemap, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "max-age=3600"
	} });
};
//#endregion
export { GET, prerender };
