import { z } from 'zod';

export const registrationSchema = z.object({
  childFirstName: z.string().min(2, 'Ім\'я має містити мінімум 2 символи'),
  childLastName: z.string().min(2, 'Прізвище має містити мінімум 2 символи'),
  childMiddleName: z.string().optional(),
  childBirthDate: z.string().min(1, 'Дата народження обов\'язкова'),
  currentSchool: z.string().min(3, 'Назва школи має містити мінімум 3 символи'),
  targetGrade: z.number().int().min(7).max(10, 'Клас має бути від 7 до 10'),
  preferredProfile: z.string().min(1, 'Виберіть профіль'),
  homeAddress: z.string().min(5, 'Адреса має містити мінімум 5 символів'),
  contactPhone: z.string().min(10, 'Введіть коректний номер телефону'),
  parentNames: z.string().min(5, 'ПІБ батьків/опікунів має містити мінімум 5 символів'),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
