// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').SessionValidationResult['user'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
			rateLimitHeaders?: {
				'X-RateLimit-Limit': string;
				'X-RateLimit-Remaining': string;
				'X-RateLimit-Reset': string;
			};
		}
		interface Error {
			message: string;
			retryAfter?: number;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
