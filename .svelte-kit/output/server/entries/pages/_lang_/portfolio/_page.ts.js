import { t as building } from "../../../../chunks/internal2.js";
import { o as getPortfolioPageData } from "../../../../chunks/queries.js";
//#region src/routes/[lang]/portfolio/+page.ts
var prerender = true;
var load = async ({ params, parent, url }) => {
	const locale = params.lang || "id";
	const activeFilter = building ? "all" : url.searchParams.get("filter") || "all";
	const page = building ? 1 : Math.max(1, Number.parseInt(url.searchParams.get("page") || "1", 10) || 1);
	try {
		const layoutData = await parent();
		const projectsPerPage = layoutData.config?.listingPages?.projectsPerPage || 9;
		const data = await getPortfolioPageData(locale, projectsPerPage, page);
		const homeLabel = layoutData.navigation?.items?.find((item) => item.href === "/")?.label || "Home";
		return {
			locale,
			activeFilter,
			page,
			projectsPerPage,
			totalProjects: data?.totalProjects || 0,
			portfolioPage: data?.portfolioPage || null,
			projects: data?.projects || [],
			allProjects: data?.allProjects || [],
			categories: data?.categories || [],
			config: layoutData.config,
			homePageStats: data?.homePageStats || null,
			information: layoutData.information || null,
			navigation: layoutData.navigation || null,
			homeLabel
		};
	} catch (error) {
		console.error("Error in portfolio page load:", error);
		const layoutData = await parent();
		return {
			locale,
			activeFilter,
			page,
			projectsPerPage: layoutData.config?.listingPages?.projectsPerPage || 9,
			totalProjects: 0,
			portfolioPage: null,
			projects: [],
			allProjects: [],
			categories: [],
			config: layoutData.config || null,
			homePageStats: null,
			information: layoutData.information || null,
			navigation: layoutData.navigation || null,
			homeLabel: "Home"
		};
	}
};
//#endregion
export { load, prerender };
