import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/calendar.svelte
function Calendar($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "calendar" },
		props,
		{ iconNode: [
			["path", { "d": "M8 2v3" }],
			["path", { "d": "M16 2v3" }],
			["rect", {
				"x": "3",
				"y": "3",
				"width": "18",
				"height": "18",
				"rx": "2"
			}],
			["path", { "d": "M3 9h18" }]
		] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/cloud.svelte
function Cloud($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "cloud" },
		props,
		{ iconNode: [["path", { "d": "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }]] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/palette.svelte
function Palette($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "palette" },
		props,
		{ iconNode: [
			["path", { "d": "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" }],
			["circle", {
				"cx": "13.5",
				"cy": "6.5",
				"r": ".5",
				"fill": "currentColor"
			}],
			["circle", {
				"cx": "17.5",
				"cy": "10.5",
				"r": ".5",
				"fill": "currentColor"
			}],
			["circle", {
				"cx": "6.5",
				"cy": "12.5",
				"r": ".5",
				"fill": "currentColor"
			}],
			["circle", {
				"cx": "8.5",
				"cy": "7.5",
				"r": ".5",
				"fill": "currentColor"
			}]
		] }
	]));
}
//#endregion
export { Cloud as n, Calendar as r, Palette as t };
