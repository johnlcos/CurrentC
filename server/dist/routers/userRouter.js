"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.default)();
router.post('/signup', userController_1.default.signup, (req, res) => {
    res.status(200).json({ redirectUrl: 'http://localhost:3000/' });
});
router.get('/getSession', userController_1.default.getSession, (req, res) => {
    res.status(200).json({ data: res.locals.data });
});
exports.default = router;
