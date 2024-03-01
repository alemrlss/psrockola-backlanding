import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { StripeService } from "../stripe/stripe.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Membership } from "src/entities/membership.entity";
import { Repository } from "typeorm";
import { Country } from "src/entities/country.entity";
import { User } from "src/entities/user.entity";
import { CreateMembershipDto } from "./dto/create-membership.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly StripeService: StripeService,
    private readonly userService: UserService
  ) {}

  async createMembership(body: CreateMembershipDto) {
    try {
      const { name, amount, currency, countryId, type } = body;

      const country = await this.countryRepository.findOne({
        where: { id: countryId },
      });
      if (!country) throw new HttpException("COUNTRY_NOT_FOUND", 404);

      let price;
      try {
        price = await this.StripeService.createStripePrice(
          name,
          amount,
          currency
        );
      } catch (stripeError) {
        console.log(stripeError.response);
        throw new HttpException(stripeError.response, 500);
      }

      const membership = new Membership();
      if (type === 10) {
        membership.employeeLimit = 1;
        membership.screenLimit = 2;
      }

      if (type === 20) {
        membership.employeeLimit = 3;
        membership.screenLimit = 3;
      }

      if (type === 30) {
        membership.employeeLimit = 5;
        membership.screenLimit = 5;
      }
      //Cast amount to dollars
      const priceInDollar = amount / 100;
      membership.name = name;
      membership.price = price.id;
      membership.currency = currency;
      membership.country = country;
      membership.type = type;
      membership.amount = priceInDollar;

      await this.membershipRepository.save(membership);
      return membership;
    } catch (error) {
      throw error; // Reutilizar la excepción original
    }
  }

  // membership.service.ts
  async updateMembership(body: any) {
    const { name, newAmount, currency, priceId, membershipId } = body;

    const amountInCentavos = newAmount * 100;

    try {
      // Llama al servicio de Stripe para actualizar el precio
      const updatedStripePrice = await this.StripeService.updateStripePrice(
        priceId,
        amountInCentavos,
        name,
        currency
      );

      // Ejemplo de cómo podrías actualizar la base de datos
      const updatedMembership = await this.membershipRepository.findOne({
        where: { id: membershipId },
      });

      if (!updatedMembership) {
        throw new HttpException("MEMBERSHIP_NOT_FOUND", HttpStatus.NOT_FOUND);
      }

      // Actualiza los campos necesarios
      updatedMembership.name = name;
      updatedMembership.amount = updatedStripePrice.unit_amount / 100; // Cast amount to dollars
      updatedMembership.currency = updatedStripePrice.currency;
      updatedMembership.price = updatedStripePrice.id;

      // Guarda los cambios en la base de datos
      await this.membershipRepository.save(updatedMembership);

      return updatedMembership;
    } catch (error) {
      // Maneja errores de forma general
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async getMembershipByCountry(idCountry: number) {
    try {
      const memberships = await this.membershipRepository.find({
        where: { country: { id: idCountry } },
      });
      return memberships;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async getMembershipById(idMembership: number) {
    try {
      const membership = await this.membershipRepository.findOne({
        where: { id: idMembership },
      });
      return membership;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
