import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Country } from "src/entities/country.entity";
import { State } from "src/entities/state.entity";
import { ILike, Repository } from "typeorm";
import { CreateStateDto } from "./dto/Create-state.dto";

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}

  async findAll(countryId, take: number = 5, skip: number = 0, name?: string) {
    try {
      const country = await this.countryRepository.findOne({
        where: { id: countryId },
      });
      if (!country) {
        throw new HttpException("COUNTRY_NOT_FOUND", 404);
      }
      const [states, total] = await this.stateRepository.findAndCount({
        where: { country, name: ILike(`%${name || ""}%`) },
        order: {
          id: "DESC",
        },
        take,
        skip,
      });
      return { message: "ok", data: states, total };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllSelects(countryId: number) {
    const country = await this.countryRepository.findOne({
      where: { id: countryId },
    });
    if (!country) {
      throw new HttpException("COUNTRY_NOT_FOUND", 404);
    }
    const states = await this.stateRepository.find({
      where: { country, active: 1 },
      order: {
        name: "ASC", // Ordena por el campo 'name' de forma ascendente (alfabéticamente)
      },
    });

    return { message: "ok", data: states };
  }

  async update(id: number, updatedState: any) {
    const stateBeforeUpdate = await this.stateRepository.findOne({
      where: { id },
    });

    if (!stateBeforeUpdate) {
      throw new HttpException("STATE_NOT_FOUND", 400);
    }
    await this.stateRepository.update(id, updatedState);
    const updatedStateData = await this.stateRepository.findOne({
      where: { id },
    });

    return { message: "ok", data: updatedStateData };
  }

  async create(name: string, countryId: number) {
    try {
      const country = await this.countryRepository.findOne({
        where: { id: countryId },
      });
      if (!country) {
        throw new HttpException("COUNTRY_NOT_FOUND", 404);
      }
      const stateFound = await this.stateRepository.findOne({
        where: { name, country },
      });
      if (stateFound) throw new HttpException("STATE_EXIST", 400);

      const state = this.stateRepository.create({ name, country });
      await this.stateRepository.save(state);
      return { message: "ok", data: state };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async toggleActive(id: number) {
    const stateBeforeUpdate = await this.stateRepository.findOne({
      where: { id },
    });

    if (!stateBeforeUpdate) {
      throw new HttpException("COUNTRY_NOT_FOUND", 400);
    }
    if (stateBeforeUpdate.active === 1) {
      await this.stateRepository.update(id, {
        active: 0,
      });
    } else {
      await this.stateRepository.update(id, {
        active: 1,
      });
    }

    const updatedStateData = await this.stateRepository.findOne({
      where: { id },
    });

    return { message: "ok", data: updatedStateData };
  }
}
