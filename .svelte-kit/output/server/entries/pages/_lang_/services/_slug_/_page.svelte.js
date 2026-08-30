import { C as escape_html, d as ensure_array_like, l as derived } from "../../../../../chunks/index-server.js";
import { o as generateServiceSchema } from "../../../../../chunks/seo.js";
import "../../../../../chunks/lucide.js";
import { r as Check } from "../../../../../chunks/send.js";
import { t as Zap } from "../../../../../chunks/zap.js";
import { n as Shield } from "../../../../../chunks/x.js";
import { t as Sparkles } from "../../../../../chunks/sparkles.js";
import { t as SEO } from "../../../../../chunks/SEO2.js";
import { t as ServiceCard } from "../../../../../chunks/ServiceCard.js";
import { t as Background } from "../../../../../chunks/Background.js";
import { t as WaveHeader } from "../../../../../chunks/WaveHeader.js";
import { t as PageHero } from "../../../../../chunks/PageHero.js";
import { t as NotFound } from "../../../../../chunks/NotFound.js";
import { t as BigCTA } from "../../../../../chunks/BigCTA.js";
import { t as ProcessCard } from "../../../../../chunks/ProcessCard.js";
//#region src/lib/components/ui/content/BenefitsContent.svelte
function BenefitsContent($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { benefits = [], stats = [] } = $$props;
		$$renderer.push(`<div class="benefits-layout svelte-1j33qf6"><div class="benefits-cards svelte-1j33qf6"><!--[-->`);
		const each_array = ensure_array_like(benefits);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let benefit = each_array[i];
			$$renderer.push(`<div class="benefit-card svelte-1j33qf6"><div class="benefit-check svelte-1j33qf6">`);
			Check($$renderer, { size: 14 });
			$$renderer.push(`<!----></div> <span class="benefit-text svelte-1j33qf6">${escape_html(benefit.title)}</span></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="benefits-stats svelte-1j33qf6"><div class="stats-grid svelte-1j33qf6">`);
		if (stats.length > 0) {
			$$renderer.push(`<!--[0--><!--[-->`);
			const each_array_1 = ensure_array_like(stats);
			for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
				let stat = each_array_1[i];
				$$renderer.push(`<div class="stat-item svelte-1j33qf6"><span class="stat-value svelte-1j33qf6">${escape_html(stat.value)}</span> <span class="stat-label svelte-1j33qf6">${escape_html(stat.label)}</span></div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push(`<!--[-1--><div class="stat-item svelte-1j33qf6"><span class="stat-value svelte-1j33qf6">500+</span> <span class="stat-label svelte-1j33qf6">Projects</span></div> <div class="stat-item svelte-1j33qf6"><span class="stat-value svelte-1j33qf6">98%</span> <span class="stat-label svelte-1j33qf6">Satisfaction</span></div> <div class="stat-item svelte-1j33qf6"><span class="stat-value svelte-1j33qf6">24/7</span> <span class="stat-label svelte-1j33qf6">Support</span></div>`);
		$$renderer.push(`<!--]--></div></div></div>`);
	});
}
//#endregion
//#region src/routes/[lang]/services/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		function scrollToSection(id) {
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		}
		const breadcrumbs = derived(() => {
			const homeItem = data.navigation?.items?.find((item) => item.href === "/");
			const servicesItem = data.navigation?.items?.find((i) => i.href === "/services");
			const homeLabel = homeItem?.label || "Home";
			const servicesLabel = data.servicesPage?.seo?.title || servicesItem?.label || "Services";
			const currentTitle = data.service?.title || "Service";
			const currentSlug = data.service?.slug?.current || "";
			return [
				{
					name: homeLabel,
					url: "/"
				},
				{
					name: servicesLabel,
					url: "/services"
				},
				{
					name: currentTitle,
					url: `/services/${currentSlug}`
				}
			];
		});
		const serviceSchema = derived(() => data.service ? generateServiceSchema(data.service.title || "", data.service.seo?.description || "", "Professional Service", `/services/${data.service.slug?.current || ""}`) : null);
		const heroStats = derived(() => {
			const stats = data.servicesPage?.serviceDetail?.hero?.stats;
			if (stats && stats.length > 0) return stats.map((stat) => ({
				_key: stat._key || Math.random().toString(),
				value: stat.value || "0",
				label: stat.label || ""
			}));
			return [
				{
					_key: "1",
					value: "500+",
					label: "Projects"
				},
				{
					_key: "2",
					value: "98%",
					label: "Satisfaction"
				},
				{
					_key: "3",
					value: "24/7",
					label: "Support"
				}
			];
		});
		const customButtons = derived(() => {
			const btnCta = data.servicesPage?.serviceDetail?.hero?.buttonCta;
			if (btnCta) return [{
				label: btnCta,
				href: "#sub-services",
				isPrimary: true,
				onclick: () => scrollToSection("sub-services")
			}];
			return [];
		});
		const processSteps = derived(() => (data.servicesPage?.processSection?.processItems || []).map((item, index) => {
			const stepNum = index + 1;
			return {
				step: stepNum < 10 ? `0${stepNum}` : String(stepNum),
				title: item.title || "",
				description: item.subtitle || "",
				icon: item.icon || ""
			};
		}));
		const subServices = derived(() => (data.service?.subServices || []).map((service, index) => {
			const iconColors = [
				"from-pink-500 to-rose-600",
				"from-blue-500 to-cyan-500",
				"from-emerald-500 to-teal-500",
				"from-violet-500 to-purple-500",
				"from-teal-500 to-cyan-500",
				"from-rose-500 to-pink-500"
			];
			return {
				id: service.title || `service-${index}`,
				title: service.title || "",
				description: service.description || "",
				icon: service.icon || "sparkles",
				href: "#",
				color: iconColors[index % iconColors.length]
			};
		}));
		const seoTitle = derived(() => {
			const locale = data.locale;
			const seoTitleData = data.service?.seo?.title;
			if (seoTitleData) return seoTitleData[locale] || seoTitleData.en || "";
			const navServices = data.navigation?.items?.find((i) => i.href === "/services");
			return `${data.service?.title || ""} - ${navServices?.label || "Services"}`;
		});
		SEO($$renderer, {
			title: seoTitle(),
			description: data.service?.seo?.description,
			url: `/services/${data.service?.slug?.current || ""}`,
			breadcrumbs: breadcrumbs(),
			jsonLd: [serviceSchema()]
		});
		$$renderer.push(`<!----> `);
		if (data.service) {
			$$renderer.push(`<!--[0--><div class="service-page svelte-1fve2g">`);
			PageHero($$renderer, {
				badge: data.servicesPage?.servicesSection?.badge || data.servicesPage?.serviceDetail?.hero?.badge || "",
				title: data.service?.title || "",
				subtitle: data.service?.seo?.description || data.service?.longDescription || "",
				breadcrumbs: breadcrumbs(),
				locale: data.locale,
				stats: heroStats(),
				icon: Sparkles,
				customButtons: customButtons()
			});
			$$renderer.push(`<!----> `);
			if (data.service?.subServices?.length > 0) {
				$$renderer.push(`<!--[0--><section id="sub-services" class="py-10 lg:py-16 bg-white svelte-1fve2g"><div class="container-base svelte-1fve2g">`);
				WaveHeader($$renderer, {
					badge: data.servicesPage?.serviceDetail?.subService?.badge || "",
					badgeIcon: Sparkles,
					title: data.servicesPage?.serviceDetail?.subService?.title || "",
					subtitle: data.servicesPage?.serviceDetail?.subService?.subtitle || "",
					headingId: "sub-services-heading"
				});
				$$renderer.push(`<!----> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 svelte-1fve2g"><!--[-->`);
				const each_array = ensure_array_like(subServices());
				for (let index = 0, $$length = each_array.length; index < $$length; index++) {
					let service = each_array[index];
					ServiceCard($$renderer, {
						service,
						index,
						locale: data.locale
					});
				}
				$$renderer.push(`<!--]--></div></div></section>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <section id="benefits" class="py-10 lg:py-16 relative overflow-hidden svelte-1fve2g">`);
			Background($$renderer, { gradientTheme: "ocean" });
			$$renderer.push(`<!----> <div class="container-base relative z-10 svelte-1fve2g">`);
			WaveHeader($$renderer, {
				badge: data.servicesPage?.serviceDetail?.benefits?.badge || "",
				badgeIcon: Shield,
				title: data.servicesPage?.serviceDetail?.benefits?.title || "",
				subtitle: data.servicesPage?.serviceDetail?.benefits?.subtitle || "",
				headingId: "benefits-heading"
			});
			$$renderer.push(`<!----> `);
			BenefitsContent($$renderer, {
				benefits: data.service.benefits || [],
				stats: data.servicesPage?.serviceDetail?.benefits?.stats || []
			});
			$$renderer.push(`<!----></div></section> <section id="process" class="py-10 lg:py-16 relative overflow-hidden svelte-1fve2g">`);
			Background($$renderer, { gradientTheme: "teal" });
			$$renderer.push(`<!----> <div class="container-base relative z-10 svelte-1fve2g">`);
			WaveHeader($$renderer, {
				badge: data.servicesPage?.processSection?.badge || "",
				badgeIcon: Zap,
				title: data.servicesPage?.processSection?.title || "",
				subtitle: data.servicesPage?.processSection?.subtitle || "",
				headingId: "process-heading"
			});
			$$renderer.push(`<!----> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 svelte-1fve2g"><!--[-->`);
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
			$$renderer.push(`<!--]--></div></div></section> `);
			BigCTA($$renderer, {
				locale: data.locale,
				cta: {
					badge: data.servicesPage?.serviceDetail?.cta?.badge || "",
					heading: data.servicesPage?.serviceDetail?.cta?.title || "Ready to Get Started?",
					text: data.servicesPage?.serviceDetail?.cta?.subtitle || "",
					getStarted: data.servicesPage?.serviceDetail?.cta?.btnCta || "Contact Us",
					getStartedLink: data.servicesPage?.serviceDetail?.cta?.linkCta || "/contact",
					exploreServices: void 0,
					exploreLink: void 0
				}
			});
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (!data.service) {
			$$renderer.push("<!--[0-->");
			NotFound($$renderer, {
				title: "Service Not Found",
				description: "The service you are looking for does not exist or has been removed.",
				buttonLabel: "View All Services",
				href: `/${data.locale}/services`
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
