import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';
import { UserRole } from './userRole';
import { UserAuthData } from './userAuthData';

class RoleAuthData extends Model {
  declare role: string;
  declare user_id: string;
}

RoleAuthData.init(
  {
    role: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.UUID
    }
  },
  {
    sequelize,
    modelName: 'RoleAuthData'
  }
);

export { RoleAuthData };