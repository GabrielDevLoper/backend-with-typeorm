import { Request, Response } from "express";
import { getRepository, Connection } from "typeorm";
import { Pacient } from "@models/Pacient";

export default {
  async index(req: Request, res: Response) {
    const { user_id, status } = req.query;

    const repo = getRepository(Pacient);

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
    } = req.body;

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
