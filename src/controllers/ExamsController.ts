import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Exams } from "@models/Exams";
import { TypeExams } from "@models/TypeExams";

export default {
  async index(req: Request, res: Response) {
    try {
      const repo = await getRepository(Exams).find({
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
    const { type_exam_id } = req.params;
    const { description, code } = req.body;
    const repo = getRepository(Exams);

    //query verifica se o tipo do exame é válido, tratamento de erro.
    const repoType = getRepository(TypeExams);
    const type_exam = await repoType.findOne({
      where: {
        id: Number(type_exam_id),
      },
    });

    if (!type_exam) {
      return res.json({ messageAlert: "Por favor selecione o tipo do exame!" });
    }

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

  async update(req: Request, res: Response) {
    const { exam_id } = req.params;
    const { description, code } = req.body;
    const repo = getRepository(Exams);

    const exam: Exams = await repo.findOne(Number(exam_id));

    if (description) {
      exam.description = description;
    }

    if (code) {
      exam.code = code;
    }

    try {
      await repo.update(Number(exam_id), exam);
      return res.json({ message: "Exame editado com sucesso" });
    } catch (error) {
      return res.json(error);
    }
  },

  async delete(req: Request, res: Response) {
    const { exam_id } = req.params;

    const repo = getRepository(Exams);

    try {
      await repo.delete(Number(exam_id));
      return res.json({ message: "Exame excluído com sucesso" });
    } catch (error) {
      return res.json(error);
    }
  },

  async show(req: Request, res: Response) {
    const { exam_id } = req.params;

    const repo = getRepository(Exams);

    try {
      const exam = await repo.findOne(Number(exam_id));
      return res.json(exam);
    } catch (error) {
      return res.json(error);
    }
  },
};
