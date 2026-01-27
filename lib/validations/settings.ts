import { z } from 'zod';

export const settingsSchema = z.object({
  schoolName: z.string().min(1, 'Назва школи обов\'язкова'),
  schoolDescription: z.string().min(1, 'Опис школи обов\'язковий'),
  address: z.string().min(1, 'Адреса обов\'язкова'),
  phone: z.string().min(1, 'Телефон обов\'язковий'),
  email: z.string().email('Невірний формат email'),
  logoType: z.enum(['new', 'old']).default('new'),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
