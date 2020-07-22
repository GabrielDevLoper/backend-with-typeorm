import { Router } from "express";
import UserController from "@controllers/UserController";
import PacientController from "@controllers/PacientController";
import TypeExamsController from "@controllers/TypeExamsController";
import ExamsController from "@controllers/ExamsController";
import SessionController from "@controllers/SessionController";

import authMiddleware from "./middlewares/auth";

const routes = Router();

/*Rotas para os usuarios */
routes.post("/users", UserController.create);
routes.get("/users", UserController.index);
routes.put("/users/:user_id", UserController.update);
routes.delete("/users/:user_id", authMiddleware, UserController.delete);
routes.get("/users/:user_id", UserController.show);

/*Rotas para os pacientes */
routes.post("/users/:user_id/pacients", PacientController.create);
routes.get("/pacients", PacientController.index);
routes.get("/pacients/:pacient_id", PacientController.show);

/*Rotas para os tipos de exames */
routes.post("/type_exams", TypeExamsController.create);

/*Rotas para os exames*/
routes.post("/exams/:type_exam_id", ExamsController.create);

routes.post("/sessions", SessionController.create);

//rotas a partir daqui precisa que o usuário precise estar logado
routes.use(authMiddleware);

export default routes;
