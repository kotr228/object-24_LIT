import { z } from 'zod';

export const teacherSchema = z.object({
  firstName: z.string().min(2, 'Ім\'я має містити мінімум 2 символи'),
  lastName: z.string().min(2, 'Прізвище має містити мінімум 2 символи'),
  middleName: z.string().optional(),
  position: z.string().min(3, 'Посада має містити мінімум 3 символи'),
  specialization: z.string().min(3, 'Спеціалізація має містити мінімум 3 символи'),
  bio: z.string().optional(),
  email: z.string().email('Невірний формат email').optional().or(z.literal('')),
  phone: z.string().optional(),
  photo: z.string().optional().or(z.literal('')),
  cardColor: z.string().optional().default('#3b82f6'),
  order: z.number().int().min(0).default(0),
});

export type TeacherFormData = z.infer<typeof teacherSchema>;
