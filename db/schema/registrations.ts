import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const registrations = sqliteTable('registrations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  // Child information
  childFirstName: text('child_first_name').notNull(),
  childLastName: text('child_last_name').notNull(),
  childMiddleName: text('child_middle_name'),
  childBirthDate: text('child_birth_date').notNull(),

  // School information
  currentSchool: text('current_school').notNull(),
  targetGrade: integer('target_grade').notNull(), // 7, 8, 9, 10
  preferredProfile: text('preferred_profile').notNull(), // IT профіль 7-8 клас, etc.

  // Contact information
  homeAddress: text('home_address').notNull(),
  contactPhone: text('contact_phone').notNull(),
  parentNames: text('parent_names').notNull(), // ПІБ батьків/опікунів

  // Status
  status: text('status').notNull().default('pending'), // pending, reviewed, approved, rejected
  notes: text('notes'),

  // Timestamps
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
