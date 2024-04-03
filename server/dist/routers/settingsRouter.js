"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settingsController_1 = __importDefault(require("../controllers/settingsController"));
const router = (0, express_1.default)();
router.post('/password', settingsController_1.default.changePassword, (req, res) => {
    res.status(200).json({});
});
exports.default = router;
