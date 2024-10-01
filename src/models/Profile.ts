import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Profile extends Model {
  balance!: number;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Profile',
    tableName: 'PROFILE',
  }
);

export default Profile;
