import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class Application extends Model {
  declare name: string;
  declare description: string;
}

Application.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Application'
  }
);

export { Application };