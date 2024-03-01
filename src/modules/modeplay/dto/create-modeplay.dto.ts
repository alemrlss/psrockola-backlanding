import { IsEnum, IsNumber } from "class-validator";
import { NAME_MODEPLAY } from "src/constants";

export class CreateModeplayDto {
  @IsEnum(NAME_MODEPLAY)
  title: NAME_MODEPLAY;

  type: number;

  value: number;
}
