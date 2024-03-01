import { IsEnum, IsOptional, IsString, IsIn } from "class-validator";

export class QueryUserDto {
  @IsOptional()
  @IsString({ message: "Invalid user searchTerm." })
  searchTerm?: string;

  @IsOptional()
  @IsString({ message: "Invalid user role." })
  @IsIn(["18", "19", "23", "99"], { message: "Invalid user role." })
  type?: string;

  @IsOptional()
  @IsString({ message: "Invalid country, must be a string." })
  country?: string;

  @IsOptional()
  @IsString({ message: "Invalid user state." })
  @IsIn(["0", "1", "2"], { message: "Invalid user state." })
  state_User?: string;

  @IsOptional()
  @IsString({ message: "Invalid city, must be a string." })
  city?: string;

  skip: number;
  take: number;
}
