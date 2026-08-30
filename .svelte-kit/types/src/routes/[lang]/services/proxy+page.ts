// @ts-nocheck
import type { PageLoad } from './$types';
import { getServicesPageDetailedData } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

export const prerender = true;
export const load = async ({ params, url, parent }: Parameters<PageLoad>[0]) => {
	const locale = (params.lang as Locale) || 'id';

	const layoutData = await parent();
	const siteUrl = layoutData.information?.siteURL || 'https://bits.co.id';

	const pathWithoutLocale = url.pathname.replace(`/${params.lang}`, '');

	try {
		const config = layoutData.config;
		const servicesPerPage = config?.listingPages?.servicesPerPage || 9;

		const data = await getServicesPageDetailedData(locale, servicesPerPage);

		return {
			locale,
			servicesPage: data?.servicesPage || null,
			services: data?.services || [],
			config,
			alternateLocales: [
				{ lang: 'id', url: `${siteUrl}/id${pathWithoutLocale}` },
				{ lang: 'en', url: `${siteUrl}/en${pathWithoutLocale}` }
			]
		};
	} catch (error) {
		console.error('Error in services page load:', error);
		return {
			locale,
			servicesPage: null,
			services: [],
			config: layoutData.config || null,
			alternateLocales: [
				{ lang: 'id', url: `${siteUrl}/id${pathWithoutLocale}` },
				{ lang: 'en', url: `${siteUrl}/en${pathWithoutLocale}` }
			]
		};
	}
};
