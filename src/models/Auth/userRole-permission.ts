import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';
import { Permission } from './permission';
import { UserRole } from './userRole';

class UserRolePermission extends Model {
  declare role_id: string;
  declare permission_id: string;
}

UserRolePermission.init(
  {
    role_id: {
      type: DataTypes.STRING
    },
    permission_id: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'UserRolePermission'
  }
);

export { UserRolePermission };