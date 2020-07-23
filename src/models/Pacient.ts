import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import {} from "class-validator";

import { User } from "./User";

import { Exams } from "./Exams";

@Entity("pacients")
export class Pacient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pront_req_interno: string;

  @ManyToOne((type) => User, (user) => User, {
    eager: true,
  })
  user: User;

  @ManyToMany((type) => Exams, {
    eager: true,
  })
  @JoinTable()
  exams: Exams[];

  @Column()
  convenio: string;

  @Column()
  procedencia: string;

  @Column()
  medico_solicitante: string;

  @Column()
  fone: string;

  @Column({
    nullable: true,
    default: "Sem data definida",
  })
  data_entrega: string;

  @Column({
    default: false,
  })
  status: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
