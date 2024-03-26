import { db } from "../utils/db";
import { Request, Response, NextFunction } from "express";
import supabase from "../utils/supabase";

const feedController = {} as FeedController;

interface FeedController {
  getFeed: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getProfileFeed: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getReplyFeed: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getMainFeed: (
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

feedController.getFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.id) {
    // get a single post when clicked on
    try {
      const { data, error } = await supabase
        .from("feeds")
        .select(
          "id, created_at, content, like_count, dislike_count, profiles(username)"
        )
        .eq("id", req.query.id);
      res.locals.results = data;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    // get the total feed to display on explore
    try {
      const { data, error } = await supabase
        .from("feeds")
        .select(
          "id, created_at, content, like_count, dislike_count, profiles(username)"
        )
        .eq("type", "POST")
        .order("created_at", { ascending: false });
      res.locals.results = data;
      next();
    } catch (error) {
      next(error);
    }
  }
};

feedController.getProfileFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase
      .from("feeds")
      .select(
        "id, created_at, content, like_count, dislike_count, profiles(username)"
      )
      .match({ type: "POST", authorId: req.query.id });
    res.locals.results = data;
    next();
  } catch (error) {
    next(error);
  }
};

feedController.getReplyFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reply_to_id = req.query.id;
    const { data, error } = await supabase
      .from("feeds")
      .select(
        "id, created_at, content, like_count, dislike_count, profiles(username)"
      )
      .match({ type: "REPLY", reply_to_id });
    res.locals.results = data;
    next();
  } catch (error) {
    next(error);
  }
};

feedController.getMainFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const follower_id = req.query.id;
    const { data, error } = await supabase
      .from("feeds")
      .select(
        "id, created_at, content, like_count, dislike_count, profiles(username)"
      )
      .eq("type", "POST")
      .order("created_at", { ascending: false });
    // console.log("getMainFeed data: ", data);
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
  if (req.body.type === "POST") {
    try {
      const { message, authorId } = req.body;
      const { error } = await supabase
        .from("feeds")
        .insert({ content: message, authorId });
      next();
    } catch (error) {
      next(error);
    }
  } else if (req.body.type === "REPLY") {
    try {
      const { message, authorId, replyToId, type } = req.body;
      const { error } = await supabase
        .from("feeds")
        .insert({ content: message, authorId, reply_to_id: replyToId, type });
      next();
    } catch (error) {
      next(error);
    }
  }
};

export default feedController;
