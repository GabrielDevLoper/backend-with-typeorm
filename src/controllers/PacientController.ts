import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Pacient } from "@models/Pacient";

export default {
  async create(req: Request, res: Response) {
    return res.json({ message: "Paciente cadastrado com sucesso!" });
  },
};
