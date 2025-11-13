# AppSeed - Production-Ready SvelteKit 5 Boilerplate

A comprehensive, production-ready starter template for building modern web applications with SvelteKit 5. This boilerplate includes enterprise-grade security, authentication, database management, internationalization, testing infrastructure, and development tools pre-configured and ready to use.

## 🎯 Purpose

AppSeed is designed to eliminate the weeks of setup time typically required to start a new web application. Clone this repository and immediately begin building features with confidence, knowing that security, authentication, database management, testing, and other critical infrastructure concerns are already handled.

This is **not** a framework or library - it's a carefully architected starting point that follows best practices and can be customized to fit your specific needs.

## 🏗️ Architecture Overview

### Technology Stack

#### Core Framework
- **SvelteKit 2.x** - Full-stack web framework built on Svelte 5
- **Svelte 5** - Latest version with revolutionary Runes API for state management
- **TypeScript 5.x** - Type-safe development with full IDE support
- **Vite 7.x** - Lightning-fast build tool and dev server

#### Backend & Database
- **Drizzle ORM** - Type-safe SQL ORM with excellent PostgreSQL support
- **PostgreSQL** - Production-grade relational database
- **Docker Compose** - Containerized database for consistent development environments
- **@sveltejs/adapter-node** - Deploy to any Node.js environment

#### Security Infrastructure
- **Session-based Authentication** - Secure token-based sessions with SHA-256 hashing
- **Argon2id Password Hashing** - Industry-standard password security via @node-rs/argon2
- **Zod Validation** - Runtime type checking and input validation
- **Rate Limiting** - Built-in protection against brute force and DoS attacks
- **Content Security Policy (CSP)** - Comprehensive CSP with violation reporting
- **Security Headers** - HSTS, X-Frame-Options, CSP, and more
- **CSRF Protection** - Cross-site request forgery prevention

#### Internationalization (i18n)
- **Paraglide JS** - Type-safe internationalization with zero-runtime overhead
- **Inlang** - Translation management and workflow

#### Testing & Quality
- **Vitest** - Unit and component testing with browser mode
- **Playwright** - End-to-end testing across browsers
- **ESLint** - Code linting with Svelte-specific rules
- **Prettier** - Consistent code formatting
- **TypeScript** - Static type checking

#### Development Experience
- **Storybook 10** - Component development and documentation
- **MDSvex** - Markdown support with Svelte components
- **Hot Module Replacement (HMR)** - Instant feedback during development
- **Drizzle Studio** - Visual database browser

## 🚀 Feature Set

### Authentication & Authorization

**Session Management**
- Secure session-based authentication using cryptographically secure tokens
- Automatic session renewal (30-day expiration, 15-day renewal window)
- Token hashing before storage (SHA-256)
- Environment-aware cookie security (httpOnly, secure in production, sameSite)
- Session invalidation utilities

**Password Security**
- Argon2id hashing algorithm (memory-hard, resistant to GPU attacks)
- Strong password validation (minimum 8 characters, mixed case, numbers)
- Type-safe validation schemas

**Demo Implementation**
- `/demo/lucia` - Working authentication example with login/logout
- Server-side session validation in hooks
- Protected route patterns

### Database Management

**ORM & Schema**
- Drizzle ORM for type-safe database operations
- Schema-first development with TypeScript types auto-generated
- Migration system for version control of database schema
- Connection pooling support

**Development Tools**
- Docker Compose configuration for local PostgreSQL
- Drizzle Studio for visual database management
- CLI commands for common operations:
  - `pnpm db:start` - Start PostgreSQL container
  - `pnpm db:push` - Push schema changes to database
  - `pnpm db:generate` - Generate migrations
  - `pnpm db:migrate` - Run migrations
  - `pnpm db:studio` - Open Drizzle Studio

**Schema Organization**
- Organized in `src/lib/server/db/`
- Example user and session tables included
- Type exports for use throughout application

### Security Features

**Input Validation**
- Zod-based validation schemas in `src/lib/server/validation.ts`
- Pre-built schemas for common inputs (email, password, username)
- Form validation utilities
- Automatic sanitization (null byte removal, whitespace trimming)
- Type-safe validation results

**Rate Limiting**
- Configurable in-memory rate limiting system
- Pre-configured limits for different endpoint types:
  - Authentication: 5 requests per 15 minutes
  - API endpoints: 100 requests per minute
  - Form submissions: 10 requests per minute
  - General requests: 200 requests per minute
- Proxy-aware IP detection (X-Forwarded-For, X-Real-IP, CF-Connecting-IP)
- Rate limit headers in responses (X-RateLimit-*)
- Extensible for Redis or database-backed storage

