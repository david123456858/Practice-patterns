import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserDtoCreate {
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
    password!: string

  @IsString()
  @IsNotEmpty()
    password2!: string
}
