import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./country.entity";
import { MembershipTypes } from "src/constants/membership.enum";

@Entity("memberships")
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  price: string;

  @Column({ type: "int", nullable: false })
  amount: number;

  @Column({ type: "varchar", length: 3, nullable: false })
  currency: string;

  @Column({ default: true, nullable: false })
  active: boolean;

  @ManyToOne(() => Country, { eager: true })
  country: Country;

  @Column({
    type: "enum",
    enum: MembershipTypes,
  })
  type: MembershipTypes;

  @Column({ nullable: true })
  employeeLimit: number;

  @Column({ nullable: true })
  screenLimit: number;
}
