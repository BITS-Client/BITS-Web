import { redirect } from "@sveltejs/kit";
//#region src/routes/blog/+page.server.ts
var load = () => {
	return redirect(307, "/id/blog");
};
//#endregion
export { load };
