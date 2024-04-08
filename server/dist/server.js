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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const supabase_1 = __importDefault(require("./utils/supabase"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const feedRouter_1 = __importDefault(require("./routers/feedRouter"));
const settingsRouter_1 = __importDefault(require("./routers/settingsRouter"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
app.use("/auth", authRouter_1.default);
app.use("/users", userRouter_1.default);
app.use("/feed", feedRouter_1.default);
app.use("/settings", settingsRouter_1.default);
app.use("/overview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.default.auth.getSession();
    console.log("session", data);
}));
app.use((err, req, res, next) => {
    const errorObj = Object.assign({}, err);
    console.log(errorObj);
    return res.status(errorObj.status).json({ error: errorObj });
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
