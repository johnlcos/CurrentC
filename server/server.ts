import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import supabase from './utils/supabase';
import { ServerError } from './types';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

import userRouter from './routers/userRouter';
import feedRouter from './routers/feedRouter';
import settingsRouter from './routers/settingsRouter';

app.use('/auth', userRouter);
app.use('/users', userRouter);
app.use('/feed', feedRouter);
app.use('/settings', settingsRouter);

app.use('/overview', async (req: Request, res: Response) => {
  const { data, error } = await supabase.auth.getSession();
  console.log('session', data);
});

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const errorObj: ServerError = Object.assign({}, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
