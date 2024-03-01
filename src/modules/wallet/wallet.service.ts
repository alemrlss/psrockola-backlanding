import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Wallet } from "src/entities/wallet.entity";
import { Repository } from "typeorm";
import { CryptoService } from "../crypto/crypto.service";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService
  ) {}

  async createWalletForUser(user_id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: user_id,
        },
      });
      if (!user) {
        throw new HttpException("USER_NOT_FOUND", 400);
      }

      const initialAmount = 10000;
      const encryptedAmount = this.cryptoService.encrypt(
        initialAmount.toString()
      );
      const wallet = await this.walletRepository.create({
        amount: encryptedAmount,
        last_Update: new Date(),
        user: user,
      });

      return await this.walletRepository.save(wallet);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async getDecryptedAmount(walletId: any): Promise<string> {
    try {
      const wallet = await this.walletRepository.findOne({
        where: {
          id: walletId,
        },
      });

      if (!wallet) {
        throw new HttpException("WALLET_NOT_FOUND", 400);
      }

      const decryptedAmount = this.cryptoService.decrypt(wallet.amount);
      return decryptedAmount;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async addAmount(walletId: any, amount: number): Promise<Wallet> {
    try {
      const wallet = await this.walletRepository.findOne({
        where: {
          id: walletId,
        },
      });
      if (!wallet) {
        throw new HttpException("WALLET_NOT_FOUND", 400);
      }

      const decryptedAmount = this.cryptoService.decrypt(wallet.amount);
      const newAmount = parseInt(decryptedAmount) + amount;
      const encryptedAmount = this.cryptoService.encrypt(newAmount.toString());

      wallet.amount = encryptedAmount;
      wallet.last_Update = new Date();

      return await this.walletRepository.save(wallet);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async updateNewAmount(walletId: any, newAmount: number): Promise<Wallet> {
    try {
      const wallet = await this.walletRepository.findOne({
        where: {
          id: walletId,
        },
      });
      if (!wallet) {
        throw new HttpException("WALLET_NOT_FOUND", 400);
      }

      const encryptedAmount = this.cryptoService.encrypt(newAmount.toString());
      wallet.amount = encryptedAmount;
      wallet.last_Update = new Date();

      return await this.walletRepository.save(wallet);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
