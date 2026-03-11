'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { settings } from '@/db/schema';
import { settingsSchema, type SettingsFormData } from '@/lib/validations/settings';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function getSettings() {
  try {
    const [result] = await db
      .select()
      .from(settings)
      .where(eq(settings.id, 'main'))
      .limit(1);

    if (!result) {
      // Create default settings if not exists
      const defaultSettings = {
        id: 'main',
        schoolName: 'Олександрійський ліцей інформаційних технологій',
        schoolDescription: 'Сучасна освіта, професійні вчителі, індивідуальний підхід до кожного учня.',
        address: 'м. Олександрія, Кіровоградська область',
        phone: '+38 (012) 345-67-89',
        email: 'info@lit.kr.ua',
        logoType: 'new' as const,
        updatedAt: new Date().toISOString(),
      };

      await db.insert(settings).values(defaultSettings);
      return defaultSettings;
    }

    return result;
  } catch (error) {
    console.error('Error getting settings:', error);
    throw error;
  }
}

export async function updateSettings(data: SettingsFormData) {
  try {
    await requireAuth();

    const validated = settingsSchema.parse(data);

    await db
      .update(settings)
      .set({
        ...validated,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(settings.id, 'main'));

    revalidatePath('/');
    revalidatePath('/admin/settings');

    return { success: true, message: 'Налаштування успішно оновлено' };
  } catch (error) {
    console.error('Error updating settings:', error);
    return { success: false, message: 'Помилка при оновленні налаштувань' };
  }
}
