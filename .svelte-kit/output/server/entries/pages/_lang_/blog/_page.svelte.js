import { C as escape_html, a as attr_class, d as ensure_array_like, g as stringify, l as derived, o as attr_style, x as attr } from "../../../../chunks/index-server.js";
import { s as generateWebPageSchema } from "../../../../chunks/seo.js";
import { r as resolvePath } from "../../../../chunks/routing.js";
import "../../../../chunks/lucide.js";
import { a as Heart, c as Briefcase, i as Lightbulb, l as Aperture, n as Tag, o as Globe, r as Smartphone, s as Folder, t as Trending_up } from "../../../../chunks/trending-up.js";
import { t as Arrow_right } from "../../../../chunks/arrow-right.js";
import { n as Cloud, r as Calendar, t as Palette } from "../../../../chunks/palette.js";
import { t as Chevron_left } from "../../../../chunks/chevron-left.js";
import { t as Chevron_right } from "../../../../chunks/chevron-right.js";
import { n as Code, t as Search } from "../../../../chunks/search.js";
import { i as Eye, n as Star, t as Zap } from "../../../../chunks/zap.js";
import { n as Shield, r as File_text, t as X } from "../../../../chunks/x.js";
import { t as Sparkles } from "../../../../chunks/sparkles.js";
import { t as goto } from "../../../../chunks/client2.js";
import "../../../../chunks/navigation.js";
import { t as SEO } from "../../../../chunks/SEO2.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
import { t as Empty } from "../../../../chunks/Empty.js";
//#region src/lib/components/ui/section/SidebarSection.svelte
function SidebarSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { categories, allTags, activeCategory, contentCategories = "Categories", contentTrendingTags = "Trending Tags", onselectCategory, onselectTag } = $$props;
		const iconMap = {
			Folder,
			Tag,
			Code,
			Palette,
			Lightbulb,
			TrendingUp: Trending_up,
			FileText: File_text,
			Briefcase,
			Globe,
			Shield,
			Smartphone,
			Cloud,
			Aperture,
			Zap,
			Heart,
			Star
		};
		const defaultIcon = Folder;
		function getIconComponent(icon) {
			if (icon === "✨") return Sparkles;
			return iconMap[icon] || defaultIcon;
		}
		$$renderer.push(`<aside class="sidebar svelte-188qe7w" aria-label="Blog sidebar"><div class="sidebar-sticky svelte-188qe7w"><div class="sidebar-card svelte-188qe7w"><h3 class="sidebar-title svelte-188qe7w"><span class="title-icon svelte-188qe7w">📂</span> ${escape_html(contentCategories)}</h3> <div class="category-list svelte-188qe7w" role="group" aria-label="Filter by category"><!--[-->`);
		const each_array = ensure_array_like(categories);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let category = each_array[$$index];
			const IconComponent = getIconComponent(category.icon);
			$$renderer.push(`<button${attr_class(`category-btn ${activeCategory === category.id ? "active" : ""}`, "svelte-188qe7w")}${attr_style(`--cat-color: ${stringify(category.color)}`)}><span class="category-icon svelte-188qe7w">`);
			if (IconComponent) {
				$$renderer.push("<!--[-->");
				IconComponent($$renderer, { class: "w-5 h-5" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</span> <span class="category-name svelte-188qe7w">${escape_html(category.label)}</span> <span class="category-count svelte-188qe7w">${escape_html(category.count)}</span> <span class="category-indicator svelte-188qe7w"></span></button>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="sidebar-card svelte-188qe7w"><h3 class="sidebar-title svelte-188qe7w"><span class="title-icon svelte-188qe7w">🔥</span> ${escape_html(contentTrendingTags)}</h3> <div class="tags-cloud svelte-188qe7w"><!--[-->`);
		const each_array_1 = ensure_array_like(allTags);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let tag = each_array_1[$$index_1];
			$$renderer.push(`<button class="tag-btn svelte-188qe7w"><span class="tag-hash svelte-188qe7w">#</span>${escape_html(tag)}</button>`);
		}
		$$renderer.push(`<!--]--></div></div></div></aside>`);
	});
}
//#endregion
//#region src/lib/components/ui/form/SearchModal.svelte
function SearchModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { show, searchQuery, filteredPosts, searchModalData, categories, allTags, onclose, onselectCategory, onselectTag, onnavigate, onsearch } = $$props;
		let localQuery = derived(() => searchQuery);
		const iconMap = {
			Folder,
			Tag,
			Code,
			Palette,
			Lightbulb,
			TrendingUp: Trending_up,
			FileText: File_text,
			Briefcase,
			Globe,
			Shield,
			Smartphone,
			Cloud,
			Aperture,
			Zap,
			Heart,
			Star
		};
		const defaultIcon = Folder;
		function getIconComponent(icon) {
			if (icon === "✨") return Sparkles;
			return iconMap[icon] || defaultIcon;
		}
		if (show) {
			$$renderer.push(`<!--[0--><div class="search-modal-overlay svelte-1vbnjjn" role="button" tabindex="-1" aria-label="Close search"><div class="search-modal svelte-1vbnjjn" role="dialog" aria-modal="true" aria-label="Search articles" tabindex="-1"><div class="modal-header svelte-1vbnjjn"><div class="modal-search-wrapper svelte-1vbnjjn">`);
			Search($$renderer, {
				class: "modal-search-icon",
				"aria-hidden": "true"
			});
			$$renderer.push(`<!----> <input type="text"${attr("placeholder", searchModalData.searchArticle || "Search articles, tags, topics...")}${attr("value", localQuery())} class="modal-search-input svelte-1vbnjjn"/></div> <button class="modal-close svelte-1vbnjjn" aria-label="Close">`);
			X($$renderer, { class: "w-5 h-5" });
			$$renderer.push(`<!----></button></div> <div class="modal-body svelte-1vbnjjn">`);
			if (localQuery()) {
				$$renderer.push(`<!--[0--><div class="modal-results"><p class="results-label svelte-1vbnjjn">${escape_html(searchModalData.resultsFor)} "${escape_html(localQuery())}"</p> `);
				if (filteredPosts.length > 0) {
					$$renderer.push(`<!--[0--><div class="results-list svelte-1vbnjjn"><!--[-->`);
					const each_array = ensure_array_like(filteredPosts.slice(0, 5));
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let post = each_array[$$index];
						$$renderer.push(`<button class="result-item svelte-1vbnjjn"><div class="result-icon svelte-1vbnjjn">📄</div> <div class="result-content svelte-1vbnjjn"><h4 class="result-title svelte-1vbnjjn">${escape_html(post.title)}</h4> <p class="result-meta svelte-1vbnjjn">${escape_html(post.categoryLabel)}</p></div> `);
						Arrow_right($$renderer, { class: "result-arrow" });
						$$renderer.push(`<!----></button>`);
					}
					$$renderer.push(`<!--]--></div>`);
				} else $$renderer.push(`<!--[-1--><div class="no-results svelte-1vbnjjn"><span class="no-results-icon svelte-1vbnjjn">🔍</span> <p>${escape_html(searchModalData.noArticlesFound)}</p></div>`);
				$$renderer.push(`<!--]--></div>`);
			} else {
				$$renderer.push(`<!--[-1--><div class="modal-suggestions"><p class="suggestions-label svelte-1vbnjjn">${escape_html(searchModalData.quickLinks)}</p> <div class="quick-links svelte-1vbnjjn"><!--[-->`);
				const each_array_1 = ensure_array_like(categories.slice(1));
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let category = each_array_1[$$index_1];
					const IconComponent = getIconComponent(category.icon);
					$$renderer.push(`<button class="quick-link svelte-1vbnjjn"><span class="quick-link-icon svelte-1vbnjjn">`);
					if (IconComponent) {
						$$renderer.push("<!--[-->");
						IconComponent($$renderer, { class: "w-4 h-4" });
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
					$$renderer.push(`</span> <span>${escape_html(category.label)}</span></button>`);
				}
				$$renderer.push(`<!--]--></div> `);
				if (allTags.length > 0) {
					$$renderer.push(`<!--[0--><p class="suggestions-label svelte-1vbnjjn">Trending Tags</p> <div class="trending-tags-modal svelte-1vbnjjn"><!--[-->`);
					const each_array_2 = ensure_array_like(allTags);
					for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
						let tag = each_array_2[$$index_2];
						$$renderer.push(`<button class="trending-tag svelte-1vbnjjn">#${escape_html(tag)}</button>`);
					}
					$$renderer.push(`<!--]--></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div> <div class="modal-footer svelte-1vbnjjn"><div class="modal-hint svelte-1vbnjjn"><span class="hint-kbd svelte-1vbnjjn">↵</span> <span>${escape_html(searchModalData.toSelect)}</span></div> <div class="modal-hint svelte-1vbnjjn"><span class="hint-kbd svelte-1vbnjjn">esc</span> <span>${escape_html(searchModalData.toClose)}</span></div></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/ui/card/BlogCard.svelte
function BlogCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { post, locale, onclick } = $$props;
		function formatDate(dateString) {
			return new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function resolve(path) {
			return `/${locale}${path}`;
		}
		$$renderer.push(`<article class="article-row svelte-1wz0kz0"${attr_style(`--card-color: ${stringify(post.categoryColor)}`)}><a${attr("href", resolve(`/blog/${post.slug}`))} class="row-link svelte-1wz0kz0"><div class="row-image svelte-1wz0kz0">`);
		if (post.image) $$renderer.push(`<!--[0--><img${attr("src", post.image)}${attr("alt", post.title)} loading="lazy" class="row-image-content svelte-1wz0kz0"/>`);
		else $$renderer.push(`<!--[-1--><div class="row-placeholder svelte-1wz0kz0"><span class="row-placeholder-icon svelte-1wz0kz0">📖</span></div>`);
		$$renderer.push(`<!--]--> <div class="row-overlay svelte-1wz0kz0">`);
		Eye($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----></div></div> <div class="row-content svelte-1wz0kz0"><div class="row-header svelte-1wz0kz0"><span class="row-category svelte-1wz0kz0"${attr_style(`--cat-color: ${stringify(post.categoryColor)}`)}>${escape_html(post.categoryLabel)}</span> <div class="row-meta svelte-1wz0kz0"><span class="row-date svelte-1wz0kz0">`);
		Calendar($$renderer, { class: "w-3.5 h-3.5" });
		$$renderer.push(`<!----> ${escape_html(formatDate(post.date))}</span></div></div> <h3 class="row-title svelte-1wz0kz0">${escape_html(post.title)}</h3> <p class="row-excerpt svelte-1wz0kz0">${escape_html(post.excerpt)}</p> <div class="row-footer svelte-1wz0kz0"><div class="row-author svelte-1wz0kz0">`);
		if (post.author.avatar) $$renderer.push(`<!--[0--><img${attr("src", post.author.avatar)}${attr("alt", post.author.name)} class="row-avatar-img svelte-1wz0kz0" loading="lazy"/>`);
		else $$renderer.push(`<!--[-1--><div class="row-avatar svelte-1wz0kz0"><span>${escape_html(post.author?.name?.charAt(0) || "B")}</span></div>`);
		$$renderer.push(`<!--]--> <div class="row-author-info svelte-1wz0kz0"><span class="row-author-name svelte-1wz0kz0">${escape_html(post.author.name)}</span> <span class="row-author-role svelte-1wz0kz0">${escape_html(post.author.role)}</span></div></div> <div class="row-tags svelte-1wz0kz0"><!--[-->`);
		const each_array = ensure_array_like(post.tags.slice(0, 2));
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let tag = each_array[$$index];
			$$renderer.push(`<span class="row-tag svelte-1wz0kz0">#${escape_html(tag)}</span>`);
		}
		$$renderer.push(`<!--]--></div></div></div> <div class="row-action svelte-1wz0kz0"><div class="row-arrow svelte-1wz0kz0">`);
		Arrow_right($$renderer, { class: "w-full h-full" });
		$$renderer.push(`<!----></div></div></a></article>`);
	});
}
//#endregion
//#region src/routes/[lang]/blog/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		function resolve(path) {
			return resolvePath(path, data.locale);
		}
		const seoTitle = derived(() => data.blogPage?.seo?.title || "");
		const seoDescription = derived(() => data.blogPage?.seo?.description || "");
		const heroBadge = derived(() => data.blogPage?.hero?.badge || "");
		const heroTitle = derived(() => data.blogPage?.hero?.title || "");
		const heroSubtitle = derived(() => data.blogPage?.hero?.subtitle || "");
		const searchArticleLabel = derived(() => data.blogPage?.hero?.searchArticle || "");
		const contentAllCategories = derived(() => data.blogPage?.content?.allCategories || "");
		const contentCategories = derived(() => data.blogPage?.content?.categories || "");
		const contentTrendingTags = derived(() => data.blogPage?.searchModal?.trendingTags || "");
		const contentLatestArticles = derived(() => data.blogPage?.content?.latestArticles || "");
		const contentArticlesCount = derived(() => data.blogPage?.content?.articlesCount || "");
		const contentClearFilters = derived(() => data.blogPage?.content?.clearFilters || "");
		const contentNoArticlesFound = derived(() => data.blogPage?.searchModal?.noArticlesFound || "");
		const contentAdjustSearchFilter = derived(() => data.blogPage?.content?.adjustSearchFilter || "");
		const contentViewAllArticles = derived(() => data.blogPage?.content?.viewAllArticles || "");
		const searchToSelect = derived(() => data.blogPage?.searchModal?.toSelect || "");
		const searchToClose = derived(() => data.blogPage?.searchModal?.toClose || "");
		const searchQuickLinks = derived(() => data.blogPage?.searchModal?.quickLinks || "");
		const searchResultsFor = derived(() => data.blogPage?.searchModal?.resultsFor || "");
		const blogPosts = derived(() => (data.posts || []).map((post) => ({
			slug: post.slug?.current || "",
			title: post.title || "",
			excerpt: post.seo?.description || "",
			category: post.category?.slug?.current || "technology",
			categoryLabel: post.category?.title || "Technology",
			categoryColor: post.category?.color || "#3b82f6",
			image: post.imageUrl || "",
			author: {
				name: post.author?.name || "BITS Team",
				role: post.author?.role || "Author",
				avatar: post.author?.avatarUrl || ""
			},
			tags: post.tags || [],
			date: post.publishedAt || (/* @__PURE__ */ new Date()).toISOString()
		})));
		const allBlogPosts = derived(() => (data.allPosts || []).map((post) => ({
			slug: post.slug?.current || "",
			title: post.title || "",
			excerpt: post.seo?.description || "",
			category: post.category?.slug?.current || "technology",
			categoryLabel: post.category?.title || "Technology",
			categoryColor: post.category?.color || "#3b82f6",
			image: post.imageUrl || "",
			author: {
				name: post.author?.name || "BITS Team",
				role: post.author?.role || "Author",
				avatar: post.author?.avatarUrl || ""
			},
			tags: post.tags || [],
			date: post.publishedAt || (/* @__PURE__ */ new Date()).toISOString()
		})));
		const breadcrumbs = derived(() => {
			const homeLabel = data.navigation?.items?.find((item) => item.href === "/")?.label || "Home";
			const title = data.blogPage?.seo?.title || "Blog";
			return [{
				name: homeLabel,
				url: "/"
			}, {
				name: title,
				url: "/blog"
			}];
		});
		const categories = derived(() => {
			const sanityCategories = data.categories || [];
			const posts = data.allPosts || [];
			return [{
				id: "all",
				label: contentAllCategories() || "All Posts",
				count: posts.length,
				icon: "✨",
				color: "#8b5cf6"
			}, ...sanityCategories.map((cat) => ({
				id: cat.slug?.current || cat._id,
				label: cat.title || "",
				count: posts.filter((p) => p.category?.slug?.current === cat.slug?.current).length,
				icon: cat.icon || "Folder",
				color: cat.color || "#6366f1"
			}))];
		});
		const webPageSchema = derived(() => generateWebPageSchema(seoTitle(), seoDescription(), "/blog"));
		const activeCategory = derived(() => data.activeCategory || "all");
		const searchQuery = derived(() => data.searchQuery || "");
		let showSearchModal = false;
		function openSearchModal() {
			showSearchModal = true;
			document.body.style.overflow = "hidden";
		}
		function closeSearchModal() {
			showSearchModal = false;
			document.body.style.overflow = "";
		}
		function selectCategory(id) {
			goto(buildPageUrl(1, id, searchQuery()));
		}
		function selectTag(tag) {
			goto(buildPageUrl(1, activeCategory(), tag));
		}
		function navigateTo(slug) {
			goto(resolve(`/blog/${slug}`));
		}
		const filteredPosts = derived(() => {
			let posts = allBlogPosts();
			if (activeCategory() !== "all") posts = posts.filter((p) => p.category === activeCategory());
			if (searchQuery()) {
				const query = searchQuery().toLowerCase();
				posts = posts.filter((p) => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query) || p.tags.some((tag) => tag.toLowerCase().includes(query)));
			}
			return posts;
		});
		const paginatedFilteredPosts = derived(() => {
			if (activeCategory() === "all" && !searchQuery()) return blogPosts();
			const start = (effectiveCurrentPage() - 1) * postsPerPage();
			const end = start + postsPerPage();
			return filteredPosts().slice(start, end);
		});
		const postsPerPage = derived(() => data.postsPerPage || data.config?.listingPages?.postsPerPage || 10);
		const currentPage = derived(() => Math.max(1, data.page || 1));
		const totalPosts = derived(() => data.totalPosts || 0);
		const totalFilteredPosts = derived(() => activeCategory() === "all" && !searchQuery() ? totalPosts() : filteredPosts().length);
		const totalPages = derived(() => Math.max(1, Math.ceil(totalFilteredPosts() / postsPerPage())));
		const effectiveCurrentPage = derived(() => Math.min(currentPage(), totalPages()));
		const showPagination = derived(() => totalPages() > 1);
		function buildPageUrl(page, category = activeCategory(), query = searchQuery()) {
			const target = Math.max(1, Math.min(page, totalPages()));
			const base = resolve("/blog");
			const queryParts = [];
			if (category && category !== "all") queryParts.push(`category=${encodeURIComponent(category)}`);
			if (query) queryParts.push(`q=${encodeURIComponent(query)}`);
			if (target > 1) queryParts.push(`page=${target}`);
			const qs = queryParts.join("&");
			return qs ? `${base}?${qs}` : base;
		}
		const pageLinks = derived(() => {
			const pages = [];
			const start = Math.max(1, effectiveCurrentPage() - 2);
			const end = Math.min(totalPages(), effectiveCurrentPage() + 2);
			for (let i = start; i <= end; i += 1) pages.push(i);
			return pages;
		});
		const allTags = derived(() => data.allTags || []);
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
		SearchModal($$renderer, {
			show: showSearchModal,
			searchQuery: searchQuery(),
			filteredPosts: filteredPosts(),
			searchModalData: {
				toSelect: searchToSelect(),
				toClose: searchToClose(),
				quickLinks: searchQuickLinks(),
				resultsFor: searchResultsFor(),
				noArticlesFound: contentNoArticlesFound(),
				searchArticle: searchArticleLabel()
			},
			categories: categories(),
			allTags: allTags(),
			onclose: closeSearchModal,
			onselectCategory: selectCategory,
			onselectTag: selectTag,
			onnavigate: navigateTo,
			onsearch: (query) => {
				goto(buildPageUrl(1, activeCategory(), query));
			}
		});
		$$renderer.push(`<!----> `);
		PageHero($$renderer, {
			badge: heroBadge(),
			title: heroTitle(),
			subtitle: heroSubtitle(),
			breadcrumbs: breadcrumbs(),
			locale: data.locale,
			icon: Zap,
			searchButton: {
				label: searchArticleLabel(),
				onclick: openSearchModal
			}
		});
		$$renderer.push(`<!----> <section class="articles-section svelte-1ggqm3m" aria-labelledby="all-posts-heading"><div class="container-base"><div class="articles-layout svelte-1ggqm3m">`);
		SidebarSection($$renderer, {
			categories: categories(),
			allTags: allTags(),
			activeCategory: activeCategory(),
			contentCategories: contentCategories(),
			contentTrendingTags: contentTrendingTags(),
			onselectCategory: selectCategory,
			onselectTag: selectTag
		});
		$$renderer.push(`<!----> <main class="articles-main svelte-1ggqm3m"><div class="articles-header svelte-1ggqm3m"><h2 id="all-posts-heading" class="articles-title svelte-1ggqm3m">${escape_html(contentLatestArticles())}</h2> <div class="articles-meta svelte-1ggqm3m"><span class="articles-count svelte-1ggqm3m">${escape_html(filteredPosts().length)} ${escape_html(contentArticlesCount())}</span> `);
		if (activeCategory() !== "all" || searchQuery()) {
			$$renderer.push(`<!--[0--><button class="clear-filters svelte-1ggqm3m">`);
			X($$renderer, { class: "w-3.5 h-3.5" });
			$$renderer.push(`<!----> ${escape_html(contentClearFilters())}</button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="articles-list svelte-1ggqm3m"><!--[-->`);
		const each_array = ensure_array_like(paginatedFilteredPosts());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let post = each_array[$$index];
			BlogCard($$renderer, {
				post,
				locale: data.locale
			});
		}
		$$renderer.push(`<!--]--></div> `);
		if (filteredPosts().length === 0) {
			$$renderer.push("<!--[0-->");
			Empty($$renderer, {
				notFound: contentNoArticlesFound(),
				notFoundDesc: contentAdjustSearchFilter(),
				buttonLabel: contentViewAllArticles(),
				onclearfilter: () => {
					goto(buildPageUrl(1, "all", ""));
				}
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (showPagination()) {
			$$renderer.push(`<!--[0--><nav class="load-more svelte-1ggqm3m" aria-label="Blog pagination"><div class="pagination-wrap svelte-1ggqm3m"><a class="page-link nav-link svelte-1ggqm3m"${attr("href", buildPageUrl(effectiveCurrentPage() - 1))}${attr("aria-disabled", effectiveCurrentPage() <= 1)} aria-label="Previous page">`);
			Chevron_left($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----></a> <div class="page-links svelte-1ggqm3m"><!--[-->`);
			const each_array_1 = ensure_array_like(pageLinks());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let pageNumber = each_array_1[$$index_1];
				$$renderer.push(`<a${attr_class(`page-link ${pageNumber === effectiveCurrentPage() ? "active" : ""}`, "svelte-1ggqm3m")}${attr("href", buildPageUrl(pageNumber))}>${escape_html(pageNumber)}</a>`);
			}
			$$renderer.push(`<!--]--></div> <a class="page-link nav-link svelte-1ggqm3m"${attr("href", buildPageUrl(effectiveCurrentPage() + 1))}${attr("aria-disabled", effectiveCurrentPage() >= totalPages())} aria-label="Next page">`);
			Chevron_right($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----></a></div></nav>`);
		} else $$renderer.push(`<!--[-1--><div class="load-more svelte-1ggqm3m"><p class="load-more-hint svelte-1ggqm3m">${escape_html(filteredPosts().length)} ${escape_html(contentArticlesCount())}</p></div>`);
		$$renderer.push(`<!--]--></main></div></div></section>`);
	});
}
//#endregion
export { _page as default };
