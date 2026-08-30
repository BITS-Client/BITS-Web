import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/circle-alert.svelte
function Circle_alert($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "circle-alert" },
		props,
		{ iconNode: [
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "10"
			}],
			["line", {
				"x1": "12",
				"x2": "12",
				"y1": "8",
				"y2": "12"
			}],
			["line", {
				"x1": "12",
				"x2": "12.01",
				"y1": "16",
				"y2": "16"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/circle-check-big.svelte
function Circle_check_big($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "circle-check-big" },
		props,
		{ iconNode: [["path", { "d": "M21.801 10A10 10 0 1 1 17 3.335" }], ["path", { "d": "m9 11 3 3L22 4" }]] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/external-link.svelte
function External_link($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "external-link" },
		props,
		{ iconNode: [
			["path", { "d": "M15 3h6v6" }],
			["path", { "d": "M10 14 21 3" }],
			["path", { "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]
		] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/map-pin.svelte
function Map_pin($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "map-pin" },
		props,
		{ iconNode: [["path", { "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }], ["circle", {
			"cx": "12",
			"cy": "10",
			"r": "3"
		}]] }
	]));
}
//#endregion
export { Circle_alert as i, External_link as n, Circle_check_big as r, Map_pin as t };
