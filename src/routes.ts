import { Express } from "express";

function routes(app: Express) {
    app.get("/", (req, res) => {
        res.json({
            message: "Hello World!"
        });
    });
}

export default routes;