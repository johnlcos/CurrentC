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
const settingsController = {};
settingsController.changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        //Compare confirmation Password and new Password
        if (confirmNewPassword !== newPassword) {
            throw new Error('Passwords do not match');
        }
        console.log(currentPassword, newPassword, confirmNewPassword);
        const { data: { user }, } = yield supabase_1.default.auth.getUser();
        console.log(user);
        if (user && user.email) {
            console.log('in here');
            const { data, error } = yield supabase_1.default.rpc('changepassword', {
                current_plain_password: currentPassword,
                new_plain_password: newPassword,
                current_id: user.id,
            });
            console.log('data', data);
            console.log('error', error);
        }
        // const {data,error} = await supabase.auth.signInWithPassword({
        //   password: currentPassword
        // })
        next();
    }
    catch (err) {
        console.log('------------------Error------------------\n', err);
        const error = err;
        const errObj = {
            status: 500,
            errorType: 'Confirmation',
            message: error.message,
        };
        next(errObj);
    }
});
exports.default = settingsController;
