import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;
    const repo = getRepository(User);

    const user = await repo.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.json({ messageAlert: "Usuário não encontrado" });
    }

    //verificando se a senha esta correta e consequentemente retornando se ela
    //estiver incorreta
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ messageError: "Senha Incorreta" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );

    return res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      token,
    });
  },
};
