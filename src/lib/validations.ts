import { z } from 'zod';

// Item Validations
const httpUrl = z
  .string()
  .url('Invalid URL format')
  .refine((val) => {
    try {
      return ['http:', 'https:'].includes(new URL(val).protocol);
    } catch {
      return false;
    }
  }, 'Only http/https URLs are allowed');

export const createItemSchema = z.object({
  url: httpUrl,
  title: z.string().optional(),
  description: z.string().optional(),
});

export const updateItemSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').optional(),
  reminderAt: z.date().nullable().optional(),
  status: z.enum(['inbox', 'reading', 'archived', 'trash']).optional(),
  isFavorite: z.boolean().optional(),
});

// Reminder Validations
export const addReminderSchema = z.object({
  date: z.date(),
  recurrence: z.enum(['none', 'daily', 'weekly', 'monthly']).default('none'),
  itemId: z.string().optional(),
  title: z.string().optional(),
}).refine(data => data.itemId || data.title, {
  message: 'Must provide either an Item ID or a Title for the reminder.',
  path: ["title"],
});
