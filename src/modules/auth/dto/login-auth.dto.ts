import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  adminCode: string;
}
