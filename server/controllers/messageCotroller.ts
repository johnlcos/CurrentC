import { Request, Response, NextFunction } from "express";
import { ServerError } from "../types";
import supabase from "../utils/supabase";

const messageController = {} as MessageController;

interface MessageController {
  getRoom: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  createRoom: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  createNewMessage: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getAllMessages: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getChatrooms: (
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
      .from("chatrooms")
      .select("id")
      .or(`user_1.eq.${user?.id},user_2.eq.${user?.id}`)
      .or(`user_1.eq.${req.query.userId}, user_2.eq.${req.query.userId}`);
    if (data && data[0]) {
      res.locals.room = data[0].id;
    }
    next();
  } catch (err) {
    console.log("------------------Error------------------\n", err);
  }
};

messageController.createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.locals.room) return next();
    const { data, error } = await supabase
      .from("chatrooms")
      .insert({ user_1: res.locals.currentUser.id, user_2: req.query.userId })
      .select();
    if (data) res.locals.room = data[0].id;
  } catch (err) {
    next(err);
  }
};

messageController.createNewMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatid, sender_id, content } = req.body;
    const { data, error } = await supabase.from("messages").insert(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

messageController.getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("content, created_at, sender_id, profiles(display_name)")
      .eq("chat_id", req.query.chatId);
    if (data) {
      const messages = data.map((message: any) => {
        return {
          display_name: message.profiles.display_name,
          content: message.content,
          created_at: message.created_at,
          sender_id: message.sender_id,
        };
      });
      res.locals.messages = messages;
      next();
    }
  } catch (err) {
    console.log("------------------Error------------------\n", err);
    next(err);
  }
};

messageController.getChatrooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase
      .from("chatrooms")
      .select("content, created_at, sender_id, profiles(display_name)")
      .eq("chat_id", req.query.chatId);
    if (data) {
      const messages = data.map((message: any) => {
        return {
          display_name: message.profiles.display_name,
          content: message.content,
          created_at: message.created_at,
          sender_id: message.sender_id,
        };
      });
      res.locals.messages = messages;
      next();
    }
  } catch (err) {
    console.log("------------------Error------------------\n", err);
    next(err);
  }
};

export default messageController;
