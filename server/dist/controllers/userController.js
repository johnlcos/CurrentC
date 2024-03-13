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
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userController = {};
const supabase = (0, supabase_js_1.createClient)(`${process.env.PROJECT_URL}`, `${process.env.PROJECT_ANON_KEY}`);
userController.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield req.body;
        console.log(data);
        // const { data, error } = await supabase.auth.signUp({
        //   email: 'example@email.com',
        //   password: 'example-password',
        //   options: {
        //     emailRedirectTo: 'http://localhost:3000',
        //   },
        // });
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
userController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const inputs = ['Wei', true, '@weiwang0305', 200, 10, 5, message];
        // const queryStr =
        //   'INSERT INTO feeds (name,verificationstatus,uniqueidentifier,views,likes,dislikes,message) VALUES($1,$2,$3,$4,$5,$6,$7)';
        // await db.query(queryStr, inputs);
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = userController;
