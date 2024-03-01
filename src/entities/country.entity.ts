import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { State } from "./state.entity";
import { Membership } from "./membership.entity";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isoCode: string;

  @Column()
  phoneCode: string;

  @Column({ default: 1 })
  active: number;

  @OneToMany(() => State, (state) => state.country)
  states: State[];


}
