import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("type_exams")
export class TypeExams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
