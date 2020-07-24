import { Router } from "express";
import UserController from "@controllers/UserController";
import PacientController from "@controllers/PacientController";
import TypeExamsController from "@controllers/TypeExamsController";
import ExamsController from "@controllers/ExamsController";
import SessionController from "@controllers/SessionController";
import AddressController from "@controllers/AddressController";

import authMiddleware from "./middlewares/auth";
import checkRoles from "./middlewares/checkRoles";

const routes = Router();

/*Rotas para os usuarios */
routes.post("/users", UserController.create);
routes.get("/users", authMiddleware, UserController.index);
routes.put(
  "/users/:user_id",
  authMiddleware,
  checkRoles("ADMIN"),
  UserController.update
);
routes.delete(
  "/users/:user_id",
  authMiddleware,
  checkRoles("ADMIN"),
  UserController.delete
);
routes.get("/users/:user_id", authMiddleware, UserController.show);

/**Rota para logar no sistema */
routes.post("/sessions", SessionController.create);

/*Rotas para os pacientes */
routes.post(
  "/users/:user_id/pacients",
  authMiddleware,
  PacientController.create
);
routes.get("/pacients", authMiddleware, PacientController.index);
routes.get("/pacients/:pacient_id", authMiddleware, PacientController.show);
routes.put(
  "/users/:user_id/pacients/:pacient_id",
  authMiddleware,
  PacientController.update
);
routes.delete(
  "/pacients/:pacient_id",
  authMiddleware,
  PacientController.delete
);

/**Rotas para os endereços */
routes.get("/address", AddressController.index);
routes.post("/pacients/:pacient_id/address", AddressController.create);

/*Rotas para os tipos de exames */
routes
  .post("/type_exams", authMiddleware, TypeExamsController.create)
  .get("/type_exams", authMiddleware, TypeExamsController.index)
  .get("/type_exams/:type_exam_id", authMiddleware, TypeExamsController.show)
  .put("/type_exams/:type_exam_id", authMiddleware, TypeExamsController.update)
  .delete(
    "/type_exams/:type_exam_id",
    authMiddleware,
    TypeExamsController.delete
  );

/*Rotas para os exames*/
routes.post("/exams/:type_exam_id", authMiddleware, ExamsController.create);
routes.get("/exams", authMiddleware, ExamsController.index);
routes.put("/exams/:exam_id", authMiddleware, ExamsController.update);
routes.get("/exams/:exam_id", authMiddleware, ExamsController.show);

routes.get("/all-users", PacientController.allUsersPDF);
routes.get("/show-user/:pacient_id", PacientController.showUserPDF);

export default routes;
