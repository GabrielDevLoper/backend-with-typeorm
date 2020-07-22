import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { TypeExams } from "@models/TypeExams";

export default {
  async create(req: Request, res: Response) {
    const { title } = req.body;
    const repo = getRepository(TypeExams);

    try {
      await repo.save({
        title: title.toUpperCase(),
      });
      return res.json({ message: "Tipo de exame cadastrado com sucesso!" });
    } catch (error) {
      return res.json(error);
    }
  },
};
