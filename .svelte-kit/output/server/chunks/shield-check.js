import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/chevron-down.svelte
function Chevron_down($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "chevron-down" },
		props,
		{ iconNode: [["path", { "d": "m6 9 6 6 6-6" }]] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/cpu.svelte
function Cpu($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "cpu" },
		props,
		{ iconNode: [
			["path", { "d": "M12 20v2" }],
			["path", { "d": "M12 2v2" }],
			["path", { "d": "M17 20v2" }],
			["path", { "d": "M17 2v2" }],
			["path", { "d": "M2 12h2" }],
			["path", { "d": "M2 17h2" }],
			["path", { "d": "M2 7h2" }],
			["path", { "d": "M20 12h2" }],
			["path", { "d": "M20 17h2" }],
			["path", { "d": "M20 7h2" }],
			["path", { "d": "M7 20v2" }],
			["path", { "d": "M7 2v2" }],
			["rect", {
				"x": "4",
				"y": "4",
				"width": "16",
				"height": "16",
				"rx": "2"
			}],
			["rect", {
				"x": "8",
				"y": "8",
				"width": "8",
				"height": "8",
				"rx": "1"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/headphones.svelte
function Headphones($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "headphones" },
		props,
		{ iconNode: [["path", { "d": "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" }]] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/megaphone.svelte
function Megaphone($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "megaphone" },
		props,
		{ iconNode: [
			["path", { "d": "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" }],
			["path", { "d": "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" }],
			["path", { "d": "M8 6v8" }]
		] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/server.svelte
function Server($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "server" },
		props,
		{ iconNode: [
			["rect", {
				"width": "20",
				"height": "8",
				"x": "2",
				"y": "2",
				"rx": "2",
				"ry": "2"
			}],
			["rect", {
				"width": "20",
				"height": "8",
				"x": "2",
				"y": "14",
				"rx": "2",
				"ry": "2"
			}],
			["line", {
				"x1": "6",
				"x2": "6.01",
				"y1": "6",
				"y2": "6"
			}],
			["line", {
				"x1": "6",
				"x2": "6.01",
				"y1": "18",
				"y2": "18"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/shield-check.svelte
function Shield_check($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "shield-check" },
		props,
		{ iconNode: [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }], ["path", { "d": "m9 12 2 2 4-4" }]] }
	]));
}
//#endregion
export { Cpu as a, Headphones as i, Server as n, Chevron_down as o, Megaphone as r, Shield_check as t };
