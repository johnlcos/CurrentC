import { pgTable, serial, text, varchar, pgSchema } from 'drizzle-orm/pg-core';

export const mySchema = pgSchema('my_schema');

export const mySchemaFeed = mySchema.table('feeds', {
  id: serial('id').primaryKey(),
});
