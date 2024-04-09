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
            .from('chatrooms')
            .select('id')
            .or(`user_1.eq.${user === null || user === void 0 ? void 0 : user.id},user_2.eq.${user === null || user === void 0 ? void 0 : user.id}`)
            .or(`user_1.eq.${req.query.userId}, user_2.eq.${req.query.userId}`);
        if (data && data[0]) {
            res.locals.room = data[0].id;
        }
        next();
    }
    catch (err) {
        console.log('------------------Error------------------\n', err);
    }
});
messageController.createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.room)
            return next();
        const { data, error } = yield supabase_1.default
            .from('chatrooms')
            .insert({ user_1: res.locals.currentUser.id, user_2: req.query.userId })
            .select();
        console.log(data);
        if (data)
            res.locals.room = data[0].id;
    }
    catch (err) {
        next(err);
    }
});
messageController.createNewMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatid, sender_id, content } = req.body;
        const { data, error } = yield supabase_1.default.from('messages').insert(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
});
messageController.getAllMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.default
            .from('messages')
            .select('content, created_at, profiles(display_name)')
            .eq('chat_id', req.query.chatId);
        if (data) {
            console.log('getAllMessages data: ', data);
            const messages = data.map((message) => {
                return {
                    display_name: message.profiles.display_name,
                    content: message.content,
                    created_at: message.created_at,
                };
            });
            // console.log('getAllMessages messages: ', messages);
            res.locals.messages = messages;
            next();
        }
    }
    catch (err) {
        console.log('------------------Error------------------\n', err);
        next(err);
    }
});
exports.default = messageController;
