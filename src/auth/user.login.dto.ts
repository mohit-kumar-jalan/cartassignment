import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
