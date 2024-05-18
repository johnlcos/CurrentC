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
            throw new Error("Do Not Match");
        }
        const { data: { user }, } = yield supabase_1.default.auth.getUser();
        if (user && user.email) {
            const { data } = yield supabase_1.default.rpc("changepassword", {
                current_plain_password: currentPassword,
                new_plain_password: newPassword,
                current_id: user.id,
            });
            if (data === "incorrect") {
                console.log("error");
                throw new Error("Incorrect");
            }
        }
        next();
    }
    catch (err) {
        console.log("------------------Error------------------\n", err);
        const error = err;
        if (error.message === "Do Not Match") {
            const errObj = {
                status: 500,
                errorType: "Confirmation",
                message: "Passwords do not match",
            };
            next(errObj);
        }
        else if (error.message === "Incorrect") {
            const errObj = {
                status: 500,
                errorType: "Incorrect",
                message: "The password you entered was incorrect",
            };
            next(errObj);
        }
    }
});
settingsController.accountDeletion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield supabase_1.default.rpc("delete_user");
        const { error } = yield supabase_1.default.auth.signOut();
        next();
    }
    catch (err) {
        console.log("------------------Error------------------\n", err);
        next(err);
    }
});
exports.default = settingsController;
