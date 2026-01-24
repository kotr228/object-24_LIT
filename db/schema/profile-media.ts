import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

// Media attachments for profiles (presentations and videos)
export const profileMedia = sqliteTable('profile_media', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  profileId: text('profile_id').notNull(),
  mediaType: text('media_type').notNull(), // 'presentation', 'video', 'document'
  title: text('title').notNull(),
  url: text('url').notNull(), // URL to file or embed code for videos
  description: text('description'),
  order: integer('order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type ProfileMedia = typeof profileMedia.$inferSelect;
export type NewProfileMedia = typeof profileMedia.$inferInsert;
