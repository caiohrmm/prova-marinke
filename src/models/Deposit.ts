// src/models/Deposit.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db"; // Importando a instância de conexão do Sequelize
import Profile from "./Profile"; // Relacionamento com Profile

class Deposit extends Model {
  public id!: number;
  public clientId!: number;
  public operationDate!: Date;
  public depositValue!: number;
}

Deposit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    depositValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Deposit",
    tableName: "DEPOSIT",
    timestamps: false,
  }
);

// Definindo relacionamento
Deposit.belongsTo(Profile, { foreignKey: "clientId" });
Profile.hasMany(Deposit, { foreignKey: "clientId" });

export default Deposit;
