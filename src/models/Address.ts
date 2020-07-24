import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Pacient } from "./Pacient";
import { MaxLength } from "class-validator";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

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
    message: "O username deve possuir no maximo 2 caracteres",
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

  @OneToOne(() => Pacient)
  @JoinColumn()
  pacient: Pacient;
}
