import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import * as he from "he";
import convertMilisecondsToTime from "src/utils/convertMilisecondsToTime";
import convertDurationYoutubeToMiliseconds from "src/utils/convertDurationYoutubeToMiliseconds";
import { cleanVideo } from "src/utils/cleanData";

const configService = new ConfigService();

@Injectable()
export class YoutubeService {
  private readonly apiKey: string = configService.get("API_KEY");
  private readonly apiUrl: string = configService.get("API_YOUTUBE");

  async searchVideosByTitle(
    title: string,
    type: number,
    regionCode: string = ""
  ) {
    try {
      const searchTerm = type == 0 ? title : `${title} karaoke`;
      const params: any = {
        q: searchTerm,
        key: this.apiKey,
        part: "snippet",
        type: "video",
        maxResults: 10,
      };

      if (regionCode) {
        params.regionCode = regionCode;
      }

      const response = await axios.get(`${this.apiUrl}search`, { params });
      const videoItems = response.data.items;

      // Filtra las transmisiones en vivo
      const filteredVideos = await Promise.all(
        videoItems.map(async (item: any) => await this.mapVideoItem(item))
      );

      // Filtra y elimina los elementos nulos
      const videos = filteredVideos.filter((video) => video !== null);

      return videos;
    } catch (error) {
      console.error("Error al buscar videos:", error.message);
      throw error;
    }
  }

  private async mapVideoItem(item: any) {
    const videoId = item.id.videoId;
    const videoDetails = await this.getVideoDetails(videoId);

    console.log(videoDetails.snippet.liveBroadcastContent);

    // Verifica si el video es una transmisión en vivo
    const isLiveBroadcast =
      videoDetails.snippet.liveBroadcastContent === "live";

    if (isLiveBroadcast) {
      // Si es una transmisión en vivo, omitir este video
      return null;
    }

    const durationRaw = videoDetails.contentDetails.duration;
    const durationInMilliseconds =
      convertDurationYoutubeToMiliseconds(durationRaw);

    return {
      id_video: videoId,
      title: he.decode(item.snippet.title),
      description: item.snippet.description,
      chanelTitle: item.snippet.channelTitle,
      thumbnails: videoDetails.snippet.thumbnails,
      publishedAt: item.snippet.publishTime,
      duration: convertMilisecondsToTime(durationInMilliseconds),
    };
  }

  async getVideoDetails(videoId: string) {
    try {
      const response = await axios.get(`${this.apiUrl}videos`, {
        params: {
          part: "snippet,contentDetails",
          id: videoId,
          key: this.apiKey,
        },
      });

      return response.data.items[0];
    } catch (error) {
      console.error("Error al obtener detalles del video:", error.message);
      throw error;
    }
  }

  async findById(idVideo: string) {
    const res = await fetch(
      `${configService.get(
        "API_YOUTUBE"
      )}videos?part=snippet&id=${idVideo}&key=${configService.get("API_KEY")}`
    );
    return cleanVideo((await res.json()).items[0]);
  }

  async getDuration(idVideo: string) {
    try {
      const res = await fetch(
        `${configService.get("API_YOUTUBE")}videos?id=${String(
          idVideo
        )}&key=${configService.get("API_KEY")}&part=contentDetails`
      );

      const dataRaw = await res.json();

      if (dataRaw.items.length < 1) {
        throw new HttpException("Video no encontrado", 400);
      }

      const matches = dataRaw.items[0].contentDetails.duration.match(
        /P(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/
      );

      if (!matches) {
        throw new Error("Formato de duración no válido.");
      }

      const days = matches[1]
        ? parseInt(matches[1], 10) * 24 * 60 * 60 * 1000
        : 0;
      const hours = matches[2] ? parseInt(matches[2], 10) * 60 * 60 * 1000 : 0;
      const minutes = matches[3] ? parseInt(matches[3], 10) * 60 * 1000 : 0;
      const seconds = matches[4] ? parseInt(matches[4], 10) * 1000 : 0;

      return days + hours + minutes + seconds;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
