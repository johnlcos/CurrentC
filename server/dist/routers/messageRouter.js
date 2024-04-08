"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageCotroller_1 = __importDefault(require("../controllers/messageCotroller"));
const router = (0, express_1.default)();
router.post('/room', messageCotroller_1.default.getRoom, messageCotroller_1.default.createRoom, (req, res) => {
    res.status(200).json({});
});
exports.default = router;
