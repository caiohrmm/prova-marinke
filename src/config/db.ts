import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Importando os modelos
import Profile from "../models/Profile";
import Deposit from "../models/Deposit";
import Job from "../models/Job";
import Payment from "../models/Payment";
import Contract from "../models/Contract";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Função para conectar ao banco de dados e sincronizar os modelos
export const connectDB = async () => {
  try {
    // Autentica a conexão com o banco
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    // Sincroniza os modelos com o banco (cria/atualiza as tabelas)
    await sequelize.sync({ alter: true }); // "alter: true" ajusta as tabelas conforme os modelos
    console.log("Banco de dados sincronizado com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    process.exit(1); // Para a execução do servidor se a conexão falhar
  }
};
