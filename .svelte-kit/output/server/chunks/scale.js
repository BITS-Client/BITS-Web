import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/menu.svelte
function Menu($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "menu" },
		props,
		{ iconNode: [
			["path", { "d": "M4 5h16" }],
			["path", { "d": "M4 12h16" }],
			["path", { "d": "M4 19h16" }]
		] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/scale.svelte
function Scale($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "scale" },
		props,
		{ iconNode: [
			["path", { "d": "M12 3v18" }],
			["path", { "d": "m19 8 3 8a5 5 0 0 1-6 0zV7" }],
			["path", { "d": "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" }],
			["path", { "d": "m5 8 3 8a5 5 0 0 1-6 0zV7" }],
			["path", { "d": "M7 21h10" }]
		] }
	]));
}
//#endregion
export { Menu as n, Scale as t };
