import { C as escape_html, d as ensure_array_like, l as derived } from "../../../../chunks/index-server.js";
import { s as generateWebPageSchema } from "../../../../chunks/seo.js";
import { r as resolvePath } from "../../../../chunks/routing.js";
import "../../../../chunks/lucide.js";
import { o as Rocket, t as getIconComponent, u as Heart_handshake } from "../../../../chunks/icons.js";
import { t as Sparkles } from "../../../../chunks/sparkles.js";
import { t as SEO } from "../../../../chunks/SEO2.js";
import { t as ServiceCard } from "../../../../chunks/ServiceCard.js";
import { t as Background } from "../../../../chunks/Background.js";
import { t as WaveHeader } from "../../../../chunks/WaveHeader.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
import { t as BigCTA } from "../../../../chunks/BigCTA.js";
import { t as ProcessCard } from "../../../../chunks/ProcessCard.js";
//#region src/lib/components/ui/card/WhyCard.svelte
function WhyCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { icon, title, description = "" } = $$props;
		const IconComponent = derived(() => icon ? getIconComponent(icon) : void 0);
		$$renderer.push(`<div class="why-card svelte-1uwtuhq"><div class="why-card-bg svelte-1uwtuhq"></div> <div class="why-card-inner svelte-1uwtuhq"><div class="why-icon-wrapper svelte-1uwtuhq">`);
		if (IconComponent()) {
			$$renderer.push("<!--[0-->");
			if (IconComponent()) {
				$$renderer.push("<!--[-->");
				IconComponent()($$renderer, { class: "w-5 h-5" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <h3 class="why-title svelte-1uwtuhq">${escape_html(title)}</h3> `);
		if (description) $$renderer.push(`<!--[0--><p class="why-description svelte-1uwtuhq">${escape_html(description)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="why-accent svelte-1uwtuhq"></div></div></div>`);
	});
}
//#endregion
//#region src/routes/[lang]/services/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		function resolve(path) {
			return resolvePath(path, data.locale);
		}
		function getLocalizedText(obj, locale) {
			if (!obj) return "";
			if (typeof obj === "string") return obj;
			return obj[locale] || obj["id"] || Object.values(obj)[0] || "";
		}
		const processSteps = derived(() => (data.servicesPage?.processSection?.processItems || []).map((item, index) => {
			const stepNum = index + 1;
			return {
				step: stepNum < 10 ? `0${stepNum}` : String(stepNum),
				title: item.title || "",
				description: item.subtitle || "",
				icon: item.icon || ""
			};
		}));
		const whyUsReasons = derived(() => (data.servicesPage?.whySection?.whyItems || []).map((item) => ({
			icon: item.icon || "",
			title: getLocalizedText(item.title, data.locale),
			description: getLocalizedText(item.subtitle, data.locale)
		})));
		const services = derived(() => (data.services || []).map((service, index) => {
			const iconColors = [
				"from-pink-500 to-rose-600",
				"from-blue-500 to-cyan-500",
				"from-emerald-500 to-teal-500",
				"from-violet-500 to-purple-500",
				"from-teal-500 to-cyan-500",
				"from-rose-500 to-pink-500"
			];
			return {
				id: service.slug || service._id,
				title: service.title || "",
				description: service.seo?.description || "",
				icon: service.icon || "sparkles",
				href: resolve(`/services/${service.slug || ""}`),
				color: iconColors[index % iconColors.length]
			};
		}));
		const pageTitle = derived(() => data.servicesPage?.seo?.title || "Our Services");
		const pageDescription = derived(() => data.servicesPage?.seo?.description || "Explore Banten IT Solutions comprehensive digital services including web design, custom software development, ERP systems, AI & automation, IT infrastructure, and creative services.");
		const breadcrumbs = derived(() => {
			const homeLabel = data.navigation?.items?.find((item) => item.href === "/")?.label || "Home";
			const title = data.servicesPage?.seo?.title || "Our Services";
			return [{
				name: homeLabel,
				url: "/"
			}, {
				name: title,
				url: "/services"
			}];
		});
		const heroCtaText1 = derived(() => {
			const locale = data.locale;
			const ctaData = data.servicesPage?.hero?.ctaText1;
			return ctaData?.[locale] || ctaData || "Dapatkan Konsultasi Gratis";
		});
		const heroCtaText2 = derived(() => {
			const locale = data.locale;
			const ctaData = data.servicesPage?.hero?.ctaText2;
			return ctaData?.[locale] || ctaData || "Jelajahi Layanan";
		});
		const webPageSchema = derived(() => generateWebPageSchema(pageTitle(), pageDescription(), "/services"));
		function scrollToSection(id) {
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: "smooth" });
		}
		SEO($$renderer, {
			title: pageTitle(),
			description: pageDescription(),
			image: data.information?.siteLogo?.asset?.url,
			imageAlt: data.information?.siteLogo?.alt || pageTitle(),
			siteIcon: data.information?.siteIcon?.asset?.url,
			locale: data.locale,
			alternates: data.alternateLocales,
			breadcrumbs: breadcrumbs(),
			jsonLd: [webPageSchema()]
		});
		$$renderer.push(`<!----> `);
		PageHero($$renderer, {
			badge: data.servicesPage?.hero?.badge,
			title: data.servicesPage?.hero?.title,
			subtitle: data.servicesPage?.hero?.subtitle,
			locale: data.locale,
			breadcrumbs: breadcrumbs(),
			customButtons: [{
				label: heroCtaText1(),
				href: resolve(data.servicesPage?.hero?.ctaLink1) || resolve("/contact"),
				isPrimary: true
			}, {
				label: heroCtaText2(),
				href: "#services-section",
				isSecondary: true,
				onclick: () => scrollToSection("services-section")
			}]
		});
		$$renderer.push(`<!----> <section id="services-section" class="py-10 lg:py-16 bg-white"><div class="container-base">`);
		WaveHeader($$renderer, {
			badge: data.servicesPage?.servicesSection?.badge,
			badgeIcon: Sparkles,
			title: data.servicesPage?.servicesSection?.title,
			subtitle: data.servicesPage?.servicesSection?.subtitle,
			headingId: "services-heading"
		});
		$$renderer.push(`<!----> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
		const each_array = ensure_array_like(services());
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let service = each_array[index];
			ServiceCard($$renderer, {
				service,
				index,
				locale: data.locale
			});
		}
		$$renderer.push(`<!--]--></div></div></section> <section id="process-section" class="py-10 lg:py-16 relative overflow-hidden">`);
		Background($$renderer, { gradientTheme: "teal" });
		$$renderer.push(`<!----> <div class="container-base relative z-10">`);
		WaveHeader($$renderer, {
			badge: data.servicesPage?.processSection?.badge,
			badgeIcon: Rocket,
			title: data.servicesPage?.processSection?.title,
			subtitle: data.servicesPage?.processSection?.subtitle,
			headingId: "process-heading"
		});
		$$renderer.push(`<!----> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
		const each_array_1 = ensure_array_like(processSteps());
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let step = each_array_1[$$index_1];
			ProcessCard($$renderer, {
				step: step.step,
				title: step.title,
				description: step.description,
				icon: step.icon
			});
		}
		$$renderer.push(`<!--]--></div></div></section> <section id="why-us-section" class="py-10 lg:py-16 relative overflow-hidden">`);
		Background($$renderer, { gradientTheme: "ocean" });
		$$renderer.push(`<!----> <div class="container-base relative z-10">`);
		WaveHeader($$renderer, {
			badge: data.servicesPage?.whySection?.badge,
			badgeIcon: Heart_handshake,
			title: data.servicesPage?.whySection?.title,
			subtitle: data.servicesPage?.whySection?.subtitle,
			headingId: "why-us-heading"
		});
		$$renderer.push(`<!----> <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"><!--[-->`);
		const each_array_2 = ensure_array_like(whyUsReasons());
		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let reason = each_array_2[$$index_2];
			WhyCard($$renderer, {
				icon: reason.icon,
				title: reason.title,
				description: reason.description
			});
		}
		$$renderer.push(`<!--]--></div></div></section> `);
		BigCTA($$renderer, {
			locale: data.locale,
			cta: {
				badge: data.servicesPage?.ctaSection?.badge || "",
				heading: data.servicesPage?.ctaSection?.title || "",
				text: data.servicesPage?.ctaSection?.subtitle || "",
				getStarted: data.servicesPage?.ctaSection?.ctaText1 || "",
				getStartedLink: data.servicesPage?.ctaSection?.ctaLink1 || "/contact",
				exploreServices: data.servicesPage?.ctaSection?.ctaText2 || "",
				exploreLink: data.servicesPage?.ctaSection?.ctaLink2 || "/portfolio"
			}
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
