import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Exams } from "@models/Exams";
import { TypeExams } from "@models/TypeExams";

export default {
  async create(req: Request, res: Response) {
    const { type_exam_id } = req.params;
    const { description, code } = req.body;

    //query verifica se o tipo do exame é válido, tratamento de erro.
    const repoType = getRepository(TypeExams);
    const type_exam = await repoType.findOne({
      where: {
        id: Number(type_exam_id),
      },
    });

    if (!type_exam) {
      return res.json({ message: "Por favor selecione o tipo do exame!" });
    }

    try {
      const repo = getRepository(Exams);
      await repo.save({
        description: description.toUpperCase(),
        code: code.toUpperCase(),
        type_exam: {
          id: Number(type_exam_id),
        },
      });

      return res.json({ message: "Exame cadastrado com sucesso!" });
    } catch (error) {
      return res.json(error);
    }
  },
};
