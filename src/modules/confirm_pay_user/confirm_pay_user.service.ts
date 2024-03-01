// confirm_pay_user.service.ts
import { HttpException, Injectable } from "@nestjs/common";
import { ConfirmPayUserDto } from "./dto/confirm_pay_user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { YoutubeService } from "../youtube/youtube.service";
import { PlayListCompanyService } from "../play_list_company/play_list_company.service";
import { transformTime } from "src/utils/transformTime";
import { TransactionsService } from "../transactions/transactions.service";
import { ModeplayService } from "../modeplay/modeplay.service";
import { ROLES } from "src/constants";
import { WalletService } from "../wallet/wallet.service";
import calculatePriceByDuration from "src/utils/calculatePriceByDuration";
import { ScreenService } from "../screen/screen.service";
import { TYPE_TRANSACTION } from "src/constants/typeTransaction.enum";
import { generateTransactionDescription } from "src/utils/genereateDescriptionTransaction";

@Injectable()
export class ConfirmPayUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly youtubeService: YoutubeService,
    private readonly modePlayService: ModeplayService,
    private readonly playListCompanyService: PlayListCompanyService,
    private readonly transactionService: TransactionsService,
    private readonly walletService: WalletService,
    private readonly screenService: ScreenService
  ) {}

  async create(confirmPayUserDto: ConfirmPayUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: confirmPayUserDto.idUser },
        relations: ["wallet"],
      });
      if (!user) throw new HttpException("USER_NOT_FOUND", 404);
      if (user.type !== ROLES.CLIENTE)
        throw new HttpException("USER_NOT_CLIENT", 400);

      const screen = await this.screenService.getScreenByCode(
        confirmPayUserDto.codeScreen
      );
      if (!screen) throw new HttpException("SCREEN_NOT_FOUND", 404);
      const company = screen.company;
      if (!company) throw new HttpException("COMPANY_NOT_FOUND", 404);

      // Verificar si la empresa tiene membresía.
      if (!company.membershipExpirationDate)
        throw new HttpException("COMPANY_NOT_HAVE_MEMBERSHIP", 500);

      // Verificar si la pantalla está activa.
      if (!screen.active) {
        throw new HttpException("SCREEN_NOT_ACTIVE", 500);
      }
      // Verificar si el usuario tiene su wallet bloqueada.
      if (user.state_Wallet === 0) {
        const idVideos = confirmPayUserDto.idVideos.split(",");
        const typeCompanies = confirmPayUserDto.typeModeplays.split(",");
        let sumCostTotal = 0;

        for (let i = 0; i < idVideos.length; i++) {
          const duration = await this.youtubeService.getDuration(idVideos[i]);
          const { value } = await this.modePlayService.findOne(
            parseInt(typeCompanies[i], 10)
          );

          const price = calculatePriceByDuration(duration);
          const costTotal = price * value;
          console.log(costTotal);
          sumCostTotal += costTotal;

          const dataVideo = await this.youtubeService.getVideoDetails(
            idVideos[i]
          );

          // PROCESO DE ASIGNACIÓN DE VIDEOS.
          await this.playListCompanyService.create({
            idVideo: idVideos[i],
            idCompany: company.id,
            idUser: user.id,
            state_music: 0,
            codeScreen: confirmPayUserDto.codeScreen,
            country: company.country,
            state: company.state,
            city: company.city,
            typeModeplay: parseInt(typeCompanies[i], 10),
            channelTitle: dataVideo.snippet.channelTitle,
            title: dataVideo.snippet.title,
            thumbnail: dataVideo.snippet.thumbnails.high.url,
            duration: duration,
          });
        }

        const amountUserDecryptedString =
          await this.walletService.getDecryptedAmount(user.wallet.id);
        const amountUserDecrypted = parseInt(amountUserDecryptedString);

        // Realizar el pago acumulado si hay suficientes créditos.
        if (amountUserDecrypted >= sumCostTotal) {
          const remainingAmount = amountUserDecrypted - sumCostTotal;
          await this.walletService.updateNewAmount(
            user.wallet.id,
            remainingAmount
          );

          // Puedes descomentar esto si necesitas realizar transacciones.
          await this.transactionService.createForPayMusic({
            idUser: user.id,
            amount: sumCostTotal,
            type: TYPE_TRANSACTION.GASTE,
            description: generateTransactionDescription(
              TYPE_TRANSACTION.GASTE,
              {
                amount: sumCostTotal,
                companyName: company.name,
              }
            ),
          });

          return { message: "Pago exitoso", turn: 1 };
        } else {
          throw new HttpException("INSUFFICIENT_CREDITS", 500);
        }
      } else {
        throw new HttpException("WALLET_NOT_AVAILABLE", 500);
      }
    } catch (error) {
      throw new HttpException(
        error.message || "Internal server error",
        error.getStatus() || 500
      );
    }
  }
}

export default ConfirmPayUserService;
