import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/building.svelte
function Building($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "building" },
		props,
		{ iconNode: [
			["path", { "d": "M12 10h.01" }],
			["path", { "d": "M12 14h.01" }],
			["path", { "d": "M12 6h.01" }],
			["path", { "d": "M16 10h.01" }],
			["path", { "d": "M16 14h.01" }],
			["path", { "d": "M16 6h.01" }],
			["path", { "d": "M8 10h.01" }],
			["path", { "d": "M8 14h.01" }],
			["path", { "d": "M8 6h.01" }],
			["path", { "d": "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" }],
			["rect", {
				"x": "4",
				"y": "2",
				"width": "16",
				"height": "20",
				"rx": "2"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/trophy.svelte
function Trophy($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "trophy" },
		props,
		{ iconNode: [
			["path", { "d": "M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" }],
			["path", { "d": "M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" }],
			["path", { "d": "M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" }],
			["path", { "d": "M4 22h16" }],
			["path", { "d": "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" }],
			["path", { "d": "M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" }]
		] }
	]));
}
//#endregion
export { Building as n, Trophy as t };
