import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@models/User";
import { validate } from "class-validator";

export default {
  async index(req: Request, res: Response) {
    try {
      const users = await getRepository(User).find({
        order: {
          username: "ASC",
        },
      });
      return res.json(users);
    } catch (error) {
      return res.json(error);
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const repo = getRepository(User);

      //query verifica se o usuário ja foi registrado para não duplicar
      const findUsers = await repo.findOne({
        where: {
          username,
        },
      });

      //query verifica se o usuário ja foi registrado para não duplicar
      const findUserEmail = await repo.findOne({
        where: {
          email,
        },
      });

      if (findUsers || findUserEmail) {
        return res.json({ message: "email ou username já foi utilizado" });
      }

      //validando campos do meu model
      const pacient = repo.create({
        username,
        email,
        password,
      });

      const errors = await validate(pacient);

      if (errors.length === 0) {
        await repo.save(pacient);
        return res.json({ message: "Usuário cadastrado com sucesso!" });
      }
      return res.json({ messageValidation: errors[0].constraints.isEmail });
    } catch (error) {
      return res.json(error);
    }
  },

  async update(req: Request, res: Response) {
    const { user_id } = req.params;
    const { username, password } = req.body;
    const repo = getRepository(User);

    try {
      await repo.update({ id: Number(user_id) }, { username, password });
      return res.json({ message: "Usário editado com sucesso" });
    } catch (error) {
      return res.json(error);
    }
  },

  async delete(req: Request, res: Response) {
    const { user_id } = req.params;
    const repo = getRepository(User);

    try {
      await repo.delete(user_id);
      return res.json({ message: "Usário excluído com sucesso" });
    } catch (error) {
      return res.json(error);
    }
  },

  async show(req: Request, res: Response) {
    const { user_id } = req.params;

    const repo = getRepository(User);

    try {
      const user = await repo.findOne({
        where: {
          id: user_id,
        },
      });

      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  },
};
