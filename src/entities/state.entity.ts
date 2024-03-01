import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./country.entity";
import { City } from "./city.entity";

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country, (country) => country.states)
  country: Country;

  @Column({ default: 1 })
  active: number;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
}
