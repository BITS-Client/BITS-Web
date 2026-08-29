import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

// This is a server-only route, not prerenderable
export const prerender = false;

// Newsletter subscription validation schema
const newsletterSchema = z.object({
	email: z.string().email('Invalid email address')
});

// Rate limiting store (in-memory for development)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Check rate limit (5 requests per IP per minute)
function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const record = rateLimitStore.get(ip);

	if (!record || now > record.resetAt) {
		rateLimitStore.set(ip, { count: 1, resetAt: now + 60000 });
		return true;
	}

	if (record.count >= 5) {
		return false;
	}

	record.count++;
	return true;
}

// Format email content for newsletter subscription notification
function formatEmailContent(email: string): string {
	return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<style>
		body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
		.container { max-width: 600px; margin: 0 auto; padding: 20px; }
		.header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
		.content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
		.field { margin-bottom: 15px; }
		.label { font-weight: bold; color: #374151; }
		.value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; }
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>New Newsletter Subscription</h1>
		</div>
		<div class="content">
			<div class="field">
				<div class="label">Email:</div>
				<div class="value">${email}</div>
			</div>
			<div class="field">
				<div class="label">Date:</div>
				<div class="value">${new Date().toISOString()}</div>
			</div>
		</div>
	</div>
</body>
</html>
	`.trim();
}

// Send email via Resend API
async function sendNotificationEmail(
	email: string,
	resendApiKey: string,
	adminEmail: string,
	fromEmail: string
): Promise<boolean> {
	try {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${resendApiKey}`
			},
			body: JSON.stringify({
				from: fromEmail,
				to: [adminEmail],
				reply_to: email,
				subject: `New Newsletter Subscription from ${email}`,
				html: formatEmailContent(email)
			})
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Resend API error:', errorData);
			return false;
		}

		return true;
	} catch (error) {
		console.error('Email sending error:', error);
		return false;
	}
}

// Format welcome email content for new subscribers
function formatWelcomeEmailContent(): string {
	return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<style>
		body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
		.container { max-width: 600px; margin: 0 auto; padding: 20px; }
		.header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
		.content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
		.thanks { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
		.message { margin-bottom: 15px; }
		.signature { margin-top: 20px; }
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>Welcome to Our Newsletter!</h1>
		</div>
		<div class="content">
			<div class="thanks">Thank you for subscribing!</div>
			<div class="message">
				<p>You've successfully subscribed to our newsletter. You'll now receive updates about our latest services, industry insights, and company news.</p>
				<p>We're excited to have you as part of our community!</p>
			</div>
			<div class="signature">
				<p>Best regards,<br>The Banten IT Solutions Team</p>
			</div>
		</div>
	</div>
</body>
</html>
	`.trim();
}

// Send welcome email to subscriber
async function sendWelcomeEmail(
	email: string,
	resendApiKey: string,
	fromEmail: string
): Promise<boolean> {
	try {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${resendApiKey}`
			},
			body: JSON.stringify({
				from: fromEmail,
				to: [email],
				subject: 'Welcome to Banten IT Solutions Newsletter!',
				html: formatWelcomeEmailContent()
			})
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Resend API error for welcome email:', errorData);
			return false;
		}

		return true;
	} catch (error) {
		console.error('Welcome email sending error:', error);
		return false;
	}
}

// POST handler
export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		// Get environment variables (server-side only, no VITE_ prefix)
		const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
		const ADMIN_EMAIL = import.meta.env.ADMIN_EMAIL;
		const NEWSLETTER_FROM_EMAIL = import.meta.env.NEWSLETTER_FROM_EMAIL;

		if (!RESEND_API_KEY || !ADMIN_EMAIL || !NEWSLETTER_FROM_EMAIL) {
			console.error('Missing required environment variables');
			return json(
				{
					success: false,
					message: 'Server configuration error: Missing required environment variables'
				},
				{
					status: 500,
					headers: {
						'X-Content-Type-Options': 'nosniff',
						'X-Frame-Options': 'DENY',
						'X-XSS-Protection': '1; mode=block'
					}
				}
			);
		}

		// Get client IP for rate limiting
		const ip = getClientAddress();

		// Check rate limit
		if (!checkRateLimit(ip)) {
			return json(
				{
					success: false,
					message: 'Too many requests. Please try again later.'
				},
				{
					status: 429,
					headers: {
						'X-Content-Type-Options': 'nosniff',
						'X-Frame-Options': 'DENY',
						'X-XSS-Protection': '1; mode=block'
					}
				}
			);
		}

		// Parse and validate request body
		const body = await request.json();
		const validationResult = newsletterSchema.safeParse(body);

		if (!validationResult.success) {
			return json(
				{
					success: false,
					message: 'Validation failed',
					errors: validationResult.error.issues.map((err) => ({
						field: err.path.join('.'),
						message: err.message
					}))
				},
				{
					status: 400,
					headers: {
						'X-Content-Type-Options': 'nosniff',
						'X-Frame-Options': 'DENY',
						'X-XSS-Protection': '1; mode=block'
					}
				}
			);
		}

		const { email } = validationResult.data;

		// Send notification email to admin
		const notificationSent = await sendNotificationEmail(
			email,
			RESEND_API_KEY,
			ADMIN_EMAIL,
			NEWSLETTER_FROM_EMAIL
		);

		// Send welcome email to subscriber
		const welcomeSent = await sendWelcomeEmail(email, RESEND_API_KEY, NEWSLETTER_FROM_EMAIL);

		// If either email failed, log the error but still confirm subscription
		if (!notificationSent) {
			console.error('Failed to send notification email to admin');
		}

		if (!welcomeSent) {
			console.error('Failed to send welcome email to subscriber');
		}

		// Success response
		return json(
			{
				success: true,
				message: 'Thank you for subscribing to our newsletter!'
			},
			{
				status: 200,
				headers: {
					'X-Content-Type-Options': 'nosniff',
					'X-Frame-Options': 'DENY',
					'X-XSS-Protection': '1; mode=block'
				}
			}
		);
	} catch (error) {
		console.error('Newsletter subscription error:', error);
		return json(
			{
				success: false,
				message: 'An unexpected error occurred. Please try again later.'
			},
			{
				status: 500,
				headers: {
					'X-Content-Type-Options': 'nosniff',
					'X-Frame-Options': 'DENY',
					'X-XSS-Protection': '1; mode=block'
				}
			}
		);
	}
};
