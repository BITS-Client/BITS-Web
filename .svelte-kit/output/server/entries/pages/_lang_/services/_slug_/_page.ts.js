import { l as getServiceDetailData } from "../../../../../chunks/queries.js";
//#region src/routes/[lang]/services/[slug]/+page.ts
var prerender = false;
var load = async ({ params, parent }) => {
	const locale = params.lang || "id";
	const slug = params.slug;
	try {
		const layoutData = await parent();
		const data = await getServiceDetailData(slug, locale);
		if (!data?.service) return {
			service: null,
			servicesPage: data?.servicesPage || null,
			navigation: layoutData.navigation,
			locale
		};
		return {
			service: data.service,
			servicesPage: data.servicesPage || null,
			navigation: layoutData.navigation,
			locale
		};
	} catch (error) {
		console.error("Error in service detail load:", error);
		return {
			service: null,
			servicesPage: null,
			navigation: null,
			locale
		};
	}
};
//#endregion
export { load, prerender };
