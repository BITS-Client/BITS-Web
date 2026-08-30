import { a as attr_class, g as stringify } from "./index-server.js";
//#region src/lib/components/ui/animation/FloatingElement.svelte
function FloatingElement($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, duration, delay = 0, amplitude, class: className = "" } = $$props;
		$$renderer.push(`<div${attr_class(`floating-element ${stringify(className)}`, "svelte-2c9w9a")}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { FloatingElement as t };
