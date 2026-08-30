import { C as escape_html, a as attr_class, g as stringify, l as derived, x as attr } from "./index-server.js";
import { r as resolvePath } from "./routing.js";
import "./lucide.js";
import { t as getIconComponent } from "./icons.js";
import { t as Sparkles } from "./sparkles.js";
//#region src/lib/components/ui/card/ServiceCard.svelte
function ServiceCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { service, index, locale = "id" } = $$props;
		function resolve(path) {
			return resolvePath(path, locale);
		}
		const IconComponent = derived(() => getIconComponent(service.icon) || Sparkles);
		$$renderer.push(`<a${attr("href", resolve(service.href))}${attr_class(`service-card service-card-${stringify(index + 1)} group`, "svelte-9x38mn")}><div class="service-card-border svelte-9x38mn"></div> <div class="service-card-bg-glow svelte-9x38mn"></div> <div class="service-card-inner svelte-9x38mn"><div${attr_class(`service-card-gradient bg-gradient-to-br ${stringify(service.color)}`, "svelte-9x38mn")}></div> <div class="service-card-holographic svelte-9x38mn"></div> <div class="service-card-shimmer svelte-9x38mn"></div> <div class="service-card-content svelte-9x38mn"><div class="service-card-number svelte-9x38mn">0${escape_html(index + 1)}</div> <div class="service-card-icon-wrapper svelte-9x38mn"><div class="service-card-icon-ring service-card-icon-ring-outer svelte-9x38mn"></div> <div class="service-card-icon-ring service-card-icon-ring-middle svelte-9x38mn"></div> <div class="service-card-icon-ring service-card-icon-ring-inner svelte-9x38mn"></div> <div class="service-card-icon-pulse svelte-9x38mn"></div> <div class="service-card-icon svelte-9x38mn">`);
		if (IconComponent()) {
			$$renderer.push("<!--[-->");
			IconComponent()($$renderer, { class: "w-5 h-5" });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</div></div> <h3 class="service-card-title svelte-9x38mn">${escape_html(service.title)}</h3> <p class="service-card-description svelte-9x38mn">${escape_html(service.description)}</p></div> <div class="service-card-progress svelte-9x38mn"><div class="service-card-progress-bg svelte-9x38mn"></div> <div class="service-card-progress-bar svelte-9x38mn"></div> <div class="service-card-progress-glow svelte-9x38mn"></div></div></div> <div class="service-card-shine svelte-9x38mn"></div> <div class="service-card-reflection svelte-9x38mn"></div></a>`);
	});
}
//#endregion
export { ServiceCard as t };
