import { C as escape_html, a as attr_class, d as ensure_array_like, g as stringify, l as derived, x as attr } from "../../../../../chunks/index-server.js";
import { c as seoConfig, r as generateCreativeWorkSchema } from "../../../../../chunks/seo.js";
import { r as resolvePath } from "../../../../../chunks/routing.js";
import { t as SEO } from "../../../../../chunks/SEO2.js";
import { n as DetailHero, t as RelatedSection } from "../../../../../chunks/RelatedSection.js";
import { t as NotFound } from "../../../../../chunks/NotFound.js";
import { t as BigCTA } from "../../../../../chunks/BigCTA.js";
//#region src/lib/components/ui/content/PortfolioContent.svelte
function PortfolioContent($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { sections, gallery = [], locale: _locale, galleryImageLabel = "Gallery Image" } = $$props;
		let currentImageIndex = 0;
		$$renderer.push(`<section class="py-10 lg:py-16 bg-white" aria-labelledby="content-heading"><div class="container-base"><h2 id="content-heading" class="sr-only">Content Details</h2> <div class="max-w-4xl mx-auto space-y-16"><!--[-->`);
		const each_array = ensure_array_like(sections);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let section = each_array[$$index];
			$$renderer.push(`<div><h3 class="heading-3 text-[var(--color-gray-900)] mb-6 flex items-center gap-3"><span${attr_class(`w-10 h-10 flex items-center justify-center rounded-full ${stringify(section.color)} text-lg font-bold`, "svelte-1hoh320")}>${escape_html(section.number)}</span> ${escape_html(section.label)}</h3> <p class="text-[var(--color-gray-600)] text-lg leading-relaxed pl-14">${escape_html(section.content)}</p></div>`);
		}
		$$renderer.push(`<!--]--> `);
		if (gallery.length > 0) {
			$$renderer.push(`<!--[0--><div class="carousel-container svelte-1hoh320"><div class="main-image-wrapper svelte-1hoh320"><!--[-->`);
			const each_array_1 = ensure_array_like(gallery);
			for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
				let image = each_array_1[index];
				$$renderer.push(`<div${attr_class(`main-image ${currentImageIndex === index ? "active" : ""}`, "svelte-1hoh320")} role="tabpanel"${attr("aria-labelledby", `thumb-${image._key || index}`)}><img${attr("src", image.url || "")}${attr("alt", image.alt || `${galleryImageLabel} ${index + 1}`)} class="main-image-element svelte-1hoh320"${attr("loading", index === 0 ? "eager" : "lazy")} decoding="async"/></div>`);
			}
			$$renderer.push(`<!--]--> <button class="nav-button nav-prev svelte-1hoh320" aria-label="Previous image"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="svelte-1hoh320"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <button class="nav-button nav-next svelte-1hoh320" aria-label="Next image"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="svelte-1hoh320"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button> <div class="image-counter svelte-1hoh320"><span class="counter-current svelte-1hoh320">${escape_html(1)}</span> <span class="counter-divider svelte-1hoh320">/</span> <span class="counter-total svelte-1hoh320">${escape_html(gallery.length)}</span></div></div> <div class="thumbnail-strip svelte-1hoh320" role="tablist"><!--[-->`);
			const each_array_2 = ensure_array_like(gallery);
			for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
				let image = each_array_2[index];
				$$renderer.push(`<button${attr_class(`thumbnail-item ${currentImageIndex === index ? "active" : ""}`, "svelte-1hoh320")} role="tab"${attr("aria-label", `View image ${index + 1}`)}${attr("aria-selected", currentImageIndex === index)}${attr("aria-controls", `thumb-${image._key || index}`)}><img${attr("src", image.url || "")} alt="" class="thumbnail-image svelte-1hoh320" loading="lazy" decoding="async"/></button>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/routes/[lang]/portfolio/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let project = derived(() => data.project);
		const seoTitle = derived(() => project()?.seo?.title || `${project()?.title || ""} - Portfolio`);
		const seoDescription = derived(() => project()?.seo?.description || "");
		const breadcrumbs = derived(() => {
			if (!project()) return [];
			return [
				{
					name: data.navigation?.items?.find((item) => item.href === "/")?.label || "Home",
					url: "/"
				},
				{
					name: "Portfolio",
					url: "/portfolio"
				},
				{
					name: seoTitle(),
					url: `/portfolio/${project().slug?.current || ""}`
				}
			];
		});
		const creativeWorkSchema = derived(() => project() ? generateCreativeWorkSchema(project().title || "", seoDescription(), void 0, project().imageUrl || seoConfig.defaultImage, `/portfolio/${project().slug?.current || ""}`) : null);
		const contentSections = derived(() => {
			if (!project()) return [];
			const sections = [];
			if (project().challenge) sections.push({
				label: data.portfolioPage?.itemLabels?.challenge || "Challenge",
				content: project().challenge,
				number: 1,
				color: "bg-red-100 text-red-600"
			});
			if (project().solution) sections.push({
				label: data.portfolioPage?.itemLabels?.solution || "Solution",
				content: project().solution,
				number: 2,
				color: "bg-blue-100 text-blue-600"
			});
			if (project().result) sections.push({
				label: data.portfolioPage?.itemLabels?.result || "Result",
				content: project().result,
				number: 3,
				color: "bg-green-100 text-green-600"
			});
			return sections;
		});
		const galleryImages = derived(() => project()?.gallery?.map((img) => ({
			_key: img._key,
			url: img.url,
			alt: `${data.portfolioPage?.itemLabels?.galleryImage || "Gallery Image"} ${(project().gallery?.indexOf(img) || 0) + 1}`
		})) || []);
		const relatedProjects = derived(() => (data.relatedProjects || []).map((p) => ({
			slug: p.slug?.current || "",
			title: p.title || "",
			image: p.imageUrl || "",
			category: p.category?.slug?.current || "",
			categoryLabel: p.category?.title || "",
			categoryColor: p.category?.color || "#3b82f6",
			date: p.publishedAt || (/* @__PURE__ */ new Date()).toISOString()
		})));
		function resolve(path) {
			return resolvePath(path, data.locale);
		}
		if (project()) {
			$$renderer.push("<!--[0-->");
			SEO($$renderer, {
				title: seoTitle(),
				description: seoDescription(),
				image: project().imageUrl,
				siteIcon: data.information?.siteIcon?.asset?.url,
				breadcrumbs: breadcrumbs(),
				jsonLd: [creativeWorkSchema()]
			});
		} else {
			$$renderer.push("<!--[-1-->");
			SEO($$renderer, {
				title: data.portfolioPage?.itemLabels?.notFound || "Project Not Found",
				description: data.portfolioPage?.itemLabels?.notFoundDesc || "The project you are looking for does not exist.",
				noindex: true,
				siteIcon: data.information?.siteIcon?.asset?.url
			});
		}
		$$renderer.push(`<!--]--> `);
		if (project()) {
			$$renderer.push("<!--[0-->");
			DetailHero($$renderer, {
				title: project().title || "",
				description: seoDescription(),
				category: project().category?.title || "Project",
				imageUrl: project().imageUrl,
				locale: data.locale,
				breadcrumbs: breadcrumbs(),
				author: {
					name: project().client?.name || "Confidential",
					iconUrl: project().client?.iconUrl,
					logoUrl: project().client?.logoUrl
				},
				authorRole: "Client",
				tags: project().techStack || []
			});
			$$renderer.push(`<!----> `);
			PortfolioContent($$renderer, {
				sections: contentSections(),
				gallery: galleryImages(),
				locale: data.locale,
				galleryImageLabel: data.portfolioPage?.itemLabels?.galleryImage || "Gallery Image"
			});
			$$renderer.push(`<!----> `);
			if (relatedProjects().length > 0) {
				$$renderer.push("<!--[0-->");
				RelatedSection($$renderer, {
					posts: relatedProjects(),
					locale: data.locale,
					readArticleLabel: data.portfolioPage?.itemLabels?.viewAllProjects || "View Project",
					onresolve: (path) => resolve(path.replace("/blog/", "/portfolio/"))
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			BigCTA($$renderer, {
				cta: data.portfolioPage?.cta,
				locale: data.locale
			});
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			NotFound($$renderer, {
				title: data.portfolioPage?.itemLabels?.notFound || "Project Not Found",
				description: data.portfolioPage?.itemLabels?.notFoundDesc || "The project you are looking for does not exist or has been removed.",
				buttonLabel: data.portfolioPage?.itemLabels?.viewAllProjects || "View All Projects",
				href: `/${data.locale}/portfolio`
			});
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
