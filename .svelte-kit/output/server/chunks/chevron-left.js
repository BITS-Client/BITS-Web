import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/chevron-left.svelte
function Chevron_left($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "chevron-left" },
		props,
		{ iconNode: [["path", { "d": "m15 18-6-6 6-6" }]] }
	]));
}
//#endregion
export { Chevron_left as t };
