import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Exams } from "@models/Exams";

export default {
  async create(req: Request, res: Response) {
    const { type_exam_id } = req.params;
    const { description, code } = req.body;

    const repo = getRepository(Exams);

    try {
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
