import type { PageLoad } from './$types';
import { getContactPage } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

export const prerender = true;
export const load: PageLoad = async ({ params, parent }) => {
	const locale = (params.lang as Locale) || 'id';

	try {
		const layoutData = await parent();
		const contactPage = await getContactPage(locale);

		const navData = layoutData ?? {};
		const homeLabel =
			navData.navigation?.items?.find((item: { href: string; label?: string }) => item.href === '/')
				?.label || 'Home';

		return {
			contactPage,
			information: layoutData.information || null,
			homeLabel,
			locale
		};
	} catch {
		const layoutData = await parent();
		return {
			contactPage: null,
			information: layoutData.information || null,
			homeLabel: 'Home',
			locale
		};
	}
};