**Security Headers**
- Automatic security headers on all responses:
  - X-Frame-Options: DENY (clickjacking protection)
  - X-Content-Type-Options: nosniff (MIME sniffing prevention)
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy (restricts camera, microphone, geolocation)
  - HSTS in production (preload-ready)

**Content Security Policy**
- Comprehensive CSP directives configured
- Both enforcement and report-only modes
- CSP violation reporting endpoint (`/csp-report`)
- Prevents XSS, clickjacking, and code injection
- Configured for Svelte 5 compatibility

**CSRF Protection**
- Built-in SvelteKit CSRF protection
- Configurable trusted origins
- Automatic token validation on form submissions

### Internationalization (i18n)

**Paraglide Integration**
- Type-safe translation keys with autocomplete
- Zero-runtime overhead (translations compiled at build time)
- Language routing with URL prefixes
- Message files in `messages/` directory (en.json, es.json included)
- Paraglide middleware in hooks for automatic locale detection
- Demo implementation at `/demo/paraglide`

### Testing Infrastructure

**Unit & Component Testing**
- Vitest configured for both server and client code
- Browser mode for component testing with Playwright
- Separate test environments for server and client code
- Svelte component testing utilities via vitest-browser-svelte

**End-to-End Testing**
- Playwright configured with Chromium
- Example tests in `e2e/demo.test.ts`
- CI/CD ready with headless mode

**Code Quality**
- ESLint with TypeScript and Svelte plugins
- Prettier with Svelte formatting
- Pre-configured npm scripts for checks
- `pnpm check:full` - Run all checks (format, lint, test)

### Component Development

**Storybook Integration**
- Storybook 10 configured for SvelteKit
- Accessibility testing addon (a11y)
- Documentation addon
- Vitest addon for component tests
- Svelte CSF support for story format
- Component organization in `src/lib/components/`

**Component Structure**
- Layout components (`src/lib/components/layout/`)
- UI components (`src/lib/components/ui/`)
- Organized for easy discovery and reuse

### Markdown Support

**MDSvex**
- Write Svelte components in Markdown files
- `.svx` file extension support
- Useful for documentation, blog posts, or content-heavy pages
- Full Svelte component integration within Markdown

## 📁 Project Structure

```
appseed/
├── app/                          # Main application directory
│   ├── src/
│   │   ├── lib/
│   │   │   ├── server/          # Server-only code
│   │   │   │   ├── db/          # Database schema and connection
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── schema.ts
│   │   │   │   ├── auth.ts      # Authentication logic
│   │   │   │   ├── rate-limit.ts # Rate limiting system
│   │   │   │   └── validation.ts # Input validation utilities
│   │   │   ├── components/      # Reusable Svelte components
│   │   │   │   ├── layout/
│   │   │   │   └── ui/
│   │   │   ├── assets/          # Static assets (CSS, images)
│   │   │   ├── paraglide/       # Generated i18n code
│   │   │   └── index.ts         # Public API exports
│   │   ├── routes/              # SvelteKit routes
│   │   │   ├── +layout.svelte   # Root layout
│   │   │   ├── +page.svelte     # Home page
│   │   │   ├── csp-report/      # CSP violation reporting
│   │   │   └── demo/            # Demo implementations
│   │   │       ├── lucia/       # Auth demo
│   │   │       └── paraglide/   # i18n demo
│   │   ├── hooks.server.ts      # Server hooks (middleware)
│   │   ├── hooks.ts             # Client hooks
│   │   ├── app.html             # HTML template
│   │   ├── app.css              # Global styles
│   │   └── app.d.ts             # TypeScript definitions
│   ├── static/                  # Static files (served as-is)
│   ├── e2e/                     # End-to-end tests
│   ├── messages/                # Translation files
│   ├── .storybook/              # Storybook configuration
│   ├── svelte.config.js         # SvelteKit configuration
│   ├── vite.config.ts           # Vite configuration
│   ├── drizzle.config.ts        # Drizzle ORM configuration
│   ├── compose.yaml             # Docker Compose for PostgreSQL
│   ├── package.json             # Dependencies and scripts
│   ├── tsconfig.json            # TypeScript configuration
│   ├── SECURITY.md              # Security documentation
│   └── README.md                # App-specific readme
├── AGENTS.md                    # AI/Agent guidance
└── README.md                    # This file
```

## 🔐 Security Model

### Defense in Depth

AppSeed implements multiple layers of security:

1. **Input Layer**: Validation and sanitization with Zod
2. **Rate Limiting**: Protection against brute force and DoS
3. **Authentication**: Secure session management with proper token handling
4. **Authorization**: Server-side session validation in hooks
5. **Transport Security**: HTTPS enforcement, HSTS, secure cookies
6. **Content Security**: CSP, XSS prevention, clickjacking protection
7. **Database Security**: Parameterized queries via ORM, connection security

