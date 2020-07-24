import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { TypeExams } from "@models/TypeExams";

export default {
  async index(req: Request, res: Response) {
    try {
      const repo = await getRepository(TypeExams).find({
        order: {
          id: "ASC",
        },
      });
      return res.json(repo);
    } catch (error) {
      return res.json(error);
    }
  },

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

  async update(req: Request, res: Response) {
    const { type_exam_id } = req.params;
    const { title } = req.body;

    const repo = getRepository(TypeExams);

    try {
      await repo.update(Number(type_exam_id), { title });
      return res.json({ message: "Tipo de exame editado com sucesso" });
    } catch (error) {
      return res.json(error);
    }
  },

  async delete(req: Request, res: Response) {
    const { type_exam_id } = req.params;

    try {
      await getRepository(TypeExams).delete(Number(type_exam_id));

      return res.json({ message: "Tipo de exame excluído com sucesso" });
    } catch (error) {
      return res.json(error);
    }
  },

  async show(req: Request, res: Response) {
    const { type_exam_id } = req.params;

    const repo = getRepository(TypeExams);

    try {
      const typeExam = await repo.findOne(Number(type_exam_id));
      return res.json(typeExam);
    } catch (error) {
      return res.json(error);
    }
  },
};
