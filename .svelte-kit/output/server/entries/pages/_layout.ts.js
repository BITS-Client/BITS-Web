import { i as getGlobalLayoutData } from "../../chunks/queries.js";
import { n as getPathWithoutLocale, t as getLocaleFromPath } from "../../chunks/routing.js";
//#region src/routes/+layout.ts
var prerender = true;
var ssr = true;
var load = async ({ url }) => {
	const locale = getLocaleFromPath(url.pathname);
	const pathWithoutLocale = getPathWithoutLocale(url.pathname, locale);
	const currentBaseUrl = `${url.protocol}//${url.host}`;
	try {
		const { information, navigation, general, clients, services, config, servicesPage } = await getGlobalLayoutData(locale) || {};
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
			alternateLocales: [{
				lang: "id",
				url: `${siteUrl}/id${pathWithoutLocale}`
			}, {
				lang: "en",
				url: `${siteUrl}/en${pathWithoutLocale}`
			}]
		};
	} catch (error) {
		console.error("Error loading layout data:", error);
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
			alternateLocales: [{
				lang: "id",
				url: `${currentBaseUrl}/id${pathWithoutLocale}`
			}, {
				lang: "en",
				url: `${currentBaseUrl}/en${pathWithoutLocale}`
			}]
		};
	}
};
//#endregion
export { load, prerender, ssr };
