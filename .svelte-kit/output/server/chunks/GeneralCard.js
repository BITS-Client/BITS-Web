import { C as escape_html, a as attr_class, d as ensure_array_like, g as stringify, o as attr_style, x as attr } from "./index-server.js";
import { r as resolvePath } from "./routing.js";
import "./lucide.js";
import { t as Arrow_right } from "./arrow-right.js";
import { n as Building } from "./trophy.js";
//#region src/lib/components/ui/card/GeneralCard.svelte
function GeneralCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { project, categoryLabel, index, locale = "id", color = "from-blue-500 via-purple-500 to-pink-500", type = "portfolio" } = $$props;
		function resolve(path) {
			return resolvePath(path, locale);
		}
		$$renderer.push(`<a${attr("href", resolve(`/${type}/${project.slug}`))} class="portfolio-card svelte-164t86k"${attr_style(`--index: ${stringify(index)}`)}><div class="portfolio-card-inner svelte-164t86k"><div${attr_class(`portfolio-card-gradient bg-linear-to-br ${stringify(color)}`, "svelte-164t86k")}></div> <div class="portfolio-card-gradient-overlay svelte-164t86k"></div> <div class="portfolio-card-image-wrapper svelte-164t86k">`);
		if (project.image) $$renderer.push(`<!--[0--><img${attr("src", project.image)}${attr("alt", project.title)} class="portfolio-card-image svelte-164t86k" loading="lazy"/>`);
		else {
			$$renderer.push(`<!--[-1--><div class="portfolio-card-placeholder svelte-164t86k">`);
			Building($$renderer, { class: "w-8 h-8" });
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="portfolio-card-content svelte-164t86k"><div class="portfolio-card-top svelte-164t86k"><span class="portfolio-card-category svelte-164t86k"><span class="portfolio-category-dot svelte-164t86k"></span> ${escape_html(categoryLabel)}</span> <div class="portfolio-card-arrow svelte-164t86k">`);
		Arrow_right($$renderer, { class: "w-4 h-4" });
		$$renderer.push(`<!----></div></div> <h3 class="portfolio-card-title svelte-164t86k">${escape_html(project.title)}</h3> `);
		if (project.description) $$renderer.push(`<!--[0--><p class="portfolio-card-description svelte-164t86k">${escape_html(project.description)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (project.techStack.length > 0) {
			$$renderer.push(`<!--[0--><div class="portfolio-card-tech svelte-164t86k"><!--[-->`);
			const each_array = ensure_array_like(project.techStack.slice(0, 2));
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tech = each_array[$$index];
				$$renderer.push(`<span class="portfolio-tech-pill svelte-164t86k">${escape_html(tech)}</span>`);
			}
			$$renderer.push(`<!--]--> `);
			if (project.techStack.length > 2) $$renderer.push(`<!--[0--><span class="portfolio-tech-more svelte-164t86k">+${escape_html(project.techStack.length - 2)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="portfolio-card-footer svelte-164t86k"><span class="portfolio-client svelte-164t86k">`);
		if (project.clientIcon) $$renderer.push(`<!--[0--><img${attr("src", project.clientIcon)}${attr("alt", project.client)} class="portfolio-client-icon svelte-164t86k"/>`);
		else $$renderer.push(`<!--[-1--><svg class="portfolio-client-icon svelte-164t86k" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l8-4v18M13 21V3l4 3v15M19 21V11l-4 3v7"></path></svg>`);
		$$renderer.push(`<!--]--> ${escape_html(project.client)}</span> `);
		if (project.year) $$renderer.push(`<!--[0--><span class="portfolio-year svelte-164t86k">${escape_html(project.year)}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></div></a>`);
	});
}
//#endregion
export { GeneralCard as t };
