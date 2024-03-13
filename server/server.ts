import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// app.use('/api/feed', feedRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
