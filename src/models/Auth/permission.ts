import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class Permission extends Model {
  declare name: string;
  declare description?: string;
}

Permission.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Permission'
  }
);

export { Permission };