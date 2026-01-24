'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { teachers } from '@/db/schema';
import { teacherSchema, type TeacherFormData } from '@/lib/validations/teacher';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';

export async function createTeacher(data: TeacherFormData) {
  try {
    await requireAuth();

    const validated = teacherSchema.parse(data);

    await db.insert(teachers).values(validated);

    revalidatePath('/admin/teachers');
    revalidatePath('/teachers');

    return { success: true, message: 'Вчителя успішно додано' };
  } catch (error) {
    console.error('Error creating teacher:', error);
    return { success: false, message: 'Помилка при додаванні вчителя' };
  }
}

export async function updateTeacher(id: string, data: TeacherFormData) {
  try {
    await requireAuth();

    const validated = teacherSchema.parse(data);

    await db
      .update(teachers)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(teachers.id, id));

    revalidatePath('/admin/teachers');
    revalidatePath('/teachers');

    return { success: true, message: 'Дані вчителя оновлено' };
  } catch (error) {
    console.error('Error updating teacher:', error);
    return { success: false, message: 'Помилка при оновленні даних' };
  }
}

export async function deleteTeacher(id: string) {
  try {
    await requireAuth();

    await db.delete(teachers).where(eq(teachers.id, id));

    revalidatePath('/admin/teachers');
    revalidatePath('/teachers');

    return { success: true, message: 'Вчителя видалено' };
  } catch (error) {
    console.error('Error deleting teacher:', error);
    return { success: false, message: 'Помилка при видаленні' };
  }
}

export async function getTeacher(id: string) {
  try {
    const teacher = await db.query.teachers.findFirst({
      where: eq(teachers.id, id),
    });

    return teacher;
  } catch (error) {
    console.error('Error fetching teacher:', error);
    return null;
  }
}

export async function getAllTeachers() {
  try {
    const allTeachers = await db.select().from(teachers).orderBy(teachers.order);
    return allTeachers;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
}
