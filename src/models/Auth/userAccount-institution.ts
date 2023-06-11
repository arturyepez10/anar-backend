import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class UserAccountInstitution extends Model {
  declare user_id: number;
  declare institution_id: number;
}

UserAccountInstitution.init(
  {
    userAccount_id: {
      type: DataTypes.UUID
    },
    institution_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'UserAccountInstitution'
  }
);

export { UserAccountInstitution };