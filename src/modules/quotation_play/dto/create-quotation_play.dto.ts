import { IsNumber, IsString } from "class-validator";

export class CalculatePriceDto {
  @IsString()
  idVideos: string;

  @IsString()
  codeScreen: string;

  @IsString()
  durations: string;
}
