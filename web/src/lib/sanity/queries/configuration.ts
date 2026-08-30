import { sanityClient } from '../client';
import { sanityCache } from '$lib/utils/sanityCache';

export async function getConfiguration() {
	const cacheKey = 'global_configuration';

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = `*[_type == "configuration"][0] {
		"homepage": {
			"featuredServices": homepage.featuredServices,
			"featuredProjects": homepage.featuredProjects,
			"latestPosts": homepage.latestPosts,
			"teamMembers": homepage.teamMembers
		},
		"listingPages": {
			"servicesPerPage": listingPages.servicesPerPage,
			"projectsPerPage": listingPages.projectsPerPage,
			"postsPerPage": listingPages.postsPerPage
		}
	}`;

		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error('Error fetching configuration:', error);
		return null;
	}
}
