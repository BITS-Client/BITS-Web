import { C as escape_html, a as attr_class, d as ensure_array_like, g as stringify, o as attr_style, x as attr } from "./index-server.js";
import "./lucide.js";
import { r as Circle_check_big } from "./map-pin.js";
import { n as Shield, r as File_text, t as X } from "./x.js";
import { n as Menu, t as Scale } from "./scale.js";
import { t as Sparkles } from "./sparkles.js";
import { t as FloatingElement } from "./FloatingElement.js";
import { t as ScrollReveal } from "./ScrollReveal.js";
import { t as Breadcrumb } from "./Breadcrumb.js";
import { t as TableOfContents } from "./TableOfContents.js";
//#region src/lib/components/ui/hero/LegalHero.svelte
function LegalHero($$renderer, $$props) {
	let { badge, title, subtitle, lastUpdated, breadcrumbs, locale, primaryIcon: PrimaryIcon = Shield, secondaryIcon: SecondaryIcon = Scale } = $$props;
	$$renderer.push(`<section class="relative min-h-[60vh] flex items-center overflow-hidden svelte-sk4b4p"><div class="absolute inset-0 z-0 svelte-sk4b4p" aria-hidden="true"><div class="absolute inset-0 legal-hero-gradient svelte-sk4b4p"></div> <div class="absolute inset-0 bg-black/15 svelte-sk4b4p"></div> <div class="absolute inset-0 overflow-hidden opacity-60 svelte-sk4b4p"><div class="absolute top-[-15%] left-[-50%] w-[200%] h-[40%] rounded-full blur-[80px] bg-gradient-to-r from-transparent via-blue-500 to-purple-500 animate-[aurora-flow_18s_ease-in-out_infinite] svelte-sk4b4p"></div> <div class="absolute top-[40%] right-[-40%] w-[200%] h-[40%] rounded-full blur-[80px] bg-gradient-to-r from-transparent via-emerald-500 to-cyan-400 animate-[aurora-flow_22s_ease-in-out_infinite_-6s] svelte-sk4b4p"></div> <div class="absolute bottom-[-10%] left-[-30%] w-[200%] h-[40%] rounded-full blur-[80px] bg-gradient-to-r from-transparent via-pink-500 to-rose-500 animate-[aurora-flow_25s_ease-in-out_infinite_-12s] svelte-sk4b4p"></div></div> <div class="absolute inset-0 svelte-sk4b4p"><div class="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[60px] bg-gradient-to-br from-blue-500 to-transparent opacity-50 animate-[pulse_10s_ease-in-out_infinite] svelte-sk4b4p"></div> <div class="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] rounded-full blur-[60px] bg-gradient-to-br from-emerald-500 to-transparent opacity-45 animate-[pulse_10s_ease-in-out_infinite_-3s] svelte-sk4b4p"></div> <div class="absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] bg-gradient-to-br from-purple-500 to-transparent opacity-20 animate-[pulse_10s_ease-in-out_infinite_-6s] svelte-sk4b4p"></div></div> <div class="absolute inset-0 bg-[linear-gradient(rgba(30,64,175,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,64,175,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] dark:bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] svelte-sk4b4p"></div> <div class="absolute inset-0 overflow-hidden svelte-sk4b4p"><!--[-->`);
	const each_array = ensure_array_like(Array.from({ length: 15 }, (_, i) => i));
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		each_array[$$index];
		$$renderer.push(`<div class="absolute bottom-[-10px] rounded-full animate-[particle-float_6s_ease-in-out_infinite] svelte-sk4b4p"${attr_style(`left: ${stringify(Math.random() * 100)}%; width: ${stringify(2 + Math.random() * 3)}px; height: ${stringify(2 + Math.random() * 3)}px; background: linear-gradient(135deg, #3b82f6, #10b981); animation-duration: ${stringify(6 + Math.random() * 8)}s; animation-delay: ${stringify(Math.random() * 6)}s;`)}></div>`);
	}
	$$renderer.push(`<!--]--></div> <div class="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03] bg-[url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;)] svelte-sk4b4p"></div></div> `);
	FloatingElement($$renderer, {
		class: "absolute top-24 left-[8%] hidden lg:block",
		duration: 4500,
		amplitude: 20,
		children: ($$renderer) => {
			$$renderer.push(`<div class="w-15 h-15 rounded-2xl bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-white/10 flex items-center justify-center shadow-xl text-blue-500 dark:text-blue-400 svelte-sk4b4p">`);
			if (PrimaryIcon) {
				$$renderer.push("<!--[-->");
				PrimaryIcon($$renderer, { class: "w-8 h-8" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	FloatingElement($$renderer, {
		class: "absolute top-32 right-[10%] hidden lg:block",
		delay: 500,
		duration: 5e3,
		amplitude: 25,
		children: ($$renderer) => {
			$$renderer.push(`<div class="w-12.5 h-12.5 rounded-xl bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-white/10 flex items-center justify-center shadow-xl text-emerald-500 dark:text-emerald-400 svelte-sk4b4p">`);
			if (SecondaryIcon) {
				$$renderer.push("<!--[-->");
				SecondaryIcon($$renderer, { class: "w-6 h-6" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	FloatingElement($$renderer, {
		class: "absolute bottom-40 left-[15%] hidden lg:block",
		delay: 1e3,
		duration: 4200,
		amplitude: 18,
		children: ($$renderer) => {
			$$renderer.push(`<div class="w-20 h-20 rounded-full border-2 border-blue-500/20 relative svelte-sk4b4p"><div class="absolute inset-2 rounded-full border-2 border-dashed border-emerald-500/30 animate-[spin_20s_linear_infinite] svelte-sk4b4p"></div></div>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> <div class="container-base relative z-10 py-10 lg:py-16 svelte-sk4b4p"><div class="max-w-4xl mx-auto text-center svelte-sk4b4p">`);
	ScrollReveal($$renderer, {
		animation: "fade",
		delay: 100,
		children: ($$renderer) => {
			$$renderer.push(`<div class="flex justify-center py-10 svelte-sk4b4p">`);
			Breadcrumb($$renderer, {
				items: breadcrumbs,
				locale
			});
			$$renderer.push(`<!----></div>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	ScrollReveal($$renderer, {
		animation: "scale",
		delay: 200,
		children: ($$renderer) => {
			$$renderer.push(`<div class="relative inline-flex items-center mb-6 svelte-sk4b4p"><div class="absolute inset-[-4px] bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full opacity-30 blur-lg animate-[pulse_3s_ease-in-out_infinite] svelte-sk4b4p"></div> <div class="relative flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-full border border-blue-500/20 text-blue-500 dark:text-blue-400 text-sm font-medium svelte-sk4b4p">`);
			if (PrimaryIcon) {
				$$renderer.push("<!--[-->");
				PrimaryIcon($$renderer, { class: "w-4 h-4" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` <span class="svelte-sk4b4p">${escape_html(badge)}</span> `);
			Sparkles($$renderer, { class: "w-4 h-4 animate-pulse" });
			$$renderer.push(`<!----></div></div>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	ScrollReveal($$renderer, {
		animation: "fly-up",
		delay: 300,
		children: ($$renderer) => {
			$$renderer.push(`<h1 class="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.25] mb-6 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradient-shift_6s_ease_infinite] svelte-sk4b4p">${escape_html(title)}</h1>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	ScrollReveal($$renderer, {
		animation: "fly-up",
		delay: 400,
		children: ($$renderer) => {
			$$renderer.push(`<p class="hero-subtitle text-lg leading-7 max-w-3xl mx-auto mb-6 svelte-sk4b4p">${escape_html(subtitle)}</p>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	ScrollReveal($$renderer, {
		animation: "fade",
		delay: 500,
		children: ($$renderer) => {
			$$renderer.push(`<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-lg border border-black/5 dark:border-white/10 text-sm svelte-sk4b4p">`);
			File_text($$renderer, { class: "w-4 h-4 hero-lastupdated-icon" });
			$$renderer.push(`<!----> <span class="hero-lastupdated svelte-sk4b4p">${escape_html(lastUpdated)}</span></div>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></div></div></section>`);
}
//#endregion
//#region src/lib/components/ui/content/LegalSectionCard.svelte
function LegalSectionCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { section, index, sectionLabel } = $$props;
		ScrollReveal($$renderer, {
			animation: "fly-up",
			delay: 150 + index * 50,
			children: ($$renderer) => {
				$$renderer.push(`<article${attr("id", section.id)} class="relative rounded-2xl overflow-hidden"><div class="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-blue-500/20 via-emerald-500/20 to-purple-500/20 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none"></div> <div class="absolute top-0 left-0 right-0 h-25 bg-gradient-to-b from-blue-500/5 to-transparent dark:from-blue-500/8 dark:to-transparent pointer-events-none"></div> <div class="relative bg-white dark:bg-slate-800/90 backdrop-blur-xl p-8 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.06)] border border-[#94a3b8] dark:shadow-none dark:border-white/5 rounded-2xl"><div class="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-white/10"><div${attr_class(`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl text-white shadow-lg bg-gradient-to-br ${stringify(section.color)}`)}>`);
				if (section.icon) {
					$$renderer.push("<!--[0-->");
					const IconComponent = section.icon;
					if (IconComponent) {
						$$renderer.push("<!--[-->");
						IconComponent($$renderer, { class: "w-6 h-6" });
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="flex-1"><span class="block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">${escape_html(sectionLabel)} ${escape_html(String(index + 1).padStart(2, "0"))}</span> <h2 class="text-2xl font-bold text-gray-900">${escape_html(section.title)}</h2></div></div> <div class="flex flex-col gap-5"><!--[-->`);
				const each_array = ensure_array_like(section.content);
				for (let itemIndex = 0, $$length = each_array.length; itemIndex < $$length; itemIndex++) {
					let item = each_array[itemIndex];
					$$renderer.push(`<div class="flex gap-4"><div class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-emerald-500 mt-0.5">`);
					Circle_check_big($$renderer, { class: "w-5 h-5" });
					$$renderer.push(`<!----></div> <div class="flex-1"><h3 class="text-base font-semibold text-gray-800 mb-1">${escape_html(item.subtitle)}</h3> <p class="text-[15px] leading-[1.7] text-gray-600">${escape_html(item.text)}</p></div></div>`);
				}
				$$renderer.push(`<!--]--></div></div></article>`);
			},
			$$slots: { default: true }
		});
	});
}
//#endregion
//#region src/lib/components/ui/content/LegalContent.svelte
function LegalContent($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { sections, tocLabel, sectionLabel, noticeTitle, noticeSubtitle, noticeIcon: NoticeIcon = null, noticeColor = "from-amber-500/10 to-amber-600/10 dark:from-amber-500/15 dark:to-amber-600/10" } = $$props;
		let activeTocId = "";
		let tocOpen = false;
		function tocItems() {
			return sections.map((section) => ({
				level: 1,
				text: section.title,
				id: section.id
			}));
		}
		function scrollToSection(sectionId) {
			const element = document.getElementById(sectionId);
			if (element) {
				const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 100;
				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth"
				});
			}
			tocOpen = false;
		}
		function handleTocClick(headingId) {
			activeTocId = headingId;
			scrollToSection(headingId);
		}
		$$renderer.push(`<section class="py-10 lg:py-16 bg-gray-50 dark:bg-slate-900"><div class="container-base"><div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12"><aside class="hidden lg:block sticky top-[100px] self-start">`);
		TableOfContents($$renderer, {
			items: tocItems(),
			title: tocLabel,
			activeId: activeTocId,
			onclick: handleTocClick
		});
		$$renderer.push(`<!----></aside> <div class="lg:hidden sticky top-20 z-40"><button class="flex items-center gap-3 w-full px-5 py-4 bg-white dark:bg-slate-800 rounded-xl font-medium text-gray-900 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.06)] border border-[#94a3b8] dark:shadow-none dark:border-white/10"${attr("aria-expanded", tocOpen)} aria-controls="mobile-toc">`);
		if (tocOpen) {
			$$renderer.push("<!--[0-->");
			X($$renderer, { class: "w-5 h-5" });
		} else {
			$$renderer.push("<!--[-1-->");
			Menu($$renderer, { class: "w-5 h-5" });
		}
		$$renderer.push(`<!--]--> <span>${escape_html(tocLabel)}</span></button> `);
		if (tocOpen) {
			$$renderer.push(`<!--[0--><nav id="mobile-toc" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl p-2 shadow-[0_25px_50px_-5px_rgba(0,0,0,0.15),0_10px_20px_-5px_rgba(0,0,0,0.08)] border border-[#94a3b8] dark:shadow-xl dark:border-white/10 max-h-[60vh] overflow-y-auto"><!--[-->`);
			const each_array = ensure_array_like(sections);
			for (let index = 0, $$length = each_array.length; index < $$length; index++) {
				let section = each_array[index];
				$$renderer.push(`<button${attr_class(`flex items-center gap-3 w-full px-4 py-3.5 bg-transparent border-none rounded-lg text-sm text-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/5 ${activeTocId === section.id ? "bg-gradient-to-r from-blue-500/10 to-emerald-500/10 dark:bg-gradient-to-r from-blue-500/20 to-emerald-500/20 text-blue-600 dark:text-blue-400 font-medium" : ""}`)}><span class="text-xs font-semibold text-blue-600 dark:text-blue-400 min-w-6">${escape_html(String(index + 1).padStart(2, "0"))}</span> <span>${escape_html(section.title)}</span></button>`);
			}
			$$renderer.push(`<!--]--></nav>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <main class="flex flex-col gap-6">`);
		ScrollReveal($$renderer, {
			animation: "scale",
			delay: 100,
			children: ($$renderer) => {
				$$renderer.push(`<div${attr_class(`flex gap-4 p-5 bg-gradient-to-br ${stringify(noticeColor)} rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-amber-500/40 dark:border-amber-500/40`)}><div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-amber-500/20 dark:bg-amber-500/20 rounded-xl text-amber-600 dark:text-amber-400">`);
				if (NoticeIcon) {
					$$renderer.push("<!--[0-->");
					const IconComponent = NoticeIcon;
					if (IconComponent) {
						$$renderer.push("<!--[-->");
						IconComponent($$renderer, { class: "w-6 h-6" });
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="flex-1"><h3 class="text-base font-semibold text-amber-800 dark:text-amber-300 mb-1">${escape_html(noticeTitle)}</h3> <p class="text-sm leading-6 text-amber-700 dark:text-amber-200">${escape_html(noticeSubtitle)}</p></div></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> <!--[-->`);
		const each_array_1 = ensure_array_like(sections);
		for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
			let section = each_array_1[index];
			LegalSectionCard($$renderer, {
				section,
				index,
				sectionLabel
			});
		}
		$$renderer.push(`<!--]--></main></div></div></section>`);
	});
}
//#endregion
export { LegalHero as n, LegalContent as t };
