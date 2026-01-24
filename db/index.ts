import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';
import { mkdirSync, existsSync } from 'fs';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

let _db: BetterSQLite3Database<typeof schema> | null = null;

export function getDb(): BetterSQLite3Database<typeof schema> {
  if (!_db) {
    const dbPath = path.join(process.cwd(), process.env.DATABASE_URL || 'local.db');
    const dbDir = path.dirname(dbPath);

    // Ensure directory exists
    if (!existsSync(dbDir)) {
      mkdirSync(dbDir, { recursive: true });
    }

    const sqlite = new Database(dbPath);
    _db = drizzle(sqlite, { schema });
  }
  return _db;
}

// For convenience
export const db = getDb();
