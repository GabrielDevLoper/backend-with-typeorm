import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldRoleToUsers1595458330678 implements MigrationInterface {
    name = 'AddFieldRoleToUsers1595458330678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
