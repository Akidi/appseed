# Security Implementation Guide

This document provides guidance on using the security features implemented in this SvelteKit application.

## Table of Contents

1. [Input Validation](#input-validation)
2. [Rate Limiting](#rate-limiting)
3. [Security Headers](#security-headers)
4. [Content Security Policy (CSP)](#content-security-policy-csp)
5. [Authentication Security](#authentication-security)

---

## Input Validation

### Using Validation Schemas

The application uses Zod for input validation. Pre-defined schemas are available in `src/lib/server/validation.ts`.

#### Example: Validating Login Form

```typescript
import { validateFormData, loginSchema } from '$lib/server/validation';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request }) => {
		const formData = await request.formData();
		const result = validateFormData(loginSchema, formData);

		if (!result.success) {
			return { success: false, errors: result.errors };
		}

		// result.data is now type-safe and validated
		const { username, password } = result.data;
		// ... authentication logic
	}
};
```

#### Available Schemas

- `schemas.email` - Email validation
- `schemas.password` - Strong password validation (8+ chars, uppercase, lowercase, number)
- `schemas.username` - Username validation (3-20 chars, alphanumeric + underscore)
- `schemas.id` - UUID validation
- `loginSchema` - Complete login form validation
- `registerSchema` - Complete registration form validation

#### Creating Custom Schemas

```typescript
import { z } from 'zod';

const customSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().max(500),
	category: z.enum(['tech', 'business', 'other'])
});
```

### Sanitization

The validation module includes string sanitization:

```typescript
import { validateAndSanitize } from '$lib/server/validation';

const result = validateAndSanitize(mySchema, userData);
// Automatically removes null bytes and trims whitespace
```

---

## Rate Limiting

### Overview

Rate limiting is implemented to prevent abuse and brute force attacks. Multiple configuration presets are available.

### Using Rate Limiting in Routes

#### Example: Protecting Authentication Endpoint

```typescript
import { rateLimit, rateLimits } from '$lib/server/rate-limit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, cookies, getClientAddress }) => {
		// Apply rate limiting (5 attempts per 15 minutes)
		rateLimit({ request, cookies, getClientAddress, url, locals } as any, rateLimits.auth);

		// ... rest of login logic
	}
};
```

### Rate Limit Configurations

| Config | Max Requests | Window | Use Case |
|--------|-------------|--------|----------|
| `rateLimits.auth` | 5 | 15 minutes | Login, password reset |
| `rateLimits.api` | 100 | 1 minute | API endpoints |
| `rateLimits.form` | 10 | 1 minute | Form submissions |
| `rateLimits.general` | 200 | 1 minute | General requests |

### Custom Rate Limits

```typescript
import { rateLimit } from '$lib/server/rate-limit';

const customLimit = {
	maxRequests: 50,
	windowMs: 5 * 60 * 1000, // 5 minutes
	message: 'Custom rate limit message'
};

rateLimit(event, customLimit);
```

### Rate Limit Headers

Rate limit information is exposed via response headers:

- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Remaining requests in current window
- `X-RateLimit-Reset` - Time when the limit resets (ISO 8601)

### Production Considerations

The current implementation uses in-memory storage. For production with multiple servers:

1. **Use Redis**: Implement a Redis-based rate limit store
2. **Use Database**: Store rate limits in your database
3. **Use Edge Rate Limiting**: Utilize CDN/edge rate limiting (Cloudflare, Fastly, etc.)

---

## Security Headers

### Implemented Headers

The following security headers are automatically applied to all responses:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevents clickjacking attacks |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS protection |
| `Permissions-Policy` | Restrictive | Limits browser feature access |
| `Strict-Transport-Security` | Production only | Enforces HTTPS (HSTS) |

### HSTS (HTTP Strict Transport Security)

HSTS is enabled in production mode only:
- `max-age=31536000` (1 year)
- `includeSubDomains` - Applies to all subdomains
- `preload` - Ready for HSTS preload list

**Before submitting to HSTS preload list:**
1. Test thoroughly in production
2. Ensure HTTPS works on all subdomains
3. Submit at: https://hstspreload.org/

### Permissions Policy

Restricts access to sensitive browser features:
- Camera: Disabled
- Microphone: Disabled
- Geolocation: Disabled
- Interest Cohort (FLoC): Disabled

---

## Content Security Policy (CSP)

### Current Configuration

The CSP is configured in `svelte.config.js` with both enforcement and report-only modes.

#### Enforcement Mode Directives

```javascript
'default-src': ['self']           // Only load resources from same origin
'script-src': ['self']            // Scripts from same origin only
'style-src': ['self', 'unsafe-inline']  // Styles from same origin + inline
'img-src': ['self', 'data:', 'https:']  // Images from same origin, data URLs, HTTPS
'font-src': ['self', 'data:']     // Fonts from same origin, data URLs
'connect-src': ['self']           // AJAX/fetch to same origin only
'frame-ancestors': ['none']       // Cannot be embedded in frames
'base-uri': ['self']              // Base tag restricted to same origin
'form-action': ['self']           // Forms submit to same origin only
'object-src': ['none']            // No plugins (Flash, etc.)
'script-src-attr': ['none']       // No inline event handlers
'upgrade-insecure-requests': true // Upgrade HTTP to HTTPS
```

### CSP Violation Reporting

Violations are reported to `/csp-report` endpoint and logged for monitoring.

#### Viewing CSP Reports

Check server logs for CSP violations:
```
CSP Violation Report: {
  "document-uri": "...",
  "violated-directive": "...",
  "blocked-uri": "..."
}
```

### Adjusting CSP for Third-Party Services

If you need to add external services (analytics, CDNs, etc.):

1. **Update `svelte.config.js`**:
```javascript
csp: {
  directives: {
    'script-src': ['self', 'https://cdn.example.com'],
    'img-src': ['self', 'data:', 'https:', 'https://images.example.com'],
    // ... other directives
  }
}
```

2. **Test in report-only mode first**
3. **Monitor CSP reports**
4. **Deploy to enforcement mode**

### Removing `unsafe-inline` from Styles

Currently, `style-src` includes `unsafe-inline` for compatibility. To remove:

1. Implement nonce-based CSP
2. Configure SvelteKit adapter to support nonces
3. Update all inline styles to use nonces
4. Test thoroughly

---

## Authentication Security

### Session Security

Sessions are implemented with the following security features:

- **Secure Cookies**: `secure: true` in production, `httpOnly: true` always
- **SameSite Protection**: `sameSite: 'lax'` prevents CSRF
- **Token Hashing**: Session tokens are hashed (SHA-256) before storage
- **Automatic Renewal**: Sessions renewed at 15-day mark of 30-day expiration
- **Expiration Checking**: Expired sessions automatically deleted

### Password Security

- **Hashing**: Argon2id algorithm via `@node-rs/argon2`
- **Validation**: Enforced strong password requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number

### Best Practices

1. **Always validate input**: Use validation schemas
2. **Rate limit auth endpoints**: Prevent brute force attacks
3. **Secure password reset**: Implement with tokens and email verification
4. **Session invalidation**: Invalidate on password change
5. **Multi-factor authentication**: Consider implementing MFA

### CSRF Protection

CSRF protection is enabled in `svelte.config.js`:

```javascript
csrf: {
  trustedOrigins: ['http://localhost:5173'] // Add production URLs
}
```

**For production**, update with your actual domains:
```javascript
csrf: {
  trustedOrigins: [
    'http://localhost:5173',
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ]
}
```

---

## Security Checklist

### Before Production Deployment

- [ ] Update CSRF `trustedOrigins` with production URLs
- [ ] Verify HTTPS is configured and working
- [ ] Test CSP in report-only mode
- [ ] Review and adjust rate limits for your traffic patterns
- [ ] Set up CSP violation monitoring/alerting
- [ ] Enable security header monitoring
- [ ] Configure database connection with SSL
- [ ] Set up environment variable management
- [ ] Review and test all authentication flows
- [ ] Configure backup and disaster recovery
- [ ] Set up security logging and monitoring
- [ ] Consider HSTS preload submission (after testing)

### Regular Maintenance

- [ ] Review dependency vulnerabilities monthly (`pnpm audit`)
- [ ] Monitor CSP violation reports
- [ ] Review rate limit effectiveness
- [ ] Update security headers as needed
- [ ] Review authentication logs for suspicious activity
- [ ] Test security measures regularly

---

## Getting Help

- **SvelteKit Security**: https://kit.svelte.dev/docs/security
- **OWASP Guidelines**: https://owasp.org/
- **CSP Reference**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- **Security Headers**: https://securityheaders.com/

## Reporting Security Issues

If you discover a security vulnerability, please email [security@yourdomain.com] instead of using the issue tracker.
