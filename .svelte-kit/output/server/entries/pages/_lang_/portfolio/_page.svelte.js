import { C as escape_html, a as attr_class, d as ensure_array_like, l as derived, x as attr } from "../../../../chunks/index-server.js";
import { s as generateWebPageSchema } from "../../../../chunks/seo.js";
import { r as resolvePath } from "../../../../chunks/routing.js";
import "../../../../chunks/lucide.js";
import { t as Trophy } from "../../../../chunks/trophy.js";
import { t as Chevron_left } from "../../../../chunks/chevron-left.js";
import { t as Chevron_right } from "../../../../chunks/chevron-right.js";
import { n as Code } from "../../../../chunks/search.js";
import { i as Eye, n as Star, r as Layers, t as Zap } from "../../../../chunks/zap.js";
import { t as goto } from "../../../../chunks/client2.js";
import "../../../../chunks/navigation.js";
import { t as SEO } from "../../../../chunks/SEO2.js";
import { t as GeneralCard } from "../../../../chunks/GeneralCard.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
import { t as Empty } from "../../../../chunks/Empty.js";
import { t as BigCTA } from "../../../../chunks/BigCTA.js";
//#region src/lib/components/ui/misc/ProjectFilters.svelte
function ProjectFilters($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { categories, activeFilter, categoryCounts, onfilterchange } = $$props;
		$$renderer.push(`<div class="filter-row svelte-o4aqys" role="tablist" aria-label="Filter projects by category"><!--[-->`);
		const each_array = ensure_array_like(categories);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let category = each_array[$$index];
			$$renderer.push(`<button type="button" role="tab"${attr("aria-selected", activeFilter === category.id)}${attr_class("filter-btn svelte-o4aqys", void 0, { "active": activeFilter === category.id })}><span class="filter-btn-inner svelte-o4aqys">`);
			if (category.icon === Layers) {
				$$renderer.push("<!--[0-->");
				Layers($$renderer, { class: "w-4 h-4" });
			} else if (category.icon === Code) {
				$$renderer.push("<!--[1-->");
				Code($$renderer, { class: "w-4 h-4" });
			} else if (category.icon === Zap) {
				$$renderer.push("<!--[2-->");
				Zap($$renderer, { class: "w-4 h-4" });
			} else if (category.icon === Trophy) {
				$$renderer.push("<!--[3-->");
				Trophy($$renderer, { class: "w-4 h-4" });
			} else if (category.icon === Star) {
				$$renderer.push("<!--[4-->");
				Star($$renderer, { class: "w-4 h-4" });
			} else if (category.icon === Eye) {
				$$renderer.push("<!--[5-->");
				Eye($$renderer, { class: "w-4 h-4" });
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span class="svelte-o4aqys">${escape_html(category.label)}</span> <span class="filter-count svelte-o4aqys">${escape_html(categoryCounts[category.id] ?? 0)}</span></span></button>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/routes/[lang]/portfolio/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		function resolve(path) {
			return resolvePath(path, data.locale);
		}
		const seoTitle = derived(() => data.portfolioPage?.seo?.title || "");
		const seoDescription = derived(() => data.portfolioPage?.seo?.description || "");
		const breadcrumbs = derived(() => {
			const homeLabel = data.navigation?.items?.find((item) => item.href === "/")?.label || "Home";
			const title = data.portfolioPage?.seo?.title || "Portfolio";
			return [{
				name: homeLabel,
				url: "/"
			}, {
				name: title,
				url: "/portfolio"
			}];
		});
		const webPageSchema = derived(() => generateWebPageSchema(seoTitle(), seoDescription(), "/portfolio"));
		const activeFilter = derived(() => data.activeFilter || "all");
		function setFilter(filter) {
			goto(buildPageUrl(1, filter));
		}
		const categoryIcons = {
			web: "Code",
			software: "Zap",
			erp: "Trophy",
			ai: "Star",
			creative: "Eye"
		};
		const categories = derived(() => {
			return [{
				id: "all",
				label: "All Projects",
				icon: Layers
			}, ...(data.categories || []).map((cat) => ({
				id: cat.slug?.current || cat._id,
				label: cat.title || "",
				icon: categoryIcons[cat.slug?.current || ""] || Layers
			}))];
		});
		const allProjects = derived(() => (data.allProjects || []).map((project) => ({
			slug: project.slug?.current || "",
			title: project.title || "",
			client: project.client?.name || "",
			clientIcon: project.client?.iconUrl || "",
			description: project.description || "",
			image: project.imageUrl || "",
			category: project.category?.slug?.current || "web",
			techStack: project.techStack || [],
			featured: project.featured || false,
			year: project.publishedAt ? new Date(project.publishedAt).getFullYear().toString() : ""
		})));
		const paginatedProjects = derived(() => (data.projects || []).map((project) => ({
			slug: project.slug?.current || "",
			title: project.title || "",
			client: project.client?.name || "",
			clientIcon: project.client?.iconUrl || "",
			description: project.description || "",
			image: project.imageUrl || "",
			category: project.category?.slug?.current || "web",
			techStack: project.techStack || [],
			featured: project.featured || false,
			year: project.publishedAt ? new Date(project.publishedAt).getFullYear().toString() : ""
		})));
		const stats = derived(() => data.homePageStats?.items || []);
		const filteredProjects = derived(() => activeFilter() === "all" ? allProjects() : allProjects().filter((p) => p.category === activeFilter()));
		const paginatedFilteredProjects = derived(() => {
			if (activeFilter() === "all") return paginatedProjects();
			const start = (effectiveCurrentPage() - 1) * projectsPerPage();
			const end = start + projectsPerPage();
			return filteredProjects().slice(start, end);
		});
		const displayedProjects = derived(paginatedFilteredProjects);
		const currentPage = derived(() => Math.max(1, data.page || 1));
		const projectsPerPage = derived(() => data.projectsPerPage || data.config?.listingPages?.projectsPerPage || 9);
		const totalProjects = derived(() => data.totalProjects || 0);
		const totalFilteredProjects = derived(() => activeFilter() === "all" ? totalProjects() : filteredProjects().length);
		const totalPages = derived(() => Math.max(1, Math.ceil(totalFilteredProjects() / projectsPerPage())));
		const effectiveCurrentPage = derived(() => Math.min(currentPage(), totalPages()));
		const showPagination = derived(() => totalPages() > 1);
		function buildPageUrl(page, filter = activeFilter()) {
			const target = Math.max(1, Math.min(page, totalPages()));
			const base = resolve("/portfolio");
			const queryParts = [];
			if (filter && filter !== "all") queryParts.push(`filter=${encodeURIComponent(filter)}`);
			if (target > 1) queryParts.push(`page=${target}`);
			const query = queryParts.join("&");
			return query ? `${base}?${query}` : base;
		}
		const pageLinks = derived(() => {
			const pages = [];
			const start = Math.max(1, effectiveCurrentPage() - 2);
			const end = Math.min(totalPages(), effectiveCurrentPage() + 2);
			for (let i = start; i <= end; i += 1) pages.push(i);
			return pages;
		});
		const categoryCounts = derived(() => {
			const counts = { all: allProjects().length };
			for (const project of allProjects()) counts[project.category] = (counts[project.category] || 0) + 1;
			return counts;
		});
		function getCategoryLabel(categoryId) {
			if (categoryId === "all") return "All Projects";
			return categories().find((c) => c.id === categoryId)?.label || categoryId;
		}
		const categoryColors = {
			web: "from-blue-500 via-cyan-500 to-teal-500",
			software: "from-purple-500 via-violet-500 to-indigo-500",
			erp: "from-emerald-500 via-green-500 to-teal-500",
			ai: "from-orange-500 via-amber-500 to-yellow-500",
			creative: "from-pink-500 via-rose-500 to-red-500"
		};
		function getProjectColor(category) {
			return categoryColors[category] || "from-blue-500 via-purple-500 to-pink-500";
		}
		SEO($$renderer, {
			title: seoTitle(),
			description: seoDescription(),
			image: data.information?.siteLogo?.asset?.url,
			imageAlt: data.information?.siteLogo?.alt || seoTitle(),
			siteIcon: data.information?.siteIcon?.asset?.url,
			locale: data.locale,
			breadcrumbs: breadcrumbs(),
			jsonLd: [webPageSchema()]
		});
		$$renderer.push(`<!----> `);
		PageHero($$renderer, {
			badge: data.portfolioPage?.hero?.badge,
			title: data.portfolioPage?.hero?.title,
			subtitle: data.portfolioPage?.hero?.subtitle,
			stats: stats(),
			icon: Trophy,
			locale: data.locale,
			breadcrumbs: breadcrumbs()
		});
		$$renderer.push(`<!----> <section id="projects-section" class="projects-section svelte-140z7es" aria-labelledby="projects-heading"><div class="container-base relative z-10 py-10 lg:py-16">`);
		ProjectFilters($$renderer, {
			categories: categories(),
			activeFilter: activeFilter(),
			categoryCounts: categoryCounts(),
			onfilterchange: setFilter
		});
		$$renderer.push(`<!----> <div class="projects-grid svelte-140z7es" role="tabpanel"><!--[-->`);
		const each_array = ensure_array_like(displayedProjects());
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let project = each_array[index];
			GeneralCard($$renderer, {
				project,
				categoryLabel: getCategoryLabel(project.category),
				index,
				locale: data.locale,
				color: getProjectColor(project.category)
			});
		}
		$$renderer.push(`<!--]--></div> `);
		if (displayedProjects().length === 0) {
			$$renderer.push("<!--[0-->");
			Empty($$renderer, {
				notFound: data.portfolioPage?.itemLabels?.notFound || "No projects found",
				notFoundDesc: data.portfolioPage?.itemLabels?.notFoundDesc,
				buttonLabel: data.portfolioPage?.itemLabels?.viewAllProjects || "View All Projects",
				onclearfilter: () => setFilter("all")
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (showPagination()) {
			$$renderer.push(`<!--[0--><nav class="portfolio-pagination svelte-140z7es" aria-label="Portfolio pagination"><a class="pagination-link nav-link svelte-140z7es"${attr("href", buildPageUrl(effectiveCurrentPage() - 1))}${attr("aria-disabled", effectiveCurrentPage() <= 1)} aria-label="Previous page">`);
			Chevron_left($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----></a> <div class="pagination-links svelte-140z7es"><!--[-->`);
			const each_array_1 = ensure_array_like(pageLinks());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let pageNumber = each_array_1[$$index_1];
				$$renderer.push(`<a${attr_class(`pagination-link ${pageNumber === effectiveCurrentPage() ? "active" : ""}`, "svelte-140z7es")}${attr("href", buildPageUrl(pageNumber))}>${escape_html(pageNumber)}</a>`);
			}
			$$renderer.push(`<!--]--></div> <a class="pagination-link nav-link svelte-140z7es"${attr("href", buildPageUrl(effectiveCurrentPage() + 1))}${attr("aria-disabled", effectiveCurrentPage() >= totalPages())} aria-label="Next page">`);
			Chevron_right($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----></a></nav>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></section> `);
		BigCTA($$renderer, {
			cta: data.portfolioPage?.cta,
			locale: data.locale
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
