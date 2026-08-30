import { C as escape_html, a as attr_class, d as ensure_array_like, g as stringify, l as derived, o as attr_style, s as attributes, x as attr } from "./index-server.js";
import "./lucide.js";
import { t as Search } from "./search.js";
import { t as Mail } from "./mail.js";
import { t as Message_circle } from "./message-circle.js";
import { n as Phone, t as Sparkles } from "./sparkles.js";
import { t as Breadcrumb } from "./Breadcrumb.js";
//#region src/lib/components/ui/cta/ContactCTA.svelte
function ContactCTA($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { href = "", icon = "custom", label = "", isExternal = false, className = "", customIcon = void 0 } = $$props;
		let IconComponent = derived(() => icon === "mail" ? Mail : icon === "phone" ? Phone : icon === "whatsapp" ? Message_circle : customIcon || Mail);
		if (href && href.length > 0) {
			$$renderer.push(`<!--[0--><a${attributes({
				href,
				class: `quick-contact-card ${stringify(className)}`,
				...isExternal ? {
					target: "_blank",
					rel: "noopener noreferrer"
				} : {}
			}, "svelte-132964e")}>`);
			if (IconComponent()) {
				$$renderer.push("<!--[0-->");
				const DynamicIcon = IconComponent();
				if (DynamicIcon) {
					$$renderer.push("<!--[-->");
					DynamicIcon($$renderer, { class: "w-6 h-6" });
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span>${escape_html(label)}</span></a>`);
		} else {
			$$renderer.push(`<!--[-1--><div${attr_class(`quick-contact-card ${stringify(className)}`, "svelte-132964e")}>`);
			if (IconComponent()) {
				$$renderer.push("<!--[0-->");
				const DynamicIcon = IconComponent();
				if (DynamicIcon) {
					$$renderer.push("<!--[-->");
					DynamicIcon($$renderer, { class: "w-6 h-6" });
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span>${escape_html(label)}</span></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/ui/hero/PageHero.svelte
function PageHero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { badge = "", title = "", subtitle = "", email = "", telp = "", whatsapp = "", emailLabel = "Email", telpLabel = "Phone", whatsappLabel = "WhatsApp", locale = "id", breadcrumbs = [], stats = [], icon: Icon = Sparkles, searchButton = null, customButtons = [] } = $$props;
		const titleMain = derived(() => title.split(" ").slice(0, 2).join(" "));
		const titleAccent = derived(() => title.split(" ").slice(2).join(" "));
		$$renderer.push(`<section class="page-hero svelte-1tj8up"><div class="hero-bg svelte-1tj8up" aria-hidden="true"><div class="gradient-orb orb-1 svelte-1tj8up"></div> <div class="gradient-orb orb-2 svelte-1tj8up"></div> <div class="gradient-orb orb-3 svelte-1tj8up"></div> <div class="grid-pattern svelte-1tj8up"></div></div> <div class="container-base relative z-10 py-10 lg:py-16 svelte-1tj8up">`);
		if (breadcrumbs.length > 0) {
			$$renderer.push("<!--[0-->");
			Breadcrumb($$renderer, {
				items: breadcrumbs,
				class: "mb-8",
				locale
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="max-w-4xl svelte-1tj8up"><div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-500/20 mb-6 badge-animate shadow-sm svelte-1tj8up">`);
		if (Icon) {
			$$renderer.push("<!--[-->");
			Icon($$renderer, { class: "w-4 h-4 text-blue-600" });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(` <span class="text-sm font-medium text-gray-900 svelte-1tj8up">${escape_html(badge)}</span></div> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.18] text-gray-900 mb-6 hero-title svelte-1tj8up">${escape_html(titleMain())} `);
		if (titleAccent()) $$renderer.push(`<!--[0--><span class="hero-headline2 svelte-1tj8up">${escape_html(titleAccent())}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></h1> <p class="text-lg lg:text-xl text-gray-700 mb-8 hero-subtitle max-w-2xl svelte-1tj8up">${escape_html(subtitle)}</p> <div class="hero-actions-row svelte-1tj8up">`);
		if (stats.length > 0) {
			$$renderer.push(`<!--[0--><div class="hero-stats svelte-1tj8up"><!--[-->`);
			const each_array = ensure_array_like(stats);
			for (let index = 0, $$length = each_array.length; index < $$length; index++) {
				let stat = each_array[index];
				$$renderer.push(`<div class="hero-stat-item svelte-1tj8up"${attr_style(`--index: ${stringify(index)}`)}><span class="hero-stat-value svelte-1tj8up">${escape_html(stat.value)}</span> <span class="hero-stat-label svelte-1tj8up">${escape_html(stat.label)}</span></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (customButtons.length > 0) {
			$$renderer.push(`<!--[0--><div class="quick-contact-grid hero-quick svelte-1tj8up"><!--[-->`);
			const each_array_1 = ensure_array_like(customButtons);
			for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
				let button = each_array_1[index];
				$$renderer.push(`<a${attr("href", button.href)}${attr_class("quick-contact-card svelte-1tj8up", void 0, {
					"primary": button.isPrimary,
					"secondary": button.isSecondary
				})}><span class="svelte-1tj8up">${escape_html(button.label)}</span></a>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else if (email || telp || whatsapp) {
			$$renderer.push(`<!--[1--><div class="quick-contact-grid hero-quick svelte-1tj8up">`);
			if (email) {
				$$renderer.push("<!--[0-->");
				ContactCTA($$renderer, {
					href: `mailto:${stringify(email)}`,
					icon: "mail",
					label: emailLabel
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (telp) {
				$$renderer.push("<!--[0-->");
				ContactCTA($$renderer, {
					href: `tel:${stringify(telp.replace(/\s+/g, ""))}`,
					icon: "phone",
					label: telpLabel
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (whatsapp) {
				$$renderer.push("<!--[0-->");
				ContactCTA($$renderer, {
					href: `https://wa.me/${stringify(whatsapp)}`,
					icon: "whatsapp",
					label: whatsappLabel,
					isExternal: true
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (searchButton) {
			$$renderer.push(`<!--[0--><button class="search-trigger-btn svelte-1tj8up" aria-label="Open search">`);
			Search($$renderer, {
				class: "w-5 h-5",
				"aria-hidden": "true"
			});
			$$renderer.push(`<!----> <span class="svelte-1tj8up">${escape_html(searchButton.label)}</span></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="wave-divider svelte-1tj8up" aria-hidden="true"><svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="svelte-1tj8up"><path d="M0 120L48 108C96 96 192 72 288 60C384 48 480 48 576 54C672 60 768 72 864 78C960 84 1056 84 1152 78C1248 72 1344 60 1392 54L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="currentColor" class="svelte-1tj8up"></path></svg></div></section>`);
	});
}
//#endregion
export { PageHero as t };
