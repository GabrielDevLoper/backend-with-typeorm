import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExams1595369440765 implements MigrationInterface {
  name = "CreateExams1595369440765";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exams" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7ecd08a5f9e0d003a69791cf20b" UNIQUE ("code"), CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "exams"`);
  }
}
