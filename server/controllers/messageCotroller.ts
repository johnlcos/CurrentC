import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../types';
import supabase from '../utils/supabase';

const messageController = {} as AuthController;

interface AuthController {
  getRoom: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  createRoom: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

messageController.getRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    res.locals.currentUser = user;
    const { data, error } = await supabase
      .from('chatrooms')
      .select('id')
      .or(`user_1.eq.${user?.id},user_2.eq.${user?.id}`)
      .or(`user_1.eq.${req.query.userId}, user_2.eq.${req.query.userId}`);
    if (data && data[0]) {
      res.locals.room = data[0].id;
    }
    next();
  } catch (err) {
    console.log('------------------Error------------------\n', err);
  }
};

messageController.createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.room) return next();
  const { data, error } = await supabase
    .from('chatrooms')
    .insert({ user_1: res.locals.currentUser.id, user_2: req.query.userId })
    .select();
  console.log(data);
  if (data) res.locals.room = data[0].id;
};

export default messageController;
