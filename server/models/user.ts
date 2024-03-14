import {
  pgTable,
  serial,
  text,
  varchar,
  pgSchema,
  uuid,
} from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  username: varchar('username', { length: 256 }),
});
