import { db } from '../models/db';
import { Request, Response, NextFunction } from 'express';

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
    // const queryStr = 'SELECT * from feeds';
    // const result = await db.query(queryStr);
    // res.locals.results = result.rows;
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
    const { message } = req.body;
    const inputs = ['Wei', true, '@weiwang0305', 200, 10, 5, message];
    // const queryStr =
    //   'INSERT INTO feeds (name,verificationstatus,uniqueidentifier,views,likes,dislikes,message) VALUES($1,$2,$3,$4,$5,$6,$7)';
    // await db.query(queryStr, inputs);
    next();
  } catch (error) {
    next(error);
  }
};

export default feedController;
