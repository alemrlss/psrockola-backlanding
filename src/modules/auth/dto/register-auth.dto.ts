import { PartialType } from "@nestjs/mapped-types";
import { LoginAuthDto } from "./login-auth.dto";
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import { ROLES, STATES } from "src/constants";
import { MinAge } from "src/utils/birthDate.validator";

export class RegisterAuthDtoBase extends PartialType(LoginAuthDto) {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsNumber()
  countryId: number;

  @IsNumber()
  stateId: number;

  @IsNumber()
  cityId: number;

  @IsString()
  address: string;

  @IsEnum(ROLES)
  type: ROLES;

  @IsString()
  logo: string;

  @IsString()
  phone: string;

  @IsOptional()
  ruc?: string;

  @IsOptional()
  @IsString()
  @IsISO8601(
    { strict: true },
    { message: "The date format must be 'YYYY-MM-DD'" }
  )
  @MinAge(18, { message: "The minimum age is 18 years." })
  birthDate: string;

  @IsEnum(STATES)
  @IsOptional()
  stateWallet: STATES;

  @IsEnum(STATES)
  @IsOptional()
  stateUser: STATES;

  @IsString()
  postalCode: string;
}
