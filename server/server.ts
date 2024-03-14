import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { db } from './utils/db';
import userRouter from './routers/userRouter';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {});

app.use('/auth', userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
