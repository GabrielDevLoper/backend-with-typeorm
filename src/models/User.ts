import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Pacient } from "./Pacient";
import { IsEmail, Length } from "class-validator";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @Length(5, 20)
  username: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Pacient, (pacients) => Pacient)
  pacients: Pacient[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
