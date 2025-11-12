import { z } from 'zod';
import { fail } from '@sveltejs/kit';

/**
 * Common validation schemas for reuse across the application
 */
export const schemas = {
	// Email validation
	email: z.string().email('Invalid email address').min(1, 'Email is required'),

	// Password validation - enforce strong passwords
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),

	// Username validation
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters')
		.max(20, 'Username must be at most 20 characters')
		.regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

	// ID validation
	id: z.string().uuid('Invalid ID format')
};

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
	username: schemas.username,
	password: z.string().min(1, 'Password is required')
});

/**
 * Registration form validation schema
 */
export const registerSchema = z.object({
	username: schemas.username,
	email: schemas.email,
	password: schemas.password,
	confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword']
});

/**
 * Validate form data against a schema
 * Returns validated data or form errors
 */
export function validateFormData<T extends z.ZodTypeAny>(
	schema: T,
	formData: FormData
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string> } {
	const data = Object.fromEntries(formData);
	const result = schema.safeParse(data);

	if (!result.success) {
		const errors: Record<string, string> = {};
		result.error.issues.forEach((issue) => {
			const path = issue.path.join('.');
			errors[path] = issue.message;
		});
		return { success: false, errors };
	}

	return { success: true, data: result.data };
}

/**
 * Validate request data and return SvelteKit fail response if invalid
 */
export function validateOrFail<T extends z.ZodTypeAny>(
	schema: T,
	data: unknown,
	status = 400
) {
	const result = schema.safeParse(data);

	if (!result.success) {
		const errors: Record<string, string> = {};
		result.error.issues.forEach((issue) => {
			const path = issue.path.join('.');
			errors[path] = issue.message;
		});
		return fail(status, { errors });
	}

	return { success: true, data: result.data };
}

/**
 * Sanitize string input by removing potentially dangerous characters
 */
export function sanitizeString(input: string): string {
	// Remove null bytes
	let sanitized = input.replace(/\0/g, '');
	
	// Trim whitespace
	sanitized = sanitized.trim();
	
	return sanitized;
}

/**
 * Validate and sanitize user input
 */
export function validateAndSanitize<T extends z.ZodTypeAny>(
	schema: T,
	data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string> } {
	// Pre-process: sanitize string fields
	if (typeof data === 'object' && data !== null) {
		const sanitized: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(data)) {
			if (typeof value === 'string') {
				sanitized[key] = sanitizeString(value);
			} else {
				sanitized[key] = value;
			}
		}
		data = sanitized;
	}

	// Validate
	const result = schema.safeParse(data);

	if (!result.success) {
		const errors: Record<string, string> = {};
		result.error.issues.forEach((issue) => {
			const path = issue.path.join('.');
			errors[path] = issue.message;
		});
		return { success: false, errors };
	}

	return { success: true, data: result.data };
}
