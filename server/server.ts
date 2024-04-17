import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import supabase from './utils/supabase';
import { ServerError } from './types';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

import userRouter from './routers/userRouter';
import feedRouter from './routers/feedRouter';
import settingsRouter from './routers/settingsRouter';
import authRouter from './routers/authRouter';
import messageRouter from './routers/messageRouter';

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/feed', feedRouter);
app.use('/settings', settingsRouter);
app.use('/messages', messageRouter);

app.use('/overview', async (req: Request, res: Response) => {
  const { data, error } = await supabase.auth.getSession();
  // console.log('session', data);
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json('working backend');
});

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const errorObj: ServerError = Object.assign({}, err);

  console.log(errorObj);
  return res.status(errorObj.status).json({ error: errorObj });
});

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}}`);

  socket.on('join_room', (data) => {
    const { chatId, user1, user2 } = data;
    socket.join(chatId);
    console.log(`user-${user1} joined room - ${chatId}`);
  });

  socket.on('send_message', (data) => {
    io.in(data.chat_id).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
