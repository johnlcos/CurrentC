import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const connectionString = process.env.DATABASE_URL as string;

export const client = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  prepare: false,
});
export const db = drizzle(client);
