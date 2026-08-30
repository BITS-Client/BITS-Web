import { p as getTermsPage } from "../../../../chunks/queries.js";
//#region src/routes/[lang]/terms/+page.ts
var prerender = true;
var load = async ({ params }) => {
	const locale = params.lang || "id";
	try {
		return {
			locale,
			termsPage: await getTermsPage(locale)
		};
	} catch {
		return {
			locale,
			termsPage: null
		};
	}
};
//#endregion
export { load, prerender };
