import express from "express";
import cors from "cors";
import dbConnection from "./db/connection.js";
import routes from "./routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());
dbConnection();

// Routes:
app.use("/api", routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server rodando no endereço: http://localhost:${PORT}`);
});
