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
const fs_1 = __importDefault(require("fs"));
const userController = {};
userController.getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.default
            .from("profiles")
            .select("profile_avatar, description, id, display_name")
            .eq("username", req.query.user);
        res.locals.userInfo = data;
        if (data)
            res.locals.id = data[0].id;
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.searchUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof req.query.name === "string") {
            const name = req.query.name;
            const { data, error } = yield supabase_1.default
                .from("profiles")
                .select("id, username, profile_avatar, display_name")
                .textSearch("display_name", name);
            res.locals.searchResults = data;
        }
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.checkIsFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.default
            .from("relationships")
            .select("id")
            .match({
            follower_id: req.query.follower,
            followed_id: req.query.followed,
        });
        if (data) {
            if (data.length > 0)
                res.locals.isFollowing = true;
            else
                res.locals.isFollowing = false;
        }
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.toggleFollow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.following === "true") {
            const { error } = yield supabase_1.default.from("relationships").insert({
                follower_id: req.query.follower,
                followed_id: req.query.followed,
            });
            res.locals.follow = "followed";
        }
        else {
            const { error } = yield supabase_1.default.from("relationships").delete().match({
                follower_id: req.query.follower,
                followed_id: req.query.followed,
            });
            res.locals.follow = "unfollowed";
        }
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.editProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // update the username stored in auth metadata
        const updateUserResponse = yield supabase_1.default.auth.updateUser({
            data: {
                display_name: req.body.displayName,
                profile_avatar: res.locals.avatarPublicUrl,
            },
        });
        // update info in profiles table
        const { error } = yield supabase_1.default
            .from("profiles")
            .update({
            display_name: req.body.displayName,
            description: req.body.description,
            profile_avatar: res.locals.avatarPublicUrl,
        })
            .eq("id", req.body.id);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.upsertAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.file) {
            return next();
        }
        console.log(req.file);
        const fileContent = fs_1.default.readFileSync(req.file.path);
        const avatarData = yield supabase_1.default.storage
            .from("avatars")
            .upload(req.body.path, fileContent, {
            cacheControl: "3600",
            upsert: true,
            contentType: (_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype,
        });
        if (avatarData.data) {
            const { data } = yield supabase_1.default.storage
                .from("avatars")
                .getPublicUrl(avatarData.data.path);
            res.locals.avatarPublicUrl = data.publicUrl;
        }
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.getFollowCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const following = yield supabase_1.default
            .from("relationships")
            .select("*", { count: "exact", head: true })
            .eq("follower_id", res.locals.id);
        const followers = yield supabase_1.default
            .from("relationships")
            .select("*", { count: "exact", head: true })
            .eq("followed_id", res.locals.id);
        res.locals.following = following.count;
        res.locals.followers = followers.count;
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.default = userController;
