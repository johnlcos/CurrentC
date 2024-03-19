import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import supabase from './utils/supabase';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

import userRouter from './routers/userRouter';
import feedRouter from './routers/feedRouter';

app.use('/auth', userRouter);
app.use('/feed', feedRouter);

app.use('/overview', async (req: Request, res: Response) => {
  const { data, error } = await supabase.auth.getSession();
  console.log('session', data);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
