import { HttpException, Injectable } from "@nestjs/common";
import { CreatePlayListCompanyDto } from "./dto/create-play_list_company.dto";
import { UpdatePlayListCompanyDto } from "./dto/update-play_list_company.dto";
import { PlayListCompany } from "src/entities/playListCompany.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { STATES_VIDEO_IN_PLAYLIST } from "src/constants/orderPlaylist.enum";
import { QueryPlayListDto } from "./dto/query-playlist.dto";
import { ScreenService } from "../screen/screen.service";

@Injectable()
export class PlayListCompanyService {
  constructor(
    @InjectRepository(PlayListCompany)
    private readonly playListCompanyRepository: Repository<PlayListCompany>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly screenService: ScreenService
  ) {}

  async create(createPlayListCompanyDto: CreatePlayListCompanyDto) {
    try {
      const {
        idVideo,
        idCompany,
        idUser,
        state_music,
        codeScreen,
        country,
        state,
        city,
        typeModeplay,
        title,
        channelTitle,
        thumbnail,
        duration,
      } = createPlayListCompanyDto;
      const playListCompany = await this.playListCompanyRepository.save({
        id_video: idVideo,
        id_company: idCompany,
        id_user: idUser,
        order: STATES_VIDEO_IN_PLAYLIST.PENDIENTE,
        state_music: state_music,
        codeScreen: codeScreen,
        country: country,
        state: state,
        city: city,
        typeModeplay: typeModeplay,
        title,
        channelTitle,
        thumbnail,
        duration,
      });

      return {
        id: playListCompany.id,
        idVideo: playListCompany.id_video,
        idCompany: playListCompany.id_company,
        idUser: playListCompany.id_user,
        order: playListCompany.order,
        state_music: playListCompany.state_music,
        codeScreen: playListCompany.codeScreen,
        country: playListCompany.country,
        state: playListCompany.state,
        city: playListCompany.city,
        typeModeplay: playListCompany.typeModeplay,
        title: playListCompany.title,
        channelTitle: playListCompany.channelTitle,
        thumbnail: playListCompany.thumbnail,
        duration: playListCompany.duration,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException("Datos incorrectos", 404);
    }
  }

  async findByIdCompany(id: number, query?: QueryPlayListDto) {
    const { skip = 0, take = 10 } = query || {};

    const [videos, count] = await this.playListCompanyRepository.findAndCount({
      where: { id_company: id },
      order: { createdAt: "desc" },
      skip,
      take,
    });

    return {
      message: "Ok",
      data: {
        total: count,
        videos,
      },
    };
  }

  async findByCodeScreen(codeScreen: string, query?: QueryPlayListDto) {
    const { skip = 0, take = 10 } = query || {};

    //! Validacion de si la Screen esta Activa / No Activa
    //! Validacion si la empresa tiene una Membresia Activa.

    const screen = await this.screenService.getScreenByCode(codeScreen);
    const company = screen.company;

    if (!screen.active) throw new HttpException("SCREEN_NOT_ACTIVE", 500);
    if (!company.membershipExpirationDate)
      throw new HttpException("COMPANY_NOT_HAVE_MEMBERSHIP", 500);

    const playlist = await this.playListCompanyRepository.find({
      where: { codeScreen },
    });

    // Separa la playlist en dos grupos: una con state_music en 1 y otra con state_music en 0
    const playingMusic = playlist.find((music) => music.state_music === 1);
    const pendingMusic = playlist.filter((music) => music.state_music === 0);

    // Ordena el grupo con state_music en 0 por typeModeplay y luego por fecha de forma descendente
    const orderedPendingMusic = pendingMusic.sort((a, b) => {
      if (a.typeModeplay !== b.typeModeplay) {
        return a.typeModeplay - b.typeModeplay;
      }
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

    // Combina ambos grupos, colocando primero la música con state_music en 1
    const orderedList = playingMusic
      ? [playingMusic, ...orderedPendingMusic]
      : orderedPendingMusic;

    return {
      message: "Ok",
      data: {
        total: orderedList.length,
        videos: orderedList.slice(skip, skip + take),
      },
    };
  }

  async update(id: number, updatePlayListCompanyDto: UpdatePlayListCompanyDto) {
    const playList = await this.playListCompanyRepository.findOne({
      where: { id },
    });
    if (!playList) {
      throw new HttpException("VIDEO_NOT_FOUND", 404);
    }

    const company = await this.userRepository.findOne({
      where: { id: updatePlayListCompanyDto.idCompany },
    });
    if (!company) {
      throw new HttpException("COMPANY_NOT_FOUND", 404);
    }

    //!Evaluamos que el usuario que realiza la petición sea el mismo que creo la playlist(sin token)
    if (company.id !== playList.id_company) {
      throw new HttpException("NOT_ACCESS ", 400);
    }

    //if (playList.state_music === 2) {
    // throw new HttpException("La playlist esta finalizada", 400);
    //}

    await this.playListCompanyRepository.update(id, {
      state_music: updatePlayListCompanyDto.state,
    });

    return {
      message: "Ok",
      data: {
        idPlaylist: id,
        state: updatePlayListCompanyDto.state,
        codeScreen: playList.codeScreen,
      },
    };
  }

  async banVideosByCodeScreen(codeScreen: string) {
    await this.playListCompanyRepository.update(
      { codeScreen, state_music: STATES_VIDEO_IN_PLAYLIST.PENDIENTE },
      { state_music: STATES_VIDEO_IN_PLAYLIST.BANEADO }
    );
  }
}
