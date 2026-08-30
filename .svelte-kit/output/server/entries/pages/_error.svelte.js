import { C as escape_html, _ as unsubscribe_stores, d as ensure_array_like, f as head, g as stringify, h as store_get, l as derived, o as attr_style } from "../../chunks/index-server.js";
import "../../chunks/lucide.js";
import { t as page } from "../../chunks/stores.js";
//#region src/routes/+error.svelte
function _error($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const error = derived(() => store_get($$store_subs ??= {}, "$page", page).error);
		let mouseX = 0;
		let mouseY = 0;
		const status = derived(() => store_get($$store_subs ??= {}, "$page", page).status);
		derived(() => error()?.message || "Something went wrong");
		const lang = derived(() => store_get($$store_subs ??= {}, "$page", page).params.lang || "id");
		function getErrorTitle(status, lang) {
			if (status === 404) return lang === "id" ? "Halaman Tidak Ditemukan" : "Page Not Found";
			if (status === 500) return lang === "id" ? "Kesalahan Server" : "Server Error";
			return lang === "id" ? "Ups!" : "Oops!";
		}
		function getErrorDesc(status, lang) {
			if (status === 404) return lang === "id" ? "Halaman yang Anda cari tidak ditemukan atau telah dihapus." : "Oops! The page you're looking for doesn't exist.";
			if (status === 500) return lang === "id" ? "Terjadi kesalahan di sisi server. Silakan coba lagi." : "Something went wrong on our end. Please try again.";
			return lang === "id" ? "Terjadi kesalahan yang tidak terduga." : "Something unexpected happened.";
		}
		function getButtonLabel(lang) {
			return lang === "id" ? "Kembali ke Beranda" : "Back to Home";
		}
		const errorInfo = derived(() => ({
			icon: status() === 404 ? "🔍" : status() === 500 ? "⚡" : "❓",
			title: getErrorTitle(status(), lang()),
			desc: getErrorDesc(status(), lang()),
			buttonLabel: getButtonLabel(lang())
		}));
		head("1j96wlh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(errorInfo().title)} | BITS</title>`);
			});
		});
		$$renderer.push(`<div class="error-page svelte-1j96wlh"${attr_style("", { transform: `translate(${stringify(mouseX)}px, ${stringify(mouseY)}px)` })}><div class="error-bg svelte-1j96wlh"><div class="gradient-orb orb-1 svelte-1j96wlh"></div> <div class="gradient-orb orb-2 svelte-1j96wlh"></div> <div class="gradient-orb orb-3 svelte-1j96wlh"></div> <div class="grid-overlay svelte-1j96wlh"></div></div> <div class="floating-elements svelte-1j96wlh"><!--[-->`);
		const each_array = ensure_array_like(Array(12));
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			each_array[i];
			$$renderer.push(`<div class="floating-shape svelte-1j96wlh"${attr_style(` left: ${stringify(Math.random() * 100)}%; animation-delay: ${stringify(i * .5)}s; animation-duration: ${stringify(15 + Math.random() * 10)}s; `)}></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="error-content svelte-1j96wlh">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _error as default };
