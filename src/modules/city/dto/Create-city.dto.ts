import { IsInt, IsString } from "class-validator";

export class CreateCityDto {
  @IsString({ message: "Invalid city name." })
  name: string;

  @IsInt({ message: "Invalid state id." })
  stateId: number;
}
