import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Address } from "@models/Address";
import { Pacient } from "@models/Pacient";

export default {
  async index(req: Request, res: Response) {
    const repo = await getRepository(Address).find();

    return res.json(repo);
  },
  async create(req: Request, res: Response) {
    const { pacient_id } = req.params;
    const { street, city, uf, neighborhood, zipcode, number } = req.body;

    const repo = getRepository(Address);
    const pacient = await getRepository(Pacient).findOne(Number(pacient_id));

    if (!pacient) {
      return res.json({ messageAlert: "Pacient não existe" });
    }

    const address = repo.create({
      street,
      city,
      uf,
      neighborhood,
      zipcode,
      number,
      pacient,
    });

    try {
      await repo.save(address);

      return res.json({ message: "Endereço cadastro com sucesso" });
    } catch (error) {
      return res.json(error);
    }
  },
};
