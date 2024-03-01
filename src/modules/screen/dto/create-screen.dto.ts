import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateScreenDto {
  @IsString()
  name: string;

  @IsNumber()
  idCompany: number;

  @IsString()
  password: string;
}
