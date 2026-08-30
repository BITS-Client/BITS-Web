import {
	PUBLIC_SANITY_API_VERSION,
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_PROJECT_ID
} from '$env/static/public';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

// Environment variables — required, no hardcoded fallbacks
const projectId = PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
	throw new Error(
		'Missing PUBLIC_SANITY_PROJECT_ID — set it in .env (local) or GitHub variables (CI)'
	);
}
const dataset = PUBLIC_SANITY_DATASET || 'production';
const apiVersion = PUBLIC_SANITY_API_VERSION || '2024-01-01';
const useCdn = !import.meta.env.DEV;

// Create the Sanity client
export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn,
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
