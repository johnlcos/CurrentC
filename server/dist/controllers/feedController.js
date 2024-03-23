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
const feedController = {};
feedController.getFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    if (req.query.id) {
        try {
            const { data, error } = yield supabase_1.default
                .from("feeds")
                .select("id, created_at, content, like_count, dislike_count, profiles(username)")
                .eq("authorId", req.query.id);
            res.locals.results = data;
            next();
        }
        catch (error) {
            next(error);
        }
    }
    else {
        try {
            const { data, error } = yield supabase_1.default
                .from("feeds")
                .select("id, created_at, content, like_count, dislike_count, profiles(username)")
                .order("created_at", { ascending: false });
            res.locals.results = data;
            next();
        }
        catch (error) {
            next(error);
        }
    }
});
feedController.createFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, authorId } = req.body;
        const { error } = yield supabase_1.default
            .from("feeds")
            .insert({ content: message, authorId });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = feedController;
