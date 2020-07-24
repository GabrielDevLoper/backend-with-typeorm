import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { TypeExams } from "./TypeExams";

@Entity("exams")
export class Exams extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  code: string;

  @Column({
    default: "true",
    nullable: true,
  })
  active: Boolean;

  @ManyToOne((type) => TypeExams, (type_exams) => TypeExams, {
    eager: true,
  })
  type_exam: TypeExams;
}
