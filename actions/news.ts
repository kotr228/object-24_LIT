'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { news } from '@/db/schema';
import { newsSchema, type NewsFormData } from '@/lib/validations/news';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';

export async function createNews(data: NewsFormData) {
  try {
    await requireAuth();

    const validated = newsSchema.parse(data);

    await db.insert(news).values({
      ...validated,
      publishedAt: validated.isPublished ? new Date() : null,
    });

    revalidatePath('/admin/news');
    revalidatePath('/news');
    revalidatePath('/');

    return { success: true, message: 'Новину успішно додано' };
  } catch (error) {
    console.error('Error creating news:', error);
    return { success: false, message: 'Помилка при додаванні новини' };
  }
}

export async function updateNews(id: string, data: NewsFormData) {
  try {
    await requireAuth();

    const validated = newsSchema.parse(data);

    const updateData: any = {
      ...validated,
      updatedAt: new Date(),
    };

    // Update publishedAt only if changing publish status
    const existing = await db.query.news.findFirst({ where: eq(news.id, id) });
    if (existing && !existing.isPublished && validated.isPublished) {
      updateData.publishedAt = new Date();
    } else if (existing && existing.isPublished && !validated.isPublished) {
      updateData.publishedAt = null;
    }

    await db.update(news).set(updateData).where(eq(news.id, id));

    revalidatePath('/admin/news');
    revalidatePath('/news');
    revalidatePath('/');

    return { success: true, message: 'Новину оновлено' };
  } catch (error) {
    console.error('Error updating news:', error);
    return { success: false, message: 'Помилка при оновленні новини' };
  }
}

export async function deleteNews(id: string) {
  try {
    await requireAuth();

    await db.delete(news).where(eq(news.id, id));

    revalidatePath('/admin/news');
    revalidatePath('/news');
    revalidatePath('/');

    return { success: true, message: 'Новину видалено' };
  } catch (error) {
    console.error('Error deleting news:', error);
    return { success: false, message: 'Помилка при видаленні' };
  }
}

export async function getNewsItem(id: string) {
  try {
    const item = await db.query.news.findFirst({
      where: eq(news.id, id),
    });

    return item;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

export async function getAllNews() {
  try {
    const allNews = await db.select().from(news);
    return allNews;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
