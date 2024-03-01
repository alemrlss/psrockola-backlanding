import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeepPartial, Repository, SelectQueryBuilder } from "typeorm";
import { ILike } from "typeorm";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ROLES } from "src/constants";
import { ChangeStateDto } from "./dto/change-state.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Membership } from "src/entities/membership.entity";
import { EmailService } from "../email/email.service";
import getBenefits from "src/utils/getBenefits";
import { ScreenService } from "../screen/screen.service";
import { PlayListCompanyService } from "../play_list_company/play_list_company.service";
import { Screen } from "src/entities/screen.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    private readonly emailService: EmailService,
    private readonly screenService: ScreenService,
    private readonly playlistService: PlayListCompanyService
  ) {}

  async findAll(
    options: any,
    paginationOptions: { skip?: number; take?: number }
  ) {
    const { skip, take } = paginationOptions;

    const queryBuilder = this.userRepository.createQueryBuilder("user");
    queryBuilder.leftJoinAndSelect("user.country", "country"); // Incluye la relación con Country

    queryBuilder.where((qb: SelectQueryBuilder<User>) => {
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "country") {
            qb.andWhere("user.countryId = :countryId", { countryId: value });
          } else if (key === "city") {
            qb.andWhere(`user.${key} ILIKE :${key}`, { [key]: `%${value}%` });
          } else if (key === "state_User") {
            qb.andWhere(`user.state_User = :state_User`, { state_User: value });
          } else if (key === "searchTerm") {
            qb.andWhere(`user.name ILIKE :name OR user.email ILIKE :email`, {
              name: `%${value}%`,
              email: `%${value}%`,
            });
          } else {
            qb.andWhere(`user.${key} = :${key}`, { [key]: value });
          }
        }
      });

      qb.andWhere("user.isDelete = :isDelete", { isDelete: false });
    });

    if (skip !== undefined) {
      queryBuilder.skip(skip);
    } else {
      queryBuilder.skip(0);
    }

    if (take !== undefined) {
      queryBuilder.take(take);
    } else {
      queryBuilder.take(10);
    }

    queryBuilder.orderBy("user.id", "DESC");
    const total = await queryBuilder.getCount();
    const users = await queryBuilder.getMany();
    return { total, users };
  }

  async getEmployeesByIdCompany(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["employees"],
    });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);
    return user.employees;
  }

  async changeState(id: number, body: ChangeStateDto) {
    const { state } = body;
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);
    if (state === user.state_User)
      throw new HttpException("USER_ALREADY_IN_THIS_STATE", 400);
    user.state_User = state;
    await this.userRepository.save(user);
    return { message: "Ok", data: user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);

    const userFound = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
    });
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const userFound = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (userFound && userFound.id !== id) {
        throw new HttpException("EMAIL_ALREADY_EXISTS", 400);
      }
    }

    const updatedUser = this.userRepository.merge(user, updateUserDto);

    return this.userRepository.save(updatedUser);
  }
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["country", "state", "city", "activeMembership", "screens"],
    });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);
    return { message: "Ok", data: user };
  }

  async softDelete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);

    // Actualizar la propiedad isDelete a true en lugar de eliminar físicamente el registro
    user.isDelete = true;
    user.email = `${user.email}-deleted`;
    await this.userRepository.save(user);

    return {
      message: "Ok",
      data: `User soft-deleted successfully: ${user.id}`,
    };
  }

  async activateMembership(id: number, membershipId: number) {
    try {
      const membership = await this.membershipRepository.findOne({
        where: { id: membershipId },
      });
      if (!membership) throw new HttpException("MEMBERSHIP_NOT_FOUND", 404);

      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: ["activeMembership"],
      });
      if (!user) throw new HttpException("USER_NOT_FOUND", 404);

      console.log(`membership: ${user.activeMembership}`);
      if (user.activeMembership) {
        throw new HttpException(
          "USER_HAS_ACTIVE_MEMBERSHIP",
          HttpStatus.BAD_REQUEST
        );
      }

      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      user.activeMembership = membership;
      user.membershipExpirationDate = expirationDate;

      console.log(
        "El limite de esta membresia de pantallas es: ",
        membership.screenLimit
      );
      console.log(
        "El limite de esta membresia de empleados es: ",
        membership.employeeLimit
      );

      user.screenLimit = membership.screenLimit;
      user.employeLimit = membership.employeeLimit;

      const emailContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
            }
            p {
              color: #333;
              font-size: 16px;
              margin-bottom: 10px;
            }
            strong {
              color: #007bff;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
          <p>Has adquirido la membresía: <strong>${membership.name}</strong></p>
          <p>Fecha de vencimiento: ${expirationDate.toDateString()}</p>
          <p>Tipo de membresía: <b>${getBenefits(membership).type}</b></p>
          <p>¡Gracias por ser parte de nuestro servicio!</p>
          <p> Beneficios: </p>
          <ul>
            <li>Dispositivos de venta: ${getBenefits(membership).sales} </li>
            <li>Skins: ${getBenefits(membership).sales} </li>
            <li>Modos de reproducción personalizados: ${
              getBenefits(membership).customModePlay ? "Si" : "No"
            }</li>
          </ul>
        </body>
      </html>
    `;

      this.emailService.sendEmail(
        user.email,
        "Membership Activated",
        emailContent
      );

      await this.userRepository.save(user);
      return {
        message: "Ok",
        data: user,
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async desactivateMembership(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ["activeMembership"],
    });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);

    if (!user.activeMembership)
      throw new HttpException("USER_HAS_NOT_ACTIVE_MEMBERSHIP", 400);

    const emailContent = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
              }
              p {
                color: #333;
                font-size: 16px;
                margin-bottom: 10px;
              }
              strong {
                color: #007bff;
              }
              ul {
                list-style-type: none;
                padding: 0;
              }
              li {
                margin-bottom: 5px;
              }
            </style>
          </head>
          <body>
            <p>Has cancelado tu membresia: <strong>${
              user.activeMembership.name
            }</strong></p>
            <p>Tipo de membresía: <b>${
              getBenefits(user.activeMembership).type
            }</b></p>
            <p>¡Gracias por hacer uso de nuestros servicios, te invitamos a adquirir una nueva membresia!</p>
          </body>
        </html>
      `;

    const screens = await this.screenService.getAllScreensByCompany(user.id);

    await Promise.all(
      screens.map(async (screen) => {
        screen.active = false;
        await this.screenRepository.save(screen);
        this.playlistService.banVideosByCodeScreen(screen.code);
      })
    );

    user.activeMembership = null;
    user.membershipExpirationDate = null;
    user.employeLimit = 0;
    user.screenLimit = 0;
    await this.userRepository.save(user);

    this.emailService.sendEmail(
      user.email,
      "Membership Canceled",
      emailContent
    );

    return user;
  }
}
