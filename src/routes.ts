import express, { Express } from "express";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource.middleware";
import * as UserController from "./controller/user.controller";
import * as SessionController from "./controller/session.controller";


function routes(app: Express) {
    const session = express.Router();
    const user = express.Router();

    app.get("/healthcheck", (req, res) => {
        return res.sendStatus(200);
    });

    session.route("/session")
        .get(SessionController.show)
        .post(SessionController.create)
        .delete(SessionController.del);
    
    user.route("/user")
        .get(UserController.show)
        .post(UserController.create)
        .put(UserController.update)
        .delete(UserController.del);

    app.use("/", session);
    app.use("/", validateResource(createUserSchema), user);
}

export default routes;