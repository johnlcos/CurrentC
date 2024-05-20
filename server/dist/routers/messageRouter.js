"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageCotroller_1 = __importDefault(require("../controllers/messageCotroller"));
const router = (0, express_1.default)();
router.get("/", messageCotroller_1.default.getAllMessages, (req, res) => {
    res.status(200).json({
        success: "Successfully got messages",
        messages: res.locals.messages,
    });
});
router.post("/room", messageCotroller_1.default.getRoom, messageCotroller_1.default.createRoom, (req, res) => {
    res
        .status(200)
        .json({ success: "Successfully created room", chatId: res.locals.room });
});
router.post("/send", messageCotroller_1.default.createNewMessage, (req, res) => {
    res.status(200).json({ success: "Message Sent" });
});
router.get("/chatrooms", messageCotroller_1.default.getChatrooms, (req, res) => {
    res.status(200).json({
        success: "Successfully got chatrooms",
        chatrooms: res.locals.chatrooms,
    });
});
exports.default = router;
