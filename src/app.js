import express from "express";
import cors from "cors";
import db from "./db/database.js";
import routes from "./routes/main.js"
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";


const swaggerDocument = YAML.load("./swagger.yaml");

db.on("open", () => {
    console.log("database working")
})

db.on("error", (err) => {
    console.log("database isnt working", err)
})

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes(app);

export default app;