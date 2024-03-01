import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateOwnerDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  picture: string;

  @IsString()
  codePhone: string;

  @IsString()
  identification: string;

  @IsString()
  phone: string;

  @IsString()
  birthDate: Date;

  @IsNumber()
  idUser: number;
}
