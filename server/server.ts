import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { db } from './utils/db';
import userRouter from './routers/userRouter';
// import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

// app.use(cors);

app.get('/', async (req: Request, res: Response) => {});

app.use('/auth', userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
