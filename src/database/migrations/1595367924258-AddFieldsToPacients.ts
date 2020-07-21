import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldsToPacients1595367924258 implements MigrationInterface {
    name = 'AddFieldsToPacients1595367924258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacients" ADD "data_entrega" character varying DEFAULT 'Sem data definida'`);
        await queryRunner.query(`ALTER TABLE "pacients" ADD "status" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacients" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "pacients" DROP COLUMN "data_entrega"`);
    }

}
