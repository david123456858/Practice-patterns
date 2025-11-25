"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(idUser, name, lastName, email, password, role, suscription) {
        this.idUser = idUser;
        this.email = email;
        this.lastName = lastName;
        this.name = name;
        this.suscription = suscription !== null && suscription !== void 0 ? suscription : null;
        this.password = password;
        this.role = role;
    }
    setCC(idUser) { this.idUser = idUser; }
    setName(name) { this.name = name; }
    setLastName(lastName) { this.lastName = lastName; }
    setEmail(email) { this.email = email; }
    setSuscription(suscription) { this.suscription = suscription; }
    setPassword(password) { this.password = password; }
    setRole(role) { this.role = role; }
    getCC() { return this.idUser; }
    getName() { return this.name; }
    getLastName() { return this.lastName; }
    getEmail() { return this.email; }
    getSuscription() { return this.suscription; }
    getPassword() { return this.password; }
    getRole() { return this.role; }
    toJSON() {
        const _a = this, { password } = _a, rest = __rest(_a, ["password"]);
        return rest;
    }
}
exports.User = User;
