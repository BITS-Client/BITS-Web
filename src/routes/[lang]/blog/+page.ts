import { building } from '$app/environment';
import type { PageLoad } from './$types';
import { getBlogPageData } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

export const prerender = true;
export const load: PageLoad = async ({ params, parent, url }) => {
	const locale = (params.lang as Locale) || 'id';
	const activeCategory = building ? 'all' : url.searchParams.get('category') || 'all';
	const searchQuery = building ? '' : url.searchParams.get('q') || '';
	const page = building
		? 1
		: Math.max(1, Number.parseInt(url.searchParams.get('page') || '1', 10) || 1);

	try {
		const layoutData = await parent();
		const postsPerPage = layoutData.config?.listingPages?.postsPerPage || 12;
		const data = await getBlogPageData(locale, postsPerPage, page);

		return {
			locale,
			activeCategory,
			searchQuery,
			page,
			postsPerPage,
			totalPosts: data?.totalPosts || 0,
			blogPage: data?.blogPage || null,
			posts: data?.posts || [],
			allPosts: data?.allPosts || [],
			categories: data?.categories || [],
			information: layoutData.information,
			allTags: data?.allTags || [],
			config: layoutData.config
		};
	} catch (error) {
		console.error('Error in blog page load:', error);
		const layoutData = await parent();
		return {
			locale,
			activeCategory,
			searchQuery,
			page,
			postsPerPage: layoutData.config?.listingPages?.postsPerPage || 12,
			totalPosts: 0,
			blogPage: null,
			posts: [],
			allPosts: [],
			categories: [],
			information: layoutData.information,
			allTags: [],
			config: layoutData.config
		};
	}
};
