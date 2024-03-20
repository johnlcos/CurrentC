"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedController_1 = __importDefault(require("../controllers/feedController"));
const router = (0, express_1.default)();
router.get('/*', feedController_1.default.getFeed, (req, res) => res.status(200).json(res.locals.results));
router.post('/create', feedController_1.default.createFeed, feedController_1.default.getFeed, (req, res) => {
    res.status(200).json(res.locals.results);
});
exports.default = router;
