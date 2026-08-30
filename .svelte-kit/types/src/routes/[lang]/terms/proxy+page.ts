// @ts-nocheck
import type { PageLoad } from './$types';
import { getTermsPage } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

export const prerender = true;
export const load = async ({ params }: Parameters<PageLoad>[0]) => {
	const locale = (params.lang as Locale) || 'id';

	try {
		const termsPage = await getTermsPage(locale);
		return { locale, termsPage };
	} catch {
		return { locale, termsPage: null };
	}
};
