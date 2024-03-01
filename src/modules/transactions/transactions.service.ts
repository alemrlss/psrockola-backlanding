import { HttpException, Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "src/entities/transactions.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const { idUser, amount, type, description } = createTransactionDto;

      const transaction = await this.transactionsRepository.save({
        idUser: idUser,
        amount: amount,
        type: type,
        description: description,
      });

      return {
        id: transaction.id,
        idUser: transaction.idUser,
        amount: transaction.amount,
        type: transaction.type,
        description: transaction.description,
        date: transaction.createdAt,
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async createForPayMusic(createTransactionDto: CreateTransactionDto) {
    try {
      const { idUser, amount, type } = createTransactionDto;

      const transaction = await this.transactionsRepository.save({
        idUser: idUser,
        amount: amount,
        type: type,
        description: createTransactionDto.description,
      });

      return transaction;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async findAllById(idUser: number) {
    try {
      const transactions = await this.transactionsRepository.find({
        where: { idUser: idUser },
      });

      return transactions.map((transaction) => ({
        id: transaction.id,
        idUser: transaction.idUser,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.createdAt,
      }));
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
