import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const news = sqliteTable('news', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  category: text('category').notNull().default('general'),
  isPublished: integer('is_published', { mode: 'boolean' })
    .notNull()
    .default(true),
  publishedAt: integer('published_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;
