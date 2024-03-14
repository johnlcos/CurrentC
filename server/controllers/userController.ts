import { db } from '../utils/db';
import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const userController = {} as UserController;

const supabase = createClient(
  `${process.env.PROJECT_URL}`,
  `${process.env.PROJECT_ANON_KEY}`
);

interface UserController {
  signup: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

userController.signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });
    res.locals.data = data;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.login = async (
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

export default userController;
