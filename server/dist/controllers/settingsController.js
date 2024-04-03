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
Object.defineProperty(exports, "__esModule", { value: true });
const settingsController = {};
settingsController.changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        //Compare confirmation Password and new Password
        if (confirmNewPassword !== newPassword) {
            throw new Error('Passwords do not match');
        }
        console.log(currentPassword, newPassword, confirmNewPassword);
        next();
    }
    catch (err) {
        console.log('------------------Error------------------\n', err);
        if (err instanceof Error) {
            const errObj = {
                status: 500,
                errorType: 'Confirmation',
                message: err.message,
            };
            next(errObj);
        }
    }
});
exports.default = settingsController;
