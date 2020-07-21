import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreatePacient1595294339942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pacients",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "pront_req_interno",
            type: "varchar",
          },
          {
            name: "convenio",
            type: "varchar",
          },
          {
            name: "procedencia",
            type: "varchar",
          },
          {
            name: "medico_solicitante",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "fone",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("pacients");
  }
}
