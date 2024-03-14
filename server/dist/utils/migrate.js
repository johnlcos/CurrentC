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
require("dotenv/config");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const db_1 = require("./db");
const migrateDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // This will run migrations on the database, skipping the ones already applied
    yield (0, migrator_1.migrate)(db_1.db, { migrationsFolder: './drizzle' });
    // Don't forget to close the connection, otherwise the script will hang
    yield db_1.client.end();
});
migrateDB();
