import { Request, Response } from "express";
import { getRepository, Connection } from "typeorm";
import { Pacient } from "@models/Pacient";
import { Exams } from "@models/Exams";

export default {
  async index(req: Request, res: Response) {
    const { user_id, status } = req.query;

    const repo = getRepository(Pacient);

    /**
     * tipos de rotas que podem ser consultadas
     * URL:"/pacients" - retorna todos os pacientes
     * URL:"/pacients?user_id=1" - retorna todos os pacientes cadastrado pelo usuario de id=1
     * URL:"/pacients?status=true" - retorna todos os pacientes que ja tem os exames com a data de entrega
     * URL:"/pacients?status=false" - retorna todos os pacientes que ainda esta com a data indefinida das entregasd dos exames
     */

    try {
      //query q retorna todos os pacientes que não tem uma data de entrega dos exames
      if (status === "false") {
        const pacient = await repo.find({
          order: {
            id: "ASC",
          },
          where: {
            status: false,
          },
        });
        return res.json(pacient);
      }

      //query retorna todos os pacientes que tem uma data de entrega definida
      if (status === "true") {
        const pacient = await repo.find({
          order: {
            id: "ASC",
          },
          where: {
            status: true,
          },
        });
        return res.json(pacient);
      }

      //query retorna os pacientes com seus devidos usuarios que fez o cadastro deles
      if (user_id) {
        const pacient = await repo.find({
          order: {
            id: "ASC",
          },
          where: {
            user: {
              id: Number(user_id),
            },
          },
        });
        return res.json(pacient);
      }

      //query retorna todos os pacientes cadastrado no sistema
      const pacient = await repo.find({
        order: {
          id: "ASC",
        },
      });
      return res.json(pacient);
    } catch (error) {
      return res.json(error);
    }
  },

  async create(req: Request, res: Response) {
    const { user_id } = req.params;
    const {
      name,
      pront_req_interno,
      convenio,
      procedencia,
      medico_solicitante,
      fone,
      data_entrega,
      exams,
    } = req.body;

    const typeExam = exams
      .split(",")
      .map((exam: string) => Number(exam.trim()))
      .map((examsId: number) => {
        return examsId;
      });

    //query q retorna o exames selecionados pelo paciente
    const exam = getRepository(Exams);
    const chosen_exams = await exam.findByIds(typeExam);

    const repo = getRepository(Pacient);

    try {
      if (data_entrega) {
        await repo.save({
          name,
          pront_req_interno,
          convenio,
          procedencia,
          medico_solicitante,
          fone,
          data_entrega,
          status: true,
          user: {
            id: Number(user_id),
          },
          exams: chosen_exams,
        });

        return res.json({ message: "Paciente cadastrado com sucesso!" });
      }

      await repo.save({
        name,
        pront_req_interno,
        convenio,
        procedencia,
        medico_solicitante,
        fone,
        user: {
          id: Number(user_id),
        },
        exams: chosen_exams,
      });

      return res.json({ message: "Paciente cadastrado com sucesso!" });
    } catch (error) {
      return res.json(error);
    }
  },

  async show(req: Request, res: Response) {
    const { pacient_id } = req.params;

    const repo = getRepository(Pacient);

    try {
      const pacient = await repo.findOne({
        where: {
          id: Number(pacient_id),
        },
      });
      return res.json(pacient);
    } catch (error) {
      return res.json(error);
    }
  },
};
