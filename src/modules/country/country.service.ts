import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Country } from "src/entities/country.entity";
import { Repository } from "typeorm";
import { CreateCountryDto } from "./dto/create-country.dto";
import { ILike } from "typeorm";

@Injectable()
export class  CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}

  async findAll(take: number = 5, skip: number = 0, name?: string) {
    const whereCondition = name ? { name: ILike(`%${name}%`) } : {};

    const [countries, total] = await this.countryRepository.findAndCount({
      where: whereCondition,
      order: {
        id: "DESC",
      },
      take,
      skip,
    });

    return { message: "ok", data: countries, total };
  }
  async findAllSelects() {
    const countries = await this.countryRepository.find({
      where: { active: 1 },
      order: {
        name: "ASC", // Ordena por el campo 'name' de forma ascendente (alfabéticamente)
      },
    });
  
    return { message: "ok", data: countries };
  }
  

  async findOne(id: number) {}

  async update(id: number, updatedCountry: CreateCountryDto) {
    const countryBeforeUpdate = await this.countryRepository.findOne({
      where: { id },
    });

    if (!countryBeforeUpdate) {
      throw new HttpException("COUNTRY_NOT_FOUND", 400);
    }
    await this.countryRepository.update(id, updatedCountry);
    const updatedCountryData = await this.countryRepository.findOne({
      where: { id },
    });

    return { message: "ok", data: updatedCountryData };
  }

  async create(Country: CreateCountryDto) {
    const countryFound = await this.countryRepository.findOne({
      where: { name: Country.name },
    });
    if (countryFound) throw new HttpException("COUNTRY_EXIST", 400);
    const country = await this.countryRepository.save(Country);
    return { message: "ok", data: country };
  }

  async toggleActive(id: number) {
    const countryBeforeUpdate = await this.countryRepository.findOne({
      where: { id },
    });

    if (!countryBeforeUpdate) {
      throw new HttpException("COUNTRY_NOT_FOUND", 400);
    }
    if (countryBeforeUpdate.active === 1) {
      await this.countryRepository.update(id, {
        active: 0,
      });
    } else {
      await this.countryRepository.update(id, {
        active: 1,
      });
    }

    const updatedCountryData = await this.countryRepository.findOne({
      where: { id },
    });

    return { message: "ok", data: updatedCountryData };
  }
}
