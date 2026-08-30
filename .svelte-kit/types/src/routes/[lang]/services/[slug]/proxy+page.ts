// @ts-nocheck
import type { PageLoad } from './$types';
import { getServiceDetailData } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

export const prerender = false;
export const load = async ({ params, parent }: Parameters<PageLoad>[0]) => {
	const locale = (params.lang as Locale) || 'id';
	const slug = params.slug;

	try {
		const layoutData = await parent();
		const data = await getServiceDetailData(slug, locale);

		if (!data?.service) {
			return {
				service: null,
				servicesPage: data?.servicesPage || null,
				navigation: layoutData.navigation,
				locale
			};
		}

		return {
			service: data.service,
			servicesPage: data.servicesPage || null,
			navigation: layoutData.navigation,
			locale
		};
	} catch (error) {
		console.error('Error in service detail load:', error);
		return {
			service: null,
			servicesPage: null,
			navigation: null,
			locale
		};
	}
};
