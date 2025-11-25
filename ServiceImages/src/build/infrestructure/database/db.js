/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from "dotenv";
dotenv.config({ path: "/vault/secrets/images.env" });
export class DatabaseSql {
    static instance;
    db;
    constructor() {
        this.db = drizzle(process.env.DATABASE_URL);
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
