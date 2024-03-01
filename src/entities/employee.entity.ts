// employee.entity.ts

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("employee")
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: true })
  lastName: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", nullable: false })
  phone: string;

  @Column({ type: "varchar", nullable: true })
  address: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @ManyToOne(() => User, (user) => user.employees)
  user: User;
}
