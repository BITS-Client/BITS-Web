import { json } from "@sveltejs/kit";
import { z } from "zod";
//#region src/routes/api/newsletter/+server.ts
var prerender = false;
z.object({ email: z.string().email("Invalid email address") });
var POST = async ({ request, getClientAddress }) => {
	try {
		console.error("Missing required environment variables");
		return json({
			success: false,
			message: "Server configuration error: Missing required environment variables"
		}, {
			status: 500,
			headers: {
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
				"X-XSS-Protection": "1; mode=block"
			}
		});
	} catch (error) {
		console.error("Newsletter subscription error:", error);
		return json({
			success: false,
			message: "An unexpected error occurred. Please try again later."
		}, {
			status: 500,
			headers: {
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
				"X-XSS-Protection": "1; mode=block"
			}
		});
	}
};
//#endregion
export { POST, prerender };
