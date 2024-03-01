import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

export const cleanData = async (dataRaw: any, type?: number) => {
  if (type === 1) {
    const dataFiltered = dataRaw.filter((obj: any) =>
      obj.snippet.title.toLowerCase().includes("karaoke")
    );
    return await Promise.all(
      dataFiltered.map(async (obj: any) => {
        return cleanObj(obj);
      })
    );
  } else {
    return await Promise.all(dataRaw.map(async (obj: any) => cleanObj(obj)));
  }
};

const cleanObj = async (dataRaw: any) => {
  const res = await fetch(
    `${configService.get("API_YOUTUBE")}videos?part=contentDetails&id=${
      dataRaw.id.videoId
    }&key=${configService.get("API_KEY")}`
  );

  const dataContentDetail = await res.json();

  console.log(dataRaw);
  return {
    id_video: dataRaw.id.videoId,
    title: dataRaw.snippet.title,
    description: dataRaw.snippet.description,
    chanelTitle: dataRaw.snippet.channelTitle,
    miniaturas: {
      default: {
        url: dataRaw.snippet.thumbnails.default.url,
        width: dataRaw.snippet.thumbnails.default.width,
        heigth: dataRaw.snippet.thumbnails.default.heigth,
      },
      medium: {
        url: dataRaw.snippet.thumbnails.medium.url,
        width: dataRaw.snippet.thumbnails.medium.width,
        heigth: dataRaw.snippet.thumbnails.medium.heigth,
      },
      high: {
        url: dataRaw.snippet.thumbnails.high.url,
        width: dataRaw.snippet.thumbnails.high.width,
        heigth: dataRaw.snippet.thumbnails.high.heigth,
      },
    },
    fechaDePublicacion: dataRaw.snippet.publishTime,
    duration: dataContentDetail.items[0].contentDetails.duration,
  };
};

export const cleanDuration = (durationRaw: string) => {
  const minutes = Number(durationRaw.split("PT")[1].split("M")[0]) * 60;
  const seconds = Number(
    durationRaw.split("PT")[1].split("M")[1].split("S")[0]
  );
  return (minutes + seconds) / 60;
};

export const cleanVideo = (dataRaw: any) => {
  return {
    id_video: dataRaw.id.videoId,
    title: dataRaw.snippet.title,
    description: dataRaw.snippet.description,
    chanelTitle: dataRaw.snippet.channelTitle,
    miniaturas: {
      default: {
        url: dataRaw.snippet.thumbnails.default.url,
        width: dataRaw.snippet.thumbnails.default.width,
        heigth: dataRaw.snippet.thumbnails.default.heigth,
      },
      medium: {
        url: dataRaw.snippet.thumbnails.medium.url,
        width: dataRaw.snippet.thumbnails.medium.width,
        heigth: dataRaw.snippet.thumbnails.medium.heigth,
      },
      high: {
        url: dataRaw.snippet.thumbnails.high.url,
        width: dataRaw.snippet.thumbnails.high.width,
        heigth: dataRaw.snippet.thumbnails.high.heigth,
      },
    },
    fechaDePublicacion: dataRaw.snippet.publishTime,
  };
};
