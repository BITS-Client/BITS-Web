import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/gavel.svelte
function Gavel($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "gavel" },
		props,
		{ iconNode: [
			["path", { "d": "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381" }],
			["path", { "d": "m16 16 6-6" }],
			["path", { "d": "m21.5 10.5-8-8" }],
			["path", { "d": "m8 8 6-6" }],
			["path", { "d": "m8.5 7.5 8 8" }]
		] }
	]));
}
//#endregion
export { Gavel as t };
