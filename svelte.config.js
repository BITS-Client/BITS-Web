import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: false // Allow dynamic routes - they'll be handled by Cloudflare Functions
		}),
		alias: {
			$components: 'src/lib/components',
			$utils: 'src/lib/utils'
		},
		prerender: {
			entries: [
				'/',
				'/site.webmanifest',
				// Explicitly prerender legal and sitemap routes for both locales
				'/id/privacy',
				'/id/terms',
				'/id/sitemap.xml',
				'/en/privacy',
				'/en/terms',
				'/en/sitemap.xml'
			],
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing images during prerender - they'll be added later or served from CMS
				if (path.startsWith('/images/')) {
					console.warn(`Missing image: ${path} (referenced from ${referrer})`);
					return;
				}
				// Throw for other 404s
				throw new Error(message);
			},
			handleUnseenRoutes: async (path) => {
				// Prerender the root path if not seen during crawling
				if (path === '/') {
					return { prerender: true };
				}
				return { prerender: false };
			}
		}
	}
};

export default config;
