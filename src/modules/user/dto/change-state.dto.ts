// src/dtos/change-state.dto.ts

import { IsIn, IsNotEmpty } from "class-validator";

export class ChangeStateDto {
  @IsNotEmpty()
  @IsIn([0, 1, 2])
  state: number;
}
