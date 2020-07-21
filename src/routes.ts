import { Router } from "express";
import UserController from "@controllers/UserController";
import PacientController from "@controllers/PacientController";

const routes = Router();

routes.post("/users", UserController.create);
routes.get("/users", UserController.index);
routes.put("/users/:user_id", UserController.update);
routes.delete("/users/:user_id", UserController.delete);
routes.get("/users/:user_id", UserController.show);

//cadastra pacientes ligado a um usuario
routes.post("/users/:user_id/pacients", PacientController.create);
//Filtra todos os pacientes que os usuario cadastrou
routes.get("/pacients", PacientController.index);
//Filtra apenas o paciente especifico
routes.get("/pacients/:pacient_id", PacientController.show);

export default routes;
