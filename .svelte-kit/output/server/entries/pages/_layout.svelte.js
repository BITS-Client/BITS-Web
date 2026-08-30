import { C as escape_html, E as writable, _ as unsubscribe_stores, a as attr_class, d as ensure_array_like, g as stringify, h as store_get, l as derived, o as attr_style, x as attr } from "../../chunks/index-server.js";
import "../../chunks/exports.js";
import { r as resolvePath } from "../../chunks/routing.js";
import "../../chunks/lucide.js";
import { a as Sun, c as Moon, n as iconMap, t as getIconComponent } from "../../chunks/icons.js";
import "../../chunks/trending-up.js";
import "../../chunks/send.js";
import "../../chunks/map-pin.js";
import "../../chunks/mail.js";
import "../../chunks/message-circle.js";
import "../../chunks/sparkles.js";
import "../../chunks/navigation.js";
import { t as page } from "../../chunks/stores.js";
//#endregion
//#region src/lib/stores/theme.ts
var STORAGE_KEY = "bits-theme";
function getInitialTheme() {
	if (typeof window === "undefined") return "light";
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function createThemeStore() {
	const { subscribe, set, update } = writable("light");
	let initialized = false;
	function applyTheme(theme) {
		if (typeof document === "undefined") return;
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
	}
	return {
		subscribe,
		init() {
			if (initialized || typeof window === "undefined") return;
			const initialTheme = getInitialTheme();
			set(initialTheme);
			applyTheme(initialTheme);
			initialized = true;
			window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
				if (!localStorage.getItem(STORAGE_KEY)) {
					const newTheme = e.matches ? "dark" : "light";
					set(newTheme);
					applyTheme(newTheme);
				}
			});
		},
		setTheme(newTheme) {
			set(newTheme);
			applyTheme(newTheme);
			if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, newTheme);
		},
		toggleTheme() {
			update((current) => {
				const newTheme = current === "light" ? "dark" : "light";
				applyTheme(newTheme);
				if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, newTheme);
				return newTheme;
			});
		}
	};
}
createThemeStore();
//#endregion
//#region src/lib/components/ui/navigation/ThemeSwitcher.svelte
function ThemeSwitcher($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const isDark = derived(() => false);
		$$renderer.push(`<button class="theme-toggle-spectacular svelte-830ytg" aria-label="Toggle theme"${attr("title", isDark() ? "Switch to light mode" : "Switch to dark mode")}><span class="toggle-glow svelte-830ytg" aria-hidden="true"></span> <span class="toggle-ring svelte-830ytg" aria-hidden="true"></span> <span${attr_class("icon-container svelte-830ytg", void 0, { "is-dark": isDark() })}><span class="icon-face icon-sun svelte-830ytg" aria-hidden="true">`);
		Sun($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----></span> <span class="icon-face icon-moon svelte-830ytg" aria-hidden="true">`);
		Moon($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----></span></span> <span class="sparkle sparkle-1 svelte-830ytg" aria-hidden="true"></span> <span class="sparkle sparkle-2 svelte-830ytg" aria-hidden="true"></span> <span class="sparkle sparkle-3 svelte-830ytg" aria-hidden="true"></span></button>`);
	});
}
//#endregion
//#region src/lib/components/ui/navigation/LanguageSwitcher.svelte
function LanguageSwitcher($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const isIndonesian = derived(() => true);
		derived(() => () => {
			const pathname = store_get($$store_subs ??= {}, "$page", page).url.pathname;
			const pathParts = pathname.split("/").filter(Boolean);
			if (pathParts[0] && ["id", "en"].includes(pathParts[0])) return "/" + pathParts.slice(1).join("/") || "/";
			return pathname || "/";
		});
		$$renderer.push(`<button${attr_class("lang-toggle svelte-ldtkrl", void 0, { "is-indonesian": isIndonesian() })} aria-label="Switch language"${attr("title", isIndonesian() ? "Switch to English" : "Switch to Indonesian")}><span class="toggle-glow svelte-ldtkrl" aria-hidden="true"></span> <span class="toggle-ring svelte-ldtkrl" aria-hidden="true"></span> <span${attr_class("lang-text svelte-ldtkrl", void 0, { "is-indonesian": isIndonesian() })}><span class="text-id svelte-ldtkrl">ID</span> <span class="text-en svelte-ldtkrl">EN</span></span> <span class="sparkle sparkle-1 svelte-ldtkrl" aria-hidden="true"></span> <span class="sparkle sparkle-2 svelte-ldtkrl" aria-hidden="true"></span> <span class="sparkle sparkle-3 svelte-ldtkrl" aria-hidden="true"></span></button>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/ui/layout/Header.svelte
function Header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const Icons = {
			Code: iconMap.code,
			CodeXml: iconMap["code-xml"],
			Zap: iconMap.zap,
			Database: iconMap.database,
			Cpu: iconMap.cpu,
			Server: iconMap.server,
			Palette: iconMap.palette,
			Wallpaper: iconMap.wallpaper,
			Bot: iconMap.bot,
			ChevronDown: iconMap["chevron-down"],
			ArrowRight: iconMap["arrow-right"]
		};
		let { information, navigation, general, services: servicesData, servicesPage, locale } = $$props;
		const services = derived(() => (servicesData || []).map((s) => {
			const slug = typeof s.slug === "string" ? s.slug : s.slug?.current;
			const icon = s.icon;
			const description = s.seo?.description || "";
			return {
				id: s._id,
				title: s.title,
				icon: getIconComponent(icon ?? ""),
				description,
				href: resolve(`/services/${slug ?? ""}`)
			};
		}).filter((s) => s.title).slice(0, 8));
		const cta = derived(() => servicesPage?.ctaSection);
		const navItems = derived(() => navigation?.items?.sort((a, b) => a.order - b.order) || []);
		const siteLogoUrl = derived(() => information?.siteLogo?.asset?.url);
		const siteTitle = derived(() => information?.siteTitle);
		function resolve(path) {
			return resolvePath(path, locale);
		}
		let mobileMenuOpen = false;
		let servicesDropdownOpen = false;
		let headerScrolled = false;
		$$renderer.push(`<header${attr_class("header-spectacular fixed top-0 left-0 right-0 z-50", void 0, { "header-scrolled": headerScrolled })}><div class="header-border-glow" aria-hidden="true"></div> <div class="header-shimmer" aria-hidden="true"></div> <div${attr_class("header-ambient-glow", void 0, { "active": headerScrolled })} aria-hidden="true"></div> <div class="header-particles" aria-hidden="true"><span class="particle particle-1"></span> <span class="particle particle-2"></span> <span class="particle particle-3"></span></div> <a href="#main-content" class="skip-to-content">${escape_html(general?.skipToContent)}</a> <div class="container-base relative z-10"><nav class="nav-main" aria-label="Main navigation"><a${attr("href", resolve("/"))} class="logo-spectacular"${attr("aria-label", `${stringify(siteTitle())} - Home`)}><div class="logo-container"><div class="logo-ring-outer" aria-hidden="true"></div> <div class="logo-ring-inner" aria-hidden="true"></div> <div class="logo-glow-pulse" aria-hidden="true"></div> <img${attr("src", siteLogoUrl())}${attr("alt", information?.siteLogo?.alt || siteTitle())} class="logo-img"/></div></a> <div class="desktop-nav"><!--[-->`);
		const each_array = ensure_array_like(navItems());
		for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
			let nav = each_array[idx];
			if (nav.isService) {
				$$renderer.push(`<!--[0--><div class="services-mega-wrapper" role="none"><a${attr("href", resolve(nav.href))} class="nav-item nav-item-services"${attr("aria-expanded", servicesDropdownOpen)} aria-haspopup="true" aria-controls="dropdown-menu-services"${attr_style(`--nav-delay: ${stringify(idx * 80)}ms`)}><span class="nav-item-label">${escape_html(nav.label)}</span> <span class="nav-item-underline" aria-hidden="true"></span> <span class="nav-item-glow" aria-hidden="true"></span> <span${attr_class("nav-chevron", void 0, { "chevron-rotated": servicesDropdownOpen })}>`);
				if (Icons.ChevronDown) {
					$$renderer.push("<!--[-->");
					Icons.ChevronDown($$renderer, { class: "w-4 h-4" });
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(`</span></a> <div class="mega-menu-container"><div id="dropdown-menu-services"${attr_class("mega-menu-panel", void 0, { "mega-menu-open": servicesDropdownOpen })} role="menu" aria-label="Services menu"><div class="mega-menu-bg" aria-hidden="true"><div class="mega-menu-gradient"></div> <div class="mega-menu-grid"></div> <div class="mega-menu-orb orb-1"></div> <div class="mega-menu-orb orb-2"></div></div> <div class="mega-menu-content"><div class="mega-services-grid"><!--[-->`);
				const each_array_1 = ensure_array_like(services());
				for (let sIdx = 0, $$length = each_array_1.length; sIdx < $$length; sIdx++) {
					let service = each_array_1[sIdx];
					$$renderer.push(`<a${attr("href", service.href)} class="mega-service-card" role="menuitem"${attr_style(`--item-delay: ${stringify(sIdx * 50)}ms`)}><div class="service-card-glow" aria-hidden="true"></div> <div class="service-card-icon">`);
					if (service.icon) {
						$$renderer.push("<!--[-->");
						service.icon($$renderer, { class: "w-6 h-6" });
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
					$$renderer.push(`</div> <div class="service-card-content"><h4 class="service-card-title">${escape_html(service.title)}</h4> <p class="service-card-desc">${escape_html(service.description)}</p></div></a>`);
				}
				$$renderer.push(`<!--]--></div> <div class="mega-menu-cta">`);
				if (cta()?.title || cta()?.subtitle) {
					$$renderer.push(`<!--[0--><div class="cta-content">`);
					if (cta()?.title) $$renderer.push(`<!--[0--><h4 class="cta-title"><span class="cta-hl-1">${escape_html(cta().title?.split(" ").slice(0, 2).join(" "))}</span> <span class="cta-hl-2">${escape_html(cta().title?.split(" ").slice(2).join(" "))}</span></h4>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					if (cta()?.subtitle) $$renderer.push(`<!--[0--><p class="cta-desc">${escape_html(cta().subtitle)}</p>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (cta()?.ctaText1) $$renderer.push(`<!--[0--><a${attr("href", resolve(cta()?.ctaLink1 || "/contact"))} class="cta-button">${escape_html(cta().ctaText1)}</a>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div></div></div></div>`);
			} else $$renderer.push(`<!--[-1--><a${attr("href", resolve(nav.href))} class="nav-item"${attr_style(`--nav-delay: ${stringify(idx * 80)}ms`)}><span class="nav-item-label">${escape_html(nav.label)}</span> <span class="nav-item-underline" aria-hidden="true"></span> <span class="nav-item-glow" aria-hidden="true"></span></a>`);
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div> <div class="nav-right"><div class="desktop-controls"><div class="nav-control-btn" style="--control-delay: 440ms">`);
		LanguageSwitcher($$renderer, {});
		$$renderer.push(`<!----></div> <div class="nav-control-btn" style="--control-delay: 500ms">`);
		ThemeSwitcher($$renderer, {});
		$$renderer.push(`<!----></div></div> <div class="mobile-controls">`);
		LanguageSwitcher($$renderer, {});
		$$renderer.push(`<!----> `);
		ThemeSwitcher($$renderer, {});
		$$renderer.push(`<!----></div> <button class="hamburger-spectacular"${attr("aria-expanded", mobileMenuOpen)} aria-controls="mobile-nav-menu"${attr("aria-label", general?.openMenu)}><div class="hamburger-glow" aria-hidden="true"></div> <div class="hamburger-lines"><span${attr_class("h-line h-line-1", void 0, { "active": mobileMenuOpen })}></span> <span${attr_class("h-line h-line-2", void 0, { "active": mobileMenuOpen })}></span> <span${attr_class("h-line h-line-3", void 0, { "active": mobileMenuOpen })}></span></div></button></div></nav></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></header> <div class="header-spacer" aria-hidden="true"></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/layout/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { information, navigation, general, services: servicesData, clients: clientsData, locale } = $$props;
		const footerServices = derived(() => (servicesData || []).slice(0, 6).map((s) => {
			const slug = typeof s.slug === "string" ? s.slug : s.slug?.current;
			return {
				id: s._id,
				title: s.title,
				href: `/services/${slug ?? ""}`
			};
		}));
		derived(() => (navigation?.items || []).slice(0, 3));
		derived(() => (navigation?.items || []).slice(3, 6));
		derived(() => footerServices().slice(0, 3));
		derived(() => footerServices().slice(3, 6));
		(/* @__PURE__ */ new Date()).getFullYear();
		$$renderer.push(`<footer class="footer-wrapper relative overflow-hidden"><div class="footer-bg" aria-hidden="true"><div class="mesh-grid"></div> <div class="orb orb-1"></div> <div class="orb orb-2"></div> <div class="orb orb-3"></div> <div class="particles"><!--[-->`);
		const each_array = ensure_array_like(Array.from({ length: 20 }, () => ({
			x: Math.random() * 100,
			duration: 3 + Math.random() * 4
		})));
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let particle = each_array[i];
			$$renderer.push(`<div${attr_class(`particle particle-${stringify(i % 5)}`)}${attr_style(`--delay: ${stringify(i * .3)}s; --x: ${stringify(particle.x)}%; --duration: ${stringify(particle.duration)}s;`)}></div>`);
		}
		$$renderer.push(`<!--]--></div></div> `);
		if (clientsData && clientsData.length > 0) {
			$$renderer.push(`<!--[0--><div class="clients-section"><div class="container-base"><div class="clients-marquee"><div class="marquee-track"><!--[-->`);
			const each_array_1 = ensure_array_like([...clientsData, ...clientsData]);
			for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
				let client = each_array_1[index];
				$$renderer.push(`<div class="client-logo"${attr_style(`--index: ${stringify(index)}`)}>`);
				if (client.logoUrl) $$renderer.push(`<!--[0--><img${attr("src", client.logoUrl)}${attr("alt", client.name)} class="brand-image"/>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="newsletter-section"><div class="container-base relative z-10">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="main-content"><div class="container-base py-12 lg:py-16">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="social-bar"><div class="container-base">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="bottom-bar"><div class="container-base py-6">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></footer>`);
	});
}
//#endregion
//#region src/lib/components/ui/animation/LoadingSpinner.svelte
function LoadingSpinner($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		{
			$$renderer.push(`<!--[0--><div class="loading-backdrop svelte-80z3m5" aria-busy="true" role="status"><div class="tech-grid svelte-80z3m5"></div> <div class="scan-line svelte-80z3m5"></div> <div class="spinner-wrapper svelte-80z3m5"><div class="hexagon-ring svelte-80z3m5"><!--[-->`);
			const each_array = ensure_array_like(Array(6));
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				each_array[i];
				$$renderer.push(`<div class="hexagon svelte-80z3m5"${attr_style(`--delay: ${stringify(i * .15)}s; --rotation: ${stringify(i * 60)}deg`)}><svg viewBox="0 0 100 100" class="svelte-80z3m5"><polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" class="svelte-80z3m5"></polygon></svg></div>`);
			}
			$$renderer.push(`<!--]--></div> <div class="core svelte-80z3m5"><div class="core-inner svelte-80z3m5"></div> <div class="core-pulse svelte-80z3m5"></div></div></div> <div class="loading-text svelte-80z3m5">INITIALIZING...</div></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, data } = $$props;
		$$renderer.push(`<div class="min-h-screen flex flex-col">`);
		LoadingSpinner($$renderer, {});
		$$renderer.push(`<!----> `);
		Header($$renderer, {
			information: data.information,
			navigation: data.navigation,
			general: data.general,
			services: data.services,
			servicesPage: data.servicesPage,
			locale: data.locale
		});
		$$renderer.push(`<!----> <main id="main-content" class="flex-grow">`);
		children($$renderer);
		$$renderer.push(`<!----></main> `);
		Footer($$renderer, {
			general: data.general,
			information: data.information,
			navigation: data.navigation,
			services: data.services,
			clients: data.clients,
			locale: data.locale
		});
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _layout as default };
