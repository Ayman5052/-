import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbFile = process.env.DB_FILE || './school.db';

export async function initDb() {
  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database
  });

  const schemaPath = path.resolve('sql/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  await db.exec(schema);

  return db;
}
