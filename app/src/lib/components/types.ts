/**
 * Shared TypeScript types for UI components
 * Use these types across components for consistency
 */

/**
 * Standard component sizes
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Standard component sizes (without xs/xl)
 */
export type StandardSize = 'sm' | 'md' | 'lg';

/**
 * Color variants for components
 */
export type Variant = 'primary' | 'secondary' | 'accent';

/**
 * Semantic color variants (for alerts, badges, etc.)
 */
export type SemanticVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * All available color variants
 */
export type AllVariants = Variant | SemanticVariant | 'default';

/**
 * Button types
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Input types
 */
export type InputType =
	| 'text'
	| 'email'
	| 'password'
	| 'number'
	| 'tel'
	| 'url'
	| 'search'
	| 'date'
	| 'time'
	| 'datetime-local'
	| 'month'
	| 'week'
	| 'color';

/**
 * Alignment options
 */
export type Alignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Justify content options
 */
export type JustifyContent =
	| 'start'
	| 'center'
	| 'end'
	| 'space-between'
	| 'space-around'
	| 'space-evenly';

/**
 * Flex direction
 */
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

/**
 * Common spacing values (matches CSS variables)
 */
export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Border radius values (matches CSS variables)
 */
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

/**
 * Loading state
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
