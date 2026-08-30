import { sanityClient } from '../client';
import type { Locale } from '$lib/types';
import { sanityCache } from '$lib/utils/sanityCache';

export async function getInformationSettings(locale: Locale = 'id') {
	const cacheKey = sanityCache.getGlobalKey(locale, 'information');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = `*[_type == "informationSettings"][0] {
      "siteTitle": siteTitle,
      "siteDescription": siteDescription.${locale},
      "siteTagline": siteTagline,
      "siteIcon": siteIcon { asset->{url}, alt },
      "siteLogo": siteLogo { asset->{url}, alt },
      "siteURL": siteURL,
      "siteEmail": siteEmail,
      "siteTelp": siteTelp,
      "siteWhatsApp": siteWhatsApp,
      "siteAddress": siteAddress,
      "googleMaps": googleMaps,
      "instagram": instagram,
      "tiktok": tiktok,
      "youtube": youtube,
      "github": github
    }`;

		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching information settings for locale ${locale}:`, error);
		return null;
	}
}
