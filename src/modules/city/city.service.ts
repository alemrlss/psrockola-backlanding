import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { City } from "src/entities/city.entity";
import { State } from "src/entities/state.entity";
import { ILike, Repository } from "typeorm";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>
  ) {}

  async findAllByStateId(
    stateId: number,
    take: number = 5,
    skip: number = 0,
    name?: string
  ) {
    const state = await this.stateRepository.findOne({
      where: { id: stateId },
    });
    if (!state) {
      throw new HttpException("STATE_NOT_FOUND", 404);
    }
    const [cities, total] = await this.cityRepository.findAndCount({
      where: { state: { id: stateId }, name: ILike(`%${name || ""}%`) },
      order: {
        id: "DESC",
      },
      take,
      skip,
    });

    return { message: "ok", data: cities, total };
  }

  async findAllSelects(stateId: number) {
    const state = await this.stateRepository.findOne({
      where: { id: stateId },
    });
    if (!state) {
      throw new HttpException("COUNTRY_NOT_FOUND", 404);
    }
    const cities = await this.cityRepository.find({
      where: { state, active: 1 },
      order: {
        name: "ASC", // Ordena por el campo 'name' de forma ascendente (alfabéticamente)
      },
    });

    return { message: "ok", data: cities };
  }

  async create(name: string, stateId: number) {
    const state = await this.stateRepository.findOne({
      where: { id: stateId },
    });
    if (!state) {
      throw new HttpException("STATE_NOT_FOUND", 404);
    }
    const stateFound = await this.cityRepository.findOne({
      where: { name, state },
    });
    if (stateFound) throw new HttpException("CITY_EXIST", 400);

    const city = this.cityRepository.create({ name, state });
    await this.cityRepository.save(city);
    return { message: "ok", data: city };
  }
}
