import { C as escape_html, a as attr_class, c as bind_props, d as ensure_array_like, x as attr } from "./index-server.js";
import "./lucide.js";
import { t as Chevron_right } from "./chevron-right.js";
import { t as List_ordered } from "./list-ordered.js";
//#region src/lib/components/ui/navigation/TableOfContents.svelte
function TableOfContents($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items, title, activeId, onclick } = $$props;
		function isActive(headingId) {
			return activeId === headingId;
		}
		function extractHeadingsFromBlocks(blocks) {
			if (!blocks || !Array.isArray(blocks)) return [];
			const headings = [];
			blocks.forEach((block) => {
				if (block._type === "block" && block.style && block.style.startsWith("h") && block.children) {
					const text = block.children.map((c) => c.text).join("");
					const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
					const level = parseInt(block.style.replace("h", ""));
					headings.push({
						level,
						text,
						id
					});
				}
			});
			return headings;
		}
		$$renderer.push(`<div class="toc-card svelte-nbuiat"><div class="toc-header svelte-nbuiat">`);
		List_ordered($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----> <h3 class="svelte-nbuiat">${escape_html(title)}</h3></div> <nav class="toc-nav svelte-nbuiat"><!--[-->`);
		const each_array = ensure_array_like(items);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<button${attr_class("toc-item svelte-nbuiat", void 0, { "active": isActive(item.id) })}${attr("data-heading-id", item.id)}><span class="toc-text svelte-nbuiat">${escape_html(item.text)}</span> `);
			Chevron_right($$renderer, { class: "toc-arrow w-4 h-4" });
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]--></nav></div>`);
		bind_props($$props, { extractHeadingsFromBlocks });
	});
}
//#endregion
export { TableOfContents as t };
