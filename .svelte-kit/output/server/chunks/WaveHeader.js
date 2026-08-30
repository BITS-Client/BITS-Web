import { C as escape_html, l as derived, x as attr } from "./index-server.js";
import "./lucide.js";
import { d as Clock } from "./icons.js";
//#region src/lib/components/ui/header/WaveHeader.svelte
function WaveHeader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { badge = "", badgeIcon = Clock, title = "", subtitle = "", headingId = "wave-heading" } = $$props;
		const BadgeIcon = derived(() => badgeIcon);
		const titleMain = derived(() => title.split(" ").slice(0, 2).join(" "));
		const titleAccent = derived(() => title.split(" ").slice(2).join(" "));
		$$renderer.push(`<div class="wave-header svelte-sp4i2x">`);
		if (badge) {
			$$renderer.push(`<!--[0--><div class="wave-badge-wrapper svelte-sp4i2x"><div class="wave-badge svelte-sp4i2x"><div class="wave-badge-ring svelte-sp4i2x"></div> <div class="wave-badge-glow svelte-sp4i2x"></div> `);
			if (BadgeIcon()) {
				$$renderer.push("<!--[-->");
				BadgeIcon()($$renderer, { class: "w-4 h-4" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` <span class="wave-badge-text svelte-sp4i2x">${escape_html(badge)}</span> <div class="wave-sparkle wave-sparkle-1 svelte-sp4i2x"></div> <div class="wave-sparkle wave-sparkle-2 svelte-sp4i2x"></div> <div class="wave-sparkle wave-sparkle-3 svelte-sp4i2x"></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <h2${attr("id", headingId)} class="wave-title svelte-sp4i2x"><span class="title-line title-line-1 svelte-sp4i2x"><span class="title-word svelte-sp4i2x" style="--word-i: 0">${escape_html(titleMain())}</span></span> `);
		if (titleAccent()) $$renderer.push(`<!--[0--><span class="title-line title-line-2 svelte-sp4i2x"><span class="title-word text-gradient svelte-sp4i2x" style="--word-i: 1">${escape_html(titleAccent())}</span></span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></h2> <p class="wave-tagline svelte-sp4i2x"><span class="tagline-text svelte-sp4i2x">${escape_html(subtitle)}</span></p> <div class="wave-deco svelte-sp4i2x"><div class="deco-wave svelte-sp4i2x"><svg viewBox="0 0 200 20" class="wave-line svelte-sp4i2x"><path d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10" fill="none" stroke="url(#wave-gradient)" stroke-width="2" class="svelte-sp4i2x"></path><defs class="svelte-sp4i2x"><linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%" class="svelte-sp4i2x"><stop offset="0%" stop-color="#10b981" class="svelte-sp4i2x"></stop><stop offset="50%" stop-color="#3b82f6" class="svelte-sp4i2x"></stop><stop offset="100%" stop-color="#8b5cf6" class="svelte-sp4i2x"></stop></linearGradient></defs></svg></div></div></div>`);
	});
}
//#endregion
export { WaveHeader as t };
