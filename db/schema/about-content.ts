import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

// Flexible content sections for About page
export const aboutSections = sqliteTable('about_sections', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  sectionType: text('section_type').notNull(), // 'text', 'media_gallery', 'values', 'reasons'
  title: text('title').notNull(),
  content: text('content'), // JSON for complex content
  order: integer('order').notNull().default(0),
  isPublished: integer('is_published', { mode: 'boolean' })
    .notNull()
    .default(true),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Media items for About page (photos and videos)
export const aboutMedia = sqliteTable('about_media', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  mediaType: text('media_type').notNull(), // 'image', 'video'
  url: text('url').notNull(),
  caption: text('caption'),
  order: integer('order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type AboutSection = typeof aboutSections.$inferSelect;
export type NewAboutSection = typeof aboutSections.$inferInsert;
export type AboutMedia = typeof aboutMedia.$inferSelect;
export type NewAboutMedia = typeof aboutMedia.$inferInsert;
