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
exports.AdminSeeder = void 0;
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
// Backend/src/infrastructure/seeders/adminSeeder.ts
const User_1 = require("../../domain/entities/User/User");
const Role_1 = require("../../domain/entities/Role/Role");
class AdminSeeder {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * Crea el usuario administrador por defecto si no existe
     */
    seedAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                console.log('🔍 Verificando existencia del usuario administrador...');
                // Obtener credenciales del admin desde variables de entorno o usar valores por defecto
                const adminEmail = (_a = process.env.ADMIN_EMAIL) !== null && _a !== void 0 ? _a : 'admin@ecomove.com';
                const adminPassword = (_b = process.env.ADMIN_PASSWORD) !== null && _b !== void 0 ? _b : 'Admin123!';
                const adminId = (_c = process.env.ADMIN_ID) !== null && _c !== void 0 ? _c : 'ADMIN001';
                const adminName = (_d = process.env.ADMIN_NAME) !== null && _d !== void 0 ? _d : 'Administrador';
                const adminLastName = (_e = process.env.ADMIN_LASTNAME) !== null && _e !== void 0 ? _e : 'Sistema';
                // Verificar si ya existe un admin con ese email
                const existingAdmin = yield this.userRepository.findByEmail(adminEmail);
                const user = existingAdmin.find(index => index.idUser === adminId);
                if (existingAdmin.length >= 1) {
                    console.log('✅ Usuario administrador ya existe');
                    console.log(`   📧 Email: ${adminEmail}`);
                    console.log(`   🆔 ID: ${user.idUser}`);
                    console.log('');
                    return;
                }
                // Verificar si ya existe un usuario con ese ID
                const existingById = yield this.userRepository.findById(adminId);
                const userById = existingById.find(index => index.idUser === adminId);
                if (existingById.length >= 1) {
                    console.log('⚠️  Ya existe un usuario con el ID especificado');
                    console.log(`   🆔 ID: ${adminId}`);
                    console.log(`   📧 Email: ${userById.email}`);
                    console.log('');
                    return;
                }
                // Crear nuevo usuario administrador
                const adminUser = new User_1.User(adminId, adminName, adminLastName, adminEmail, adminPassword, Role_1.roleAdmin);
                // Guardar en el repositorio
                yield this.userRepository.save(adminUser);
                // Mostrar mensaje de éxito con las credenciales
                console.log('✅ Usuario administrador creado exitosamente');
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log('📝 Credenciales del administrador:');
                console.log(`   👤 Nombre: ${adminName} ${adminLastName}`);
                console.log(`   📧 Email: ${adminEmail}`);
                console.log(`   🔑 Password: ${adminPassword}`);
                console.log(`   🆔 ID: ${adminId}`);
                console.log(`   👑 Rol: ${Role_1.roleAdmin.getName()}`);
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer inicio de sesión');
                console.log('');
            }
            catch (error) {
                console.error('❌ Error al crear usuario administrador:', error);
                throw error;
            }
        });
    }
    /**
     * Crea usuarios de prueba adicionales (solo en desarrollo)
     */
    seedTestUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const isDevelopment = process.env.NODE_ENV === 'development';
            if (!isDevelopment) {
                console.log('ℹ️  Modo producción: usuarios de prueba deshabilitados');
                return;
            }
            try {
                console.log('🧪 Creando usuarios de prueba (modo desarrollo)...');
                const testUsers = [
                    {
                        id: 'TEST001',
                        name: 'Usuario',
                        lastName: 'Prueba 1',
                        email: 'test1@ecomove.com',
                        password: 'Test123!',
                        role: Role_1.roleClient
                    },
                    {
                        id: 'TEST002',
                        name: 'Usuario',
                        lastName: 'Prueba 2',
                        email: 'test2@ecomove.com',
                        password: 'Test123!',
                        role: Role_1.roleClient
                    }
                ];
                let created = 0;
                for (const userData of testUsers) {
                    const existsByEmail = yield this.userRepository.findByEmail(userData.email);
                    const existsById = yield this.userRepository.findById(userData.id);
                    if (existsByEmail.length > 1 && existsById.length > 1) {
                        const testUser = new User_1.User(userData.id, userData.name, userData.lastName, userData.email, userData.password, userData.role);
                        yield this.userRepository.save(testUser);
                        created++;
                        console.log(`   ✅ Creado: ${userData.email}`);
                    }
                }
                if (created > 0) {
                    console.log(`✅ ${created} usuario(s) de prueba creado(s)`);
                }
                else {
                    console.log('✅ Los usuarios de prueba ya existen');
                }
                console.log('');
            }
            catch (error) {
                console.error('❌ Error al crear usuarios de prueba:', error);
            }
        });
    }
}
exports.AdminSeeder = AdminSeeder;
