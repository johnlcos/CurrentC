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
            .select('id, username');
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
exports.default = userController;
