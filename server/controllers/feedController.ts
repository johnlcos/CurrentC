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
  getFollowedFeed: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  createFeed: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  mergeFeeds: (
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
          "id, created_at, content, like_count, dislike_count, author_id, profiles(username, profile_avatar, display_name)"
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
          "id, created_at, content, like_count, dislike_count, author_id, profiles(username, profile_avatar, display_name)"
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
        "id, created_at, content, like_count, dislike_count, author_id, profiles(username, profile_avatar, display_name)"
      )
      .match({ type: "POST", author_id: req.query.id })
      .order("created_at", { ascending: false });

    res.locals.profileFeed = data;
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
        "id, created_at, content, like_count, dislike_count, author_id, profiles(username, profile_avatar, display_name)"
      )
      .match({ type: "REPLY", reply_to_id })
      .order("created_at", { ascending: false });
    res.locals.results = data;
    next();
  } catch (error) {
    next(error);
  }
};

feedController.getFollowedFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const follower_id = req.query.id;
    const { data, error } = await supabase
      .from("feed_with_relationship")
      .select(
        "id, created_at, content, like_count, dislike_count, author_id, username, profile_avatar, display_name"
      )
      .or(`follower_id.eq.${follower_id}`)
      .order("created_at", { ascending: false });
    res.locals.followedFeed = data;
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
      const { message, author_id } = req.body;
      const { error } = await supabase
        .from("feeds")
        .insert({ content: message, author_id });
      next();
    } catch (error) {
      next(error);
    }
  } else if (req.body.type === "REPLY") {
    try {
      const { message, author_id, replyToId, type } = req.body;
      const { error } = await supabase
        .from("feeds")
        .insert({ content: message, author_id, reply_to_id: replyToId, type });
      next();
    } catch (error) {
      next(error);
    }
  }
};

feedController.mergeFeeds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = [
      ...res.locals.profileFeed,
      ...res.locals.followedFeed,
    ].sort((a, b) => {
      a.created_at = new Date(a.created_at);
      b.created_at = new Date(b.created_at);
      return b.created_at - a.created_at;
    });
    res.locals.results = results;
    next();
  } catch (error) {
    next(error);
  }
};

export default feedController;
