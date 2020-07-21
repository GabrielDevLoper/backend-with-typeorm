import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationshipUsersToPacients1595352950197 implements MigrationInterface {
    name = 'AddRelationshipUsersToPacients1595352950197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacients" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "pacients" ADD CONSTRAINT "FK_3b375f0bc29c6c12265d04cb6eb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacients" DROP CONSTRAINT "FK_3b375f0bc29c6c12265d04cb6eb"`);
        await queryRunner.query(`ALTER TABLE "pacients" DROP COLUMN "userId"`);
    }

}
