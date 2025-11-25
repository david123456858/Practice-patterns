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
exports.UserRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const data_1 = require("../../database/data");
const User_1 = require("../../database/Schemas/User");
class UserRepository {
    constructor() {
        this.pool = data_1.DatabaseSql.getInstacne().getDb();
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.select().from(User_1.users);
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.insert(User_1.users).values({
                idUser: data.getCC(),
                name: data.getName(),
                lastName: data.getLastName(),
                email: data.getEmail(),
                password: data.getPassword(),
                role: data.getRole().getName()
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.delete(User_1.users).where((0, drizzle_orm_1.eq)(User_1.users.email, id));
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.update(User_1.users).set({
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                role: data.role
            }).where((0, drizzle_orm_1.eq)(User_1.users.email, data.email));
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.select().from(User_1.users).where((0, drizzle_orm_1.eq)(User_1.users.email, email));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.select().from(User_1.users).where((0, drizzle_orm_1.eq)(User_1.users.idUser, id));
        });
    }
}
exports.UserRepository = UserRepository;
