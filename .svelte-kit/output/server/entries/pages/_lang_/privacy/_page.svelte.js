import { l as derived } from "../../../../chunks/index-server.js";
import { c as seoConfig, s as generateWebPageSchema } from "../../../../chunks/seo.js";
import "../../../../chunks/lucide.js";
import { i as Circle_alert } from "../../../../chunks/map-pin.js";
import { n as Shield } from "../../../../chunks/x.js";
import { t as Lock } from "../../../../chunks/lock.js";
import { t as SEO } from "../../../../chunks/SEO2.js";
import { t as ContactCard } from "../../../../chunks/ContactCard.js";
import { n as LegalHero, t as LegalContent } from "../../../../chunks/LegalContent.js";
//#region src/routes/[lang]/privacy/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const pageTitle = derived(() => data.privacyPage?.seo?.title || "");
		const pageDescription = derived(() => data.privacyPage?.seo?.description || "");
		const webPageSchema = derived(() => generateWebPageSchema(pageTitle(), pageDescription(), "/privacy"));
		const heroBadge = derived(() => data.privacyPage?.hero?.badge || "");
		const heroTitle = derived(() => data.privacyPage?.hero?.title || "");
		const heroSubtitle = derived(() => data.privacyPage?.hero?.subtitle || "");
		const lastUpdatedLabel = derived(() => data.privacyPage?.hero?.lastUpdated || "");
		const contentTocLabel = derived(() => data.privacyPage?.content?.tocLabel || "");
		const contentSectionLabel = derived(() => data.privacyPage?.content?.sectionLabel || "");
		const contentNoticeTitle = derived(() => data.privacyPage?.content?.noticeTitle || "");
		const contentNoticeSubtitle = derived(() => data.privacyPage?.content?.noticeSubtitle || "");
		const contactTitle = derived(() => data.privacyPage?.contact?.title || "");
		const breadcrumbs = derived(() => [{
			name: "Home",
			url: "/"
		}, {
			name: pageTitle(),
			url: "/privacy"
		}]);
		const iconMap = {
			Shield,
			Lock
		};
		const sections = derived(() => {
			const sanitySections = data.privacyPage?.sections || [];
			const sectionConfig = {
				informationCollection: {
					icon: "Shield",
					color: "from-blue-500 to-cyan-500"
				},
				informationUse: {
					icon: "Lock",
					color: "from-purple-500 to-pink-500"
				},
				dataProtection: {
					icon: "Shield",
					color: "from-green-500 to-emerald-500"
				},
				dataSharing: {
					icon: "Shield",
					color: "from-orange-500 to-red-500"
				},
				cookies: {
					icon: "Shield",
					color: "from-teal-500 to-cyan-500"
				},
				yourRights: {
					icon: "Shield",
					color: "from-indigo-500 to-purple-500"
				},
				contactUs: {
					icon: "Shield",
					color: "from-yellow-500 to-orange-500"
				}
			};
			return sanitySections.map((section, index) => {
				const key = section.key || `section-${index}`;
				const config = sectionConfig[key] || sectionConfig.informationCollection;
				return {
					id: key,
					title: section.title,
					icon: iconMap[config.icon] || Shield,
					color: config.color,
					content: section.items?.map((item) => ({
						subtitle: item.subtitle || "",
						text: item.text || ""
					})) || []
				};
			});
		});
		SEO($$renderer, {
			title: pageTitle(),
			description: pageDescription(),
			type: "website",
			image: data.information?.siteLogo?.asset?.url,
			imageAlt: data.information?.siteLogo?.alt || pageTitle(),
			siteIcon: data.information?.siteIcon?.asset?.url,
			locale: data.locale,
			breadcrumbs: breadcrumbs(),
			jsonLd: [webPageSchema()]
		});
		$$renderer.push(`<!----> `);
		LegalHero($$renderer, {
			badge: heroBadge(),
			title: heroTitle(),
			subtitle: heroSubtitle(),
			lastUpdated: lastUpdatedLabel(),
			breadcrumbs: breadcrumbs(),
			locale: data.locale,
			primaryIcon: Shield,
			secondaryIcon: Lock
		});
		$$renderer.push(`<!----> `);
		LegalContent($$renderer, {
			sections: sections(),
			tocLabel: contentTocLabel(),
			sectionLabel: contentSectionLabel(),
			noticeTitle: contentNoticeTitle(),
			noticeSubtitle: contentNoticeSubtitle(),
			noticeIcon: Circle_alert
		});
		$$renderer.push(`<!----> <section class="py-10 lg:py-16"><div class="container-base">`);
		ContactCard($$renderer, {
			email: seoConfig.contactEmail,
			phone: seoConfig.phoneDisplay,
			address: "Jl. Komp. Taman Pesona, Taktakan, Kota Serang, Banten 42162, Indonesia",
			title: contactTitle()
		});
		$$renderer.push(`<!----></div></section>`);
	});
}
//#endregion
export { _page as default };
