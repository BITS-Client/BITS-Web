import type { Locale } from '$lib/types';

/**
 * Resolves a path with the current locale prefix, handling various URL types
 * @param path - The path to resolve (can be absolute URL, mailto, hash, or relative path)
 * @param locale - The current locale ('en' | 'id')
 * @returns The resolved path with appropriate handling
 */
export function resolve(path: string | undefined, locale: Locale): string {
	if (!path) return '/';

	// Skip if it's an absolute URL, mailto, or hash
	if (
		path.startsWith('http://') ||
		path.startsWith('https://') ||
		path.startsWith('mailto:') ||
		path.startsWith('#')
	) {
		return path;
	}

	// Skip if already has locale prefix
	if (path.startsWith('/en') || path.startsWith('/id')) {
		return path;
	}

	// Add locale prefix to relative paths
	return `/${locale}${path}`;
}
