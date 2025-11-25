"use strict";
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSql = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "/vault/secrets/config.env" });
class DatabaseSql {
    constructor() {
        this.db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL);
    }
    static getInstacne() {
        if (!this.instance) {
            this.instance = new DatabaseSql();
        }
        return this.instance;
    }
    getDb() {
        return this.db;
    }
}
exports.DatabaseSql = DatabaseSql;
