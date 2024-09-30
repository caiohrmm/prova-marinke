import express from "express";
import { connectDB } from "./config/db";
import apiRoutes from "./routes/routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware para JSON
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Usar as rotas da API
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
