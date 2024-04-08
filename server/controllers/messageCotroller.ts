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

    console.log('data', data);
    console.log('error', error);

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
  if (res.locals.room) next();
  const { data, error } = await supabase
    .from('chatrooms')
    .insert({ user_1: res.locals.currentUser.id, user_2: req.query.userId });
};

export default messageController;
