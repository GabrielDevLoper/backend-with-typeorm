// /**CRIAÇÃO DE SEED AVANÇADO GERADO AUTOMATICO */
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Exams } from "../../models/Exams";

export default class CreateExam implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Exams)
      .values([
        //Exames de BIOQUIMICA
        { description: "GLICOSE", code: "GLI", type_exam: { id: 1 } },
        {
          description: "GLICOSE PÓS PRANDIAL",
          code: "GLICA",
          type_exam: { id: 1 },
        },
        { description: "COLESTEROL", code: "COL", type_exam: { id: 1 } },
        { description: "TRIGLICERIDEOS", code: "TRI", type_exam: { id: 1 } },
        { description: "HDL", code: "CHDL", type_exam: { id: 1 } },
        { description: "LDL", code: "LDL", type_exam: { id: 1 } },
        { description: "CREATINA", code: "CRE", type_exam: { id: 1 } },
        { description: "ÁCIDO ÚRICO", code: "ACU", type_exam: { id: 1 } },
        { description: "TGO", code: "TGO", type_exam: { id: 1 } },
        { description: "TGP", code: "TGP", type_exam: { id: 1 } },
        { description: "GAMA GT", code: "GGT", type_exam: { id: 1 } },
        { description: "URÉIA", code: "URE", type_exam: { id: 1 } },

        //Exames de IMONOLOGIA
        { description: "ASLO", code: "ASLO", type_exam: { id: 2 } },
        { description: "LATEX", code: "LATEX", type_exam: { id: 2 } },
        { description: "PCR", code: "PCR", type_exam: { id: 2 } },
        { description: "BETA HCG", code: "HCG", type_exam: { id: 2 } },
        { description: "HIV", code: "HIV QUAN", type_exam: { id: 2 } },
        { description: "VDRL", code: "VDRL", type_exam: { id: 2 } },

        //Exames de HEMATOLOGIA
        { description: "HEMOGRAMA", code: "HEM", type_exam: { id: 3 } },
        { description: "PLAQUETAS", code: "PLA", type_exam: { id: 3 } },
        { description: "COAGULOGRAMA", code: "COAC", type_exam: { id: 3 } },
        { description: "GRUPO SANGUINEO", code: "GSA", type_exam: { id: 3 } },
        { description: "FATOR Rh", code: "FATOR Rh", type_exam: { id: 3 } },
        { description: "VHS", code: "VHS", type_exam: { id: 3 } },

        //Exames de PARASITOLOGIA
        { description: "PARASITOLÓGICO", code: "PAR", type_exam: { id: 4 } },
        {
          description: "PARASITOLÓGICO COLETADA",
          code: "PARC",
          type_exam: { id: 4 },
        },
        { description: "SUMÁRIO", code: "URT", type_exam: { id: 4 } },
      ])
      .execute();
  }
}
