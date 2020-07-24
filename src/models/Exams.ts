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
  BaseEntity,
} from "typeorm";
import { TypeExams } from "./TypeExams";
import { Pacient } from "./Pacient";

@Entity("exams")
export class Exams extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  code: string;

  @ManyToOne((type) => TypeExams, (type_exams) => TypeExams, {
    eager: true,
  })
  type_exam: TypeExams;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
