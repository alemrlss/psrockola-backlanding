import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Screen } from "src/entities/screen.entity";
import { CreateScreenDto } from "./dto/create-screen.dto";
import { User } from "src/entities/user.entity";
import { ROLES } from "src/constants";
import { EditScreenDto } from "./dto/edit-screen.dto";
import { randomBytes } from "crypto";
import { EmailService } from "../email/email.service";
import { PlayListCompany } from "src/entities/playListCompany.entity";

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,
    @InjectRepository(PlayListCompany)
    private readonly playlistRepository: Repository<PlayListCompany>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService
  ) {}

  async findAll() {
    const screens = await this.screenRepository.find({
      order: { id: "DESC" },
    });
    if (!screens) {
      throw new HttpException("Not found", 404);
    }
    return screens;
  }

  async getAllScreensByCompany(companyId: number): Promise<Screen[]> {
    return this.screenRepository.find({
      where: { company: { id: companyId } },
      order: { id: "DESC" },
    });
  }

  async getScreenById(id: number): Promise<Screen> {
    console.log("id", id);
    const screen = await this.screenRepository.findOne({
      where: { id },
      relations: ["company"],
    });
    if (!screen) {
      throw new HttpException("SCREEN_NOT_FOUND", 404);
    }
    return screen;
  }
  async getScreenByCode(code: string): Promise<Screen> {
    const screen = await this.screenRepository.findOne({
      where: { code },
      relations: [
        "company",
        "company.country",
        "company.state",
        "company.city",
      ],
    });
    if (!screen) {
      throw new HttpException("SCREEN_NOT_FOUND", 404);
    }
    return screen;
  }

  async createScreen(objectCreate: CreateScreenDto) {
    const { idCompany, name, password } = objectCreate;

    const company = await this.userRepository.findOne({
      where: { id: idCompany },
    });

    if (!company) {
      throw new HttpException("COMPANY_NOT_FOUND", 404);
    }
    if (company.type !== ROLES.EMPRESA) {
      throw new HttpException("USER_NOT_COMPANY", 403);
    }

    const screen = new Screen();
    screen.name = name;
    screen.password = password;
    screen.company = company;
    screen.active = true;
    screen.code = await this.generateUniqueCode();
    await this.screenRepository.save(screen);

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
        <p>Has adquirido la pantalla: <strong>${screen.name}</strong></p>
        <p>La Contraseña por defecto asignada es: <b>1234</b></p>
        <p>Tendras acceso para editar la contraseña o desactivar la pantalla por medio de la consola administrativa</p>
        <p>¡Gracias por ser parte de nuestro servicio!</p>
       
      </body>
    </html>
  `;
    this.emailService.sendEmail(
      company.email,
      "Screen Created Successfully",
      emailContent
    );

    return screen;
  }
  private async generateUniqueCode(
    attempts = 0,
    maxAttempts = 10
  ): Promise<string> {
    if (attempts >= maxAttempts) {
      throw new Error(
        "No se pudo generar un código único después de varios intentos."
      );
    }

    const randomBytesBuffer = randomBytes(3);
    const threeDigitCode = randomBytesBuffer
      .toString("hex")
      .toUpperCase()
      .slice(0, 4);

    const code = `S${threeDigitCode}`;

    // Verificar si el código ya existe en la base de datos
    const existingScreen = await this.screenRepository.findOne({
      where: { code: code },
    });

    if (existingScreen) {
      // Si el código ya existe, intentar generar uno nuevo recursivamente
      return this.generateUniqueCode(attempts + 1, maxAttempts);
    }

    return code;
  }

  async editScreen(id: number, editScreenDto: EditScreenDto) {
    const screen = await this.screenRepository.findOne({ where: { id } });

    if (!screen) {
      throw new HttpException("SCREEN_NOT_FOUND", 404);
    }

    if (editScreenDto.name !== undefined) {
      screen.name = editScreenDto.name;
    }

    if (editScreenDto.code !== undefined) {
      screen.code = editScreenDto.code;
    }

    if (editScreenDto.password !== undefined) {
      screen.password = editScreenDto.password;
    }

    // Guardar los cambios en la base de datos
    await this.screenRepository.save(screen);

    return screen;
  }

  async createDefaultScreen(user: User) {
    const screen = new Screen();
    screen.name = user.name + " Screen";
    screen.password = "1234";
    screen.company = user;
    screen.active = true;
    screen.default = true;
    screen.code = await this.generateUniqueCode();
    await this.screenRepository.save(screen);

    return screen;
  }

  async toggleScreen(id: number, userId: number) {
    const screen = await this.screenRepository.findOne({ where: { id } });

    if (!screen) {
      throw new HttpException("SCREEN_NOT_FOUND", 404);
    }

    const company = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["screens"],
    });

    if (!company) {
      throw new HttpException("COMPANY_NOT_FOUND", 404);
    }

    const limitScreenActive = company.screenLimit;
    const activeScreens = company.screens.filter((s) => s.active);

    //!VALIDACION SI LA PANTALLA TIENE VIDEOS PENDIENTES NO PERMITA DESACTIVAR
    const pendingVideos = await this.playlistRepository.count({
      where: { codeScreen: screen.code, state_music: 0 },
    });
    if (pendingVideos > 0) {
      throw new HttpException("SCREEN_HAS_PENDING_VIDEOS", 400);
    }

    if (!screen.active) {
      screen.active = true;
      activeScreens.push(screen);
    } else {
      screen.active = false;
      const index = activeScreens.findIndex((s) => s.id === screen.id);
      if (index !== -1) {
        activeScreens.splice(index, 1);
      }
    }

    if (activeScreens.length > limitScreenActive) {
      throw new HttpException("SCREEN_LIMIT_EXCEEDED", 400);
    }

    await this.screenRepository.save(screen);

    return screen;
  }
}
