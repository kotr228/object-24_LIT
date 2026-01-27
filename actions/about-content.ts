'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { aboutSections, aboutMedia } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';

export async function getAboutSections() {
  try {
    const sections = await db
      .select()
      .from(aboutSections)
      .where(eq(aboutSections.isPublished, true))
      .orderBy(aboutSections.order);
    return sections;
  } catch (error) {
    console.error('Error getting about sections:', error);
    return [];
  }
}

export async function getAllAboutSections() {
  try {
    const sections = await db
      .select()
      .from(aboutSections)
      .orderBy(aboutSections.order);
    return sections;
  } catch (error) {
    console.error('Error getting all about sections:', error);
    return [];
  }
}

export async function createAboutSection(data: {
  sectionType: string;
  title: string;
  content?: string;
  order?: number;
  isPublished?: boolean;
}) {
  try {
    await requireAuth();

    const [newSection] = await db.insert(aboutSections).values({
      ...data,
      order: data.order ?? 0,
      isPublished: data.isPublished ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    revalidatePath('/about');
    revalidatePath('/admin/about');

    return { success: true, message: 'Секцію успішно додано', data: newSection };
  } catch (error) {
    console.error('Error creating about section:', error);
    return { success: false, message: 'Помилка при додаванні секції' };
  }
}

export async function updateAboutSection(id: string, data: {
  title?: string;
  content?: string;
  order?: number;
  isPublished?: boolean;
}) {
  try {
    await requireAuth();

    const [updatedSection] = await db
      .update(aboutSections)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(aboutSections.id, id))
      .returning();

    revalidatePath('/about');
    revalidatePath('/admin/about');

    return { success: true, message: 'Секцію успішно оновлено', data: updatedSection };
  } catch (error) {
    console.error('Error updating about section:', error);
    return { success: false, message: 'Помилка при оновленні секції' };
  }
}

export async function deleteAboutSection(id: string) {
  try {
    await requireAuth();

    await db.delete(aboutSections).where(eq(aboutSections.id, id));

    revalidatePath('/about');
    revalidatePath('/admin/about');

    return { success: true, message: 'Секцію успішно видалено' };
  } catch (error) {
    console.error('Error deleting about section:', error);
    return { success: false, message: 'Помилка при видаленні секції' };
  }
}

// About Media
export async function getAboutMedia() {
  try {
    const media = await db.select().from(aboutMedia).orderBy(aboutMedia.order);
    return media;
  } catch (error) {
    console.error('Error getting about media:', error);
    return [];
  }
}

export async function createAboutMedia(data: {
  mediaType: string;
  url: string;
  caption?: string;
  order?: number;
}) {
  try {
    await requireAuth();

    const [newMedia] = await db.insert(aboutMedia).values({
      ...data,
      order: data.order ?? 0,
      createdAt: new Date(),
    }).returning();

    revalidatePath('/about');
    revalidatePath('/admin/about');

    return { success: true, message: 'Медіа успішно додано', data: newMedia };
  } catch (error) {
    console.error('Error creating about media:', error);
    return { success: false, message: 'Помилка при додаванні медіа' };
  }
}

export async function deleteAboutMedia(id: string) {
  try {
    await requireAuth();

    await db.delete(aboutMedia).where(eq(aboutMedia.id, id));

    revalidatePath('/about');
    revalidatePath('/admin/about');

    return { success: true, message: 'Медіа успішно видалено' };
  } catch (error) {
    console.error('Error deleting about media:', error);
    return { success: false, message: 'Помилка при видаленні медіа' };
  }
}
