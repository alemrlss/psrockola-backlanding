import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("transactions")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  idUser: number;

  @Column({ type: "int" })
  amount: number;

  @Column({ type: "int" })
  type: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  description: string | null;

  @BeforeInsert()
  setCreationDate() {
    this.createdAt = new Date();
  }
}
