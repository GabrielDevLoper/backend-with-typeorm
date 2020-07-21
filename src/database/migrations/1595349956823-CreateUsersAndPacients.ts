import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndPacients1595349956823 implements MigrationInterface {
  name = "CreateUsersAndPacients1595349956823";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pacients" (
          "id" SERIAL NOT NULL, 
          "name" character varying NOT NULL, 
          "pront_req_interno" character varying NOT NULL, 
          "convenio" character varying NOT NULL, 
          "procedencia" character varying NOT NULL, 
          "medico_solicitante" character varying NOT NULL, 
          "fone" character varying NOT NULL, 
          "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
          CONSTRAINT "PK_efd730c17958fa5e57267dec081" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" (
          "id" SERIAL NOT NULL, 
          "username" character varying NOT NULL, 
          "password" character varying NOT NULL, 
          "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
          CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), 
          CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
          )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "pacients"`);
  }
}
