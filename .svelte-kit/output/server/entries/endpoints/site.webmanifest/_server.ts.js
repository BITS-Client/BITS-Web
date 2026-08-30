import { m as getInformationSettings } from "../../../chunks/queries.js";
import { c as seoConfig } from "../../../chunks/seo.js";
//#region src/routes/site.webmanifest/+server.ts
var prerender = true;
var GET = async () => {
	const info = await getInformationSettings("id");
	const logoUrl = info?.siteLogo?.asset?.url || "";
	const manifest = {
		name: info?.siteTitle || "Banten IT Solutions",
		short_name: "BITS",
		description: info?.siteDescription || seoConfig.defaultDescription,
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#ff3e00",
		orientation: "portrait-primary",
		icons: [{
			src: logoUrl,
			sizes: "192x192",
			type: "image/png",
			purpose: "any maskable"
		}, {
			src: logoUrl,
			sizes: "512x512",
			type: "image/png",
			purpose: "any maskable"
		}],
		categories: [
			"business",
			"technology",
			"productivity"
		],
		lang: "en"
	};
	return new Response(JSON.stringify(manifest), { headers: {
		"Content-Type": "application/manifest+json",
		"Cache-Control": "public, max-age=3600"
	} });
};
//#endregion
export { GET, prerender };
