import { C as escape_html, _ as unsubscribe_stores, h as store_get, x as attr } from "./index-server.js";
import { c as House } from "./lucide.js";
import { t as page } from "./stores.js";
//#region src/lib/components/ui/misc/NotFound.svelte
function NotFound($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { title, description, buttonLabel = "Back to Home", href = `/${store_get($$store_subs ??= {}, "$page", page).params.lang || "id"}` } = $$props;
		$$renderer.push(`<section class="not-found svelte-60ba9"><div class="container-base"><div class="not-found-content svelte-60ba9"><div class="not-found-icon svelte-60ba9">📄</div> <h1 class="not-found-title svelte-60ba9">${escape_html(title)}</h1> <p class="not-found-text svelte-60ba9">${escape_html(description)}</p> <a${attr("href", href)} class="not-found-btn primary svelte-60ba9">`);
		House($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----> <span>${escape_html(buttonLabel)}</span></a></div></div></section>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { NotFound as t };
