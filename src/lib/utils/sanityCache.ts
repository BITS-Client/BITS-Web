// Cache for Sanity data to prevent duplicate requests
// This helps avoid duplicate requests during SSR and client-side navigation

interface SanityCache {
	[key: string]: unknown;
}

class SanityDataCache {
	private cache: SanityCache = {};
	private timers: { [key: string]: NodeJS.Timeout } = {};

	// Set data in cache with optional TTL (time to live)
	set(key: string, data: unknown, ttl: number = 300000): void {
		// Default 5 minutes
		// Clear any existing timer for this key
		if (this.timers[key]) {
			clearTimeout(this.timers[key]);
		}

		// Set the data
		this.cache[key] = data;

		// Set expiration timer if TTL is provided
		if (ttl > 0) {
			this.timers[key] = setTimeout(() => {
				this.delete(key);
			}, ttl);
		}
	}

	// Get data from cache
	get(key: string): unknown | null {
		return this.cache[key] || null;
	}

	// Check if key exists in cache
	has(key: string): boolean {
		return key in this.cache;
	}

	// Delete specific key from cache
	delete(key: string): void {
		delete this.cache[key];
		if (this.timers[key]) {
			clearTimeout(this.timers[key]);
			delete this.timers[key];
		}
	}

	// Clear entire cache
	clear(): void {
		Object.keys(this.timers).forEach((key) => clearTimeout(this.timers[key]));
		this.cache = {};
		this.timers = {};
	}

	// Get cache key for global data
	getGlobalKey(locale: string, dataType: string): string {
		return `global_${dataType}_${locale}`;
	}

	// Get cache key for page data
	getPageKey(locale: string, pageType: string, slug?: string): string {
		return `page_${pageType}_${locale}${slug ? `_${slug}` : ''}`;
	}
}

export const sanityCache = new SanityDataCache();
