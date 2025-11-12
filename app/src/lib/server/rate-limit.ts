import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
	/** Maximum number of requests allowed in the window */
	maxRequests: number;
	/** Time window in milliseconds */
	windowMs: number;
	/** Optional custom message */
	message?: string;
}

/**
 * Rate limit store entry
 */
interface RateLimitEntry {
	count: number;
	resetTime: number;
}

/**
 * In-memory rate limit store
 * Note: In production, consider using Redis or a database for distributed systems
 */
class RateLimitStore {
	private store: Map<string, RateLimitEntry> = new Map();
	private cleanupInterval: NodeJS.Timeout;

	constructor() {
		// Cleanup expired entries every 60 seconds
		this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
	}

	/**
	 * Check and increment rate limit counter
	 */
	check(key: string, config: RateLimitConfig): { allowed: boolean; resetTime: number } {
		const now = Date.now();
		const entry = this.store.get(key);

		// No entry or expired entry
		if (!entry || entry.resetTime < now) {
			this.store.set(key, {
				count: 1,
				resetTime: now + config.windowMs
			});
			return { allowed: true, resetTime: now + config.windowMs };
		}

		// Increment counter
		entry.count++;

		// Check if limit exceeded
		if (entry.count > config.maxRequests) {
			return { allowed: false, resetTime: entry.resetTime };
		}

		return { allowed: true, resetTime: entry.resetTime };
	}

	/**
	 * Reset rate limit for a specific key
	 */
	reset(key: string): void {
		this.store.delete(key);
	}

	/**
	 * Clean up expired entries
	 */
	private cleanup(): void {
		const now = Date.now();
		for (const [key, entry] of this.store.entries()) {
			if (entry.resetTime < now) {
				this.store.delete(key);
			}
		}
	}

	/**
	 * Stop cleanup interval (for graceful shutdown)
	 */
	destroy(): void {
		clearInterval(this.cleanupInterval);
	}
}

// Global rate limit store
const rateLimitStore = new RateLimitStore();

/**
 * Get client identifier from request
 */
function getClientIdentifier(event: RequestEvent): string {
	// Try to get real IP from common proxy headers
	const forwardedFor = event.request.headers.get('x-forwarded-for');
	const realIp = event.request.headers.get('x-real-ip');
	const cfConnectingIp = event.request.headers.get('cf-connecting-ip');

	// Use the first IP from x-forwarded-for if available
	if (forwardedFor) {
		const ips = forwardedFor.split(',').map((ip) => ip.trim());
		return ips[0];
	}

	if (realIp) return realIp;
	if (cfConnectingIp) return cfConnectingIp;

	// Fallback to client address
	return event.getClientAddress();
}

/**
 * Rate limit configurations for different endpoint types
 */
export const rateLimits = {
	// Authentication endpoints - 5 attempts per 15 minutes
	auth: {
		maxRequests: 5,
		windowMs: 15 * 60 * 1000,
		message: 'Too many authentication attempts. Please try again later.'
	} as RateLimitConfig,

	// API endpoints - 100 requests per minute
	api: {
		maxRequests: 100,
		windowMs: 60 * 1000,
		message: 'Too many API requests. Please try again later.'
	} as RateLimitConfig,

	// Form submissions - 10 per minute
	form: {
		maxRequests: 10,
		windowMs: 60 * 1000,
		message: 'Too many form submissions. Please slow down.'
	} as RateLimitConfig,

	// General requests - 200 per minute
	general: {
		maxRequests: 200,
		windowMs: 60 * 1000,
		message: 'Too many requests. Please try again later.'
	} as RateLimitConfig
};

/**
 * Apply rate limiting to a request
 */
export function rateLimit(event: RequestEvent, config: RateLimitConfig): void {
	const clientId = getClientIdentifier(event);
	const key = `${event.url.pathname}:${clientId}`;

	const result = rateLimitStore.check(key, config);

	// Add rate limit headers
	const remaining = Math.max(
		0,
		config.maxRequests - (rateLimitStore['store'].get(key)?.count || 0)
	);
	const resetTime = new Date(result.resetTime).toISOString();

	// Set rate limit headers (these will be overridden by response headers in hooks)
	event.locals.rateLimitHeaders = {
		'X-RateLimit-Limit': config.maxRequests.toString(),
		'X-RateLimit-Remaining': remaining.toString(),
		'X-RateLimit-Reset': resetTime
	};

	if (!result.allowed) {
		const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);
		throw error(429, {
			message: config.message || 'Too many requests',
			retryAfter
		});
	}
}

/**
 * Create a rate limit checker for specific paths
 */
export function createRateLimitChecker(config: RateLimitConfig) {
	return (event: RequestEvent) => rateLimit(event, config);
}

/**
 * Reset rate limit for a specific IP and path (useful for testing)
 */
export function resetRateLimit(ip: string, path: string): void {
	const key = `${path}:${ip}`;
	rateLimitStore.reset(key);
}

// Cleanup on process exit
if (typeof process !== 'undefined') {
	process.on('SIGTERM', () => rateLimitStore.destroy());
	process.on('SIGINT', () => rateLimitStore.destroy());
}
