import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { YoutubeService } from "./youtube.service";
import { QueryYoutube } from "./dto/Query.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("youtube")
@UseGuards(AuthGuard)
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get("/search")
  async findByTitle(
    @Query("title") title: string,
    @Query("type") type: number,
    @Query("regionCode") regionCode: string
  ) {
    try {
      const videos = await this.youtubeService.searchVideosByTitle(
        title,
        type,
        regionCode
      );
      return { videos };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get("duration")
  async getDuration(@Query() query: QueryYoutube) {
    const { idVideo } = query;
    return await this.youtubeService.getDuration(idVideo);
  }

  @Get(":videoId")
  async findById(@Param("videoId") videoId: string) {
    return await this.youtubeService.findById(videoId);
  }
}
