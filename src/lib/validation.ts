import { z } from 'zod';

/**
 * Validation schemas for API routes
 * Use these to validate user inputs and prevent injection attacks
 */

// Item creation/update
export const itemSchema = z.object({
    url: z.string().url('Invalid URL format').max(2048, 'URL too long'),
    title: z.string().max(500, 'Title too long').optional(),
    description: z.string().max(2000, 'Description too long').optional(),
    image: z.string().url('Invalid image URL').optional(),
    favicon: z.string().url('Invalid favicon URL').optional(),
    content: z.string().optional(),
    type: z.enum(['article', 'video', 'pdf', 'link']).optional(),
});

// Note creation/update
export const noteSchema = z.object({
    title: z.string().max(200, 'Title too long').optional(),
    content: z.string().min(1, 'Content is required').max(50000, 'Content too long'),
    itemId: z.string().uuid('Invalid item ID').optional(),
});

// Task creation/update
export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    description: z.string().max(2000, 'Description too long').optional(),
    dueDate: z.string().datetime('Invalid date format').optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    status: z.enum(['todo', 'in-progress', 'done']).optional(),
    projectId: z.string().uuid('Invalid project ID').optional(),
});

// Meeting creation/update
export const meetingSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    description: z.string().max(2000, 'Description too long').optional(),
    startTime: z.string().datetime('Invalid start time'),
    endTime: z.string().datetime('Invalid end time'),
    location: z.string().max(200, 'Location too long').optional(),
    attendees: z.array(z.string().email('Invalid email')).optional(),
});

// Reminder creation/update
export const reminderSchema = z.object({
    itemId: z.string().uuid('Invalid item ID'),
    reminderAt: z.string().datetime('Invalid reminder time'),
    recurring: z.enum(['none', 'daily', 'weekly', 'monthly']).optional(),
});

// Tag creation/update
export const tagSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name too long')
        .regex(/^[a-zA-Z0-9-_]+$/, 'Tag name can only contain letters, numbers, hyphens, and underscores'),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').optional(),
});

// User preferences update
export const preferencesSchema = z.object({
    emailNotifications: z.boolean().optional(),
    pushNotifications: z.boolean().optional(),
    theme: z.enum(['light', 'dark', 'system']).optional(),
});

// Search query
export const searchSchema = z.object({
    query: z.string().max(200, 'Search query too long'),
    type: z.enum(['all', 'article', 'video', 'pdf']).optional(),
    status: z.enum(['inbox', 'reading', 'archived', 'trash']).optional(),
    page: z.number().int().min(1).optional(),
    limit: z.number().int().min(1).max(100).optional(),
});

// API token generation
export const apiTokenSchema = z.object({
    name: z.string().max(100, 'Name too long').optional(),
    expiresIn: z.number().int().min(1).max(365).optional(), // days
});

/**
 * Helper function to validate and sanitize input
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    error?: string;
} {
    try {
        const validated = schema.parse(data);
        return { success: true, data: validated };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const firstError = error.issues[0];
            return {
                success: false,
                error: firstError?.message || 'Invalid input',
            };
        }
        return {
            success: false,
            error: 'Invalid input',
        };
    }
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * For production, consider using a library like DOMPurify
 */
export function sanitizeHtml(html: string): string {
    // Basic sanitization - remove script tags and event handlers
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/javascript:/gi, '');
}
