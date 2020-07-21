import { Router } from "express";
import UserController from "@controllers/UserController";

const routes = Router();

routes.post("/users", UserController.create);
routes.get("/users", UserController.index);
routes.put("/users/:user_id", UserController.update);
routes.delete("/users/:user_id", UserController.delete);
routes.get("/users/:user_id", UserController.show);

export default routes;
