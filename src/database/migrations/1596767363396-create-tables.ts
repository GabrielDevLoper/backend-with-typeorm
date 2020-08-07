import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1596767363396 implements MigrationInterface {
    name = 'createTables1596767363396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "type_exams" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_11dd9b1e0599179bd38adffdc72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exams" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "code" character varying NOT NULL, "active" boolean DEFAULT 'true', "typeExamId" integer, CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'COMUM', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pacients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "pront_req_interno" character varying NOT NULL, "convenio" character varying NOT NULL, "procedencia" character varying NOT NULL, "medico_solicitante" character varying, "fone" character varying, "data_entrega" character varying DEFAULT 'Sem data definida', "status" boolean NOT NULL DEFAULT false, "street" character varying, "city" character varying, "uf" character varying, "neighborhood" character varying, "zipcode" character varying, "number" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_efd730c17958fa5e57267dec081" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pacients_exams_exams" ("pacientsId" integer NOT NULL, "examsId" integer NOT NULL, CONSTRAINT "PK_741b1ba3629e893e5e3cbeab58e" PRIMARY KEY ("pacientsId", "examsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_87cf2dd0bbee79268f35f7dad6" ON "pacients_exams_exams" ("pacientsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_610e33727927201546e644362f" ON "pacients_exams_exams" ("examsId") `);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_864bfe489f609c294c6eca00ae1" FOREIGN KEY ("typeExamId") REFERENCES "type_exams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pacients" ADD CONSTRAINT "FK_3b375f0bc29c6c12265d04cb6eb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pacients_exams_exams" ADD CONSTRAINT "FK_87cf2dd0bbee79268f35f7dad6d" FOREIGN KEY ("pacientsId") REFERENCES "pacients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pacients_exams_exams" ADD CONSTRAINT "FK_610e33727927201546e644362fc" FOREIGN KEY ("examsId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacients_exams_exams" DROP CONSTRAINT "FK_610e33727927201546e644362fc"`);
        await queryRunner.query(`ALTER TABLE "pacients_exams_exams" DROP CONSTRAINT "FK_87cf2dd0bbee79268f35f7dad6d"`);
        await queryRunner.query(`ALTER TABLE "pacients" DROP CONSTRAINT "FK_3b375f0bc29c6c12265d04cb6eb"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_864bfe489f609c294c6eca00ae1"`);
        await queryRunner.query(`DROP INDEX "IDX_610e33727927201546e644362f"`);
        await queryRunner.query(`DROP INDEX "IDX_87cf2dd0bbee79268f35f7dad6"`);
        await queryRunner.query(`DROP TABLE "pacients_exams_exams"`);
        await queryRunner.query(`DROP TABLE "pacients"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TABLE "type_exams"`);
    }

}
