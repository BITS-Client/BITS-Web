import { json } from "@sveltejs/kit";
import { z } from "zod";
//#region src/routes/api/contact/+server.ts
var prerender = false;
z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(100),
	email: z.string().email("Invalid email address"),
	phone: z.string().optional(),
	inquiryType: z.enum([
		"Software",
		"Hardware",
		"Infrastructure",
		"Cloud",
		"Design",
		"Printing",
		"Consultation",
		"Web Design",
		"ERP",
		"AI"
	]),
	message: z.string().min(1, "Message is required").max(2e3),
	quantity: z.number().optional(),
	timeline: z.string().optional(),
	budget: z.string().optional(),
	projectType: z.string().optional(),
	consultationTopic: z.string().optional(),
	hardwareType: z.string().optional(),
	turnstile_token: z.string().min(1, "Turnstile verification required")
});
var POST = async ({ request, getClientAddress }) => {
	try {
		console.error("Missing TURNSTILE_SECRET_KEY environment variable");
		return json({
			success: false,
			message: "Server configuration error: Missing Turnstile secret key"
		}, {
			status: 500,
			headers: {
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
				"X-XSS-Protection": "1; mode=block"
			}
		});
	} catch (error) {
		console.error("Contact form error:", error);
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
