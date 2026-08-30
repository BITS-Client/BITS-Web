// @ts-nocheck
import type { PageLoad } from './$types';
import { getProjectDetailData } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

export const prerender = false;
export const load = async ({ params, parent }: Parameters<PageLoad>[0]) => {
	const locale = (params.lang as Locale) || 'id';

	try {
		const layoutData = await parent();
		const data = await getProjectDetailData(params.slug, locale);

		if (!data?.project) {
			return {
				project: null,
				relatedProjects: [],
				portfolioPage: data?.portfolioPage || null,
				navigation: layoutData.navigation,
				information: layoutData.information,
				locale
			};
		}

		return {
			project: data.project,
			relatedProjects: data.relatedProjects || [],
			portfolioPage: data.portfolioPage,
			navigation: layoutData.navigation,
			information: layoutData.information,
			locale
		};
	} catch (error) {
		console.error('Error in project detail load:', error);
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
