import { C as escape_html, a as attr_class, d as ensure_array_like, g as stringify, x as attr } from "./index-server.js";
import { r as resolvePath } from "./routing.js";
import { c as House } from "./lucide.js";
import { t as Chevron_right } from "./chevron-right.js";
//#region src/lib/components/ui/navigation/Breadcrumb.svelte
function Breadcrumb($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items = [], class: className = "", showIcon = true, locale = "en" } = $$props;
		function resolve(path) {
			return resolvePath(path, locale);
		}
		if (items && items.length > 0) {
			$$renderer.push(`<!--[0--><nav${attr_class(`flex items-center flex-wrap gap-x-2 gap-y-1.5 ${stringify(className)}`)} aria-label="Breadcrumb"><!--[-->`);
			const each_array = ensure_array_like(items);
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				let item = each_array[i];
				const isLast = i === items.length - 1;
				if (i > 0) {
					$$renderer.push("<!--[0-->");
					Chevron_right($$renderer, {
						class: "w-4 h-4 text-gray-900 dark:text-gray-400 shrink-0",
						"aria-hidden": "true"
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="flex items-center gap-1.5 min-w-0">`);
				if (i === 0 && showIcon) {
					$$renderer.push("<!--[0-->");
					House($$renderer, {
						class: "w-4 h-4 shrink-0",
						"aria-hidden": "true"
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (isLast) $$renderer.push(`<!--[0--><span class="text-sm font-medium truncate py-0.5">${escape_html(item.name)}</span>`);
				else $$renderer.push(`<!--[-1--><a${attr("href", resolve(item.url))} class="text-sm hover:text-gray-700 dark:hover:text-gray-600 transition-colors truncate py-0.5">${escape_html(item.name)}</a>`);
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></nav>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { Breadcrumb as t };
