import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Contract extends Model {}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    terms: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contractId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Contract',
    tableName: 'CONTRACT',
  }
);

export default Contract;
