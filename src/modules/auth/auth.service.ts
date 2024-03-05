import { HttpException, Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDtoBase } from "./dto/register-auth.dto";
import { hash, compare } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { NAME_MODEPLAY, ROLES, STATES } from "src/constants";
import { ModeplayService } from "../modeplay/modeplay.service";
import { WalletService } from "../wallet/wallet.service";
import { isValidDateFormat } from "../../utils/isValidDateFormat";
import { Logger } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { CountryService } from "../country/country.service";
import { Country } from "src/entities/country.entity";
import { State } from "src/entities/state.entity";
import { City } from "src/entities/city.entity";
import { ScreenService } from "../screen/screen.service";
const logger = new Logger("MyApp");

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly walletService: WalletService,
    private jwtAuthService: JwtService,
    private readonly emailService: EmailService,
    private readonly screenService: ScreenService,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
  ) {}

  async register(userObjectRegister: RegisterAuthDtoBase) {
    try {
      const { password, email, type, ruc, birthDate } = userObjectRegister;

      if (type !== ROLES.EMPRESA && type !== ROLES.CLIENTE) {
        throw new HttpException("NO_TYPE_VALIDATE", 500);
      }
      if (type !== ROLES.EMPRESA) {
        if (!isValidDateFormat(birthDate)) {
          return new HttpException("DATE_FORMAT_IS_INVALID", 400);
        }
      }
      if (!email) throw new HttpException("EMAIL_IS_REQUIRED", 400);
      if (!password) throw new HttpException("PASSWORD_IS_REQUIRED", 400);

      //Validate country,state and city.
      const country = await this.countryRepository.findOne({
        where: { id: userObjectRegister.countryId },
      });
      if (!country) throw new HttpException("COUNTRY_NOT_FOUND", 404);

      const state = await this.stateRepository.findOne({
        where: { id: userObjectRegister.stateId },
      });
      if (!state) throw new HttpException("STATE_NOT_FOUND", 404);

      const city = await this.cityRepository.findOne({
        where: { id: userObjectRegister.cityId },
      });
      if (!city) throw new HttpException("CITY_NOT_FOUND", 404);

      const plaintoHash = await hash(password, 10);
      userObjectRegister = { ...userObjectRegister, password: plaintoHash };

      const userFound = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (userFound) throw new HttpException("USER_EXIST", 400);
      let user: User;

      if (type === ROLES.EMPRESA || type === ROLES.CLIENTE) {
        let userPayload: any = {
          name: userObjectRegister.name,
          email: userObjectRegister.email,
          pass_word: plaintoHash,
          country: userObjectRegister.countryId,
          state: userObjectRegister.stateId,
          city: userObjectRegister.cityId,
          address: userObjectRegister.address,
          type: type,
          logo: userObjectRegister.logo,
          phone: userObjectRegister.phone,
          postalCode: userObjectRegister.postalCode,
        };

        if (type === ROLES.EMPRESA) {
          userPayload.ruc = userObjectRegister.ruc;
        } else {
          userPayload.last_Name = userObjectRegister.lastName;
          userPayload.birth_Date = userObjectRegister.birthDate;
        }
        user = await this.userRepository.save(userPayload);

        if (type === ROLES.EMPRESA) {
          await this.screenService.createDefaultScreen(user);
        }

        const wallet = await this.walletService.createWalletForUser(user.id);
        user.wallet = wallet;
        await this.userRepository.save(user);
      }

      if (type === ROLES.EMPRESA) {
        await this.emailService.sendEmail(
          email,
          "Pre-Registro Exitoso (Establecimientos) - Psrockola",
          `
          <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
        h1{ font-size: 30px !important;}
        h2{ font-size: 25px !important;}
        h3{ font-size: 18px !important;}
        h4{ font-size: 16px !important;}
        p, a{font-size: 15px !important;}

        .imag{
            width: 20px;
            height: 20px;
        }
        .contA{
            margin: 0px 5px 0 5px;
        }
        .afooter{
            color: #ffffff !important; 
            text-decoration: none;
            font-size: 13px !important;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
      }
    </style>
</head>
<body>
    <div style="width: 100%; background-color: #e3e3e3;">
        <div style="padding: 20px 10px 20px 10px;">
            <!-- Imagen inicial -->
            <div style="background-color: #F6640C; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                <img src="https://i.ibb.co/Km5LPMn/22.png" alt="" style="width: 100px; height: 60px;">
            </div>
            <!-- Imagen inicial -->

            <!-- Contenido principal -->
            <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                <h1>Bienvenid@ a PsRockola!</h1>
                <p>¡Gracias por pre-registrarte en PsRockola! Estamos emocionados de que te hayas unido a nosotros.</p>
                
                <!-- Beneficios -->
                <h2>¡Beneficios Exclusivos para Establecimientos!</h2>
                <p>Apreciamos tu confianza en nosotros. Como establecimiento registrado, disfrutarás de beneficios especiales al lanzamiento de la aplicación:</p>
                <ul>
                    <li>Membresías exclusivas.</li>
                    <li>Otros beneficios sorpresas.</li>
                </ul>
                <p>No te pierdas estas ventajas al lanzamiento de la aplicación. Estamos comprometidos a ofrecerte la mejor experiencia con PsRockola.</p>
                <!-- Beneficios -->

                <!-- Gracias -->
                <p>Gracias por formar parte de nuestra comunidad. Estamos ansiosos de ver todo lo que podemos lograr juntos.</p>
                <p style="margin-bottom: 50px;"><i>Atentamente:<br>Equipo Psrockola</i></p>
            </div>
            <!-- Contenido principal -->

            <!-- Footer -->
            <div style="background-color: #F6640C; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
            <!-- Redes sociales -->
            <a href="https://www.facebook.com/profile.php?id=100069413372128&mibextid=kFxxJD" class="contA"><img src="https://i.ibb.co/sjNTD5k/facebook.png" class="imag" /></a>
            <a href="https://www.instagram.com/psrockola/?igsh=bzc3bXc3MnZ1cDV0" class="contA"><img src="https://i.ibb.co/MG5h9vN/instagram.png" class="imag" /></a>
            <a href="https://twitter.com/psrockolapp" class="contA"><img src="https://i.ibb.co/02WCYsc/gorjeo.png" class="imag" /></a>
            <a href="https://www.linkedin.com/in/ps-rockola-b889472b7?trk=contact-info" class="contA"><img src="https://i.ibb.co/7Rv7V6h/linkedin.png" class="imag" /></a>
            <!-- Redes sociales -->

                <h4>Soporte</h4>
                <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                    Comunícate con nosotros por los siguientes medios:<br>
                    Correo: <a class="afooter" href="mailto:equipo@psrockola.com">equipo@psrockola.com</a><br>
                    Whatsapp: <a class="afooter" href="https://wa.me/50523434287">+505 23434287</a><br>
                </p>
                <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                    © 2024 Psrockola, todos los derechos reservados.
                </p>
            </div>
            <!-- Footer -->
        </div>
    </div>
</body>
</html>
`
        );
      }
      if (type === ROLES.CLIENTE) {
        await this.emailService.sendEmail(
          email,
          "Pre-Registro Exitoso - Psrockola",
          `
          <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
        h1{ font-size: 30px !important;}
        h2{ font-size: 25px !important;}
        h3{ font-size: 18px !important;}
        h4{ font-size: 16px !important;}
        p, a{font-size: 15px !important;}

        .imag{
            width: 20px;
            height: 20px;
        }
        .contA{
            margin: 0px 5px 0 5px;
        }
        .afooter{
            color: #ffffff !important; 
            text-decoration: none;
            font-size: 13px !important;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
      }
    </style>
</head>
<body>
    <div style="width: 100%; background-color: #e3e3e3;">
        <div style="padding: 20px 10px 20px 10px;">
            <!-- Imagen inicial -->
            <div style="background-color: #F6640C; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                <img src="https://i.ibb.co/Km5LPMn/22.png" alt="" style="width: 100px; height: 60px;">
            </div>
            <!-- Imagen inicial -->

            <!-- Contenido principal -->
            <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                <h1>Bienvenid@ a PsRockola!</h1>
                <p>¡Gracias por pre-registrarte en PsRockola! Estamos emocionados de que te hayas unido a nosotros.</p>
                
                <!-- Beneficios -->
                <h2>¡Beneficios Exclusivos para Usuarios!</h2>
                <p>Apreciamos tu confianza en nosotros. Como usuario registrado, recibirás entre 100 y 500 rockobits de regalo al lanzamiento de la aplicación. ¡Canjea rockobits por increíbles experiencias!</p>
                <p>No te pierdas estas ventajas al lanzamiento de la aplicación. Estamos comprometidos a ofrecerte la mejor experiencia con PsRockola.</p>
                <!-- Beneficios -->

                <!-- Gracias -->
                <p>Gracias por formar parte de nuestra comunidad. Estamos ansiosos de ver todo lo que podemos lograr juntos.</p>
                <p style="margin-bottom: 50px;"><i>Atentamente:<br>Equipo Psrockola</i></p>
            </div>
            <!-- Contenido principal -->

            <!-- Footer -->
            <div style="background-color: #F6640C; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
            <!-- Redes sociales -->
            <a href="https://www.facebook.com/profile.php?id=100069413372128&mibextid=kFxxJD" class="contA"><img src="https://i.ibb.co/sjNTD5k/facebook.png" class="imag" /></a>
            <a href="https://www.instagram.com/psrockola/?igsh=bzc3bXc3MnZ1cDV0" class="contA"><img src="https://i.ibb.co/MG5h9vN/instagram.png" class="imag" /></a>
            <a href="https://twitter.com/psrockolapp" class="contA"><img src="https://i.ibb.co/02WCYsc/gorjeo.png" class="imag" /></a>
            <a href="https://www.linkedin.com/in/ps-rockola-b889472b7?trk=contact-info" class="contA"><img src="https://i.ibb.co/7Rv7V6h/linkedin.png" class="imag" /></a>
            <!-- Redes sociales -->

                <h4>Soporte</h4>
                <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                    Comunícate con nosotros por los siguientes medios:<br>
                    Correo: <a class="afooter" href="mailto:equipo@psrockola.com">equipo@psrockola.com</a><br>
                    Whatsapp: <a class="afooter" href="https://wa.me/50523434287">+505 23434287</a><br>
                </p>
                <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                    © 2024 Psrockola, todos los derechos reservados.
                </p>
            </div>
            <!-- Footer -->
        </div>
    </div>
</body>
</html>
`
        );
      }

      await this.userRepository.save(user);
      // Delete password and wallet from response for security
      delete user.pass_word;
      delete user.wallet;
      return {
        message: "ok",
        data: {
          user,
        },
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  private generateVerificationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async login(userObjectLogin: LoginAuthDto, type: string) {
    try {
      const { email, password } = userObjectLogin;
      const findUser = await this.userRepository.findOne({
        where: { email },
        relations: ["country", "activeMembership"],
      });
      if (!findUser) {
        throw new HttpException("USER_NOT_FOUND", 404);
      }

      // Validar el tipo de usuario en el login
      const validRoles: Record<string, number[]> = {
        companies: [ROLES.EMPRESA, ROLES.EMPLEADOS],
        clients: [ROLES.CLIENTE],
        admins: [ROLES.SUPERADMIN, ROLES.ADMIN],
      };

      const allowedRoles = validRoles[type];
      if (!allowedRoles) {
        throw new HttpException("INVALID_LOGIN_TYPE", 400);
      }
      if (!this.isLoginForType(findUser, allowedRoles)) {
        throw new HttpException("ACCESS_DENIED", 403);
      }

      // Si el usuario es un administrador, validar el adminCode
      if (
        allowedRoles.includes(ROLES.ADMIN) ||
        allowedRoles.includes(ROLES.SUPERADMIN)
      ) {
        if (
          !userObjectLogin.adminCode ||
          userObjectLogin.adminCode !== findUser.adminCode
        ) {
          //throw new HttpException("INVALID_ADMIN_CODE", 403);
        }
      }

      /* if (allowedRoles.includes(ROLES.EMPRESA)) {
        if (
          !userObjectLogin.adminCode ||
          userObjectLogin.adminCode !== findUser.adminCode
        ) {
          throw new HttpException("INVALID_COMPANY_CODE", 403);
        }
      }*/

      // Validate user state only for clients, companies and employees
      if (
        [ROLES.EMPRESA, ROLES.CLIENTE, ROLES.EMPLEADOS].includes(
          findUser.type
        ) &&
        findUser.state_User !== STATES.ACTIVO
      ) {
        throw new HttpException("USER_IS_NOT_ACTIVE", 400);
      }

      // Check password
      const checkPassword = await compare(password, findUser.pass_word);
      if (!checkPassword) {
        throw new HttpException("PASSWORD_INCORRECT", 403);
      }

      // Generate token
      const payload = {
        id: findUser.id,
        name: findUser.name,
        countryId: findUser.country.id,
      };

      const token = this.jwtAuthService.sign(payload, { expiresIn: "1h" });
      const tokenExpiration = new Date(
        new Date().getTime() + 1 * 60 * 60 * 1000
      );
      //
      findUser.adminCode = null;
      await this.userRepository.save(findUser);

      // Response login data
      const data = {
        user: {
          id: findUser.id,
          name: findUser.name,
          lastName: findUser.last_Name,
          email: findUser.email,
          type: findUser.type,
          membership: {
            name: findUser.activeMembership?.name,
            type: findUser.activeMembership?.type,
            expiration: findUser.membershipExpirationDate,
          },
        },
        token,
        tokenExpiration,
      };

      return data;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  private isLoginForType(user: User, validRoles: number[]): boolean {
    return validRoles.includes(user.type);
  }

  async verifyAccountUser(id: number, code: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) return new HttpException("USER_NOT_FOUND", 404);

      if (user.type !== ROLES.CLIENTE) {
        return new HttpException("USER_IS_NOT_A_CLIENT_TYPE", 400);
      }
      if (user.state_User === STATES.ACTIVO) {
        return new HttpException("USER_ALREADY_VERIFIED", 400);
      }
      if (user.verificationCode !== code)
        return new HttpException("CODE_INCORRECT", 400);

      if (user && user.verificationCode === code) {
        await this.userRepository.update(user.id, {
          state_User: STATES.ACTIVO,
        });
        return { message: "ok", data: "Email verification successfully" };
      }
    } catch (error) {
      return new HttpException("SERVER_ERROR", 500);
    }
  }

  async resendCode(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return new HttpException("USER_NOT_FOUND", 404);
    if (user.type !== ROLES.CLIENTE)
      return new HttpException("USER_IS_NOT_A_CLIENT_TYPE", 400);
    if (user.state_User === STATES.ACTIVO)
      return new HttpException("USER_ALREADY_VERIFIED", 400);

    await this.emailService.sendEmail(
      user.email,
      "Verificacion de Cuenta - Reenvio de codigo",
      `<div><h1>Tu codigo de verificacion para tu cuenta es: ${user.verificationCode} </h1></div>`
    );

    return {
      message: "ok",
      data: "Code resend successfully",
    };
  }

  async sendCodeAdmin(body: any) {
    const { email } = body;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);
    if (user.type !== ROLES.ADMIN && user.type !== ROLES.SUPERADMIN)
      throw new HttpException("USER_IS_NOT_A_ADMIN_TYPE", 400);

    const code = this.generateVerificationCode();
    await this.emailService.sendEmail(
      email,
      "Verificacion de Cuenta - Administrador ",
      `<div><h1>Tu codigo de verificacion para tu cuenta es: ${code} </h1></div>`
    );

    user.adminCode = code;
    await this.userRepository.save(user);

    return {
      message: "ok",
      data: "Code admin send successfully",
    };
  }

  async sendCodeCompany(body: any) {
    const { email } = body;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);
    if (user.type !== ROLES.EMPRESA)
      throw new HttpException("USER_IS_NOT_COMPANY", 400);

    const code = this.generateVerificationCode();
    await this.emailService.sendEmail(
      email,
      "Verificacion de Cuenta - Empresas ",
      `<div><h1>Tu codigo de verificacion para tu cuenta es: ${code} </h1></div>`
    );

    user.adminCode = code;
    await this.userRepository.save(user);

    return {
      message: "ok",
      data: "Code company send successfully",
    };
  }
}
