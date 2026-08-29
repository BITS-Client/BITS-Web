import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getHomePageData } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

export const prerender = true;
export const load: PageLoad = async ({ params, parent }) => {
	const locale = params.lang as Locale;

	// Validate locale
	if (locale !== 'id' && locale !== 'en') {
		error(404, { message: 'Not found', status: 404 });
	}

	try {
		// Get config from layout data using parent()
		const layoutData = await parent();
		const config = layoutData.config;

		// Handle case where config is null by using default values
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
		console.error('Error in homepage load:', error);
		const layoutData = await parent();
		return {
			locale,
			homePage: null,
			projects: [],
			testimonials: [],
			posts: [],
			config: layoutData.config || null
		};
	}
};
