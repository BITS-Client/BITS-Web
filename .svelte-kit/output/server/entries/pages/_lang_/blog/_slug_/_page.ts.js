import { s as getPostDetailData } from "../../../../../chunks/queries.js";
//#region src/routes/[lang]/blog/[slug]/+page.ts
var prerender = false;
var load = async ({ params, parent }) => {
	const locale = params.lang || "id";
	try {
		const layoutData = await parent();
		const data = await getPostDetailData(params.slug, locale);
		if (!data?.post) return {
			post: null,
			relatedPosts: [],
			blogPage: data?.blogPage || null,
			information: layoutData.information,
			navigation: layoutData.navigation
		};
		return {
			post: data.post,
			relatedPosts: data.relatedPosts || [],
			blogPage: data.blogPage,
			information: layoutData.information,
			navigation: layoutData.navigation
		};
	} catch (error) {
		console.error("Error in post detail load:", error);
		return {
			post: null,
			relatedPosts: [],
			blogPage: null,
			information: null,
			navigation: null
		};
	}
};
//#endregion
export { load, prerender };
