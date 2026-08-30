import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/chevron-right.svelte
function Chevron_right($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "chevron-right" },
		props,
		{ iconNode: [["path", { "d": "m9 18 6-6-6-6" }]] }
	]));
}
//#endregion
export { Chevron_right as t };
