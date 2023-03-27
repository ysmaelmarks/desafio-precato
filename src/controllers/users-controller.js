import users from "../models/users-schema.js";
import validator from 'validator';
import mongoose from "mongoose";

class usersController {

    static listAllUsers = (req, res) => {
        users.find((err, users) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(users);
        })
    }

    static listUsersByDate = async (req, res) => {
        try {
            const { start_date, end_date } = req.params;
            if (!start_date || !end_date) {
                return res.status(400).send({ error: 'dates required!' });
            }
            const user = await users.find({
                created_at: { $gte: new Date(start_date), $lte: new Date(end_date) }
            });
            return res.status(200).json(user);
        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
    }

    static createUser = async (req, res) => {
        const { name, email, cpf, phone } = req.body;

        if (typeof email !== 'string' || !email) {
            return res.status(400).send({ error: 'Invalid email' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).send({ error: 'Invalid email' });
        }

        try {
            const newUser = new users({ name, email, cpf, phone });
            await newUser.save();
            res.status(201).json(newUser);
        }
        catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send({ error: error.message });
            }
            if (error.code === 11000) {
                return res.status(400).send({ error: 'Email already exists' });
            }
            return res.status(500).send({ error: 'Internal server error' });
        }
    }

    static updateUser = async (req, res) => {
        const { name, email, cpf, phone } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).send({ error: 'Invalid email' });
        }

        try {
            const { id } = req.params;
            const user = await users.findByIdAndUpdate(id, { name, email, cpf, phone }, { new: true });
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send({ error: error.message });
            }
            if (error.code === 11000) {
                return res.status(400).send({ error: 'Email already exists' });
            }
            return res.status(500).send({ error: 'Internal server error' });
        }
    }

    static deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await users.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
            return res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }


}

export default usersController;