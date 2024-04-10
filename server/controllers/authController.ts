import { Request, Response, NextFunction } from "express";
import { ServerError } from "../types";
import supabase from "../utils/supabase";

const authController = {} as AuthController;

interface AuthController {
  signup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  signin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  signout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getSession: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

authController.signup = async (
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
          username: username + Math.random().toString(26).slice(5),
          display_name: username,
        },
      },
    });
    res.locals.data = data;
    if (error) {
      throw new Error(error.message);
    }
    next();
  } catch (err) {
    console.log("------------------Error------------------\n", err);
    const error = err as Error;
    const errObj: ServerError = {
      status: 500,
      errorType: "Auth",
      message: error.message,
    };
    next(errObj);
  }
};

authController.signin = async (
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
    if (error) {
      throw new Error(error.message);
    }
    next();
  } catch (err) {
    console.log("------------------Error------------------\n", err);
    const error = err as Error;
    const errObj: ServerError = {
      status: 500,
      errorType: "Auth",
      message: error.message,
    };
    next(errObj);
  }
};

authController.getSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase.auth.getSession();
    res.locals.data = data;
    next();
  } catch (err) {
    console.log("------------------Error------------------\n", err);
    const error = err as Error;
    const errObj: ServerError = {
      status: 500,
      errorType: "Auth",
      message: error.message,
    };
    next(errObj);
  }
};

authController.signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = await supabase.auth.signOut();
    next();
  } catch (err) {
    console.log("------------------Error------------------\n", err);
    const error = err as Error;
    const errObj: ServerError = {
      status: 500,
      errorType: "Auth",
      message: error.message,
    };
    next(errObj);
  }
};

export default authController;
