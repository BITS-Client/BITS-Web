import type { PageLoad } from './$types';
import { getPostDetailData } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

export const prerender = false; // Dynamic routes with [slug] should not be prerendered
export const load: PageLoad = async ({ params, parent }) => {
	const locale = (params.lang as Locale) || 'id';

	try {
		const layoutData = await parent();
		const data = await getPostDetailData(params.slug, locale);

		if (!data?.post) {
			return {
				post: null,
				relatedPosts: [],
				blogPage: data?.blogPage || null,
				information: layoutData.information,
				navigation: layoutData.navigation
			};
		}

		return {
			post: data.post,
			relatedPosts: data.relatedPosts || [],
			blogPage: data.blogPage,
			information: layoutData.information,
			navigation: layoutData.navigation
		};
	} catch (error) {
		console.error('Error in post detail load:', error);
		return {
			post: null,
			relatedPosts: [],
			blogPage: null,
			information: null,
			navigation: null
		};
	}
};
