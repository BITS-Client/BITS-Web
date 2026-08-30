/**
 * Utility functions for routing and URL handling
 */

/**
 * Resolves a path with the current locale prefix
 * @param path - The path to resolve
 * @param locale - The locale to prefix the path with
 * @returns The resolved path with locale prefix
 */
export function resolvePath(path: string, locale: string): string {
	// If no path is provided, return root
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

	// Ensure path starts with a slash
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;

	// Return the path with locale prefix
	return `/${locale}${normalizedPath}`;
}

/**
 * Removes the locale prefix from a path
 * @param path - The path to remove locale from
 * @param locale - The locale to remove
 * @returns The path without locale prefix
 */
export function removeLocalePrefix(path: string, locale: string): string {
	const localePrefix = `/${locale}`;
	if (path.startsWith(localePrefix)) {
		const newPath = path.substring(localePrefix.length);
		return newPath || '/';
	}
	return path;
}

/**
 * Helper function to determine locale from URL
 * @param pathname - The URL pathname to extract locale from
 * @returns The detected locale ('en' or 'id')
 */
export function getLocaleFromPath(pathname: string): 'en' | 'id' {
	const pathSegments = pathname.split('/').filter(Boolean);
	return (pathSegments[0] === 'id' || pathSegments[0] === 'en' ? pathSegments[0] : 'id') as
		'en' | 'id';
}

/**
 * Helper function to get path without locale prefix
 * @param pathname - The pathname to remove locale from
 * @param locale - The locale to remove
 * @returns The path without locale prefix
 */
export function getPathWithoutLocale(pathname: string, locale: 'en' | 'id'): string {
	const localePrefix = `/${locale}`;
	if (pathname.startsWith(localePrefix)) {
		const newPath = pathname.substring(localePrefix.length);
		return newPath || '/';
	}
	return pathname;
}
