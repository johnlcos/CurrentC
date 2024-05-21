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
    // obtain chatrooms where user1 or user2 is the provided id
    const { data: chatrooms, error: chatroomsError } = await supabase
      .from("chatrooms")
      .select("id, last_message_sent_at, user_1, user_2")
      .or(`user_1.eq.${req.query.id}, user_1.eq.${req.query.id}`);
    if (chatrooms.length > 0) {
      // create an array of ids that are not the user
      const otherIds = chatrooms.map((chatroom: any) => {
        return chatroom.user_1 === req.query.id
          ? chatroom.user_2
          : chatroom.user_1;
      });
      // obtain the profile information from the other ids
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, username, display_name, profile_avatar")
        .in("id", otherIds);
      // create a map of ids to profile info
      const idToProfileMap = profiles.reduce((acc: any, curr: any) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      // assemble the object to return
      const processedChatrooms = chatrooms.map((chatroom: any) => {
        const otherId =
          chatroom.user_1 === req.query.id ? chatroom.user_2 : chatroom.user_1;
        return {
          chatroomId: chatroom.id,
          lastMessageSentAt: chatroom.last_message_sent_at,
          ...idToProfileMap[otherId],
        };
      });
      res.locals.chatrooms = processedChatrooms;
    }
    next();
  } catch (err) {
    console.log("------------------Error------------------\n", err);
    next(err);
  }
};

export default messageController;
