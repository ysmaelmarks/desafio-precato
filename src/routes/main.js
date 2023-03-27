import express from "express";
import users from "./users-router.js"

const routes = (app) => {
    app.use(express.json());
    app.route("/").get((req, res) => {
        res.status(200).send({ title: "main working" });
    })
    app.use(users);
}

export default routes;