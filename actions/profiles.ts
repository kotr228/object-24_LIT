'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { profiles } from '@/db/schema';
import { profileSchema, type ProfileFormData } from '@/lib/validations/profile';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';

export async function createProfile(data: ProfileFormData) {
  try {
    await requireAuth();

    const validated = profileSchema.parse(data);

    await db.insert(profiles).values(validated);

    revalidatePath('/admin/profiles');
    revalidatePath('/profiles');
    revalidatePath('/');

    return { success: true, message: 'Профіль успішно додано' };
  } catch (error) {
    console.error('Error creating profile:', error);
    return { success: false, message: 'Помилка при додаванні профілю' };
  }
}

export async function updateProfile(id: string, data: ProfileFormData) {
  try {
    await requireAuth();

    const validated = profileSchema.parse(data);

    await db
      .update(profiles)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(profiles.id, id));

    revalidatePath('/admin/profiles');
    revalidatePath('/profiles');
    revalidatePath('/');

    return { success: true, message: 'Профіль оновлено' };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, message: 'Помилка при оновленні профілю' };
  }
}

export async function deleteProfile(id: string) {
  try {
    await requireAuth();

    await db.delete(profiles).where(eq(profiles.id, id));

    revalidatePath('/admin/profiles');
    revalidatePath('/profiles');
    revalidatePath('/');

    return { success: true, message: 'Профіль видалено' };
  } catch (error) {
    console.error('Error deleting profile:', error);
    return { success: false, message: 'Помилка при видаленні' };
  }
}

export async function getProfile(id: string) {
  try {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.id, id),
    });

    return profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function getAllProfiles() {
  try {
    const allProfiles = await db.select().from(profiles).orderBy(profiles.order);
    return allProfiles;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }
}
