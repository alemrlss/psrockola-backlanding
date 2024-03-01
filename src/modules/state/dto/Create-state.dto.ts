import { IsInt, IsString } from "class-validator";

export class CreateStateDto {
  @IsString({ message: "Invalid state name." })
  name: string;

  @IsInt({ message: "Invalid country id." })
  countryId: number;
}
