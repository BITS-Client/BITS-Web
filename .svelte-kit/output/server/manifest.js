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
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/13.js'))
		],
		remotes: {
			
		},
		routes: [
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
				id: "/[lang]/blog/[slug]",
				pattern: /^\/([^/]+?)\/blog\/([^/]+?)\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/[lang]/portfolio/[slug]",
				pattern: /^\/([^/]+?)\/portfolio\/([^/]+?)\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/[lang]/services/[slug]",
				pattern: /^\/([^/]+?)\/services\/([^/]+?)\/?$/,
				params: [{"name":"lang","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/","/__data.json","/site.webmanifest","/id/privacy","/id/terms","/id/sitemap.xml","/en/privacy","/en/terms","/en/sitemap.xml","/id","/id/services","/id/contact","/id/portfolio","/id/blog","/id/about","/en/services","/en/contact","/en/portfolio","/en/blog","/en/about","/en"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
