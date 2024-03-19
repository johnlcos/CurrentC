import { db } from '../utils/db';
import { Request, Response, NextFunction } from 'express';
import supabase from '../utils/supabase';

const feedController = {} as FeedController;

interface FeedController {
  getAllFeed: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  createFeed: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

feedController.getAllFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase
      .from('feeds')
      .select(
        'id, created_at, content, like_count, dislike_count, profiles(username)'
      );
    console.log('feeds data: ', data);
    res.locals.results = data;
    next();
  } catch (error) {
    next(error);
  }
};

feedController.createFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, authorId } = req.body;
    const { error } = await supabase
      .from('feeds')
      .insert({ content: message, author: authorId });
    next();
  } catch (error) {
    next(error);
  }
};

export default feedController;
