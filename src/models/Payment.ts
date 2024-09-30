// src/models/Payment.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db'; // Importando a instância de conexão do Sequelize
import Job from './Job'; // Relacionamento com Job

class Payment extends Model {
  public id!: number;
  public jobId!: number;
  public operationDate!: Date;
  public paymentValue!: number;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paymentValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'PAYMENT',
    timestamps: false,
  }
);

// Definindo relacionamento
Payment.belongsTo(Job, { foreignKey: 'jobId' });
Job.hasMany(Payment, { foreignKey: 'jobId' });

export default Payment;
