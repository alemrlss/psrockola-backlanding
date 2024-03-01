import { IsString } from "class-validator";

export class CreateCountryDto {
  @IsString()
  @IsString({ message: "Invalid country name." })
  name: string;

  @IsString({ message: "Invalid country iso code." })
  isoCode: string;

  @IsString({ message: "Invalid country phone code." })
  phoneCode: string;
}
