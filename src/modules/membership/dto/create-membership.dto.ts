import { IsNumber, IsString } from "class-validator";

export class CreateMembershipDto {
  @IsString({ message: "Invalid membership name." })
  name: string;

  @IsString({ message: "Invalid currency." })
  currency: string;

  @IsNumber({}, { message: "Invalid amount." })
  amount: number;

  @IsNumber({}, { message: "Invalid countryId." })
  countryId: number;

  @IsNumber({}, { message: "Invalid membership type." })
  type: number;
}
