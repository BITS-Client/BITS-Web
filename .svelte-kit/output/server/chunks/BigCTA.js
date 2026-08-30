import { C as escape_html, x as attr } from "./index-server.js";
import { r as resolvePath } from "./routing.js";
import "./lucide.js";
import { t as Arrow_right } from "./arrow-right.js";
//#region src/lib/components/ui/cta/BigCTA.svelte
function BigCTA($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { cta, locale } = $$props;
		function resolve(path) {
			return resolvePath(path, locale);
		}
		if (cta?.heading || cta?.text) {
			$$renderer.push(`<!--[0--><section class="portfolio-cta svelte-13iakhg" aria-labelledby="cta-heading"><div class="cta-bg svelte-13iakhg" aria-hidden="true"><div class="cta-orb cta-orb-1 svelte-13iakhg"></div> <div class="cta-orb cta-orb-2 svelte-13iakhg"></div> <div class="cta-orb cta-orb-3 svelte-13iakhg"></div></div> <div class="container-base relative z-10"><div class="cta-content svelte-13iakhg">`);
			if (cta.badge) $$renderer.push(`<!--[0--><span class="cta-badge svelte-13iakhg">${escape_html(cta.badge)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (cta.heading) $$renderer.push(`<!--[0--><h2 id="cta-heading" class="cta-heading svelte-13iakhg">${escape_html(cta.heading)}</h2>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (cta.text) $$renderer.push(`<!--[0--><p class="cta-text svelte-13iakhg">${escape_html(cta.text)}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="cta-actions svelte-13iakhg">`);
			if (cta.getStarted) {
				$$renderer.push(`<!--[0--><a${attr("href", resolve(cta.getStartedLink || "/contact"))} class="cta-primary svelte-13iakhg"><span class="svelte-13iakhg">${escape_html(cta.getStarted)}</span> `);
				Arrow_right($$renderer, { class: "w-4 h-4" });
				$$renderer.push(`<!----></a>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (cta.exploreServices) {
				$$renderer.push(`<!--[0--><a${attr("href", resolve(cta.exploreLink || "/services"))} class="cta-secondary svelte-13iakhg"><span class="svelte-13iakhg">${escape_html(cta.exploreServices)}</span> `);
				Arrow_right($$renderer, { class: "w-4 h-4" });
				$$renderer.push(`<!----></a>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div></div></section>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { BigCTA as t };
