import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Exams } from "./Exams";

@Entity("type_exams")
export class TypeExams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
