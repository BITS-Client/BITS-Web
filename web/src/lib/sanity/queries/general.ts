import { sanityClient } from '../client';
import type { Locale } from '$lib/types';
import { sanityCache } from '$lib/utils/sanityCache';

function localizedField(parent: string, field: string, locale: Locale): string {
	const prefix = parent ? `${parent}.` : '';
	return `"${field}": ${prefix}${field}.${locale}`;
}

export async function getGeneralSettings(locale: Locale = 'id') {
	const cacheKey = sanityCache.getGlobalKey(locale, 'general');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = `*[_type == "generalSettings"][0] {
       ${localizedField('', 'newsletterTitle', locale)},
       ${localizedField('', 'newsletterSubtitle', locale)},
       ${localizedField('', 'newsletterButton', locale)},
       ${localizedField('', 'newsletterBadge', locale)},
       ${localizedField('', 'emailPlaceholder', locale)},
       ${localizedField('', 'subscribeSuccess', locale)},
       ${localizedField('', 'quickLinksTitle', locale)},
       ${localizedField('', 'servicesFooterTitle', locale)},
       ${localizedField('', 'locationTitle', locale)},
       ${localizedField('', 'connectWithUs', locale)},
       "socialLabels": {
         ${localizedField('socialLabels', 'email', locale)},
         ${localizedField('socialLabels', 'phone', locale)},
         ${localizedField('socialLabels', 'whatsapp', locale)},
         ${localizedField('socialLabels', 'maps', locale)},
         ${localizedField('socialLabels', 'github', locale)},
         ${localizedField('socialLabels', 'youtube', locale)},
         ${localizedField('socialLabels', 'instagram', locale)},
         ${localizedField('socialLabels', 'tiktok', locale)}
       },
       ${localizedField('', 'craftedWith', locale)},
       ${localizedField('', 'inIndonesia', locale)},
       ${localizedField('', 'privacyPolicy', locale)},
       ${localizedField('', 'termsOfService', locale)},
       ${localizedField('', 'skipToContent', locale)},
       ${localizedField('', 'closeMenu', locale)},
       ${localizedField('', 'openMenu', locale)}
     }`;

		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching general settings for locale ${locale}:`, error);
		return null;
	}
}
