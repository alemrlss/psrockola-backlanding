import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

const configService = new ConfigService();

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async getDataDashboard() {
    const clients = await this.userRepository.find({ where: { type: 99 } });
    const companies = await this.userRepository.find({ where: { type: 23 } });

    return {
      message: "ok",
      data: {
        clients: clients.length,
        companies: companies.length,
        videos: 0,
        sales: 0,
      },
    };
  }
}
