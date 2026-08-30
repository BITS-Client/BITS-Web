import { sanityClient } from '../client';
import type { Locale } from '$lib/types';
import { sanityCache } from '$lib/utils/sanityCache';

export async function getMenuSettings(locale: Locale = 'id') {
	const cacheKey = sanityCache.getGlobalKey(locale, 'menu');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = `*[_type == "menuSettings"][0] {
      "items": navigation | order(order asc){href, "label": label.${locale}, isService, order}
    }`;

		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching menu settings for locale ${locale}:`, error);
		return null;
	}
}
