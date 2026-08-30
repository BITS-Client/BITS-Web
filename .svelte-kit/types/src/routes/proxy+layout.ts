// @ts-nocheck
import type { LayoutLoad } from './$types';
import { getGlobalLayoutData } from '$lib/sanity/queries';
import { getLocaleFromPath, getPathWithoutLocale } from '$lib/utils/routing';

export const prerender = true;
export const ssr = true;

export const load = async ({ url }: Parameters<LayoutLoad>[0]) => {
	const locale = getLocaleFromPath(url.pathname);
	const pathWithoutLocale = getPathWithoutLocale(url.pathname, locale);

	// Build the base URL from the current request
	const currentBaseUrl = `${url.protocol}//${url.host}`;

	try {
		const data = await getGlobalLayoutData(locale);

		const { information, navigation, general, clients, services, config, servicesPage } =
			data || {};

		// Use the current request's base URL, fallback to information.siteURL if available
		const siteUrl = information?.siteURL || currentBaseUrl;

		return {
			information: information || null,
			navigation: navigation || null,
			general: general || null,
			clients: clients || [],
			services: services || [],
			config: config || null,
			servicesPage: servicesPage || null,
			locale,
			canonical: `${siteUrl}/${locale}${pathWithoutLocale}`,
			alternateLocales: [
				{ lang: 'id', url: `${siteUrl}/id${pathWithoutLocale}` },
				{ lang: 'en', url: `${siteUrl}/en${pathWithoutLocale}` }
			]
		};
	} catch (error) {
		console.error('Error loading layout data:', error);

		// Use the current request's base URL as fallback in error case
		return {
			information: null,
			navigation: null,
			general: null,
			clients: [],
			services: [],
			config: null,
			servicesPage: null,
			locale,
			canonical: `${currentBaseUrl}/${locale}${pathWithoutLocale}`,
			alternateLocales: [
				{ lang: 'id', url: `${currentBaseUrl}/id${pathWithoutLocale}` },
				{ lang: 'en', url: `${currentBaseUrl}/en${pathWithoutLocale}` }
			]
		};
	}
};
