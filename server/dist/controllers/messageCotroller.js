"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = __importDefault(require("../utils/supabase"));
const messageController = {};
messageController.getRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: { user }, } = yield supabase_1.default.auth.getUser();
        res.locals.currentUser = user;
        const { data, error } = yield supabase_1.default
            .from("chatrooms")
            .select("id")
            .or(`user_1.eq.${user === null || user === void 0 ? void 0 : user.id},user_2.eq.${user === null || user === void 0 ? void 0 : user.id}`)
            .or(`user_1.eq.${req.query.userId}, user_2.eq.${req.query.userId}`);
        if (data && data[0]) {
            res.locals.room = data[0].id;
        }
        next();
    }
    catch (err) {
        console.log("------------------Error------------------\n", err);
    }
});
messageController.createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.room)
            return next();
        const { data, error } = yield supabase_1.default
            .from("chatrooms")
            .insert({ user_1: res.locals.currentUser.id, user_2: req.query.userId })
            .select();
        if (data)
            res.locals.room = data[0].id;
    }
    catch (err) {
        next(err);
    }
});
messageController.createNewMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.default
            .from("messages")
            .insert(req.body)
            .select("created_at");
        res.locals.createdAt = data[0].created_at;
        next();
    }
    catch (err) {
        next(err);
    }
});
messageController.getAllMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.default
            .from("messages")
            .select("content, created_at, sender_id, profiles(display_name)")
            .eq("chat_id", req.query.chatId);
        if (data) {
            const messages = data.map((message) => {
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
    }
    catch (err) {
        console.log("------------------Error------------------\n", err);
        next(err);
    }
});
messageController.getChatrooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // obtain chatrooms where user1 or user2 is the provided id
        const { data: chatrooms, error: chatroomsError } = yield supabase_1.default
            .from("chatrooms")
            .select("id, last_message_sent_at, user_1, user_2")
            .or(`user_1.eq.${req.query.id}, user_1.eq.${req.query.id}`)
            .order("last_message_sent_at", { ascending: false });
        if (chatrooms.length > 0) {
            // create an array of ids that are not the user
            const otherIds = chatrooms.map((chatroom) => {
                return chatroom.user_1 === req.query.id
                    ? chatroom.user_2
                    : chatroom.user_1;
            });
            // obtain the profile information from the other ids
            const { data: profiles, error: profilesError } = yield supabase_1.default
                .from("profiles")
                .select("id, username, display_name, profile_avatar")
                .in("id", otherIds);
            // create a map of ids to profile info
            const idToProfileMap = profiles.reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {});
            // assemble the object to return
            const processedChatrooms = chatrooms.map((chatroom) => {
                const otherId = chatroom.user_1 === req.query.id ? chatroom.user_2 : chatroom.user_1;
                return Object.assign({ chatroomId: chatroom.id, lastMessageSentAt: chatroom.last_message_sent_at }, idToProfileMap[otherId]);
            });
            res.locals.chatrooms = processedChatrooms;
        }
        next();
    }
    catch (err) {
        console.log("------------------Error------------------\n", err);
        next(err);
    }
});
messageController.updateLastSent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.default
            .from("chatrooms")
            .update({ last_message_sent_at: res.locals.createdAt })
            .eq("id", req.body.chat_id);
        next();
    }
    catch (err) {
        console.log("------------------Error------------------\n", err);
        next(err);
    }
});
exports.default = messageController;
