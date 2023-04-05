import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';
import { Application } from '../application';

class UserRole extends Model {
  declare application: string;

  declare name: string;
}

UserRole.init(
  {
    application: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'UserRole'
  }
);

export { UserRole };