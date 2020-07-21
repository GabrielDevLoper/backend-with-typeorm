import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("pacients")
export class Pacient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pront_req_interno: string;

  @ManyToOne((type) => User, (user) => User)
  user: User;

  @Column()
  convenio: string;

  @Column()
  procedencia: string;

  @Column()
  medico_solicitante: string;

  @Column()
  fone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
