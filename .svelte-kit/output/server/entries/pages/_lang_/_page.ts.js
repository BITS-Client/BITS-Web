import { a as getHomePageData } from "../../../chunks/queries.js";
import { error } from "@sveltejs/kit";
//#region src/routes/[lang]/+page.ts
var prerender = true;
var load = async ({ params, parent }) => {
	const locale = params.lang;
	if (locale !== "id" && locale !== "en") error(404, {
		message: "Not found",
		status: 404
	});
	try {
		const config = (await parent()).config;
		const projectsLimit = config?.homepage?.featuredProjects ?? 4;
		const postsLimit = config?.homepage?.latestPosts ?? 4;
		const data = await getHomePageData(locale, projectsLimit, postsLimit);
		return {
			locale,
			homePage: data?.homePage || null,
			projects: data?.projects || [],
			testimonials: data?.testimonials || [],
			posts: data?.posts || [],
			config
		};
	} catch (error) {
		console.error("Error in homepage load:", error);
		return {
			locale,
			homePage: null,
			projects: [],
			testimonials: [],
			posts: [],
			config: (await parent()).config || null
		};
	}
};
//#endregion
export { load, prerender };
