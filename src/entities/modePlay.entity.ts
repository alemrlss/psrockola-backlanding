import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MODEPLAY, NAME_MODEPLAY } from "src/constants";

@Entity("mode_plays")
export class ModePlay extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  value: number;

  @Column({ type: "enum", enum: NAME_MODEPLAY })
  title: NAME_MODEPLAY;

  @Column({ type: "enum", enum: MODEPLAY })
  type: MODEPLAY;
}
