import { n as getAboutPageData } from "../../../../chunks/queries.js";
//#region src/routes/[lang]/about/+page.ts
var prerender = true;
var load = async ({ params, parent }) => {
	const locale = params.lang || "id";
	try {
		const layoutData = await parent();
		const data = await getAboutPageData(locale);
		return {
			aboutPage: data?.aboutPage ?? null,
			teamMembers: data?.teamMembers ?? [],
			information: layoutData.information ?? null,
			navigation: layoutData.navigation ?? null,
			locale
		};
	} catch (error) {
		console.error("Error in about page load:", error);
		const layoutData = await parent();
		return {
			aboutPage: null,
			teamMembers: [],
			information: layoutData.information ?? null,
			navigation: layoutData.navigation ?? null,
			locale
		};
	}
};
//#endregion
export { load, prerender };
