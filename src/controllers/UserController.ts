import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@models/User";

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
    const { username, password } = req.body;
    const repo = getRepository(User);

    const data = {
      username,
      password,
    };

    const findUsers = await repo.findOne({
      where: {
        username,
      },
    });

    if (findUsers) {
      return res.json({ message: "Usuário ja existe" });
    }

    try {
      await repo.save(data);
      return res.json({ message: "Usuário cadastrado com sucesso!" });
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
