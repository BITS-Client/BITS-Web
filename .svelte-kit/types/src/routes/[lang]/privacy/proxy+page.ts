// @ts-nocheck
import type { PageLoad } from './$types';
import { getPrivacyPage } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

export const prerender = true;
export const load = async ({ params }: Parameters<PageLoad>[0]) => {
	const locale = (params.lang as Locale) || 'id';

	try {
		const privacyPage = await getPrivacyPage(locale);
		return {
			locale,
			privacyPage
		};
	} catch {
		return {
			locale,
			privacyPage: null
		};
	}
};
