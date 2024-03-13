import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from './models/user';

dotenv.config();

const connectionString = process.env.DATABASE_URL as string;
const PORT = process.env.PORT || 8080;
const app: Express = express();

export const client = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  prepare: false,
});
export const db = drizzle(client);

app.get('/', async (req: Request, res: Response) => {
  const allUsers = await db.select().from(users);
  console.log(allUsers);
  return allUsers;
});

// app.use('/api/feed', feedRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
