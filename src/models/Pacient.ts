import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  RelationId,
  BaseEntity,
  OneToOne,
} from "typeorm";
import { MaxLength } from "class-validator";

import { User } from "./User";

import { Exams } from "./Exams";

@Entity("pacients")
export class Pacient extends BaseEntity {
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

  @ManyToMany(() => Exams, {
    eager: true,
    cascade: ["update"],
  })
  @JoinTable({ name: "pacients_exams_exams" })
  exams: Exams[];

  @Column()
  convenio: string;

  @Column()
  procedencia: string;

  @Column({
    nullable: true,
  })
  medico_solicitante: string;

  @Column({
    nullable: true,
  })
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

  //campos do endereço
  @Column({
    nullable: true,
  })
  street: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  @MaxLength(2, {
    message: "O uf deve possuir no maximo 2 caracteres",
  })
  uf: string;

  @Column({
    nullable: true,
  })
  neighborhood: string;

  @Column({
    nullable: true,
  })
  zipcode: string;

  @Column({
    nullable: true,
  })
  number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
