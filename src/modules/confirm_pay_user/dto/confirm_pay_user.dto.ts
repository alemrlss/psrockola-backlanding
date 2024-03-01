// confirm_pay_user.dto.ts
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { MODEPLAY } from "src/constants";

export class ConfirmPayUserDto {
  @IsString()
  idVideos: string; 

  @IsString()
  codeScreen: string;

  @IsNumber()
  idUser: number;

  @IsString()
  typeModeplays: string; 
}
