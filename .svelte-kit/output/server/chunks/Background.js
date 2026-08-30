import { a as attr_class, d as ensure_array_like, g as stringify, l as derived, o as attr_style } from "./index-server.js";
//#region src/lib/components/ui/misc/Background.svelte
function Background($$renderer, $$props) {
	const gradientThemes = {
		ocean: {
			light: "linear-gradient(135deg, #f1f5f9 0%, #bae6fd 25%, #bfdbfe 50%, #dcfce7 75%, #f3e8ff 100%)",
			dark: "linear-gradient(135deg, #030712 0%, #0f172a 25%, #1e3a5f 50%, #0f172a 75%, #030712 100%)"
		},
		teal: {
			light: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #c4b5fd 75%, #a5f3fc 100%)",
			dark: "linear-gradient(135deg, #0c4a6e 0%, #1e3a8a 25%, #4c1d95 50%, #312e81 75%, #1e3a8a 100%)"
		},
		coral: {
			light: "linear-gradient(135deg, #faf5ff 0%, #e9d5ff 25%, #e0f2fe 50%, #bae6fd 75%, #a5f3fc 100%)",
			dark: "linear-gradient(135deg, #2e1065 0%, #1e3a8a 25%, #4c1d95 50%, #312e81 75%, #0f172a 100%)"
		},
		violet: {
			light: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 25%, #ddd6fe 50%, #ede9fe 75%, #faf5ff 100%)",
			dark: "linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #312e81 75%, #1e1b4b 100%)"
		},
		monochrome: {
			light: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%, #f8fafc 100%)",
			dark: "linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)"
		},
		hero: {
			light: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 20%, #dbeafe 40%, #f0fdf4 60%, #faf5ff 80%, #f8fafc 100%)",
			dark: "linear-gradient(135deg, #020617 0%, #0c1222 15%, #0f172a 30%, #1e1b4b 50%, #0f172a 70%, #0c1222 85%, #020617 100%)"
		}
	};
	let { class: className = "", gradientTheme = "ocean" } = $$props;
	const theme = derived(() => gradientThemes[gradientTheme]);
	$$renderer.push(`<div${attr_class(`section-bg-container ${stringify(className)}`, "svelte-1s0gmb0")} aria-hidden="true"><div class="section-base-gradient svelte-1s0gmb0"${attr_style(`--gradient-light: ${stringify(theme().light)}; --gradient-dark: ${stringify(theme().dark)}`)}></div> <div class="section-aurora svelte-1s0gmb0"><div class="section-aurora-band section-aurora-1 svelte-1s0gmb0"></div> <div class="section-aurora-band section-aurora-2 svelte-1s0gmb0"></div> <div class="section-aurora-band section-aurora-3 svelte-1s0gmb0"></div></div> <div class="section-orb section-orb-1 svelte-1s0gmb0"></div> <div class="section-orb section-orb-2 svelte-1s0gmb0"></div> <div class="section-orb section-orb-3 svelte-1s0gmb0"></div> <div class="section-orb section-orb-4 svelte-1s0gmb0"></div> <div class="section-blob section-blob-1 svelte-1s0gmb0"></div> <div class="section-blob section-blob-2 svelte-1s0gmb0"></div> <div class="section-light-rays svelte-1s0gmb0"><div class="section-ray section-ray-1 svelte-1s0gmb0"></div> <div class="section-ray section-ray-2 svelte-1s0gmb0"></div> <div class="section-ray section-ray-3 svelte-1s0gmb0"></div></div> <div class="section-particles svelte-1s0gmb0"><!--[-->`);
	const each_array = ensure_array_like(Array.from({ length: 30 }));
	for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
		each_array[idx];
		$$renderer.push(`<div class="section-particle svelte-1s0gmb0"${attr_style(`--x: ${stringify(Math.random() * 100)}%; --size: ${stringify(2 + Math.random() * 4)}px; --duration: ${stringify(8 + Math.random() * 12)}s; --delay: ${stringify(Math.random() * 10)}s; --drift: ${stringify(-30 + Math.random() * 60)}px;`)}></div>`);
	}
	$$renderer.push(`<!--]--></div> <div class="section-orbital-container svelte-1s0gmb0"><div class="section-orbital section-orbital-1 svelte-1s0gmb0"></div> <div class="section-orbital section-orbital-2 svelte-1s0gmb0"></div> <div class="section-orbital section-orbital-3 svelte-1s0gmb0"></div></div> <div class="section-shape section-shape-triangle svelte-1s0gmb0"></div> <div class="section-shape section-shape-circle svelte-1s0gmb0"></div> <div class="section-shape section-shape-square svelte-1s0gmb0"></div> <div class="section-shape section-shape-diamond svelte-1s0gmb0"></div> <div class="section-shape section-shape-cross svelte-1s0gmb0"></div> <div class="section-cyber-grid svelte-1s0gmb0"></div> <div class="section-noise svelte-1s0gmb0"></div> <div class="section-vignette svelte-1s0gmb0"></div></div>`);
}
//#endregion
export { Background as t };
