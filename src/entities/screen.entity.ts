import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { randomBytes } from "crypto";

@Entity()
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => User, (user) => user.screens)
  @JoinColumn()
  company: User;

  @Column({ default: false })
  default: boolean;
}
