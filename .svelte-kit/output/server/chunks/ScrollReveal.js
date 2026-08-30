import { S as clsx, a as attr_class } from "./index-server.js";
//#region src/lib/components/ui/animation/ScrollReveal.svelte
function ScrollReveal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, animation = "fly-up", delay = 0, duration = 600, threshold = .1, once = true, class: className = "" } = $$props;
		$$renderer.push(`<div${attr_class(clsx(className))}>`);
		$$renderer.push(`<!--[-1--><div style="opacity: 0;">`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
export { ScrollReveal as t };
