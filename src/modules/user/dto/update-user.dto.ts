import { IsOptional, IsString, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_Name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cityId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  stateId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  countryId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  postalCode?: string;
}
