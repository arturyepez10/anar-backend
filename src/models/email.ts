import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class Email extends Model {
  declare address: string;

  declare user_id?: string;

  declare user_auth?: string;
};

Email.init(
  {
    address: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    user_auth: {
      type: DataTypes.UUID,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Email'
  }
);



export { Email };