import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema/*',
  out: './db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: './local.db',
  },
} satisfies Config;
