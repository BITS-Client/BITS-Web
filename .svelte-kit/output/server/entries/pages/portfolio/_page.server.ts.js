import { redirect } from "@sveltejs/kit";
//#region src/routes/portfolio/+page.server.ts
var load = () => {
	return redirect(307, "/id/portfolio");
};
//#endregion
export { load };
