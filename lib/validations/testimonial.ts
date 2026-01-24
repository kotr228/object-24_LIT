import { z } from 'zod';

export const testimonialSchema = z.object({
  name: z.string().min(3, 'Ім\'я має містити мінімум 3 символи'),
  graduationYear: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  content: z.string().min(20, 'Відгук має містити мінімум 20 символів'),
  achievement: z.string().optional(),
  university: z.string().optional(),
  photo: z.string().url('Невірний формат URL').optional().or(z.literal('')),
  isPublished: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;
