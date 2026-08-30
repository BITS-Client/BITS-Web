import { a as PUBLIC_SANITY_PROJECT_ID } from "./public.js";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
//#region src/lib/sanity/client.ts
var projectId = PUBLIC_SANITY_PROJECT_ID;
if (!projectId) throw new Error("Missing PUBLIC_SANITY_PROJECT_ID — set it in .env (local) or GitHub variables (CI)");
var sanityClient = createClient({
	projectId,
	dataset: "production",
	apiVersion: "2024-01-01",
	useCdn: true,
	perspective: "published"
});
var builder = createImageUrlBuilder(sanityClient);
/**
* Generate image URLs with optional transformations
* @param source - Sanity image source
* @returns Image URL builder
*/
function urlFor(source) {
	return builder.image(source);
}
//#endregion
export { urlFor as n, sanityClient as t };
