// src/models/Job.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db"; // Importando a instância de conexão do Sequelize
import Contract from "./Contract"; // Relacionamento com Contract

class Job extends Model {
  public id!: number;
  public contractId!: number;
  public description!: string;
  public operationDate!: Date;
  public price!: number;
  public paymentDate?: Date;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contractId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    paid: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Job",
    tableName: "JOB",
    timestamps: false,
  }
);

// Definindo relacionamento
Job.belongsTo(Contract, { foreignKey: "contractId" });
Contract.hasMany(Job, { foreignKey: "contractId" });

export default Job;
