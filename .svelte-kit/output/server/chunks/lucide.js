import { S as clsx, d as ensure_array_like, l as derived, m as spread_props, s as attributes, u as element, y as getContext } from "./index-server.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/defaultAttributes.js
/**
* @file
* @license @lucide/svelte v1.37.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/utils/hasA11yProp.js
/**
* @file
* @license @lucide/svelte v1.37.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* Check if a component has an accessibility prop
*
* @param {object} props
* @returns {boolean} Whether the component has an accessibility prop
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/context.js
/**
* @file
* @license @lucide/svelte v1.37.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = Symbol("lucide-context");
var getLucideContext = () => getContext(LucideContext);
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/Icon.svelte
function Icon($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const globalProps = getLucideContext() ?? {};
		const { name, color = globalProps.color ?? "currentColor", size = globalProps.size ?? 24, strokeWidth = globalProps.strokeWidth ?? 2, absoluteStrokeWidth = globalProps.absoluteStrokeWidth ?? false, iconNode = [], children, $$slots, $$events, ...props } = $$props;
		const calculatedStrokeWidth = derived(() => absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth);
		$$renderer.push(`<svg${attributes({
			...defaultAttributes,
			...!children && !hasA11yProp(props) && { "aria-hidden": "true" },
			...props,
			width: size,
			height: size,
			stroke: color,
			"stroke-width": calculatedStrokeWidth(),
			class: clsx([
				"lucide-icon lucide",
				globalProps.class,
				name && `lucide-${name}`,
				props.class
			])
		}, void 0, void 0, void 0, 3)}><!--[-->`);
		const each_array = ensure_array_like(iconNode);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let [tag, attrs] = each_array[$$index];
			element($$renderer, tag, () => {
				$$renderer.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
			});
		}
		$$renderer.push(`<!--]-->`);
		children?.($$renderer);
		$$renderer.push(`<!----></svg>`);
	});
}
//#endregion
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/house.svelte
function House($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "house" },
		props,
		{ iconNode: [["path", { "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }], ["path", { "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }]] }
	]));
}
//#endregion
//#region src/lib/icons/brand/Github.svelte
function Github($$renderer, $$props) {
	let { size = 24, color = "currentColor", strokeWidth = 2, class: className, $$slots, $$events, ...rest } = $$props;
	$$renderer.push(`<svg${attributes({
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: color,
		"stroke-width": strokeWidth,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		class: clsx(className),
		...rest
	}, void 0, void 0, void 0, 3)}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`);
}
//#endregion
//#region src/lib/icons/brand/Instagram.svelte
function Instagram($$renderer, $$props) {
	let { size = 24, color = "currentColor", strokeWidth = 2, class: className, $$slots, $$events, ...rest } = $$props;
	$$renderer.push(`<svg${attributes({
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: color,
		"stroke-width": strokeWidth,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		class: clsx(className),
		...rest
	}, void 0, void 0, void 0, 3)}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>`);
}
//#endregion
//#region src/lib/icons/brand/Youtube.svelte
function Youtube($$renderer, $$props) {
	let { size = 24, color = "currentColor", strokeWidth = 2, class: className, $$slots, $$events, ...rest } = $$props;
	$$renderer.push(`<svg${attributes({
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: color,
		"stroke-width": strokeWidth,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		class: clsx(className),
		...rest
	}, void 0, void 0, void 0, 3)}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>`);
}
//#endregion
//#region src/lib/icons/brand/Twitter.svelte
function Twitter($$renderer, $$props) {
	let { size = 24, color = "currentColor", strokeWidth = 2, class: className, $$slots, $$events, ...rest } = $$props;
	$$renderer.push(`<svg${attributes({
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: color,
		"stroke-width": strokeWidth,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		class: clsx(className),
		...rest
	}, void 0, void 0, void 0, 3)}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`);
}
//#endregion
//#region src/lib/icons/brand/Linkedin.svelte
function Linkedin($$renderer, $$props) {
	let { size = 24, color = "currentColor", strokeWidth = 2, class: className, $$slots, $$events, ...rest } = $$props;
	$$renderer.push(`<svg${attributes({
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: color,
		"stroke-width": strokeWidth,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		class: clsx(className),
		...rest
	}, void 0, void 0, void 0, 3)}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`);
}
//#endregion
//#region src/lib/icons/brand/Facebook.svelte
function Facebook($$renderer, $$props) {
	let { size = 24, color = "currentColor", strokeWidth = 2, class: className, $$slots, $$events, ...rest } = $$props;
	$$renderer.push(`<svg${attributes({
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: color,
		"stroke-width": strokeWidth,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		class: clsx(className),
		...rest
	}, void 0, void 0, void 0, 3)}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`);
}
//#endregion
//#region src/lib/icons/brand/Slack.svelte
function Slack($$renderer, $$props) {
	let { size = 24, color = "currentColor", strokeWidth = 2, class: className, $$slots, $$events, ...rest } = $$props;
	$$renderer.push(`<svg${attributes({
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: color,
		"stroke-width": strokeWidth,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		class: clsx(className),
		...rest
	}, void 0, void 0, void 0, 3)}><rect width="3" height="8" x="13" y="2" rx="1.5"></rect><path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5"></path><rect width="3" height="8" x="8" y="14" rx="1.5"></rect><path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5"></path><rect width="8" height="3" x="14" y="13" rx="1.5"></rect><path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5"></path><rect width="8" height="3" x="2" y="8" rx="1.5"></rect><path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5"></path></svg>`);
}
//#endregion
export { Youtube as a, House as c, Twitter as i, Icon as l, Facebook as n, Instagram as o, Linkedin as r, Github as s, Slack as t };
