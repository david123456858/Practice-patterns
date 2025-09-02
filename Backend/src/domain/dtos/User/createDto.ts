import { IsNotEmpty, IsString } from 'class-validator'

export class UserRepositoryCreate {
  @IsString()
  @IsNotEmpty()
    cc!: string

  @IsString()
  @IsNotEmpty()
    name!: string

  @IsString()
  @IsNotEmpty()
    email!: string

  @IsString()
  @IsNotEmpty()
    suscriptionId!: string
}
