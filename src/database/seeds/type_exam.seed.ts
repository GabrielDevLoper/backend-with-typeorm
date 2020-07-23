/**CRIAÇÃO DE SEED AVANÇADO GERADO AUTOMATICO */
// import { Factory, Seeder } from "typeorm-seeding";
// import { Connection } from "typeorm";
// import { TypeExams } from "../../models/TypeExams";

// export default class CreateTypeExam implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     await factory(TypeExams)().createMany(10);
//   }
// }

/**CRIAÇÃO DE SEED BÁSICO ESCRITO MANUALMENTE */
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { TypeExams } from "../../models/TypeExams";

export default class CreateTypeExam implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(TypeExams)
      .values([{ title: "CRAQUE" }])
      .execute();
  }
}
