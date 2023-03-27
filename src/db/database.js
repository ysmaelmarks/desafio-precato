import mongoose from "mongoose";
//suprimir o warning do mongoose
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://db:27017');

let db = mongoose.connection;

export default db;