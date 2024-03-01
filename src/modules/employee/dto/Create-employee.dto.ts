import { IsInt, IsString } from "class-validator";

export class CreateEmployeeDto {
  @IsString({ message: "Invalid name." })
  name: string;

  @IsString({ message: "Invalid lastname." })
  lastName: string;

  @IsString({ message: "Invalid email." })
  email: string;

  @IsString({ message: "Invalid password." })
  password: string;

  @IsString({ message: "Invalid phone." })
  phone: string;

  @IsString({ message: "Invalid address." })
  address: string;

  @IsInt({ message: "Invalid user id." })
  userId: number;
}
