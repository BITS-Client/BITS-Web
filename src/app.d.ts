// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			status: number;
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface LayoutData {
			information: {
				siteTitle?: string;
				siteDescription?: string;
				siteTagline?: string;
				siteIcon?: { asset: { url: string }; alt?: string };
				siteLogo?: { asset: { url: string }; alt?: string };
				siteURL?: string;
				siteEmail?: string;
				siteTelp?: string;
				siteWhatsApp?: string;
				siteAddress?: string;
				googleMaps?: string;
				instagram?: string;
				tiktok?: string;
				youtube?: string;
				github?: string;
			} | null;
			navigation: {
				items?: { href: string; label?: string; isService?: boolean; order?: number }[];
			} | null;
			general: unknown;
			clients: unknown[];
			services: unknown[];
			servicesPage: unknown;
			config: {
				homepage?: {
					featuredServices?: number;
					featuredProjects?: number;
					latestPosts?: number;
				};
				listingPages?: {
					servicesPerPage?: number;
					projectsPerPage?: number;
					postsPerPage?: number;
				};
			} | null;
			locale: 'en' | 'id';
			canonical: string;
			alternateLocales: { lang: string; url: string }[];
		}
	}

	interface TurnstileOptions {
		sitekey: string;
		theme?: 'light' | 'dark' | 'auto';
		size?: 'normal' | 'compact';
		callback?: (token: string) => void;
		'error-callback'?: (error?: string) => void;
		'expired-callback'?: () => void;
	}

	interface Turnstile {
		render: (container: HTMLElement, options: TurnstileOptions) => string;
		reset: (widgetId: string) => void;
		remove: (widgetId: string) => void;
		getResponse: (widgetId: string) => string | undefined;
	}

	interface Window {
		turnstile?: Turnstile;
	}
}

export {};
