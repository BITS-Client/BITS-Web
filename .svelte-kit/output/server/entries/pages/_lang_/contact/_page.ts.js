import { d as getContactPage } from "../../../../chunks/queries.js";
//#region src/routes/[lang]/contact/+page.ts
var prerender = true;
var load = async ({ params, parent }) => {
	const locale = params.lang || "id";
	try {
		const layoutData = await parent();
		const contactPage = await getContactPage(locale);
		const homeLabel = (layoutData ?? {}).navigation?.items?.find((item) => item.href === "/")?.label || "Home";
		return {
			contactPage,
			information: layoutData.information || null,
			homeLabel,
			locale
		};
	} catch {
		return {
			contactPage: null,
			information: (await parent()).information || null,
			homeLabel: "Home",
			locale
		};
	}
};
//#endregion
export { load, prerender };
