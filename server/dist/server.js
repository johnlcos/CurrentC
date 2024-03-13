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
exports.db = exports.client = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const user_1 = require("./models/user");
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
exports.client = (0, postgres_1.default)(connectionString, {
    ssl: { rejectUnauthorized: false },
    prepare: false,
});
exports.db = (0, postgres_js_1.drizzle)(exports.client);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield exports.db.select().from(user_1.users);
    console.log(allUsers);
    return allUsers;
}));
// app.use('/api/feed', feedRouter);
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
