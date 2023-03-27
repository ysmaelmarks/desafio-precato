import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        cpf: {type: String, required: true},
        phone: {type: String, required: true},
        created_at:{type: Date, default: Date.now}
    }
)

const users = mongoose.model('forms', usersSchema);

export default users;