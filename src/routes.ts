import express, { Express } from "express";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource.middleware";
import * as UserController from "./controller/user.controller";
import * as SessionController from "./controller/session.controller";


function routes(app: Express) {
    const session = express.Router();
    const user = express.Router();

    user.use("/user", validateResource(createUserSchema), user);
    session.use("/", session);

    app.get("/", (req, res) => {
        res.redirect("/healthcheck");
    });

    app.get("/healthcheck", (req, res) => {
        return res.sendStatus(200);
    });

    session.route("/session")
        .get(SessionController.show)
        .post(SessionController.create)
        .delete(SessionController.del);

    user.route("/user")
        .post(UserController.create);
    
    user.route("/user/:id")
        .get(UserController.show)
        .put(UserController.update)
        .delete(UserController.del);
}

export default routes;