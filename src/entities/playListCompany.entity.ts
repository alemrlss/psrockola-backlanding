import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MODEPLAY } from "src/constants";
import { State } from "./state.entity";
import { City } from "./city.entity";
import { Country } from "./country.entity";
import { STATES_VIDEO_IN_PLAYLIST } from "src/constants/orderPlaylist.enum";

@Entity("playlist")
export class PlayListCompany extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", nullable: false })
  id_video: string;

  @Column({ type: "int", nullable: false })
  id_company: number;

  @Column({ type: "int" })
  id_user: number;

  @Column({ type: "enum", enum: STATES_VIDEO_IN_PLAYLIST, nullable: true })
  state_music: STATES_VIDEO_IN_PLAYLIST;

  @Column({ nullable: true })
  codeScreen: string;

  @ManyToOne(() => Country)
  @JoinColumn()
  country: Country;

  @ManyToOne(() => State)
  @JoinColumn()
  state: State;

  @ManyToOne(() => City)
  @JoinColumn()
  city: City;

  @Column({ type: "int", nullable: true })
  typeModeplay: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  channelTitle: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  duration: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
