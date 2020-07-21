import { Request, Response } from "express";
import { getRepository, Connection } from "typeorm";
import { Pacient } from "@models/Pacient";
import { User } from "@models/User";

export default {
  async index(req: Request, res: Response) {
    const { user_id } = req.params;
    const repo = getRepository(Pacient);

    try {
      const pacient = await repo.find({
        where: {
          user: {
            id: Number(user_id),
          },
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
    } = req.body;

    const repo = getRepository(Pacient);

    try {
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
};
