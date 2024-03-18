import { db } from '../utils/db';
import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import supabase from '../utils/supabase';

const userController = {} as UserController;

interface UserController {
  signup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  signin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  signout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getSession: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getUserInfo: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
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

userController.signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    res.locals.loggedinUser = data;
    next();
  } catch (error) {
    next(error);
  }
};

userController.getSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase.auth.getSession();
    res.locals.data = data;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

userController.getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username');
    console.log(data);
    res.locals.userInfo = data;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userController.signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = await supabase.auth.signOut();
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default userController;
