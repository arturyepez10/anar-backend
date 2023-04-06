import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class UserRolePermission extends Model {
  declare role_id: string;
  declare permission_id: string;
}

UserRolePermission.init(
  {
    role_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    permission_id: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: 'UserRolePermission'
  }
);

export { UserRolePermission };