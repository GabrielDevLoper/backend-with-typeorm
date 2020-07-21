import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Pacient } from "@models/Pacient";
import { User } from "@models/User";

export default {
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
    const repoUser = getRepository(User);

    const user = await repoUser.findOne({
      where: {
        id: Number(user_id),
      },
    });

    try {
      await repo.save({
        name,
        pront_req_interno,
        convenio,
        procedencia,
        medico_solicitante,
        fone,
        user,
      });
      return res.json({ message: "Paciente cadastrado com sucesso!" });
    } catch (error) {
      return res.json(error);
    }
  },
};
