import { m as spread_props } from "./index-server.js";
import { l as Icon } from "./lucide.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/message-circle.svelte
function Message_circle($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "message-circle" },
		props,
		{ iconNode: [["path", { "d": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" }]] }
	]));
}
//#endregion
export { Message_circle as t };
