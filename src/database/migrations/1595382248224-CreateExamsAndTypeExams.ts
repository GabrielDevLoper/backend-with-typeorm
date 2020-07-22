import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExamsAndTypeExams1595382248224
  implements MigrationInterface {
  name = "CreateExamsAndTypeExams1595382248224";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "type_exams" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_11dd9b1e0599179bd38adffdc72" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "exams" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "typeExamId" integer, CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "pacients_exams_exams" ("pacientsId" integer NOT NULL, "examsId" integer NOT NULL, CONSTRAINT "PK_741b1ba3629e893e5e3cbeab58e" PRIMARY KEY ("pacientsId", "examsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87cf2dd0bbee79268f35f7dad6" ON "pacients_exams_exams" ("pacientsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_610e33727927201546e644362f" ON "pacients_exams_exams" ("examsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "exams" ADD CONSTRAINT "FK_864bfe489f609c294c6eca00ae1" FOREIGN KEY ("typeExamId") REFERENCES "type_exams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "pacients_exams_exams" ADD CONSTRAINT "FK_87cf2dd0bbee79268f35f7dad6d" FOREIGN KEY ("pacientsId") REFERENCES "pacients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "pacients_exams_exams" ADD CONSTRAINT "FK_610e33727927201546e644362fc" FOREIGN KEY ("examsId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pacients_exams_exams" DROP CONSTRAINT "FK_610e33727927201546e644362fc"`
    );
    await queryRunner.query(
      `ALTER TABLE "pacients_exams_exams" DROP CONSTRAINT "FK_87cf2dd0bbee79268f35f7dad6d"`
    );
    await queryRunner.query(
      `ALTER TABLE "exams" DROP CONSTRAINT "FK_864bfe489f609c294c6eca00ae1"`
    );
    await queryRunner.query(`DROP INDEX "IDX_610e33727927201546e644362f"`);
    await queryRunner.query(`DROP INDEX "IDX_87cf2dd0bbee79268f35f7dad6"`);
    await queryRunner.query(`DROP TABLE "pacients_exams_exams"`);
    await queryRunner.query(`DROP TABLE "exams"`);
    await queryRunner.query(`DROP TABLE "type_exams"`);
  }
}
