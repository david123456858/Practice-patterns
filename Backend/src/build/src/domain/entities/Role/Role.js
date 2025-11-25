"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleClient = exports.roleAdmin = exports.Role = void 0;
class Role {
    constructor(idRole, name, permissions) {
        this.idRole = idRole;
        this.name = name;
        this.permissions = permissions;
    }
    // Getters
    getIdRole() { return this.idRole; }
    getName() { return this.name; }
    getPermissions() { return this.permissions; }
    // Setters
    setIdRole(idRole) { this.idRole = idRole; }
    setName(name) { this.name = name; }
    setPermissions(permissions) { this.permissions = permissions; }
}
exports.Role = Role;
exports.roleAdmin = new Role('1', 'admin', ['create_user', 'delete_user', 'update_user', 'view_user']);
exports.roleClient = new Role('2', 'client', ['view_profile', 'edit_profile']);
