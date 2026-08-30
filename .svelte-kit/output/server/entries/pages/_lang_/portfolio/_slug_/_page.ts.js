import { c as getProjectDetailData } from "../../../../../chunks/queries.js";
//#region src/routes/[lang]/portfolio/[slug]/+page.ts
var prerender = false;
var load = async ({ params, parent }) => {
	const locale = params.lang || "id";
	try {
		const layoutData = await parent();
		const data = await getProjectDetailData(params.slug, locale);
		if (!data?.project) return {
			project: null,
			relatedProjects: [],
			portfolioPage: data?.portfolioPage || null,
			navigation: layoutData.navigation,
			information: layoutData.information,
			locale
		};
		return {
			project: data.project,
			relatedProjects: data.relatedProjects || [],
			portfolioPage: data.portfolioPage,
			navigation: layoutData.navigation,
			information: layoutData.information,
			locale
		};
	} catch (error) {
		console.error("Error in project detail load:", error);
		return {
			project: null,
			relatedProjects: [],
			portfolioPage: null,
			navigation: null,
			information: null,
			locale
		};
	}
};
//#endregion
export { load, prerender };
