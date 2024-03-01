import { HttpException, Injectable } from "@nestjs/common";
import { RechargeCreditDto } from "./dto/create-recharge-credit.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { TransactionsService } from "../transactions/transactions.service";

@Injectable()
export class RechargeCreditsService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly transctionService: TransactionsService
  ) {}
  async recharge(rechargeCreditDto: RechargeCreditDto) {
    if (rechargeCreditDto.idRgecharger === 1) {
      const user = await this.userRepository.findOne({
        where: { id: rechargeCreditDto.idUser },
      });
      console.log(user);

      if (!user) {
        throw new HttpException("Usuario no encontrado", 400);
      }

      //  await this.userRepository.update(rechargeCreditDto.idUser, {
      //  r_wallet: user.wallet + rechargeCreditDto.mount,
      //});

      const mount = await this.userRepository.findOne({
        where: { id: rechargeCreditDto.idUser },
      });

      await this.transctionService.create({
        idUser: user.id,
        type: 1,
        amount: rechargeCreditDto.mount,
        description: "Recarga de rockobits",
      });

      return {
        message: "Wallet actualizado",
        balance: mount.wallet,
      };
    } else {
      throw new HttpException("idRecharger no coincide", 400);
    }
  }
}
