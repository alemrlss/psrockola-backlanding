import { IsEnum, IsNumber } from "class-validator";
import { STATES_VIDEO_IN_PLAYLIST } from "src/constants/orderPlaylist.enum";

export class UpdatePlayListCompanyDto {
  @IsEnum(STATES_VIDEO_IN_PLAYLIST, { message: "Invalid state value" })
  state: STATES_VIDEO_IN_PLAYLIST;

  @IsNumber()
  idCompany: number;
}
