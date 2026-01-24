'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { profileMedia } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';

export async function getProfileMedia(profileId: string) {
  try {
    const media = await db
      .select()
      .from(profileMedia)
      .where(eq(profileMedia.profileId, profileId))
      .orderBy(profileMedia.order);
    return media;
  } catch (error) {
    console.error('Error getting profile media:', error);
    return [];
  }
}

export async function createProfileMedia(data: {
  profileId: string;
  mediaType: string;
  title: string;
  url: string;
  description?: string;
  order?: number;
}) {
  try {
    await requireAuth();

    await db.insert(profileMedia).values({
      ...data,
      order: data.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath(`/profiles/${data.profileId}`);
    revalidatePath('/admin/profiles');

    return { success: true, message: 'Медіа успішно додано' };
  } catch (error) {
    console.error('Error creating profile media:', error);
    return { success: false, message: 'Помилка при додаванні медіа' };
  }
}

export async function deleteProfileMedia(id: string, profileId: string) {
  try {
    await requireAuth();

    await db.delete(profileMedia).where(eq(profileMedia.id, id));

    revalidatePath(`/profiles/${profileId}`);
    revalidatePath('/admin/profiles');

    return { success: true, message: 'Медіа успішно видалено' };
  } catch (error) {
    console.error('Error deleting profile media:', error);
    return { success: false, message: 'Помилка при видаленні медіа' };
  }
}
