import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
} from "class-validator";
import { MODEPLAY } from "src/constants";
import { City } from "src/entities/city.entity";
import { Country } from "src/entities/country.entity";
import { State } from "src/entities/state.entity";

export class CreatePlayListCompanyDto {
  @IsString()
  idVideo: string;

  @IsNumber()
  idCompany: number;

  @IsNumber()
  idUser: number;

  //  @IsString()
  //  duration: string;

  @IsNumber()
  state_music: number;

  @IsString()
  codeScreen: string;

  @IsObject()
  country: Country;

  @IsObject()
  state: State;

  @IsObject()
  city: City;

  @IsNumber()
  typeModeplay: number;

  @IsString()
  title: string;

  @IsString()
  channelTitle: string;

  @IsString()
  thumbnail: string;

  @IsString()
  duration: number;
}
