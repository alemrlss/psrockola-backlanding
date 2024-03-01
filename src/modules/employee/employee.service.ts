import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "src/entities/employee.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { hash } from "bcrypt";
import { ROLES } from "src/constants";
import { CreateEmployeeDto } from "./dto/Create-employee.dto";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async getEmployeesByIdCompany(id: number) {
    const company = await this.userRepository.findOne({
      where: { id: id },
      relations: ["employees"],
    });
    if (!company) throw new HttpException("COMPANY_NOT_FOUND", 400);
    if (company.type !== ROLES.EMPRESA)
      throw new HttpException("USER_NOT_COMPANY", 400);

    return company.employees;
  }

  create = async (data: CreateEmployeeDto) => {
    const { password } = data;

    // Obtén la información del usuario (empresa)
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });

    //Validicaciones de si el usuario existe, es una empresa y si tiene membresia activa.
    if (!user) throw new HttpException("USER_NOT_FOUND", 400);
    if (user.type !== ROLES.EMPRESA)
      throw new HttpException("USER_NOT_COMPANY", 400);
    if (!user.membershipExpirationDate)
      throw new HttpException("COMPANY_NOT_HAVE_MEMBERSHIP", 400);

    // Verifica si ya existe un empleado con el mismo correo electrónico
    const employee = await this.employeeRepository.findOne({
      where: { email: data.email },
    });
    if (employee) throw new HttpException("EMPLOYEE_EXIST", 400);

    // Hashea la contraseña(encripta)
    const plaintoHash = await hash(password, 10);

    // Crea un nuevo empleado con la información proporcionada
    const employeRegiser = { ...data, password: plaintoHash, user: user };
    const newEmployee = this.employeeRepository.create(employeRegiser);
    await this.employeeRepository.save(newEmployee);

    return newEmployee;
  };
}
