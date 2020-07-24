import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldToAddress1595620266192 implements MigrationInterface {
    name = 'AddFieldToAddress1595620266192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "number" integer`);
        await queryRunner.query(`ALTER TABLE "exams" ALTER COLUMN "active" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams" ALTER COLUMN "active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
    }

}
