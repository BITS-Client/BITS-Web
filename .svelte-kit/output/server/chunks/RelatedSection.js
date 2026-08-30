import { C as escape_html, a as attr_class, d as ensure_array_like, g as stringify, l as derived, o as attr_style, x as attr } from "./index-server.js";
import "./lucide.js";
import { t as Arrow_right } from "./arrow-right.js";
import { t as Chevron_left } from "./chevron-left.js";
import { t as Chevron_right } from "./chevron-right.js";
import { t as Breadcrumb } from "./Breadcrumb.js";
//#region src/lib/components/ui/hero/DetailHero.svelte
function DetailHero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title, description = "", category = "", imageUrl, locale, breadcrumbs, author, authorRole = "Client", tags = [], actions } = $$props;
		$$renderer.push(`<section class="detail-hero svelte-ympu2f"><div class="hero-bg svelte-ympu2f" aria-hidden="true">`);
		if (imageUrl) $$renderer.push(`<!--[0--><div class="featured-image-bg svelte-ympu2f"${attr_style(`background-image: url('${stringify(imageUrl)}');`)}${attr("aria-label", `${stringify(title)} featured image`)} role="img"></div> <div class="image-overlay svelte-ympu2f"></div>`);
		else $$renderer.push(`<!--[-1--><div class="mesh-gradient svelte-ympu2f"></div> <div class="floating-shapes svelte-ympu2f"><div class="shape shape-1 svelte-ympu2f"></div> <div class="shape shape-2 svelte-ympu2f"></div> <div class="shape shape-3 svelte-ympu2f"></div></div> <div class="grid-overlay svelte-ympu2f"></div>`);
		$$renderer.push(`<!--]--></div> <div class="container-base relative z-10 py-10 lg:py-16 svelte-ympu2f">`);
		if (breadcrumbs.length > 0) {
			$$renderer.push("<!--[0-->");
			Breadcrumb($$renderer, {
				items: breadcrumbs,
				locale
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="hero-content py-6 svelte-ympu2f">`);
		if (category) $$renderer.push(`<!--[0--><span class="hero-category-badge svelte-ympu2f">${escape_html(category)}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <h1 class="hero-title svelte-ympu2f">${escape_html(title)}</h1> `);
		if (description) $$renderer.push(`<!--[0--><p class="hero-excerpt svelte-ympu2f">${escape_html(description)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (author || tags.length > 0 || actions) {
			$$renderer.push(`<!--[0--><div class="hero-meta svelte-ympu2f">`);
			if (author) {
				$$renderer.push(`<!--[0--><div class="author-info svelte-ympu2f"><div class="author-avatar svelte-ympu2f">`);
				if (author.iconUrl || author.logoUrl) $$renderer.push(`<!--[0--><img${attr("src", author.iconUrl || author.logoUrl)}${attr("alt", author.name)} class="author-avatar-img svelte-ympu2f"/>`);
				else $$renderer.push(`<!--[-1--><span class="author-initials svelte-ympu2f">${escape_html(author.name.charAt(0) || "?")}</span>`);
				$$renderer.push(`<!--]--></div> <div class="author-details svelte-ympu2f"><span class="author-name svelte-ympu2f">${escape_html(author.name)}</span> <span class="author-role svelte-ympu2f">${escape_html(authorRole)}</span></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (author && tags.length > 0) $$renderer.push(`<!--[0--><div class="meta-divider svelte-ympu2f"></div>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (tags.length > 0) {
				$$renderer.push(`<!--[0--><div class="meta-items svelte-ympu2f"><!--[-->`);
				const each_array = ensure_array_like(tags.slice(0, 3));
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let tag = each_array[$$index];
					$$renderer.push(`<span class="meta-item tech-pill svelte-ympu2f">${escape_html(tag)}</span>`);
				}
				$$renderer.push(`<!--]--> `);
				if (tags.length > 3) $$renderer.push(`<!--[0--><span class="meta-item tech-pill svelte-ympu2f">+${escape_html(tags.length - 3)}</span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (actions) {
				$$renderer.push(`<!--[0--><div class="hero-actions svelte-ympu2f">`);
				actions($$renderer);
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="hero-wave svelte-ympu2f"><svg viewBox="0 0 1440 100" preserveAspectRatio="none" class="svelte-ympu2f"><path d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,65 1440,50 L1440,100 L0,100 Z" fill="currentColor" class="svelte-ympu2f"></path></svg></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ui/section/RelatedSection.svelte
function RelatedSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { posts, locale: _locale, readArticleLabel, onresolve } = $$props;
		let currentIndex = 0;
		const cardsPerView = 3;
		const maxIndex = derived(() => Math.max(0, posts.length - cardsPerView));
		const visiblePosts = derived(() => posts.slice(currentIndex, 3));
		const canGoNext = derived(() => currentIndex < maxIndex());
		const canGoPrev = derived(() => false);
		function formatDate(dateString) {
			return new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		$$renderer.push(`<section class="related-section svelte-yd3t85"><div class="related-bg svelte-yd3t85" aria-hidden="true"><div class="related-orb related-orb-1 svelte-yd3t85"></div> <div class="related-orb related-orb-2 svelte-yd3t85"></div> <div class="related-orb related-orb-3 svelte-yd3t85"></div></div> <div class="container-base">`);
		if (posts.length > cardsPerView) {
			$$renderer.push(`<!--[0--><div class="slider-header svelte-yd3t85"><div class="slider-nav svelte-yd3t85"><button class="slider-btn svelte-yd3t85"${attr("disabled", !canGoPrev(), true)} aria-label="Previous">`);
			Chevron_left($$renderer, { class: "w-5 h-5" });
			$$renderer.push(`<!----></button> <div class="slider-dots svelte-yd3t85"><!--[-->`);
			const each_array = ensure_array_like(Array(maxIndex() + 1));
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				each_array[i];
				$$renderer.push(`<button${attr_class("slider-dot svelte-yd3t85", void 0, { "active": i === currentIndex })}${attr("aria-label", `Go to slide ${stringify(i + 1)}`)}></button>`);
			}
			$$renderer.push(`<!--]--></div> <button class="slider-btn svelte-yd3t85"${attr("disabled", !canGoNext(), true)} aria-label="Next">`);
			Chevron_right($$renderer, { class: "w-5 h-5" });
			$$renderer.push(`<!----></button></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="related-grid svelte-yd3t85"><!--[-->`);
		const each_array_1 = ensure_array_like(visiblePosts());
		for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
			let relatedPost = each_array_1[index];
			$$renderer.push(`<a${attr("href", onresolve(`/blog/${relatedPost.slug}`))} class="related-card svelte-yd3t85"${attr_style(`--index: ${stringify(index)}`)}><div class="related-card-glow svelte-yd3t85"></div> <div class="related-card-inner svelte-yd3t85"><div class="related-image svelte-yd3t85">`);
			if (relatedPost.image) $$renderer.push(`<!--[0--><img${attr("src", relatedPost.image)}${attr("alt", relatedPost.title)} class="related-image-img svelte-yd3t85" onerror="this.__e=event"/>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="related-placeholder svelte-yd3t85"${attr_style(`display: ${relatedPost.image ? "none" : "flex"};`)}><span>📖</span></div> <span class="related-category-badge svelte-yd3t85"${attr_style(`background: ${stringify(relatedPost.categoryColor || "var(--color-primary)")}`)}>${escape_html(relatedPost.categoryLabel || (relatedPost.category || "").charAt(0).toUpperCase() + (relatedPost.category || "").slice(1))}</span></div> <div class="related-content svelte-yd3t85"><h3 class="related-card-title svelte-yd3t85">${escape_html(relatedPost.title)}</h3> <div class="related-meta svelte-yd3t85"><span class="related-date svelte-yd3t85">${escape_html(formatDate(relatedPost.date))}</span> <span class="related-read-more svelte-yd3t85">${escape_html(readArticleLabel)} `);
			Arrow_right($$renderer, { class: "w-4 h-4" });
			$$renderer.push(`<!----></span></div></div></div></a>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
export { DetailHero as n, RelatedSection as t };
