import { z } from 'zod';

export const profileSchema = z.object({
  title: z.string().min(3, 'Назва має містити мінімум 3 символи'),
  slug: z.string().min(3, 'Slug має містити мінімум 3 символи').regex(/^[a-z0-9-]+$/, 'Slug може містити тільки малі літери, цифри та дефіси'),
  description: z.string().min(10, 'Опис має містити мінімум 10 символів'),
  fullDescription: z.string().optional(),
  icon: z.string().default('BookOpen'),
  color: z.enum(['blue', 'yellow', 'green', 'purple', 'red', 'indigo']).default('blue'),
  subjects: z.string().optional(),
  order: z.number().int().min(0).default(0),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
