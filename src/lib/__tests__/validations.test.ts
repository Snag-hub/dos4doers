import { describe, it, expect } from 'vitest';
import { createItemSchema, addReminderSchema } from '../validations';

describe('Zod Validations', () => {
    describe('createItemSchema', () => {
        it('should validate 1a valid URL', () => {
            const result = createItemSchema.safeParse({ url: 'https://example.com' });
            expect(result.success).toBe(true);
        });

        it('should fail on an invalid URL', () => {
            const result = createItemSchema.safeParse({ url: 'not-a-url' });
            expect(result.success).toBe(false);
        });
    });

    describe('addReminderSchema', () => {
        it('should fail when both itemId and title are missing', () => {
            const result = addReminderSchema.safeParse({ date: new Date() });
            expect(result.success).toBe(false);
        });

        it('should pass with a title for general reminder', () => {
            const result = addReminderSchema.safeParse({ date: new Date(), title: 'Read later' });
            expect(result.success).toBe(true);
        });

        it('should pass with an itemId for item reminder', () => {
            const result = addReminderSchema.safeParse({ date: new Date(), itemId: 'item-123' });
            expect(result.success).toBe(true);
        });
    });
});
