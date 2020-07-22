import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Pacient } from "./Pacient";
import { IsEmail, MaxLength } from "class-validator";
import bcrypt from "bcrypt";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @MaxLength(20, { message: "O username deve possuir no maximo 20 caracteres" })
  username: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  passwordHash() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @OneToMany((type) => Pacient, (pacients) => Pacient)
  pacients: Pacient[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
