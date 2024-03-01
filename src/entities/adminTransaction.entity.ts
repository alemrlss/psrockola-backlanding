import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("r_admin_transac_tions")
export class AdminTransaction extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  r_id: number;

  @Column({ type: "int" })
  r_id_Admin: number;

  @Column({ type: "int" })
  r_amount: number;

  @Column({ type: "int" })
  r_type_T: number;
}
