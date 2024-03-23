import { db } from "../utils/db";
import { Request, Response, NextFunction } from "express";
import supabase from "../utils/supabase";

const feedController = {} as FeedController;

interface FeedController {
  getFeed: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  createFeed: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

feedController.getFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.query);
  if (req.query.id) {
    try {
      const { data, error } = await supabase
        .from("feeds")
        .select(
          "id, created_at, content, like_count, dislike_count, profiles(username)"
        )
        .eq("authorId", req.query.id);
      res.locals.results = data;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const { data, error } = await supabase
        .from("feeds")
        .select(
          "id, created_at, content, like_count, dislike_count, profiles(username)"
        )
        .order("created_at", { ascending: false });
      res.locals.results = data;
      next();
    } catch (error) {
      next(error);
    }
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
      .from("feeds")
      .insert({ content: message, authorId });
    next();
  } catch (error) {
    next(error);
  }
};

export default feedController;
