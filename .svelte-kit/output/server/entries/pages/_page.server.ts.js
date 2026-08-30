import { redirect } from "@sveltejs/kit";
//#region src/routes/+page.server.ts
var load = () => {
	return redirect(307, "/id");
};
//#endregion
export { load };
