import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserDtoCreate {
  @IsString()
  @IsNotEmpty()
    cc!: string

  @IsString()
  @IsNotEmpty()
    name!: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
    email!: string

  @IsString()
  @IsNotEmpty()
    suscriptionId!: string
}
