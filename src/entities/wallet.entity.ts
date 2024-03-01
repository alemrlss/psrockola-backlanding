import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("wallet")
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 255 })
  amount: string;

  @Column({ type: "date" })
  last_Update: Date;

  @OneToOne(() => User, (user) => user.wallet, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}
