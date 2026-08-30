import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/list-ordered.svelte
function List_ordered($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "list-ordered" },
		props,
		{ iconNode: [
			["path", { "d": "M11 5h10" }],
			["path", { "d": "M11 12h10" }],
			["path", { "d": "M11 19h10" }],
			["path", { "d": "M4 4h1v5" }],
			["path", { "d": "M4 9h2" }],
			["path", { "d": "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" }]
		] }
	]));
}
//#endregion
export { List_ordered as t };
