import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

// Environment variables — required, no hardcoded fallbacks
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
if (!projectId) {
	throw new Error('Missing VITE_SANITY_PROJECT_ID — set it in .env (local) or GitHub secrets (CI)');
}
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';
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