### Security Documentation

Comprehensive security documentation is available in `app/SECURITY.md`, including:
- Usage guides for all security features
- Configuration examples
- Best practices
- Production deployment checklist
- Regular maintenance guidelines

## 🎨 Development Philosophy

### Type Safety First

Every aspect of this boilerplate prioritizes type safety:
- TypeScript throughout (no `any` types in production code)
- Zod for runtime type validation
- Drizzle ORM for type-safe database queries
- Paraglide for type-safe translations
- SvelteKit's type-safe routing and data loading

### Security by Default

Security features are enabled by default, not opt-in:
- All security headers configured
- CSP in report-only mode (easy to test, then enforce)
- Rate limiting ready to apply
- Input validation utilities ready to use
- CSRF protection enabled

### Developer Experience

Tools and configuration designed to maximize productivity:
- Hot module replacement for instant feedback
- Storybook for component development
- Database GUI (Drizzle Studio)
- Comprehensive TypeScript support
- Pre-configured linting and formatting
- Clear project structure and organization

## 🧩 Extensibility

### Ready to Extend

While comprehensive, AppSeed is designed to be extended:

**Authentication**
- Add OAuth providers
- Implement MFA/2FA
- Add password reset flows
- Session management UI

**Database**
- Add more tables to schema
- Implement soft deletes
- Add audit logging
- Create custom migrations

**API**
- Add REST or GraphQL endpoints
- Implement API versioning
- Add API documentation (OpenAPI/Swagger)

**Frontend**
- Add UI component libraries (e.g., shadcn-svelte, skeleton)
- Implement theming system
- Add state management (if needed beyond Svelte 5 runes)

**Infrastructure**
- Redis for rate limiting and caching
- S3 for file uploads
- Email service integration
- Monitoring and logging services

## 📚 Documentation

### Included Documentation

- **SECURITY.md** (in `app/`) - Comprehensive security implementation guide
- **app/README.md** - Standard SvelteKit app readme
- **AGENTS.md** - Guidance for AI assistants working with the codebase

### External Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Paraglide Documentation](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)

## 🎯 Use Cases

AppSeed is ideal for:

- **SaaS Applications** - Multi-tenant applications with authentication and billing
- **Internal Tools** - Admin panels, dashboards, and business applications
- **E-commerce** - Online stores with user accounts and secure checkout
- **Content Management** - Blogs, documentation sites, or content platforms
- **API-Driven Applications** - Applications that consume or provide APIs
- **Progressive Web Apps (PWAs)** - Offline-capable applications
- **Enterprise Applications** - Line-of-business applications requiring high security

## 🔧 Customization

### Environment Configuration

AppSeed supports environment-specific configuration:
- `.env` for local development (never commit)
- `.env.example` as a template
- Environment-aware security settings (e.g., secure cookies only in production)
- Database connection strings
- API keys and secrets

### Feature Flags

While not included by default, the structure supports adding:
- Feature flag systems
- A/B testing frameworks
- Gradual rollout mechanisms

### Theming

The base styles are minimal by design:
- `app.css` for global styles
- `default.css` for component styles
- Easy to integrate design systems
- CSS custom properties for theming

## 🚦 Production Readiness

### What's Production-Ready

- ✅ Security infrastructure
- ✅ Authentication system
- ✅ Database management
- ✅ Error handling
- ✅ Type safety
- ✅ Testing infrastructure
- ✅ Build optimization

### What You Need to Add

- 🔲 Your actual features and business logic
- 🔲 UI/UX design and styling
- 🔲 Production database (not Docker)
- 🔲 Deployment configuration
- 🔲 Monitoring and logging
- 🔲 Backup and disaster recovery
- 🔲 CI/CD pipelines
- 🔲 Environment-specific configurations

## 🤝 Contributing & Maintenance

### Keeping Up to Date

AppSeed is a boilerplate, not a framework. Once you clone it:

1. **It's yours** - Modify freely to fit your needs
2. **No automatic updates** - You control when and what to update
3. **Manual dependency updates** - Use `pnpm update` and review changes
4. **Security patches** - Monitor dependencies with `pnpm audit`

### Best Practices

- Review `SECURITY.md` before production deployment
- Run `pnpm check:full` before committing
- Keep dependencies updated regularly
- Document your customizations
- Add environment-specific configuration as needed

## 📄 License

This is a starter template intended to be cloned and customized for your projects. The code is provided as-is for you to use, modify, and build upon without restriction.

## 🙏 Acknowledgments

Built with these amazing open-source projects:
- Svelte & SvelteKit by the Svelte team
- Drizzle ORM by Drizzle Team
- Paraglide by Inlang
- And many other excellent libraries and tools

---

**Ready to build something amazing?** Clone this repository and start shipping features instead of configuring infrastructure.
