import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipPacientExams1595375001442
  implements MigrationInterface {
  name = "AddRelationshipPacientExams1595375001442";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pacients_exams" ("pacientsId" integer NOT NULL, "examsId" integer NOT NULL, CONSTRAINT "PK_741b1ba3629e893e5e3cbeab58e" PRIMARY KEY ("pacientsId", "examsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87cf2dd0bbee79268f35f7dad6" ON "pacients_exams" ("pacientsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_610e33727927201546e644362f" ON "pacients_exams" ("examsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "pacients_exams" ADD CONSTRAINT "FK_87cf2dd0bbee79268f35f7dad6d" FOREIGN KEY ("pacientsId") REFERENCES "pacients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "pacients_exams" ADD CONSTRAINT "FK_610e33727927201546e644362fc" FOREIGN KEY ("examsId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pacients_exams" DROP CONSTRAINT "FK_610e33727927201546e644362fc"`
    );
    await queryRunner.query(
      `ALTER TABLE "pacients_exams" DROP CONSTRAINT "FK_87cf2dd0bbee79268f35f7dad6d"`
    );
    await queryRunner.query(`DROP INDEX "IDX_610e33727927201546e644362f"`);
    await queryRunner.query(`DROP INDEX "IDX_87cf2dd0bbee79268f35f7dad6"`);
    await queryRunner.query(`DROP TABLE "pacients_exams"`);
  }
}
