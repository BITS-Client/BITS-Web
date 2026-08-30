
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/contact" | "/api/newsletter" | "/blog" | "/portfolio" | "/site.webmanifest" | "/[lang]" | "/[lang]/about" | "/[lang]/blog" | "/[lang]/blog/[slug]" | "/[lang]/contact" | "/[lang]/portfolio" | "/[lang]/portfolio/[slug]" | "/[lang]/privacy" | "/[lang]/services" | "/[lang]/services/[slug]" | "/[lang]/sitemap.xml" | "/[lang]/terms";
		RouteParams(): {
			"/[lang]": { lang: string };
			"/[lang]/about": { lang: string };
			"/[lang]/blog": { lang: string };
			"/[lang]/blog/[slug]": { lang: string; slug: string };
			"/[lang]/contact": { lang: string };
			"/[lang]/portfolio": { lang: string };
			"/[lang]/portfolio/[slug]": { lang: string; slug: string };
			"/[lang]/privacy": { lang: string };
			"/[lang]/services": { lang: string };
			"/[lang]/services/[slug]": { lang: string; slug: string };
			"/[lang]/sitemap.xml": { lang: string };
			"/[lang]/terms": { lang: string }
		};
		LayoutParams(): {
			"/": { lang?: string | undefined; slug?: string | undefined };
			"/api": Record<string, never>;
			"/api/contact": Record<string, never>;
			"/api/newsletter": Record<string, never>;
			"/blog": Record<string, never>;
			"/portfolio": Record<string, never>;
			"/site.webmanifest": Record<string, never>;
			"/[lang]": { lang: string; slug?: string | undefined };
			"/[lang]/about": { lang: string };
			"/[lang]/blog": { lang: string; slug?: string | undefined };
			"/[lang]/blog/[slug]": { lang: string; slug: string };
			"/[lang]/contact": { lang: string };
			"/[lang]/portfolio": { lang: string; slug?: string | undefined };
			"/[lang]/portfolio/[slug]": { lang: string; slug: string };
			"/[lang]/privacy": { lang: string };
			"/[lang]/services": { lang: string; slug?: string | undefined };
			"/[lang]/services/[slug]": { lang: string; slug: string };
			"/[lang]/sitemap.xml": { lang: string };
			"/[lang]/terms": { lang: string }
		};
		Pathname(): "/" | "/api/contact" | "/api/newsletter" | "/blog" | "/portfolio" | "/site.webmanifest" | `/${string}` & {} | `/${string}/about` & {} | `/${string}/blog` & {} | `/${string}/blog/${string}` & {} | `/${string}/contact` & {} | `/${string}/portfolio` & {} | `/${string}/portfolio/${string}` & {} | `/${string}/privacy` & {} | `/${string}/services` & {} | `/${string}/services/${string}` & {} | `/${string}/sitemap.xml` & {} | `/${string}/terms` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/apple-touch-icon.png" | "/critical.css" | "/favicon.svg" | "/robots.txt" | "/shared.css" | string & {};
	}
}