import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { PlayListCompanyService } from "./play_list_company.service";
import { CreatePlayListCompanyDto } from "./dto/create-play_list_company.dto";
import { UpdatePlayListCompanyDto } from "./dto/update-play_list_company.dto";
import { QueryPlayListDto } from "./dto/query-playlist.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("play-list-company")
@UseGuards(AuthGuard)
export class PlayListCompanyController {
  constructor(
    private readonly playListCompanyService: PlayListCompanyService
  ) {}

  @Get(":codeScreen")
  findByCodeScreen(
    @Param("codeScreen") codeScreen: string,
    @Query() query: QueryPlayListDto
  ) {
    return this.playListCompanyService.findByCodeScreen(codeScreen, query);
  }

  @Get("/company/:idCompany")
  findByCompany(
    @Param("idCompany") idCompany: number,
    @Query() query: QueryPlayListDto
  ) {
    return this.playListCompanyService.findByIdCompany(idCompany, query);
  }

  @Patch(":idPlaylist")
  update(
    @Param("idPlaylist", ParseIntPipe) idPlaylist: string,
    @Body() updatePlayListCompanyDto: UpdatePlayListCompanyDto
  ) {
    return this.playListCompanyService.update(
      +idPlaylist,
      updatePlayListCompanyDto
    );
  }
}
