export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apple-touch-icon.png","critical.css","favicon.svg","robots.txt","shared.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.Pufetg_5.js",app:"_app/immutable/entry/app.jkqRO_rQ.js",imports:["_app/immutable/entry/start.Pufetg_5.js","_app/immutable/chunks/CWQPMW3W.js","_app/immutable/chunks/B46eZZnu.js","_app/immutable/entry/app.jkqRO_rQ.js","_app/immutable/chunks/B46eZZnu.js","_app/immutable/chunks/HclGiUj8.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/contact",
				pattern: /^\/api\/contact\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/contact/_server.ts.js'))
			},
			{
				id: "/api/newsletter",
				pattern: /^\/api\/newsletter\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/newsletter/_server.ts.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/portfolio",
				pattern: /^\/portfolio\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/site.webmanifest",
				pattern: /^\/site\.webmanifest\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/site.webmanifest/_server.ts.js'))
			},
			{
				id: "/[lang]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/[lang]/about",
				pattern: /^\/([^/]+?)\/about\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[lang]/blog",
				pattern: /^\/([^/]+?)\/blog\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/[lang]/blog/[slug]",
				pattern: /^\/([^/]+?)\/blog\/([^/]+?)\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/[lang]/contact",
				pattern: /^\/([^/]+?)\/contact\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/[lang]/portfolio",
				pattern: /^\/([^/]+?)\/portfolio\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/[lang]/portfolio/[slug]",
				pattern: /^\/([^/]+?)\/portfolio\/([^/]+?)\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/[lang]/privacy",
				pattern: /^\/([^/]+?)\/privacy\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/[lang]/services",
				pattern: /^\/([^/]+?)\/services\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/[lang]/services/[slug]",
				pattern: /^\/([^/]+?)\/services\/([^/]+?)\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/[lang]/sitemap.xml",
				pattern: /^\/([^/]+?)\/sitemap\.xml\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/_lang_/sitemap.xml/_server.ts.js'))
			},
			{
				id: "/[lang]/terms",
				pattern: /^\/([^/]+?)\/terms\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 14 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
