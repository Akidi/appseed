import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * CSP violation reporting endpoint
 * Receives and logs Content Security Policy violations
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const report = await request.json();

		// Log CSP violation for monitoring
		console.warn('CSP Violation Report:', JSON.stringify(report, null, 2));

		// In production, you might want to:
		// - Send to logging service (e.g., Sentry, LogRocket)
		// - Store in database for analysis
		// - Alert on critical violations
		// - Track violation trends

		return json({ received: true }, { status: 204 });
	} catch (error) {
		console.error('Error processing CSP report:', error);
		return json({ error: 'Invalid report' }, { status: 400 });
	}
};
