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
userController.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const { data, error } = yield supabase_1.default.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username,
                },
            },
        });
        res.locals.data = data;
        console.log(error);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { data, error } = yield supabase_1.default.auth.signInWithPassword({
            email,
            password,
        });
        res.locals.loggedinUser = data;
        next();
    }
    catch (error) {
        next(error);
    }
});
userController.getSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.default.auth.getSession();
        res.locals.data = data;
        next();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
userController.getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.default
            .from('profiles')
            .select('profile_avatar, description')
            .eq('id', req.query.id);
        res.locals.userInfo = data;
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.signout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield supabase_1.default.auth.signOut();
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.searchUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof req.query.name === 'string') {
            const name = req.query.name;
            const { data, error } = yield supabase_1.default
                .from('profiles')
                .select('id, username, profile_avatar')
                .textSearch('username', name);
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
            .from('relationships')
            .select('id')
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
        if (req.query.following === 'true') {
            const { error } = yield supabase_1.default.from('relationships').insert({
                follower_id: req.query.follower,
                followed_id: req.query.followed,
            });
            res.locals.follow = 'followed';
        }
        else {
            const { error } = yield supabase_1.default.from('relationships').delete().match({
                follower_id: req.query.follower,
                followed_id: req.query.followed,
            });
            res.locals.follow = 'unfollowed';
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
        console.log('in edit profile: ', req.body);
        const { data } = yield supabase_1.default.auth.getSession();
        console.log(data);
        // update the username stored in auth metadata
        yield supabase_1.default.auth.updateUser({ data: { username: req.body.username } });
        // update info in profiles table
        const { error } = yield supabase_1.default
            .from('profiles')
            .update({
            username: req.body.username,
            description: req.body.description,
            profile_avatar: res.locals.avatarPublicUrl,
        })
            .eq('id', req.body.id);
        console.log(error);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.upsertAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!req.body.file)
            next();
        console.log('in upset avatar: ', req.file);
        const fileContent = yield fs_1.default.readFileSync(req.file.path);
        const avatarData = yield supabase_1.default.storage
            .from('avatars')
            .upload(req.body.path, fileContent, {
            cacheControl: '3600',
            upsert: true,
            contentType: (_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype,
        });
        // console.log('avatar upload error: ', error);
        // console.log('avatar data', data);
        console.log((_b = avatarData.data) === null || _b === void 0 ? void 0 : _b.path);
        const { data } = supabase_1.default.storage
            .from('avatars')
            .getPublicUrl(avatarData.data.path);
        console.log(data);
        res.locals.avatarPublicUrl = data.publicUrl;
        console.log(res.locals.avatarPublicUrl);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.default = userController;
