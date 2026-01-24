'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { registrations } from '@/db/schema';
import { registrationSchema, type RegistrationFormData } from '@/lib/validations/registration';

export async function createRegistration(data: RegistrationFormData) {
  try {
    const validated = registrationSchema.parse(data);

    await db.insert(registrations).values({
      ...validated,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath('/admin/registrations');

    return { success: true, message: 'Заявку успішно подано! Ми зв\'яжемося з вами найближчим часом.' };
  } catch (error) {
    console.error('Error creating registration:', error);
    return { success: false, message: 'Помилка при поданні заявки. Спробуйте ще раз.' };
  }
}

export async function getAllRegistrations() {
  try {
    const allRegistrations = await db.select().from(registrations).orderBy(registrations.createdAt);
    return allRegistrations;
  } catch (error) {
    console.error('Error getting registrations:', error);
    return [];
  }
}
