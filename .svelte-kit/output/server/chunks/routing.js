//#region src/lib/utils/routing.ts
/**
* Utility functions for routing and URL handling
*/
/**
* Resolves a path with the current locale prefix
* @param path - The path to resolve
* @param locale - The locale to prefix the path with
* @returns The resolved path with locale prefix
*/
function resolvePath(path, locale) {
	if (!path) return "/";
	if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("#")) return path;
	if (path.startsWith("/en") || path.startsWith("/id")) return path;
	return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
/**
* Helper function to determine locale from URL
* @param pathname - The URL pathname to extract locale from
* @returns The detected locale ('en' or 'id')
*/
function getLocaleFromPath(pathname) {
	const pathSegments = pathname.split("/").filter(Boolean);
	return pathSegments[0] === "id" || pathSegments[0] === "en" ? pathSegments[0] : "id";
}
/**
* Helper function to get path without locale prefix
* @param pathname - The pathname to remove locale from
* @param locale - The locale to remove
* @returns The path without locale prefix
*/
function getPathWithoutLocale(pathname, locale) {
	const localePrefix = `/${locale}`;
	if (pathname.startsWith(localePrefix)) return pathname.substring(localePrefix.length) || "/";
	return pathname;
}
//#endregion
export { getPathWithoutLocale as n, resolvePath as r, getLocaleFromPath as t };
