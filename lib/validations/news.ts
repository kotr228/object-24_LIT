import { z } from 'zod';

export const newsSchema = z.object({
  title: z.string().min(5, 'Заголовок має містити мінімум 5 символів'),
  slug: z.string().min(3, 'Slug має містити мінімум 3 символи').regex(/^[a-z0-9-]+$/, 'Slug може містити тільки малі літери, цифри та дефіси'),
  excerpt: z.string().min(10, 'Короткий опис має містити мінімум 10 символів'),
  content: z.string().min(20, 'Контент має містити мінімум 20 символів'),
  category: z.enum(['events', 'achievements', 'announcements', 'general']).default('general'),
  coverImage: z.string().url('Невірний формат URL').optional().or(z.literal('')),
  isPublished: z.boolean().default(true),
});

export type NewsFormData = z.infer<typeof newsSchema>;
