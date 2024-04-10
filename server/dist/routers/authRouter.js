"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, express_1.default)();
router.post("/signup", authController_1.default.signup, (req, res) => {
    res.status(200).json({ redirectUrl: "http://localhost:3000/overview" });
});
router.post("/signin", authController_1.default.signin, (req, res) => {
    res.status(200).json({
        data: res.locals.loggedinUser,
        redirectUrl: "http://localhost:3000/overview",
    });
});
router.get("/session", authController_1.default.getSession, (req, res) => {
    res.status(200).json({ data: res.locals.data });
});
router.get("/signout", authController_1.default.signout, (req, res) => {
    res.status(200).json({
        success: "User logged out",
        redirectUrl: "http://localhost:3000/",
    });
});
exports.default = router;
