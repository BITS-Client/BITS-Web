import { f as getPrivacyPage } from "../../../../chunks/queries.js";
//#region src/routes/[lang]/privacy/+page.ts
var prerender = true;
var load = async ({ params }) => {
	const locale = params.lang || "id";
	try {
		return {
			locale,
			privacyPage: await getPrivacyPage(locale)
		};
	} catch {
		return {
			locale,
			privacyPage: null
		};
	}
};
//#endregion
export { load, prerender };
