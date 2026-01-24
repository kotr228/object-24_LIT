'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { testimonials } from '@/db/schema';
import { testimonialSchema, type TestimonialFormData } from '@/lib/validations/testimonial';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';

export async function createTestimonial(data: TestimonialFormData) {
  try {
    await requireAuth();

    const validated = testimonialSchema.parse(data);

    await db.insert(testimonials).values(validated);

    revalidatePath('/admin/testimonials');
    revalidatePath('/testimonials');
    revalidatePath('/');

    return { success: true, message: 'Відгук успішно додано' };
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return { success: false, message: 'Помилка при додаванні відгуку' };
  }
}

export async function updateTestimonial(id: string, data: TestimonialFormData) {
  try {
    await requireAuth();

    const validated = testimonialSchema.parse(data);

    await db
      .update(testimonials)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(testimonials.id, id));

    revalidatePath('/admin/testimonials');
    revalidatePath('/testimonials');
    revalidatePath('/');

    return { success: true, message: 'Відгук оновлено' };
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return { success: false, message: 'Помилка при оновленні відгуку' };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await requireAuth();

    await db.delete(testimonials).where(eq(testimonials.id, id));

    revalidatePath('/admin/testimonials');
    revalidatePath('/testimonials');
    revalidatePath('/');

    return { success: true, message: 'Відгук видалено' };
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return { success: false, message: 'Помилка при видаленні' };
  }
}

export async function getTestimonial(id: string) {
  try {
    const testimonial = await db.query.testimonials.findFirst({
      where: eq(testimonials.id, id),
    });

    return testimonial;
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return null;
  }
}

export async function getAllTestimonials() {
  try {
    const allTestimonials = await db.select().from(testimonials).orderBy(testimonials.order);
    return allTestimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}
