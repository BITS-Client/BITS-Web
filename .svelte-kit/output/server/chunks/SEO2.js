import { C as escape_html, d as ensure_array_like, f as head, l as derived, x as attr } from "./index-server.js";
import { a as generatePageTitle, c as seoConfig, l as serializeJsonLd, n as generateCanonicalUrl } from "./seo.js";
//#region src/lib/components/ui/seo/SEO.svelte
function SEO($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title = void 0, description = void 0, image = seoConfig.defaultImage, imageWidth = 1200, imageHeight = 630, imageAlt = seoConfig.siteName, type = "website", url = "", noindex = false, nofollow = false, locale = seoConfig.locale, alternates = [], siteIcon, publishedTime, modifiedTime, author, section, tags = [], jsonLd, breadcrumbs } = $$props;
		const getLocalizedValue = (value, locale) => {
			if (!value) return "";
			if (typeof value === "string") return value;
			return value[locale] || value.en || value.id || "";
		};
		const resolvedTitle = derived(() => getLocalizedValue(title, locale));
		const resolvedDescription = derived(() => getLocalizedValue(description, locale));
		const fullTitle = derived(() => generatePageTitle(resolvedTitle() || void 0));
		const canonicalUrl = derived(() => url ? generateCanonicalUrl(url) : "");
		const metaDescription = derived(() => resolvedDescription() || seoConfig.defaultDescription);
		const ogTitle = derived(() => resolvedTitle() || seoConfig.defaultTitle);
		const secureImageUrl = derived(() => image ? image.replace(/^http:\/\//, "https://") : "");
		const robotsContent = derived(() => () => {
			const directives = [];
			if (noindex) directives.push("noindex");
			else directives.push("index");
			if (nofollow) directives.push("nofollow");
			else directives.push("follow");
			return directives.join(", ");
		});
		const breadcrumbJsonLd = derived(() => () => {
			if (!breadcrumbs || breadcrumbs.length === 0) return null;
			return {
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: breadcrumbs.map((item, index) => ({
					"@type": "ListItem",
					position: index + 1,
					name: item.name,
					item: item.url.startsWith("http") ? item.url : `${seoConfig.siteUrl}${item.url}`
				}))
			};
		});
		const jsonLdScripts = derived(() => () => {
			const schemas = [];
			if (jsonLd) {
				if (Array.isArray(jsonLd)) jsonLd.forEach((schema) => {
					schemas.push(serializeJsonLd(schema));
				});
				else schemas.push(serializeJsonLd(jsonLd));
			}
			const breadcrumbSchema = breadcrumbJsonLd()();
			if (breadcrumbSchema) schemas.push(serializeJsonLd(breadcrumbSchema));
			return schemas;
		});
		head("1pxn5iy", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(fullTitle())}</title>`);
			});
			$$renderer.push(`<meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="x-ua-compatible" content="IE=edge"/> <meta name="generator" content="SvelteKit"/> <meta name="referrer" content="strict-origin-when-cross-origin"/> <meta name="format-detection" content="telephone=no"/> <meta name="theme-color"${attr("content", seoConfig.themeColor)}/> `);
			if (siteIcon) $$renderer.push(`<!--[0--><link rel="icon"${attr("href", siteIcon)} sizes="any"/> <link rel="icon" type="image/png"${attr("href", siteIcon)} sizes="192x192"/> <link rel="icon" type="image/png"${attr("href", siteIcon)} sizes="512x512"/> <link rel="apple-touch-icon"${attr("href", siteIcon)}/>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <link rel="manifest" href="/site.webmanifest"/> <link rel="preconnect"${attr("href", seoConfig.siteUrl)}/> <link rel="dns-prefetch"${attr("href", seoConfig.siteUrl)}/>  <meta name="description"${attr("content", metaDescription())}/> <meta name="robots"${attr("content", robotsContent()())}/> `);
			if (canonicalUrl()) $$renderer.push(`<!--[0--><link rel="canonical"${attr("href", canonicalUrl())}/>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (alternates.length > 0) {
				$$renderer.push(`<!--[0--><!--[-->`);
				const each_array = ensure_array_like(alternates);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let alt = each_array[$$index];
					$$renderer.push(`<link rel="alternate"${attr("hreflang", alt.lang)}${attr("href", alt.url)}/>`);
				}
				$$renderer.push(`<!--]--> <link rel="alternate" hreflang="x-default"${attr("href", canonicalUrl())}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <meta property="og:title"${attr("content", ogTitle())}/> <meta property="og:description"${attr("content", metaDescription())}/> <meta property="og:type"${attr("content", type)}/> `);
			if (canonicalUrl()) $$renderer.push(`<!--[0--><meta property="og:url"${attr("content", canonicalUrl())}/>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (image) $$renderer.push(`<!--[0--><meta property="og:image"${attr("content", image)}/> <meta property="og:image:secure_url"${attr("content", secureImageUrl())}/> <meta property="og:image:width"${attr("content", String(imageWidth))}/> <meta property="og:image:height"${attr("content", String(imageHeight))}/> <meta property="og:image:alt"${attr("content", imageAlt)}/>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <meta property="og:site_name"${attr("content", seoConfig.siteName)}/> <meta property="og:locale"${attr("content", locale)}/> `);
			if (type === "article") {
				$$renderer.push("<!--[0-->");
				if (publishedTime) $$renderer.push(`<!--[0--><meta property="article:published_time"${attr("content", publishedTime)}/>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (modifiedTime) $$renderer.push(`<!--[0--><meta property="article:modified_time"${attr("content", modifiedTime)}/>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (author) $$renderer.push(`<!--[0--><meta property="article:author"${attr("content", author)}/>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (section) $$renderer.push(`<!--[0--><meta property="article:section"${attr("content", section)}/>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <!--[-->`);
				const each_array_1 = ensure_array_like(tags);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let tag = each_array_1[$$index_1];
					$$renderer.push(`<meta property="article:tag"${attr("content", tag)}/>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:site"${attr("content", seoConfig.twitterHandle)}/> <meta name="twitter:creator"${attr("content", seoConfig.twitterHandle)}/> <meta name="twitter:title"${attr("content", ogTitle())}/> <meta name="twitter:description"${attr("content", metaDescription())}/> `);
			if (image) $$renderer.push(`<!--[0--><meta name="twitter:image"${attr("content", image)}/> <meta name="twitter:image:alt"${attr("content", imageAlt)}/>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (jsonLdScripts() && jsonLdScripts()().length > 0) {
				$$renderer.push(`<!--[0--><!--[-->`);
				const each_array_2 = ensure_array_like(jsonLdScripts()());
				for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
					each_array_2[index];
					$$renderer.push(`<script type="application/ld+json">
{_script}
			<\/script>`);
					$$renderer.push(`<!---->`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		});
	});
}
//#endregion
export { SEO as t };
