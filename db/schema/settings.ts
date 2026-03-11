import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const settings = sqliteTable('settings', {
  id: text('id').primaryKey().default('main'),
  schoolName: text('school_name').notNull().default('Олександрійський ліцей інформаційних технологій'),
  schoolDescription: text('school_description').notNull().default('Сучасна освіта, професійні вчителі, індивідуальний підхід до кожного учня.'),
  address: text('address').notNull().default('м. Олександрія, Кіровоградська область'),
  phone: text('phone').notNull().default('+38 (012) 345-67-89'),
  email: text('email').notNull().default('info@lit.kr.ua'),
  logoType: text('logo_type').$type<'new' | 'old'>().notNull().default('new'),
  updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString()),
});
