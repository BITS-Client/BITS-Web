import { C as escape_html, l as derived } from "./index-server.js";
import { t as getIconComponent } from "./icons.js";
//#region src/lib/components/ui/card/ProcessCard.svelte
function ProcessCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { step, title, description, icon } = $$props;
		const IconComponent = derived(() => icon ? getIconComponent(icon) : void 0);
		$$renderer.push(`<div class="process-card svelte-1skp5h1"><div class="process-card-glow svelte-1skp5h1"></div> <div class="process-card-glass svelte-1skp5h1"><div class="process-card-border svelte-1skp5h1"></div> <div class="process-card-deco svelte-1skp5h1"></div></div> <div class="process-card-content svelte-1skp5h1"><div class="process-card-header svelte-1skp5h1">`);
		if (IconComponent()) {
			$$renderer.push(`<!--[0--><div class="process-icon-wrapper svelte-1skp5h1">`);
			if (IconComponent()) {
				$$renderer.push("<!--[-->");
				IconComponent()($$renderer, { class: "w-6 h-6" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="process-step-number svelte-1skp5h1">${escape_html(step)}</div></div> <h3 class="process-card-title svelte-1skp5h1">${escape_html(title)}</h3> <p class="process-card-description svelte-1skp5h1">${escape_html(description)}</p> <div class="process-progress svelte-1skp5h1"><div class="process-progress-line svelte-1skp5h1"></div></div></div></div>`);
	});
}
//#endregion
export { ProcessCard as t };
