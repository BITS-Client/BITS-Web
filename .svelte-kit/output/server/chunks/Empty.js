import { C as escape_html } from "./index-server.js";
import "./lucide.js";
import { t as Arrow_right } from "./arrow-right.js";
import { r as Layers } from "./zap.js";
//#region src/lib/components/ui/misc/Empty.svelte
function Empty($$renderer, $$props) {
	let { notFound, notFoundDesc = "", buttonLabel = "View All Projects", onclearfilter } = $$props;
	$$renderer.push(`<div class="empty-state svelte-rwns2t"><div class="empty-icon svelte-rwns2t">`);
	Layers($$renderer, { class: "w-16 h-16" });
	$$renderer.push(`<!----></div> <p class="empty-text svelte-rwns2t">${escape_html(notFound)}</p> `);
	if (notFoundDesc) $$renderer.push(`<!--[0--><p class="empty-desc svelte-rwns2t">${escape_html(notFoundDesc)}</p>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> <button type="button" class="empty-btn svelte-rwns2t"><span>${escape_html(buttonLabel)}</span> `);
	Arrow_right($$renderer, { class: "w-4 h-4" });
	$$renderer.push(`<!----></button></div>`);
}
//#endregion
export { Empty as t };
