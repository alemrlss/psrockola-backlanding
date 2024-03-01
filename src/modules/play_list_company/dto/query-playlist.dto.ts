import { IsEnum, IsOptional, IsString, IsIn } from "class-validator";

export class QueryPlayListDto {
  skip?: number;
  take?: number;
}
