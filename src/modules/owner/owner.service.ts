import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Owner } from "src/entities/owner.entity";
import { Repository } from "typeorm";
import { CreateOwnerDto } from "./dto/create-owner.dto";
import { User } from "src/entities/user.entity";

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    try {
      const { idUser } = createOwnerDto;

      // Validaciones de datos de entrada (birthdate del owner)
      const userFound = await this.userRepository.findOne({
        where: {
          id: idUser,
        },
      });
      if (!userFound) {
        throw new HttpException("USER_NOT_FOUND", 400);
      }

      const owner = await this.ownerRepository.save({
        name: "hola",
        lastName: "hola",
        email: "hola",
        phone: "54454545",
        city: "hola",
        identification: "fdsfddsf",
        country: "hola",
        picture: "gfdjgfdjgfd",
        birthDate: "2002-03-03",
        createdAt: new Date(),
        user: userFound,
      });
      userFound.owner = owner;
      await this.userRepository.save(userFound);

      return { message: "sucess" };
    } catch (error) {
      console.error(error);
      throw new HttpException("Error al crear el propietario", 400);
    }
  }
  //test
  async getById() {
    const owner = await this.ownerRepository.findOne({
      where: { id: 23 },
      relations: ["user"], // Aquí especifica el nombre de la relación con User
    });
    return owner;
  }
}
