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

  @ManyToOne((type) => User, (user) => User, {
    eager: true,
  })
  user: User;

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
