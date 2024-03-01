import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("owner")
export class Owner extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  picture: string;

  @Column()
  identification: string;

  @Column()
  phone: string;

  @Column()
  birthDate: Date;

  @Column({ nullable: false })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.owner, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}
