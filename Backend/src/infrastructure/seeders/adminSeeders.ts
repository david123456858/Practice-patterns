/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
// Backend/src/infrastructure/seeders/adminSeeder.ts
import { User } from '../../domain/entities/User/User'
import { roleAdmin, roleClient } from '../../domain/entities/Role/Role'
import { UserRepository } from '../repositories/User/repository'

export class AdminSeeder {
  private readonly userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  /**
   * Crea el usuario administrador por defecto si no existe
   */
  public async seedAdmin (): Promise<void> {
    try {
      console.log('🔍 Verificando existencia del usuario administrador...')

      // Obtener credenciales del admin desde variables de entorno o usar valores por defecto
      const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@ecomove.com'
      const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin123!'
      const adminId = process.env.ADMIN_ID ?? 'ADMIN001'
      const adminName = process.env.ADMIN_NAME ?? 'Administrador'
      const adminLastName = process.env.ADMIN_LASTNAME ?? 'Sistema'

      // Verificar si ya existe un admin con ese email
      const existingAdmin = await this.userRepository.findByEmail(adminEmail)

      const user = existingAdmin.find(index => index.idUser === adminId)

      if (existingAdmin.length >= 1) {
        console.log('✅ Usuario administrador ya existe')
        console.log(`   📧 Email: ${adminEmail}`)
        console.log(`   🆔 ID: ${user.idUser}`)
        console.log('')
        return
      }

      // Verificar si ya existe un usuario con ese ID
      const existingById = await this.userRepository.findById(adminId)
      const userById = existingById.find(index => index.idUser === adminId)

      if (existingById.length >= 1) {
        console.log('⚠️  Ya existe un usuario con el ID especificado')
        console.log(`   🆔 ID: ${adminId}`)
        console.log(`   📧 Email: ${userById.email}`)
        console.log('')
        return
      }

      // Crear nuevo usuario administrador
      const adminUser = new User(
        adminId,
        adminName,
        adminLastName,
        adminEmail,
        adminPassword,
        roleAdmin
      )

      // Guardar en el repositorio
      await this.userRepository.save(adminUser)

      // Mostrar mensaje de éxito con las credenciales
      console.log('✅ Usuario administrador creado exitosamente')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('📝 Credenciales del administrador:')
      console.log(`   👤 Nombre: ${adminName} ${adminLastName}`)
      console.log(`   📧 Email: ${adminEmail}`)
      console.log(`   🔑 Password: ${adminPassword}`)
      console.log(`   🆔 ID: ${adminId}`)
      console.log(`   👑 Rol: ${roleAdmin.getName()}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer inicio de sesión')
      console.log('')
    } catch (error) {
      console.error('❌ Error al crear usuario administrador:', error)
      throw error
    }
  }

  /**
   * Crea usuarios de prueba adicionales (solo en desarrollo)
   */
  public async seedTestUsers (): Promise<void> {
    const isDevelopment = process.env.NODE_ENV === 'development'

    if (!isDevelopment) {
      console.log('ℹ️  Modo producción: usuarios de prueba deshabilitados')
      return
    }

    try {
      console.log('🧪 Creando usuarios de prueba (modo desarrollo)...')

      const testUsers = [
        {
          id: 'TEST001',
          name: 'Usuario',
          lastName: 'Prueba 1',
          email: 'test1@ecomove.com',
          password: 'Test123!',
          role: roleClient
        },
        {
          id: 'TEST002',
          name: 'Usuario',
          lastName: 'Prueba 2',
          email: 'test2@ecomove.com',
          password: 'Test123!',
          role: roleClient
        }
      ]

      let created = 0

      for (const userData of testUsers) {
        const existsByEmail = await this.userRepository.findByEmail(userData.email)
        const existsById = await this.userRepository.findById(userData.id)

        if (existsByEmail.length > 1 && existsById.length > 1) {
          const testUser = new User(
            userData.id,
            userData.name,
            userData.lastName,
            userData.email,
            userData.password,
            userData.role
          )

          await this.userRepository.save(testUser)
          created++
          console.log(`   ✅ Creado: ${userData.email}`)
        }
      }

      if (created > 0) {
        console.log(`✅ ${created} usuario(s) de prueba creado(s)`)
      } else {
        console.log('✅ Los usuarios de prueba ya existen')
      }
      console.log('')
    } catch (error) {
      console.error('❌ Error al crear usuarios de prueba:', error)
    }
  }
}
