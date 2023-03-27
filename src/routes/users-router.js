import express from "express";
import usersController from "../controllers/users-controller.js";

const router = express.Router();

router
    .get('/users', usersController.listAllUsers)
    .get('/users/:start_date/:end_date', usersController.listUsersByDate)
    .post('/users', usersController.createUser)
    .put('/users/:id', usersController.updateUser)
    .delete('/users/:id', usersController.deleteUser);


export default router;