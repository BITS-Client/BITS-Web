import { env } from '$env/dynamic/public';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

// Use dynamic env with fallbacks for build-time
const projectId = env.PUBLIC_SANITY_PROJECT_ID || 'j996ej4v';
const dataset = env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = env.PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
	perspective: 'published' // Only fetch published documents
});

// Image URL builder
const builder = createImageUrlBuilder(sanityClient);

/**
 * Generate image URLs with optional transformations
 * @param source - Sanity image source
 * @returns Image URL builder
 */
export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
