import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class getAllDtoUser {
  @IsString()
  @IsNotEmpty()
    idUser!: string

  @IsString()
  @IsNotEmpty()
    name!: string

  @IsString()
  @IsNotEmpty()
    lastName!: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
    email!: string

  @IsString()
  @IsNotEmpty()
    rol!: string

  constructor (id: string, name: string, lastName: string, email: string, rol: string) {
    this.idUser = id
    this.name = name
    this.lastName = lastName
    this.email = email
    this.rol = rol
  }
}
